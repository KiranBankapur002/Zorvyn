import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { mockMonthlyData } from '../data/mockData';

const DashboardOverview: React.FC = () => {
  const { transactions } = useFinance();

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  // Calculate spending by category
  const categorySpending: Record<string, number> = {};
  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      categorySpending[tx.category] =
        (categorySpending[tx.category] || 0) + tx.amount;
    });

  const categoryData = Object.entries(categorySpending)
    .map(([category, amount]) => ({
      name: category,
      value: amount,
    }))
    .sort((a, b) => b.value - a.value);

  const COLORS = [
    '#0ea5e9',
    '#22c55e',
    '#ef4444',
    '#f97316',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#6366f1',
  ];

  const StatCard: React.FC<{
    title: string;
    amount: number;
    icon: React.ReactNode;
    trend?: number;
    color: string;
  }> = ({ title, amount, icon, trend, color }) => (
    <div className="stat-card group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
            {title}
          </p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white mt-3">
            ${amount.toFixed(2)}
          </p>
          {trend !== undefined && (
            <p
              className={`text-sm font-bold mt-3 flex items-center gap-1 ${
                trend >= 0 ? 'text-success-600' : 'text-danger-600'
              }`}
            >
              <span>{trend >= 0 ? '↑' : '↓'}</span>
              {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`${color} p-4 rounded-xl text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 transform`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Balance"
          amount={totalBalance}
          icon={<DollarSign size={24} />}
          color="bg-primary-600"
          trend={12}
        />
        <StatCard
          title="Total Income"
          amount={totalIncome}
          icon={<TrendingUp size={24} />}
          color="bg-success-600"
          trend={8}
        />
        <StatCard
          title="Total Expenses"
          amount={totalExpenses}
          icon={<TrendingDown size={24} />}
          color="bg-danger-600"
          trend={-5}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="card group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="card group">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Spending by Category</h2>
          </div>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No expense data</p>
          )}
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="card group">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Comparison</h2>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;
