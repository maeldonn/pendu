import React, { Component } from 'react';

import './App.css';
import Score from './Score';
import Letter from './Letter';
import Keyboard from './Keyboard';
import GameOver from './GameOver';

const KEYBOARD = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const WORDS = ['POULET', 'DENTISTE', 'BATEAU', 'DINOSAURE', 'ARBRE', 'APERO', 'MEDAILLE', 'REPAS', 'PIRATE', 'MUSICIEN', 'DANGEREUX'];

class App extends Component {

  state = {
    score:  0,
    letter: this.generateLetters(),
    matchedKeys: [],
    error: 0,
  };

  // Generate a word
  generateLetters() {
    let toGuess = WORDS[Math.floor(Math.random() * Math.floor(WORDS.length))];
    return toGuess.split('');
  }

  // Arrow function for binding
  // Keyboard click management
  handleKeyClick = (key) => {
    const {matchedKeys, score, error, letter} = this.state;
    if (matchedKeys.includes(key)) this.setState({score: score + 1, error: error + 1});
    else this.setState({matchedKeys: matchedKeys.concat(key), score: score + 1});
    if (!letter.includes(key)) this.setState({error: error + 1});
  }

  // Keyboard display management
  getFeedbackForKey(key) {
    const {matchedKeys} = this.state;
    if ((this.gameOver() === 'loose') || (this.gameOver() === 'won')) return 'clicked';
    return matchedKeys.includes(key) ? 'clicked' : 'visible';
  }

  // Keyboard display management
  getFeedbackForLetter(letter) {
    const {matchedKeys} = this.state;
    return matchedKeys.includes(letter.toUpperCase()) ? 'visible' : 'hidden';
  }

  // Check the state of the game
  gameOver() {
    const {matchedKeys, letter, error} = this.state;
    let goodLetters = 0;
    letter.forEach((element) => {
      if (matchedKeys.includes(element)) goodLetters++;
    });
    if (goodLetters === letter.length) return 'won';
    if (error >= 10) return 'loose';
    else return 'playing';
  }

  // Restart a new game
  restartGame = () => {
    this.setState({
      score: 0,
      letter: this.generateLetters(),
      matchedKeys: [],
      error: 0,
    });
  }

  // Canvas display management
  refreshCanvas() {
    const {error} = this.state
    let canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    if (error === 0) ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (error >= 1) ctx.fillRect(100, 440, 250, 35);
    if (error >= 2) ctx.fillRect(225, 60, 25, 380);
    if (error >= 3) ctx.fillRect(250, 60, 150, 25)
    if (error >= 4) {
      ctx.beginPath();
      ctx.moveTo(295, 72);
      ctx.lineTo(305, 77);
      ctx.lineTo(246, 138);
      ctx.lineTo(235, 132);
      ctx.fill();
      ctx.closePath();
    }
    if (error >= 5) ctx.fillRect(382.5, 60, 5, 100);
    if (error >= 6) {
      ctx.arc(385, 175, 20, 0, 2 * Math.PI);
      ctx.fill();
    }
    if (error >= 7) ctx.fillRect(380, 170, 10, 80);
    if (error >= 8) ctx.fillRect(360, 210, 50, 10);
    if (error >= 9) {
      ctx.beginPath();
      ctx.moveTo(383, 240);
      ctx.lineTo(390, 247);
      ctx.lineTo(351, 288);
      ctx.lineTo(343, 280);
      ctx.fill();
      ctx.closePath();
    }
    if (error === 10) {
      ctx.beginPath();
      ctx.moveTo(386, 240);
      ctx.lineTo(426, 280);
      ctx.lineTo(418, 288);
      ctx.lineTo(379, 247);
      ctx.fill();
      ctx.closePath();
    }
  }

  // Display components 
  render() {
    const {score, letter, error} = this.state;
    const won = this.gameOver();
    return (
      <div className="pendu">
        <div className="black-container"></div>
        <div className="game">
          <div className="word">
            {letter.map((letter,index) =>
            (<Letter letter = {letter} feedback={this.getFeedbackForLetter(letter)} key={index} />))}
          </div>
          <canvas id="canvas" width = "600" height = "500">Le pendu</canvas>
          <div className={`keyboard ${won}`}>
            <div className="row">
              {KEYBOARD.map((key,index) => 
              (won === 'playing' && index < 13 && <Keyboard letter={key} feedback={this.getFeedbackForKey(key)} key={key} onClick={this.handleKeyClick} />))}
            </div>
            <div className="row">
              {KEYBOARD.map((key,index) => 
              (won === 'playing' && index > 12 && <Keyboard letter={key} feedback={this.getFeedbackForKey(key)} key={key} onClick={this.handleKeyClick} />))}
            </div>
          </div>
          {won !== 'playing' && <GameOver score={score} error={error} result={won} onClick={this.restartGame} />}
        </div>
        <div className="black-container">
          <Score score={score} error={error} />
        </div>
          
      </div>
    )
  }

  // Executed after render
  componentDidUpdate() {this.refreshCanvas();}
  
}

export default App;