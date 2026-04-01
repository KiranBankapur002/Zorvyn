import React from 'react';
import { TrendingUp, AlertCircle, Award } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const InsightsSection: React.FC = () => {
  const { transactions } = useFinance();

  // Calculate insights
  const calculateHighestCategory = () => {
    const categorySpending: Record<string, number> = {};
    transactions
      .filter((tx) => tx.type === 'expense')
      .forEach((tx) => {
        categorySpending[tx.category] =
          (categorySpending[tx.category] || 0) + tx.amount;
      });

    const highest = Object.entries(categorySpending).sort(
      ([, a], [, b]) => b - a
    )[0];

    return highest || ['No data', 0];
  };

  const calculateMonthlyComparison = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthExpenses = transactions
      .filter((tx) => {
        const txDate = new Date(tx.date);
        return (
          tx.type === 'expense' &&
          txDate.getMonth() === currentMonth &&
          txDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    const lastMonthExpenses = transactions
      .filter((tx) => {
        const txDate = new Date(tx.date);
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        return (
          tx.type === 'expense' &&
          txDate.getMonth() === lastMonth &&
          txDate.getFullYear() === lastYear
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    return { thisMonthExpenses, lastMonthExpenses };
  };

  const calculateAverageTransaction = () => {
    if (transactions.length === 0) return 0;
    const sum = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    return sum / transactions.length;
  };

  const [highestCategory, highestAmount] = calculateHighestCategory();
  const { thisMonthExpenses, lastMonthExpenses } = calculateMonthlyComparison();
  const averageTransaction = calculateAverageTransaction();

  const monthlyChange =
    lastMonthExpenses !== 0
      ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : thisMonthExpenses > 0
        ? 100
        : 0;

  const budgetUtilization = (thisMonthExpenses / 5000) * 100; // Assuming 5000 budget

  const InsightCard: React.FC<{
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    color: string;
    trend?: { label: string; value: number; isPositive: boolean };
  }> = ({ title, value, description, icon, color, trend }) => (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-3">
            {value}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-3 font-medium">
            {description}
          </p>
          {trend && (
            <div
              className={`text-xs font-bold mt-3 flex items-center gap-1 ${
                trend.isPositive ? 'text-danger-600' : 'text-success-600'
              }`}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              {Math.abs(trend.value).toFixed(1)}% {trend.label}
            </div>
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
      <div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
          Financial Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Smart analysis of your financial patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <InsightCard
          title="Highest Spending"
          value={highestCategory}
          description={`You spent $${highestAmount?.toFixed(2) || '0.00'}`}
          icon={<TrendingUp size={24} />}
          color="bg-primary-600"
        />

        <InsightCard
          title="Budget Status"
          value={`${budgetUtilization.toFixed(0)}%`}
          description="Monthly budget utilization"
          icon={<Award size={24} />}
          color={budgetUtilization > 80 ? 'bg-danger-600' : 'bg-success-600'}
          trend={{
            label: 'of budget used',
            value: budgetUtilization,
            isPositive: budgetUtilization > 80,
          }}
        />

        <InsightCard
          title="Avg Transaction"
          value={`$${averageTransaction.toFixed(2)}`}
          description="Average transaction amount"
          icon={<TrendingUp size={24} />}
          color="bg-purple-600"
        />

        <InsightCard
          title="Monthly Comparison"
          value={`${monthlyChange > 0 ? '+' : ''}${monthlyChange.toFixed(1)}%`}
          description="vs. last month"
          icon={<AlertCircle size={24} />}
          color={monthlyChange > 0 ? 'bg-danger-600' : 'bg-success-600'}
          trend={{
            label: 'from last month',
            value: monthlyChange,
            isPositive: monthlyChange > 0,
          }}
        />
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-md">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Smart Recommendations
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
          {budgetUtilization > 80 && (
            <li className="flex items-start gap-3">
              <span className="text-lg font-bold mt-0.5 text-gray-500">•</span>
              <span>You've used <strong>{budgetUtilization.toFixed(0)}%</strong> of your monthly budget. Consider reviewing your spending to avoid overspending.</span>
            </li>
          )}
          {monthlyChange > 0 && (
            <li className="flex items-start gap-3">
              <span className="text-lg font-bold mt-0.5 text-gray-500">•</span>
              <span>Your expenses increased by <strong>{monthlyChange.toFixed(1)}%</strong> this month compared to last month. Look for areas to optimize.</span>
            </li>
          )}
          <li className="flex items-start gap-3">
            <span className="text-lg font-bold mt-0.5 text-gray-500">•</span>
            <span>Your largest expense is from <strong>{highestCategory}</strong>. Review this category to identify savings opportunities.</span>
          </li>
          {averageTransaction > 500 && (
            <li className="flex items-start gap-3">
              <span className="text-lg font-bold mt-0.5 text-gray-500">•</span>
              <span>Your average transaction is <strong>${averageTransaction.toFixed(2)}</strong>. Consider setting up more specific budget categories.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InsightsSection;
