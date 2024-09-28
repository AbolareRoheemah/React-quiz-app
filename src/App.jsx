import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState('');

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getQuestions = async () => {
    setLoading(true);
    await fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(data => {
        const questionsData = data.results ? data.results : [
          {
              "type": "multiple",
              "difficulty": "hard",
              "category": "Entertainment: Film",
              "question": "In the 1976 film 'Taxi Driver', how many guns did Travis buy from the salesman?",
              "correct_answer": "4",
              "incorrect_answers": [
                  "2",
                  "6",
                  "1"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "easy",
              "category": "Entertainment: Video Games",
              "question": "Who is Sonic's sidekick?",
              "correct_answer": "Tails",
              "incorrect_answers": [
                  "Shadow",
                  "Amy",
                  "Knuckles"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "medium",
              "category": "History",
              "question": "What is the oldest US state?",
              "correct_answer": "Delaware",
              "incorrect_answers": [
                  "Rhode Island",
                  "Maine",
                  "Virginia"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "medium",
              "category": "Entertainment: Video Games",
              "question": "In the \"Call Of Duty: Zombies\" map \"Moon\", there is a secondary called the QED. What does QED stand for?",
              "correct_answer": "Quantum Entanglement Device",
              "incorrect_answers": [
                  "Quad Ectoplasmic Driver",
                  "Question Every Dog",
                  "Quality Edward Device"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "medium",
              "category": "Entertainment: Music",
              "question": "Who is the primary lyricist for Canadian progressive rock band Rush?",
              "correct_answer": "Neil Peart",
              "incorrect_answers": [
                  "Geddy Lee",
                  "Alex Lifeson",
                  "John Rutsey"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "easy",
              "category": "Entertainment: Books",
              "question": "What was the name of Captain Nemo's submarine in \"20,000 Leagues Under the Sea\"?",
              "correct_answer": "The Nautilus",
              "incorrect_answers": [
                  "The Neptune",
                  "The Poseidon",
                  "The Atlantis"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "hard",
              "category": "Entertainment: Board Games",
              "question": "In standard Monopoly, what's the rent if you land on Park Place with no houses?",
              "correct_answer": "$35",
              "incorrect_answers": [
                  "$30",
                  "$50",
                  "$45"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "medium",
              "category": "Entertainment: Music",
              "question": "What is the name of the main character from the music video of \"Shelter\" by Porter Robinson and A-1 Studios?",
              "correct_answer": "Rin",
              "incorrect_answers": [
                  "Rem",
                  "Ren",
                  "Ram"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "medium",
              "category": "Entertainment: Books",
              "question": "Which novel by John Grisham was conceived on a road trip to Florida while thinking about stolen books with his wife?",
              "correct_answer": "Camino Island",
              "incorrect_answers": [
                  "Rogue Lawyer",
                  "Gray Mountain",
                  "The Litigators"
              ]
          },
          {
              "type": "multiple",
              "difficulty": "medium",
              "category": "History",
              "question": "Who was the Prime Minister of the United Kingdom for most of World War II?",
              "correct_answer": "Winston Churchill",
              "incorrect_answers": [
                  "Neville Chamberlain",
                  "Harold Macmillan",
                  "Edward Heath"
              ]
          }
        ];

        // Shuffle the options for each question
        questionsData.forEach(question => {
          const options = question.incorrect_answers.concat(question.correct_answer);
          question.shuffled_answers = shuffleArray(options);
        });

        setQuestions(questionsData);
        console.log("data", questionsData);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log({ error });
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerFeedback('');
    } else {
      // Show score when quiz is finished
      setShowScore(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
       // Reset feedback for the previous question
      setAnswerFeedback('');
    }
  };

  const handleOptionChange = (option) => {
    if (!answerFeedback) {
      setSelectedOption(option);
      if (option === currentQuestion.correct_answer) {
        setAnswerFeedback('Correct!');
        // Increment score if the answer is correct
        setScore(score + 1);
      } else {
        setAnswerFeedback('Wrong! The correct answer is: ' + currentQuestion.correct_answer);
      }
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <style jsx>{`
          .loader {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f8f9fa;
          }
          .spinner {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p>Loading...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      {showScore ? (
        <div className="score-section my-5">
          <h2>Your Score</h2>
          <p>You got {score} out of {questions.length} questions correct.</p>
          <p>Your score: {(score / questions.length) * 100} / 100</p>
        </div>
      ) : (
        <div className="card text-center">
          <h5 className="card-header py-3">
            Question {currentQuestionIndex + 1}
          </h5>
          <div className="card-body py-5">
            <p className="card-text py-5 font-weight-bold">{currentQuestion.question}</p>
            <div className="d-flex flex-column align-items-center mb-5">
              {currentQuestion.shuffled_answers.map((option, index) => (
                <div key={index} className="form-check d-flex align-items-center">
                  <input
                    type="radio"
                    className="form-check-input me-2"
                    name="options"
                    id={`option-${index}`}
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    disabled={!!answerFeedback} // Disable input if feedback is shown
                  />
                  <label className="form-check-label" htmlFor={`option-${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {answerFeedback && <p className="feedback">{answerFeedback}</p>}
            <div className='d-flex justify-content-center gap-5'>
              <button className="btn btn-primary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
