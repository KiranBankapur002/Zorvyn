import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, UserRole } from '../types/index';
import { mockTransactions } from '../data/mockData';

interface FinanceContextType {
  transactions: Transaction[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  typeFilter: 'all' | 'income' | 'expense';
  setTypeFilter: (type: 'all' | 'income' | 'expense') => void;
  sortBy: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
  setSortBy: (sort: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc') => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  filteredTransactions: Transaction[];
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState<UserRole>('viewer');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark_mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<
    'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
  >('date-desc');

  // Persist transactions to localStorage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Persist dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Apply filters and sorting
  const filteredTransactions = transactions
    .filter((tx) => {
      // Search filter
      const query = searchQuery.toLowerCase();
      if (
        query &&
        !tx.description.toLowerCase().includes(query) &&
        !tx.category.toLowerCase().includes(query)
      ) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && tx.category !== categoryFilter) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'all' && tx.type !== typeFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const editTransaction = (id: string, transaction: Omit<Transaction, 'id'>) => {
    setTransactions(
      transactions.map((tx) => (tx.id === id ? { ...transaction, id } : tx))
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        isDarkMode,
        setIsDarkMode,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        typeFilter,
        setTypeFilter,
        sortBy,
        setSortBy,
        addTransaction,
        deleteTransaction,
        editTransaction,
        filteredTransactions,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};
