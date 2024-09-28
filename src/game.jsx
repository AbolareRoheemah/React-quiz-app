// src/App.js
import React, { useState } from 'react';

const questions = [
  {
    questionText: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
    correctAnswer: 'Paris',
  },
  {
    questionText: 'Who is CEO of Tesla?',
    options: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Tony Stark'],
    correctAnswer: 'Elon Musk',
  },
  {
    questionText: 'The iPhone was created by which company?',
    options: ['Apple', 'Intel', 'Amazon', 'Microsoft'],
    correctAnswer: 'Apple',
  },
  {
    questionText: 'How many Harry Potter books are there?',
    options: ['1', '4', '7', '8'],
    correctAnswer: '7',
  },
];

function Game() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1] || null);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  return (
    <div className='app'>
      {showScore ? (
        <div className='score-section'>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div className='question-section'>
          <div className='question-text'>
            {questions[currentQuestion].questionText}
          </div>
          <div className='options'>
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className={selectedOption === option ? 'selected' : ''}
                onClick={() => handleAnswerOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className='navigation-buttons'>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestion === questions.length - 1
                ? 'Finish Quiz'
                : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
