import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import GenerateQuiz from './components/GenerateQuiz';
import PlayQuiz from './components/PlayQuiz';
import EnterQuizId from './components/EnterQuizId';
import CreateQuiz from './components/CreateQuiz';
import QuizSummary from './components/QuizSummary';
import Header from './components/Header';
import './index.css';

/**
 * App Component
 * 
 * The root component of the application, managing global state such as 
 * the logged-in user and the current theme. Routes are defined for 
 * navigating between different pages of the application.
 */
const App = () => {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');

  // Apply the selected theme to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  /**
   * Handles the login process by setting the user's name and logging them in.
   * 
   * @param {string} userName - The name entered by the user during login.
   */
  const handleLogin = (userName) => {
    setName(userName);
    setIsLoggedIn(true);
  };

  /**
   * Toggles the current theme between light and dark.
   */
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`App ${theme} max-page-height`}>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <main className="flex flex-col items-center justify-center flex-grow min-h-screen pt-16">
          <Routes>
            <Route path="/" element={isLoggedIn ? <MainMenu name={name} /> : <Login onLogin={handleLogin} />} />
            <Route path="/generate-quiz" element={<GenerateQuiz />} />
            <Route path="/play-quiz/:quizId" element={<PlayQuiz />} />
            <Route path="/enter-quiz-id" element={<EnterQuizId />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
            <Route path="/quiz-summary" element={<QuizSummary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
