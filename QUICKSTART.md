# Quick Start Guide

Get the Finance Dashboard running in 5 minutes! 🚀

## Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```
Takes ~2 minutes. Installs React, Tailwind, Recharts, and other packages.

### 2. Start Development Server
```bash
npm run dev
```
You'll see:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### 3. Open in Browser
Click the link or go to `http://localhost:5173/`

**That's it!** 🎉 Your dashboard is running!

---

## What You'll See

1. **Dashboard Overview** (default view)
   - Summary cards with balance, income, expenses
   - Monthly trend chart
   - Spending by category pie chart

2. **Navigation**
   - Click "Transactions" to see transaction list
   - Click "Insights" for financial insights

3. **Role Switching**
   - Try switching between "Viewer" and "Admin" roles
   - Admin role unlocks "Add Transaction" button

4. **Features to Try**
   - 🌙 Toggle dark mode (top right)
   - 🔍 Search transactions
   - 🎯 Filter by type or category
   - ↕️ Sort by date or amount
   - ➕ As Admin: Add/edit/delete transactions

---

## Common Tasks

### Add a Transaction (Admin Only)
1. Switch to **Admin** role
2. Click **"Add Transaction"** button
3. Fill in the form:
   - Date: Pick a date
   - Amount: Enter amount
   - Type: Income or Expense
   - Category: Choose category
   - Description: Write description
4. Click **"Add Transaction"**

### Search Transactions
1. Go to **Transactions** tab
2. Type in search box (searches description & category)
3. Results filter in real-time

### View Insights
1. Click **"Insights"** tab
2. See:
   - Highest spending category
   - Budget status
   - Average transaction
   - Monthly comparison
   - Smart recommendations

### Switch to Dark Mode
- Click moon icon in top right header
- Preference is saved automatically

---

## What's Included

✅ React + TypeScript
✅ Beautiful Tailwind CSS design
✅ 3 interactive charts (line, pie, bar)
✅ Transaction management (CRUD)
✅ Advanced filtering & searching
✅ Role-based access control
✅ Dark mode support
✅ Local storage persistence
✅ Responsive design (mobile-friendly)
✅ 15 sample transactions
✅ Financial insights & analytics

---

## Project Structure

```
📁 finance-dashboard/
  📁 src/
    📁 components/     → React components
    📁 context/        → State management
    📁 data/           → Mock data
    📁 types/          → TypeScript types
    📄 App.tsx         → Main component
  📁 dist/             → Build output (after npm run build)
  📄 package.json      → Dependencies
  📄 vite.config.ts    → Build config
  📄 tailwind.config   → Styling config
  📄 README.md         → Full documentation
```

---

## Useful Commands

```bash
# Start development (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Customization Ideas

### Change Sample Data
Edit `src/data/mockData.ts`:
```typescript
export const mockTransactions = [
  {
    id: '1',
    date: '2024-04-01',
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly salary',
  },
  // Add more transactions here
];
```

### Add More Categories
```typescript
export const expenseCategories = [
  'Rent',
  'Groceries',
  'Your New Category', // ← Add here
];
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#your-color-here',
  },
}
```

---

## Troubleshooting

### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Need to Clear Data
- Open browser console (F12)
- Run: `localStorage.clear()`
- Refresh page

### Charts Not Showing
- Check browser console for errors
- Make sure Recharts is installed: `npm ls recharts`
- Restart dev server: `npm run dev`

### Dark Mode Not Working
- Check browser localStorage is enabled
- Try clearing browser cache
- Restart dev server

---

## Next Steps

1. **Explore the code**
   - Check `src/components/` to see component structure
   - Review `src/context/FinanceContext.tsx` for state management

2. **Try editing**
   - Modify component styling in Tailwind classes
   - Add new categories to mock data
   - Create new components

3. **Deploy (Optional)**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment steps
   - Vercel one-click deployment recommended
   - Takes ~1 minute to deploy to live URL

---

## Need Help?

- 📖 Full docs: [README.md](./README.md)
- 🚀 Deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 📝 View code comments in components
- 🔍 Check TypeScript types in `src/types/`

---

## Quick Links

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Recharts](https://recharts.org)

---

**Happy coding! 💻💰**
