import React from 'react';
import { useFinance } from '../context/FinanceContext';

const RoleSelector: React.FC = () => {
  const { role, setRole } = useFinance();

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
        Role:
      </label>
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
        {(['viewer', 'admin'] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 transform ${
              role === r
                ? 'bg-gray-800 text-white shadow-lg hover:shadow-xl dark:bg-gray-900'
                : 'bg-transparent text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {r === 'viewer' ? 'Viewer' : 'Admin'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
