import React, { useState } from 'react';
import { Menu, X, BarChart3 } from 'lucide-react';
import { FinanceProvider } from './context/FinanceContext';
import DashboardOverview from './components/DashboardOverview';
import TransactionsList from './components/TransactionsList';
import InsightsSection from './components/InsightsSection';
import RoleSelector from './components/RoleSelector';
import DarkModeToggle from './components/DarkModeToggle';

type View = 'overview' | 'transactions' | 'insights';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: Array<{ id: View; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'insights', label: 'Insights' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header with Preline UI styling */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 group">
              <div className="bg-gray-800 p-3 rounded-lg shadow-md dark:bg-gray-700">
                <BarChart3 size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Finance Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Track and manage your finances smartly
                </p>
              </div>
            </div>
            <DarkModeToggle />
          </div>

          <div className="flex items-center justify-between">
            {/* Desktop Navigation with Preline */}
            <nav className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-gray-800 text-white shadow-md dark:bg-gray-900 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Role Selector */}
            <RoleSelector />
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-2 pt-4 border-t dark:border-gray-700 animate-fadeIn">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-left ${
                    currentView === item.id
                      ? 'bg-gray-800 text-white shadow-md dark:bg-gray-900'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="fade-in">
          {currentView === 'overview' && <DashboardOverview />}
          {currentView === 'transactions' && <TransactionsList />}
          {currentView === 'insights' && <InsightsSection />}
        </div>
      </main>

      {/* Footer with Preline styling */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="group">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white transition-colors">
                About
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                A modern and intuitive finance dashboard for tracking your financial activity with beautiful visualizations.
              </p>
            </div>
            <div className="group">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white transition-colors">
                Features
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Dashboard with Charts</li>
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Transaction Management</li>
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Financial Insights</li>
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Dark Mode Support</li>
              </ul>
            </div>
            <div className="group">
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white transition-colors">
                Tech Stack
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• React 18 + TypeScript</li>
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Tailwind CSS</li>
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Recharts & Preline UI</li>
                <li className="hover:text-gray-900 dark:hover:text-white transition-colors">• Vite Build Tool</li>
              </ul>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                &copy; 2024 Finance Dashboard. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                  Privacy
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                  Terms
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}

export default App;
