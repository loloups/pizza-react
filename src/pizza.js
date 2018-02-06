import React from 'react';
import idx from 'idx'

export class Pizza extends React.Component {
	render(){
		return (<div className='pizza'>
			<header>{this.props.name}</header>
			<ul>{idx(this.props, (_) => _.ingredients.map(i => <li key={i}>{i}</li>))}</ul>
			<pre>{this.props.price}</pre>
		</div>);
	}
}