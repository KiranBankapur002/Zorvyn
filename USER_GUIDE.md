# Finance Dashboard - User Guide

## 🎯 Overview

This is a complete guide to using the Finance Dashboard UI. Learn all the features and how to navigate the application.

---

## 📍 Main Sections

### 1. Overview (Dashboard)
**Path:** Click "Overview" in navigation

**What You See:**
- Summary cards at the top
- Charts below
- Financial summaries

**Cards Display:**
- **Total Balance**: Money you have left (Income - Expenses)
- **Total Income**: All money earned
- **Total Expenses**: All money spent

**Charts:**
- **Monthly Trend**: Shows balance changes over months
- **Spending by Category**: Where your money goes
- **Monthly Comparison**: Income vs Expenses per month

---

### 2. Transactions
**Path:** Click "Transactions" in navigation

**What You See:**
- Filter and search options at top
- Table of all transactions below
- Add button (Admin only)

#### Search
- Type in the search box
- Searches descriptions and categories
- Results update instantly

#### Filter Options
**By Type:**
- All Types (default)
- Income (green)
- Expense (red)

**By Category:**
- All Categories (default)
- Select specific category
- Updates table instantly

**Sort Options:**
- Newest First (default)
- Oldest First
- Highest Amount
- Lowest Amount

#### Table Columns
| Column | Shows |
|--------|-------|
| Date | Transaction date |
| Description | What the transaction was for |
| Category | Category name (blue badge) |
| Type | Income (green) or Expense (red) |
| Amount | $amount with sign (+/-) |
| Actions | Edit/Delete buttons (Admin only) |

#### Admin Actions
Only visible when role is set to "Admin"

**Add Transaction:**
1. Click "Add Transaction" button
2. Fill in form:
   - **Date**: Pick from calendar
   - **Amount**: Enter number (e.g., 50.00)
   - **Type**: Income or Expense
   - **Category**: Choose from dropdown
   - **Description**: Write what it's for
3. Click "Add Transaction"
4. See it appear in table

**Edit Transaction:**
1. Click pencil icon ✏️
2. Form fills with transaction data
3. Change any field
4. Click "Update Transaction"

**Delete Transaction:**
1. Click trash icon 🗑️
2. Confirm deletion
3. Transaction removed

---

### 3. Insights
**Path:** Click "Insights" in navigation

**Four Key Metrics:**

**Highest Spending** 💰
- Shows your biggest expense category
- How much you spent there
- Helps identify major expenses

**Budget Status** 🎯
- % of monthly budget used
- Based on $5000 budget (can customize)
- Green if < 80%, Red if over
- Track if you're overspending

**Average Transaction** 📊
- Average amount per transaction
- Useful for understanding spending scale
- Updates with new transactions

**Monthly Comparison** 📈
- Compare this month vs last month
- Shows if you're spending more or less
- Percentage change

**Smart Recommendations** 💡
- AI-like suggestions
- Based on your spending
- Examples:
  - "Budget is 85% used - review spending"
  - "Expenses up 12% vs last month"
  - "Top category is Rent - review"

---

## 🎮 Key Features

### Role Switching
**Location:** Top right of header

**Two Roles:**
1. **Viewer** 
   - See everything
   - Cannot edit
   - Read-only

2. **Admin**
   - See everything
   - Can add/edit/delete
   - Full control

**How to Switch:**
- Click "Viewer" or "Admin" button
- Interface updates immediately
- Add/edit buttons appear for Admin

### Dark Mode
**Location:** Next to role selector (sun/moon icon)

**How to Use:**
1. Click moon icon 🌙 for dark
2. Click sun icon ☀️ for light
3. Preference saves automatically
4. Persists when you refresh

---

## 📊 Understanding the Charts

