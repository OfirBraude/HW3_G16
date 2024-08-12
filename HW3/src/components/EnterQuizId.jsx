import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * EnterQuizId Component
 * 
 * A form that allows the user to input a quiz ID to start playing a quiz.
 */
const EnterQuizId = () => {
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  /**
   * Handles form submission by navigating to the quiz play page
   * with the entered quiz ID.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/play-quiz/${quizId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-800">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-900 p-20 rounded shadow-md w-full max-w-md border border-gray-600 dark:border-gray-600"
      >
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-gray-200">Enter Quiz ID</h2>
        <input
          type="text"
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="Enter the quiz ID"
          className="border border-gray-300 dark:border-gray-600 p-2 w-full mb-4 rounded text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
          required
        />
        <button type="submit" className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 px-4 py-2 rounded">
          Play Quiz
        </button>
      </form>
    </div>
  );
};

export default EnterQuizId;
