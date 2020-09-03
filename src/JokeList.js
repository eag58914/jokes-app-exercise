import React, { Component } from 'react';
import Axios from 'axios';

class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};
	constructor(props) {
		super(props);
		this.state = { jokes: [] };
	}
	async componentDidMount() {
		//load jokes
		let jokes = [];
		while (jokes.length < this.props.numJokesToGet) {
			let res = await Axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
			jokes.push(res.data.joke);
		}
		this.setState({ jokes: jokes });
	}
	render() {
		return (
			<div className="JokeList">
				<div className="JokeList-jokes">{this.state.jokes.map((j) => <div>{j}</div>)}</div>
			</div>
		);
	}
}

export default JokeList;