### Monthly Trend Chart
- **X-axis**: Month names (Jan, Feb, Mar, Apr)
- **Y-axis**: Dollar amounts
- **Three lines**:
  - Green = Income
  - Red = Expenses
  - Blue = Balance (what's left)
- **Hover** to see exact values

### Spending by Category Pie Chart
- **Each slice**: One category
- **Size**: How much spent
- **Label**: Category name + percentage
- Shows where money goes

### Monthly Comparison Bar Chart
- **Bars**: Income (green) vs Expenses (red)
- **Height**: Dollar amounts
- **Months**: Jan through Apr
- Easy to compare months

---

## 💾 Data & Storage

### Where Data Saves
- **LocalStorage**: Browser's local storage
- **Automatic**: Saves after every change
- **Persistent**: Survives browser closures
- **Local Only**: Doesn't sync across devices

### How to Clear Data
Open browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

### Sample Data
- Comes pre-loaded
- 15 realistic transactions
- Multiple categories
- Good for exploring

---

## 📱 Mobile Usage

### Responsive Design
- **Mobile (< 640px)**
  - Single column layouts
  - Hamburger menu (☰)
  - Vertical scrolling
  - Touch-friendly buttons

- **Tablet (640-1024px)**
  - 2 column layouts
  - Adjusted spacing
  - Better table view

- **Desktop (> 1024px)**
  - 3 column layouts
  - Full side-by-side
  - Optimal spacing

### Mobile Navigation
- Menu button (☰) appears on mobile
- Tap to open navigation
- Tap again to close
- All features available

---

## 🎨 Color Meanings

### Income
- **Green** (#22c55e)
- Positive transactions
- Money coming in

### Expenses
- **Red** (#ef4444)
- Negative transactions
- Money going out

### Primary/Actions
- **Blue** (#0ea5e9)
- Navigation
- Buttons
- Primary actions

### Text/Background
- **Black/White**: Light mode
- **Dark Gray**: Dark mode

---

## 🔄 Common Workflows

### Workflow 1: View Your Balance
1. Open "Overview"
2. Look at "Total Balance" card
3. Check monthly trend chart
4. Done!

### Workflow 2: Find a Transaction
1. Go to "Transactions"
2. Use search box
3. Type description or category
4. Click on result

### Workflow 3: Add an Expense (Admin)
1. Switch to "Admin" role
2. Go to "Transactions"
3. Click "Add Transaction"
4. Select "Expense"
5. Choose category
6. Enter amount & description
7. Click "Add"

### Workflow 4: Understand Spending
1. Go to "Overview"
2. View "Spending by Category" pie
3. Identify highest category
4. Go to "Insights"
5. Read recommendations

### Workflow 5: Track Budget
1. Open "Insights"
2. Check "Budget Status" %
3. If > 80%, review expenses
4. Look at highest category
5. Plan for next month

---

## ⚡ Quick Tips

**💡 Tip 1: Search is Powerful**
- Search any word from description
- Search category names
- Results filter instantly

**💡 Tip 2: Combine Filters**
- Use type + category + search together
- Narrows results quickly
- More precise results

**💡 Tip 3: Sort First, Filter Later**
- Sort by highest amount
- Then filter by category
- See biggest expenses easily

**💡 Tip 4: Dark Mode at Night**
- Better for eyes
- Use at reduced brightness
- Toggle anytime

**💡 Tip 5: Check Insights Weekly**
- Review budget status
- Check trends
- Make adjustments early

**💡 Tip 6: Keep Sample Data First**
- Learn with sample data
- Explore features safely
- Clear when ready for real data

---

## 🚨 Troubleshooting

### Nothing Shows on Page
- Refresh browser (F5 or Ctrl+R)
- Check internet connection
- Try different browser

### Charts Not Displaying
- Wait a few seconds
- Refresh page
- Check browser console (F12)

### Can't Add Transaction
- Make sure role is "Admin"
- Fill all form fields
- Check for errors above form

### Data Disappeared
- Not deleted, check filters
- Use "All Types" and "All Categories"
- Use search to find it

### Dark Mode Looks Wrong
- Refresh page
- Clear browser cache
- Try different browser

---

## 🎯 Feature Comparison

| Feature | Viewer | Admin |
|---------|--------|-------|
| View dashboard | ✅ | ✅ |
| View charts | ✅ | ✅ |
| View transactions | ✅ | ✅ |
| Search transactions | ✅ | ✅ |
| Filter transactions | ✅ | ✅ |
| Sort transactions | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |
| View insights | ✅ | ✅ |
| Use dark mode | ✅ | ✅ |

---

## 📊 Sample Categories

**Expenses:**
- Rent
- Groceries
- Utilities
- Transportation
- Entertainment
- Dining
- Shopping
- Healthcare
- Subscriptions
- Investment

**Income:**
- Salary
- Freelance
- Bonus
- Investment Returns
- Other

---

## 🎓 Learning Checklist

- [ ] Open dashboard in browser
- [ ] Explore Overview tab
- [ ] Check all the charts
- [ ] Go to Transactions tab
- [ ] Try searching
- [ ] Try filtering
- [ ] Try sorting
- [ ] Switch to Admin role
- [ ] Add a test transaction
- [ ] View Insights
- [ ] Read recommendations
- [ ] Toggle dark mode
- [ ] Refresh page (data should persist)
- [ ] Clear filters and search

---

## 🔐 Privacy & Security

**Important Notes:**
- All data stored locally in your browser
- No data sent to servers
- No tracking
- No ads
- Completely private
- Clear browser data to delete

---

## 📞 Need More Help?

**Check These Files:**
- README.md - Full documentation
- QUICKSTART.md - Quick setup
- FEATURES.md - Detailed features
- DEPLOYMENT.md - Deploy your own

---

**Enjoy using your Finance Dashboard! 💰📊**
