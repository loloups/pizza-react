import React from 'react';

var shortid = require('shortid');

var server = "//172.20.0.219:8080";
export class OrderFactory extends React.Component {
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
				<ul>{this.state.pizzas.map(pizza=>
					<li key={shortid.generate()}>{pizza[1]}</li>
				)}</ul>
				<input type="submit"/>
			</form>
		</div>)  ;
	}
}