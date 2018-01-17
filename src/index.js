import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true,
            isWinner: null,
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice();        
        if (this.state.isWinner || squares[i]) {
            return;
          }  
        squares[i] = this.state.isXNext ? 'X' : 'O';
        const winner = calculateWinner(squares);    
        this.setState({
            squares, squares,
            isXNext: !this.state.isXNext,
            isWinner: winner,
        });
    }
    renderSquare(i) {
        return (<Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />);
    }

    render() {
        let status;
        if (this.state.isWinner) {
            status = 'Winner: ' + this.state.isWinner;
        } else {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}*/
var server = "//172.20.0.188:8080";
class Pizza extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"margarita",
            price:4.5
        };
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
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
    }
            //pizzas: [{name:"margarita", price:4.5, count:0}],
    //            <button onClick={this.getPizza.bind(this)}>Get Pizzas</button>

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



class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };
    }
    getOrder(){
        fetch(server + "/order").then(j => j.json()).then(res => this.setState({orders : res}))
    }
    addPizza(pizza){
        var pizzas = this.state.pizzas.slice();
        //pizzas.find(p => p.name == pizza.name).count++;
        this.setState({pizzas: pizzas})
    }
    render(){
        return (
            <div>

                <button onClick={this.getOrder.bind(this)}>Get Orders</button>
                <h1>Orders:</h1>
                <ul>{this.state.orders.map(order =>
                    <li key={order.id}>{order.name}</li>
                )}</ul>
            </div>
        )  ;
    }
}
class OrderFactory extends React.Component {
    addOrder(event){
        fetch(server + "/order", {
            method: "POST",
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify([{name:event.target.name.value, price:event.target.price.value,ingredients:[]}])
        }).then(res => console.log(res))
        event.preventDefault();
        return false;
    }
    render(){
        return (
            <form onSubmit={this.addOrder}>
                <input defaultValue="calzone" name="name"/>
                <input type="number" name="price" defaultValue="1"/>
                <input type="submit"/>
            </form>
        )  ;
    }
}
class Pizzeria extends React.Component {
    render() {
        return (
            <div>
                <OrderList />
                <OrderFactory />
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Pizzeria />,
    document.getElementById('root')
);
