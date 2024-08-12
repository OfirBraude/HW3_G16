import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header Component
 * 
 * Displays a fixed header at the top of the page, including a button to 
 * toggle between light and dark themes and a link to navigate to the 
 * main menu.
 * 
 * @param {function} toggleTheme - Function to toggle between light and dark themes.
 * @param {string} theme - The current theme (either 'light' or 'dark').
 */
const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header-container">
      <div className="menu-button-link">
        <Link to="/" className="menu-button-link">
          <button className="menu-button">Main Menu</button>
        </Link>
      </div>
      <div className="theme-toggle-button-link">
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
