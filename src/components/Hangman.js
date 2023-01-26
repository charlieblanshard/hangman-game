import React, { Component } from "react";
import "./Hangman.css";
import { RandomWord } from "./Words.js";

//Imported images
import state1 from "./images/state1.GIF";
import state2 from "./images/state2.GIF";
import state3 from "./images/state3.GIF";
import state4 from "./images/state4.GIF";
import state5 from "./images/state5.GIF";
import state6 from "./images/state6.GIF";
import state7 from "./images/state7.GIF";
import state8 from "./images/state8.GIF";
import state9 from "./images/state9.GIF";
import state10 from "./images/state10.GIF";
import state11 from "./images/state11.GIF";

//Image Array
class Hangman extends Component {
  static defaultProps = {
    maxWrong: 11,
    images: [
      state1,
      state2,
      state3,
      state4,
      state5,
      state6,
      state7,
      state8,
      state9,
      state10,
      state11,
    ],
  };
  constructor(props) {
    super(props);
    this.state = { mistake: 0, guessed: new Set([]), answer: RandomWord() };
  }

  //Guessed Word Function
  guessed() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  //Generate Alphabet buttons, can only press each button once
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        class="btn btn-lg btn-info m-2"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  //Add correct guessed letter to page
  handleGuess = (e) => {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  //Clears program with a reset button
  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: RandomWord(),
    });
  };

  instructions = () => {
    alert(
      "This program has generated a random word from the English Dictionary. \nTo play this game you must try guess the word using the letters below. \nYou have 11 attempts until your hangman has been hung.\nGOOD LUCK!"
    );
  };

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessed().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    //Outcome presented on the page
    if (isWinner) {
      gameStat = "You Won!!";
    }
    if (gameOver) {
      gameStat = "You Lost!!";
    }

    //Page Display
    //This is formatted using bootstrap imported on the public HTML page and some basic CSS
    return (
      <div className="outerContainer">
        <button className="btn float-left btn-dark" onClick={this.instructions}>
          Help
        </button>
        <div className="container">
          <h1 className="text-center">HANGMAN</h1>
          <div className="float-right">
            Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}
          </div>
          <div className="text-center">
            <img src={this.props.images[this.state.mistake]} alt="" />
          </div>
          <div className="text-center">
            <p className="guessPara">Guess the Word:</p>
            <p className="guessPara">
              {!gameOver ? this.guessed() : this.state.answer}{" "}
            </p>
            <p>{gameStat}</p>
            <button className="btn btn-warning" onClick={this.resetButton}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
