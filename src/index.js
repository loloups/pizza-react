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
function addOrder(event){
    fetch("//localhost:8080/order", {
        method: "POST",
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify([{name:event.target.name.value, price:event.target.price.value,ingredients:[]}])
    }).then(res => console.log(res))
    event.preventDefault();
    return false;
}
class OrderList extends React.Component {
    
    getOrder(){
        fetch("//localhost:8080/order").then(j => j.json()).then(res => this.list=res)
    }
    render(){
        return (
            <div>
                <button onClick={this.getOrder}>List</button>
                <ul>{this.list.map()}</ul>
            </div>
        )  ;
    }
}
class OrderFactory extends React.Component {
    render(){
        return (
            <form onSubmit={addOrder}><input defaultValue="calzone" name="name"/><input type="number" name="price" defaultValue="1"/><input type="submit"/></form>
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
