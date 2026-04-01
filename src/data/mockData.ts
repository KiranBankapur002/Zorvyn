import { Transaction, MonthlyData } from '../types/index';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockTransactions: Transaction[] = [
  {
    id: generateId(),
    date: '2024-04-01',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary',
  },
  {
    id: generateId(),
    date: '2024-04-02',
    amount: 1200,
    category: 'Rent',
    type: 'expense',
    description: 'Monthly rent payment',
  },
  {
    id: generateId(),
    date: '2024-04-03',
    amount: 350,
    category: 'Groceries',
    type: 'expense',
    description: 'Weekly grocery shopping',
  },
  {
    id: generateId(),
    date: '2024-04-04',
    amount: 120,
    category: 'Utilities',
    type: 'expense',
    description: 'Electricity bill',
  },
  {
    id: generateId(),
    date: '2024-04-05',
    amount: 450,
    category: 'Entertainment',
    type: 'expense',
    description: 'Movie tickets and dining',
  },
  {
    id: generateId(),
    date: '2024-04-06',
    amount: 800,
    category: 'Freelance',
    type: 'income',
    description: 'Freelance project payment',
  },
  {
    id: generateId(),
    date: '2024-04-07',
    amount: 200,
    category: 'Groceries',
    type: 'expense',
    description: 'Grocery shopping',
  },
  {
    id: generateId(),
    date: '2024-04-08',
    amount: 150,
    category: 'Transportation',
    type: 'expense',
    description: 'Gas and parking',
  },
  {
    id: generateId(),
    date: '2024-04-09',
    amount: 500,
    category: 'Entertainment',
    type: 'expense',
    description: 'Weekend entertainment',
  },
  {
    id: generateId(),
    date: '2024-04-10',
    amount: 300,
    category: 'Shopping',
    type: 'expense',
    description: 'Clothing purchase',
  },
  {
    id: generateId(),
    date: '2024-04-11',
    amount: 1200,
    category: 'Healthcare',
    type: 'expense',
    description: 'Doctor visit and medication',
  },
  {
    id: generateId(),
    date: '2024-04-12',
    amount: 100,
    category: 'Dining',
    type: 'expense',
    description: 'Restaurant dinner',
  },
  {
    id: generateId(),
    date: '2024-04-13',
    amount: 600,
    category: 'Investment',
    type: 'expense',
    description: 'Stock investment',
  },
  {
    id: generateId(),
    date: '2024-04-14',
    amount: 250,
    category: 'Subscriptions',
    type: 'expense',
    description: 'Monthly subscriptions',
  },
  {
    id: generateId(),
    date: '2024-04-15',
    amount: 3000,
    category: 'Bonus',
    type: 'income',
    description: 'Performance bonus',
  },
];

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Jan', income: 5800, expenses: 2400, balance: 3400 },
  { month: 'Feb', income: 5600, expenses: 2800, balance: 2800 },
  { month: 'Mar', income: 6200, expenses: 2600, balance: 3600 },
  { month: 'Apr', income: 9800, expenses: 5570, balance: 4230 },
];

export const expenseCategories = [
  'Rent',
  'Groceries',
  'Utilities',
  'Transportation',
  'Entertainment',
  'Dining',
  'Shopping',
  'Healthcare',
  'Subscriptions',
  'Investment',
];

export const incomeCategories = [
  'Salary',
  'Freelance',
  'Bonus',
  'Investment Returns',
  'Other',
];
