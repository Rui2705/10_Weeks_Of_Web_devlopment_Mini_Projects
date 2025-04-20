import React, { useEffect, useState } from 'react';
import words from '../assets/words';
import './WordScramble.css';

const WordScramble = () => {
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [hint, setHint] = useState('');
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateWord();
  }, []);

  const shuffle = (word) => {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
  };

  const generateWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord.word.toLowerCase());
    setScrambled(shuffle(randomWord.word));
    setHint(randomWord.hint);
    setInput('');
    setMessage('');
  };

  const checkWord = () => {
    if (input.toLowerCase() === word) {
      setMessage('Correct! 🎉');
      setTimeout(generateWord, 1500);
    } else {
      setMessage('Oops! Try again.');
    }
  };

  return (
    <div className="container">
      <h2>Word Scramble</h2>
      <div className="content">
        <p className="word">{scrambled}</p>
        <div className="details">
          <p><b>Hint:</b> {hint}</p>
          <p><b>Word Length:</b> {word.length}</p>
        </div>
        <input
          type="text"
          placeholder="Enter a valid word"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="buttons">
          <button onClick={generateWord}>Refresh</button>
          <button onClick={checkWord}>Check</button>
        </div>
        <div>
          {message && (
            <p className={`details message ${message === 'Correct! 🎉' ? 'correct' : 'error'}`}>
              {message}
            </p>
          )}
        </div>
        <br></br>
      </div>
    </div>
  );
};

export default WordScramble;
