import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var server = "//172.20.0.224:8080";
class Pizza extends React.Component {
	render(){
		return (<div className='pizza'>
			<header>{this.props.name}</header>
			<ul>{this.props.ingredients.map(i => <li key={i}>{i}</li>)}</ul>
			<pre>{this.props.price}</pre>
		</div>);
	}
}
class Order extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pizzas: [],
			id : 0,
			table: 42,
		};
	}
}
class MenuOld extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pizza: [],
		};
	}
			//pizzas: [{name:"margarita", price:4.5, count:0}],
	//			<button onClick={this.getPizza.bind(this)}>Get Pizzas</button>

	getPizza(){ // TODO : faire a l'init
		fetch(server + "/pizza").then(j => j.json()).then(res => this.setState({pizzas : res}))
	}
	render(){
		return (
			<table><tbody>{this.state.pizzas.map(pizza => 
				<tr key={pizza.name}>
				<td>{pizza.name}</td>
				<td>{pizza.count}</td>
				<td><button onClick={this.addPizza(pizza)}>+</button></td>
				</tr>
			)}</tbody></table>
		)  ;
	}
}

/*
	addPizza(pizza){
		var pizzas = this.state.pizzas.slice();
		//pizzas.find(p => p.name == pizza.name).count++;
		this.setState({pizzas: pizzas})
	}
*/

class Menu extends React.Component {
	render(){
		return (
			<ul>{this.props.pizzas.map(pizza =>
				<li key={pizza.id}>
					<Pizza name={pizza.name} ingredients={pizza.ingredients} id={pizza.id} price={pizza.price} />
				</li>
			)}</ul>
		);
	}
}
class OrderFactory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pizzas: [],
		};
	}

	addOrder(event){
		fetch(server + "/order", {
			method: "POST",
			headers: new Headers({'Content-Type': 'application/json'}),
			body: JSON.stringify({
				nbTable:event.target.table.value,
				pizzas:[{name:event.target.pizza.value,ingredients:[]}]
			})
		}).then(res => console.log(res))
		event.preventDefault();
		return false;
	}

	addToCart(event){
		let tmp = this.state.pizzas;
		tmp.push([event.target.choice.value, event.target.choice.textContent]);
		console.log(tmp);
		this.setState(tmp);
		
		event.preventDefault();
		return false;
	}
	render(){
		return (<div>
			<form onSubmit={this.addToCart.bind(this)}>
				<input type="number" title="table" placeholder="table" name="table" defaultValue="42"/>
				<select name="choice">{this.props.pizzas.map(pizza =>
					<option key={pizza.id} value={pizza.id}>{pizza.name}</option>
				)}</select>
				<button>+</button>
			</form>
			<form onSubmit={this.addOrder}>
				<ul>{this.state.pizzas.map(pizza =>
					<li key={+new Date()}>{pizza[1]}</li>
				)}</ul>
				<input type="submit"/>
			</form>
		</div>)  ;
	}
}
class Pizzeria extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pizzas: [],
		};
		fetch(server + "/pizza").then(j => j.json()).then(res => this.setState({pizzas : res}))
	}

	render() {
		return (
			<div>
				<Menu pizzas={this.state.pizzas}/>
				<hr/>
				<OrderFactory pizzas={this.state.pizzas}/>
			</div>
		)
	}
}

ReactDOM.render(<Pizzeria />, document.getElementById('root'));
