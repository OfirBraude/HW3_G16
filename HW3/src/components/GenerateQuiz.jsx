import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/**
 * GenerateQuiz Component
 * 
 * Allows the user to generate a quiz by selecting the difficulty, category,
 * and number of questions. The generated quiz is stored in local storage,
 * and a link is provided for sharing the quiz.
 */
const GenerateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [categories, setCategories] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [shareLink, setShareLink] = useState('');

  // Fetch available quiz categories from the trivia API
  useEffect(() => {
    axios.get('https://the-trivia-api.com/api/categories')
      .then(response => {
        setCategories(Object.keys(response.data));
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  /**
   * Handles form submission to generate a quiz based on user selections.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${numberOfQuestions}&difficulty=${difficulty}`)
      .then(response => {
        const quizId = uuidv4(); // Generates a unique ID
        localStorage.setItem(quizId, JSON.stringify(response.data)); // Stores the quiz in localStorage with the generated ID
        setQuizQuestions(response.data);
        setShareLink(quizId); // Sets the shareable link to just the quiz ID
      })
      .catch(error => {
        console.error('There was an error generating the quiz!', error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-1000 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-2 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-600 rounded-lg shadow-xl">
        {!quizQuestions ? (
          <form onSubmit={handleSubmit} className="p-20 sm:p-16 bg-white dark:bg-gray-800">
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-10 text-gray-800 dark:text-gray-100">Generate a Quiz</h2>
            <div className="mb-5">
              <label className="block mb-2 text-gray-700 dark:text-gray-300">Select Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-gray-700 dark:text-gray-300">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
              >
                <option value="">Any Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-gray-700 dark:text-gray-300">Number of Questions</label>
              <input
                type="number"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                min="1"
                max="50"
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 px-4 py-2 rounded">
              Generate Quiz
            </button>
          </form>
        ) : (
          <div className="p-8 sm:p-16 bg-white dark:bg-gray-800">
            <h2 className="text-2xl sm:text-3xl mb-6 sm:mb-10 text-gray-800 dark:text-gray-100">Generated Quiz</h2>
            {quizQuestions.map((question, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg sm:text-xl mb-4 text-gray-800 dark:text-gray-100">{question.question}</h3>
                <ul>
                  {[...question.incorrectAnswers, question.correctAnswer].map((answer, idx) => (
                    <li key={idx} className="border border-gray-300 dark:border-gray-600 p-4 mb-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-8">
              <h3 className="text-lg sm:text-xl text-gray-800 dark:text-gray-100">Share this link:</h3>
              <input
                type="text"
                value={shareLink}
                readOnly
                className="border border-gray-300 dark:border-gray-600 p-2 w-full mt-2 rounded text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 px-4 py-2 rounded mt-4"
              >
                Copy Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQuiz;
