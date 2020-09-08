import React, { Component } from 'react';
import Joke from './Joke';
import Axios from 'axios';
import { v4 as uuid } from 'uuid';
import './JokeList.css';

class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};
	constructor(props) {
		super(props);
		this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]') };
		this.handleClick = this.handleClick.bind(this);
	}
	async componentDidMount() {
		//load jokes
		if (this.state.jokes.length === 0) this.getJokes();
	}
	handleVote(id, delta) {
		this.setState(
			(st) => ({ jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j)) }),
			() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}
	async getJokes() {
		let jokes = [];
		while (jokes.length < 10) {
			let res = await Axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
			jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
		}
		this.setState((st) => ({ jokes: [ st.jokes, ...jokes ] }));
		window.localStorage.setItem('jokes', JSON.stringify(jokes));
	}
	handleClick() {}
	render() {
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Dad Jokes</span>
					</h1>
					<img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" />
					<button className="JokeList-getmore" onClick={this.getJokes}>
						New Jokes
					</button>
				</div>
				<div className="JokeList-jokes">
					{this.state.jokes.map((j) => (
						<Joke
							votes={j.votes}
							text={j.text}
							key={j.id}
							upvote={() => this.handleVote(j.id, 1)}
							downvote={() => this.handleVote(j.id, -1)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
