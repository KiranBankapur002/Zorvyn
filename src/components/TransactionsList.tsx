import React, { useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import type { TransactionType } from '../types';
import {
  expenseCategories,
  incomeCategories,
} from '../data/mockData';

type TransactionFormData = {
  date: string;
  amount: string;
  category: string;
  type: TransactionType;
  description: string;
};

const TransactionsList: React.FC = () => {
  const {
    filteredTransactions,
    role,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    deleteTransaction,
    addTransaction,
    editTransaction,
  } = useFinance();

  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense',
    description: '',
  });

  const allCategories = [
    ...expenseCategories,
    ...incomeCategories,
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (editingId) {
      editTransaction(editingId, transactionData);
      setEditingId(null);
    } else {
      addTransaction(transactionData);
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: '',
      type: 'expense',
      description: '',
    });
    setIsAddingTransaction(false);
  };

  const handleEdit = (id: string) => {
    const transaction = filteredTransactions.find((tx) => tx.id === id);
    if (transaction) {
      setFormData({
        date: transaction.date,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
        description: transaction.description,
      });
      setEditingId(id);
      setIsAddingTransaction(true);
    }
  };

  const handleCategoryChange = (newType: 'income' | 'expense') => {
    setFormData({
      ...formData,
      type: newType,
      category: '',
    });
  };

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            Transactions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Manage and track all your transactions</p>
        </div>
        {role === 'admin' && (
          <button
            onClick={() => {
              setIsAddingTransaction(!isAddingTransaction);
              setEditingId(null);
              setFormData({
                date: new Date().toISOString().split('T')[0],
                amount: '',
                category: '',
                type: 'expense',
                description: '',
              });
            }}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg font-semibold dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <Plus size={20} /> Add Transaction
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {role === 'admin' && isAddingTransaction && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {editingId ? 'Edit Transaction' : 'Add New Transaction'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    handleCategoryChange(e.target.value as 'income' | 'expense')
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
                  required
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter description"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-bold"
              >
                {editingId ? 'Update' : 'Add'} Transaction
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingTransaction(false);
                  setEditingId(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-6 py-3 rounded-lg transition-all font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-sm">Filter & Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-xs font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
              Search
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as 'all' | 'income' | 'expense')
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
            >
              <option value="all">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs font-bold mb-2 dark:text-gray-200 uppercase tracking-wide">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | 'date-desc'
                    | 'date-asc'
                    | 'amount-desc'
                    | 'amount-asc'
                )
              }
              className="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:border-primary-600 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 transition-all"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              No transactions found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-700 border-b-2 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold dark:text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold dark:text-white uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold dark:text-white uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold dark:text-white uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold dark:text-white uppercase tracking-wider">
                    Amount
                  </th>
                  {role === 'admin' && (
                    <th className="px-6 py-4 text-center text-xs font-bold dark:text-white uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent dark:hover:from-primary-900/20 dark:hover:to-transparent transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs font-bold shadow-sm">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                          transaction.type === 'income'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}
                      >
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right text-sm font-bold ${
                        transaction.type === 'income'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toFixed(2)}
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(transaction.id)}
                            className="p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            title="Edit transaction"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you want to delete this transaction?'
                                )
                              ) {
                                deleteTransaction(transaction.id);
                              }
                            }}
                            className="p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                            title="Delete transaction"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
        Showing {filteredTransactions.length} transaction
        {filteredTransactions.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default TransactionsList;
