import React from 'react';
import { Link } from 'react-router-dom';

/**
 * MainMenu Component
 * 
 * Displays the main menu with options to play, generate, or create a quiz.
 * 
 * @param {string} name - The name of the logged-in user, to be displayed as a greeting.
 */
const MainMenu = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000">
      <h1 className="text-5xl mb-10">Welcome, {name}!</h1>
      <div className="space-y-4">
        <Link to="/enter-quiz-id">
          <button className="bg-blue-500 text-white px-10 py-6 rounded-3xl text-2xl">Play a Quiz</button>
        </Link>
        <Link to="/generate-quiz">
          <button className="bg-green-500 text-white px-10 py-6 rounded-3xl text-2xl">Generate a Quiz</button>
        </Link>
        <Link to="/create-quiz">
          <button className="bg-red-500 text-white px-10 py-6 rounded-3xl text-2xl">Create a Quiz</button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
