import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useFinance();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-600"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={22} className="text-gray-100" />
      ) : (
        <Moon size={22} className="text-gray-700" />
      )}
    </button>
  );
};

export default DarkModeToggle;
