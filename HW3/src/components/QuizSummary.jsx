import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * QuizSummary Component
 * 
 * Displays a summary of the quiz, including the user's score and 
 * a breakdown of their answers versus the correct answers.
 */
const QuizSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions, userAnswers, score } = location.state;

  // Debug log to check the received score and data
  console.log("Received Score:", score);
  console.log("Quiz Questions:", quizQuestions);
  console.log("User Answers:", userAnswers);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
      <h2 className="text-2xl mb-4 text-gray-900 dark:text-white">Quiz Summary</h2>
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-md w-112 flex flex-col border border-gray-300 dark:border-gray-600">
        <p className="text-lg mb-4 text-gray-800 dark:text-gray-300">
          Your Score: {score} / {quizQuestions.length}
        </p>
        <ul className="text-gray-900 dark:text-gray-300">
          {quizQuestions.map((question, index) => (
            <li key={index} className="mb-4">
              <p className="font-semibold">{question.question}</p>
              <p>
                Your answer: {userAnswers[index]} - 
                {userAnswers[index] === question.correctAnswer ? (
                  <span className="text-green-500"> Correct</span>
                ) : (
                  <span className="text-red-500"> Incorrect</span>
                )}
              </p>
              <p>Correct answer: {question.correctAnswer}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 self-center"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;
