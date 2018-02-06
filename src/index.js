import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { OrderFactory } from './OrderFactory'
import { Pizza } from './pizza'

var server = "//172.20.0.219:8080";
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
