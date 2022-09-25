import { Component } from 'react';
import './App.css';
import Card from './Components/Card'
import randomWords from 'random-words';
import Result from './Components/Result';

class Word {
	constructor(word, status) {
		this.word = word;
		this.status = status;
	}
}

export default class App extends Component {
	gameStatus = false;
	NUM_OF_WORDS = 30;
	constructor() {
		super();
		this.state = {
			words: this.getWords(),
			currentIndex: 0,
			score: 0,
			errors: 0,
			timer: '2:00'
		}
	}

	getWords() {
		const words = randomWords(this.NUM_OF_WORDS).map((word) => {
			return new Word(word, 2);
		});

		if (words.length) {
			words[0].status = -1;
		}
		return words;
	}

	timer = () => {
		if (this.gameStatus) {
			return;
		}
		else {
			this.gameStatus = !this.gameStatus;
		}

		let secs = 60;
		let mins = 0;

		const timerInterval = setInterval(() => {
			if (secs === 0) {
				if (mins === 0) {
					clearInterval(timerInterval);
					this.setState({
						words: this.getWords(),
						currentIndex: 0,
						score: 0,
						errors: 0,
						timer: '2:00'
					})
					this.gameStatus = false;
					document.querySelector('#words-input').value = ''
					return;
				}
				else {
					mins--;
					secs = 60;
				}
			}

			secs--;
			this.setState({
				timer: mins + ":" + secs
			});
		}, 1000)

	}

	handleUserInput = (event) => {
		const userInput = event.target.value.trim();
		console.log(userInput.length);
		if (userInput.length >= this.state.words[this.state.currentIndex].word.length) {
			let score = this.state.score;
			let errors = this.state.errors;

			const wordsCopy = this.state.words;
			if (wordsCopy[this.state.currentIndex].word === userInput) {
				wordsCopy[this.state.currentIndex].status = 1;
				score++;
			}
			else {
				wordsCopy[this.state.currentIndex].status = 0;
				errors++;
			}

			this.setState({
				words: wordsCopy,
				score: score,
				errors: errors
			})

			this.nextWord();
			event.target.value = '';
		}
	}

	nextWord = () => {
		let words = this.state.words;
		let currentIndex = 0;
		if (this.state.currentIndex === this.NUM_OF_WORDS - 1) {
			words = this.getWords();
		}
		else {
			currentIndex = this.state.currentIndex + 1;
		}

		words[currentIndex].status = -1;

		this.setState({
			words: words,
			currentIndex: currentIndex
		})

	}


	render() {
		return (
			<div className="App">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="mt-4">
								<Card words={this.state.words} timer={this.state.timer} startTimer={this.timer} handleUserInput={this.handleUserInput} />
								<Result score={this.state.score} errors={this.state.errors} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}