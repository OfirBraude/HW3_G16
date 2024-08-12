import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/**
 * CreateQuiz Component
 * 
 * Allows the user to create a custom quiz by selecting specific questions
 * from a set of available questions based on the selected category and difficulty.
 * The created quiz can then be shared via a link.
 */
const CreateQuiz = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [category, setCategory] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [categories, setCategories] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [shareLink, setShareLink] = useState('');
  const [step, setStep] = useState(1);

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
   * Fetches quiz questions based on the selected category and difficulty.
   * 
   * @param {Event} e - The form submission event.
   */
  const fetchQuestions = (e) => {
    e.preventDefault();
    axios.get(`https://the-trivia-api.com/api/questions?categories=${category}&difficulty=${difficulty}`)
      .then(response => {
        setAvailableQuestions(response.data);
        setStep(2); // Move to the next step
      })
      .catch(error => {
        console.error('There was an error fetching the questions!', error);
      });
  };

  /**
   * Toggles the selection of a question.
   * 
   * @param {object} question - The question object to toggle.
   */
  const toggleQuestionSelection = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else if (selectedQuestions.length < numberOfQuestions) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  /**
   * Saves the selected questions as a quiz and generates a shareable link.
   */
  const saveQuiz = () => {
    if (selectedQuestions.length === numberOfQuestions) {
      const quizId = uuidv4();
      localStorage.setItem(quizId, JSON.stringify(selectedQuestions));
      setShareLink(`${window.location.origin}/play-quiz/${quizId}`);
      setStep(3); // Move to the final step
    } else {
      alert(`Please select exactly ${numberOfQuestions} questions.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-1000">
      <div className="bg-white dark:bg-gray-900 p-14 rounded shadow-md w-full max-w-2xl border border-gray-300 dark:border-gray-600">
        <h2 className="text-2xl mb-4 text-gray-800 dark:text-gray-200">Create a Quiz</h2>
        {step === 1 && (
          <form onSubmit={fetchQuestions}>
            <div className="mb-4 p-4 rounded border border-gray-300 dark:border-gray-600">
              <label className="block mb-2 text-gray-0 dark:text-gray-200">Select Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="mb-4 p-4 rounded border border-gray-300 dark:border-gray-600">
              <label className="block mb-2 text-gray-0 dark:text-gray-200">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
              >
                <option value="">Any Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 p-4 rounded border border-gray-300 dark:border-gray-600">
              <label className="block mb-2 text-gray-0 dark:text-gray-200">Number of Questions</label>
              <input
                type="number"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                min="1"
                max="50"
                className="border border-gray-300 dark:border-gray-600 p-2 w-full rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
              />
            </div>
            <button type="submit" className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 px-4 py-2 rounded mb-4">
              Fetch Questions
            </button>
          </form>
        )}
        {step === 2 && (
          <div>
            <h3 className="text-lg mb-2 text-gray-800 dark:text-gray-200">Select Questions (Select up to {numberOfQuestions})</h3>
            <ul className="mb-4">
              {availableQuestions.map((question, index) => (
                <li
                  key={index}
                  className={`border p-2 mb-2 rounded cursor-pointer ${selectedQuestions.includes(question) ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => toggleQuestionSelection(question)}
                >
                  <span>{question.question}</span>
                </li>
              ))}
            </ul>
            <button onClick={saveQuiz} className="bg-green-500 dark:bg-green-700 text-white dark:text-gray-200 px-4 py-2 rounded">
              Save Quiz
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3 className="text-lg text-gray-800 dark:text-gray-200">Quiz Created!</h3>
            <p className="text-gray-800 dark:text-gray-200">Your quiz has been successfully created. You can share the link below with others to play the quiz.</p>
            <div className="mt-4">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="border border-gray-300 dark:border-gray-600 p-2 w-full mt-2 rounded text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareLink)}
                className="bg-blue-500 dark:bg-blue-700 text-white dark:text-gray-200 px-4 py-2 rounded mt-2"
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

export default CreateQuiz;
