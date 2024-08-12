import React from 'react';

/**
 * QuizDisplay Component
 * 
 * Renders a list of quiz questions and their possible answers.
 * 
 * @param {Array} questions - An array of question objects, each containing 
 *                            a question string, a correct answer, and incorrect answers.
 */
const QuizDisplay = ({ questions }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl mb-4">Your Quiz</h2>
      <div className="bg-white p-6 rounded shadow-md">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg mb-2">{question.question}</h3>
            <ul>
              {question.incorrectAnswers.concat(question.correctAnswer).map((answer, idx) => (
                <li key={idx} className="border p-2 mb-2">{answer}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDisplay;
