# Finance Dashboard

A production-ready frontend finance dashboard built with React, TypeScript, Vite, and Tailwind CSS.

## Project Summary

This project demonstrates a clean, recruiter-friendly implementation of a personal finance dashboard with:
- KPI overview cards
- Chart-based financial analysis
- Transaction management with CRUD (Admin role)
- Search, filter, and sort workflows
- Insight generation from transaction data
- Dark mode support and responsive UI

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- Context API + localStorage persistence

## Key Features

### 1) Dashboard Overview
- Total Balance, Total Income, Total Expenses summary cards
- Monthly Trend line chart
- Spending by Category pie chart
- Monthly Comparison bar chart

### 2) Transactions
- Full transaction table (date, description, category, type, amount)
- Search by text
- Filter by type and category
- Sort by date/amount (asc/desc)
- Admin-only add/edit/delete actions

### 3) Insights
- Highest spending category
- Budget utilization
- Average transaction amount
- Month-over-month expense comparison
- Dynamic recommendations based on current data

### 4) Role-Based Behavior
- Viewer: read-only access
- Admin: full management access

### 5) State & Persistence
- Global state via Context API
- Transactions and preferences persisted in localStorage

## Local Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/
    DashboardOverview.tsx
    TransactionsList.tsx
    InsightsSection.tsx
    RoleSelector.tsx
    DarkModeToggle.tsx
  context/
    FinanceContext.tsx
  data/
    mockData.ts
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
```

## Deployment

This app is ready for Vercel deployment.

### Vercel Quick Deploy
1. Push repository to GitHub
2. Import repository in Vercel
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`

## Recruiter Notes

This submission focuses on:
- Clear component architecture
- Strong TypeScript usage
- Practical UI/UX decisions
- Realistic financial workflows
- Clean, maintainable code organization

## Limitations

- Frontend-only demo (no backend/database)
- Uses local mock data and browser localStorage

## License

MIT
