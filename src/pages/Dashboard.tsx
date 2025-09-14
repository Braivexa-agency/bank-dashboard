import React, { useState, useEffect } from 'react';
import { DashboardStats, Account, Transaction } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    savingsGoal: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    setStats({
      totalBalance: 15420.50,
      monthlyIncome: 5200.00,
      monthlyExpenses: 3100.75,
      savingsGoal: 10000.00,
    });

    setAccounts([
      {
        id: '1',
        name: 'Main Checking',
        type: 'checking',
        balance: 8420.50,
        currency: 'USD',
        accountNumber: '****1234',
      },
      {
        id: '2',
        name: 'Savings Account',
        type: 'savings',
        balance: 7000.00,
        currency: 'USD',
        accountNumber: '****5678',
      },
    ]);

    setRecentTransactions([
      {
        id: '1',
        accountId: '1',
        amount: -125.50,
        type: 'debit',
        description: 'Grocery Store',
        date: new Date('2024-01-15'),
        category: 'Food',
        status: 'completed',
      },
      {
        id: '2',
        accountId: '1',
        amount: 2500.00,
        type: 'credit',
        description: 'Salary Deposit',
        date: new Date('2024-01-14'),
        category: 'Income',
        status: 'completed',
      },
      {
        id: '3',
        accountId: '2',
        amount: -50.00,
        type: 'debit',
        description: 'ATM Withdrawal',
        date: new Date('2024-01-13'),
        category: 'Cash',
        status: 'completed',
      },
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome back!</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Balance</h3>
          <p className="stat-value">{formatCurrency(stats.totalBalance)}</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Income</h3>
          <p className="stat-value positive">{formatCurrency(stats.monthlyIncome)}</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Expenses</h3>
          <p className="stat-value negative">{formatCurrency(stats.monthlyExpenses)}</p>
        </div>
        <div className="stat-card">
          <h3>Savings Goal</h3>
          <p className="stat-value">{formatCurrency(stats.savingsGoal)}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="accounts-section">
          <h2>Your Accounts</h2>
          <div className="accounts-list">
            {accounts.map(account => (
              <div key={account.id} className="account-card">
                <div className="account-info">
                  <h4>{account.name}</h4>
                  <p className="account-number">{account.accountNumber}</p>
                  <p className="account-type">{account.type}</p>
                </div>
                <div className="account-balance">
                  {formatCurrency(account.balance)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="transactions-section">
          <h2>Recent Transactions</h2>
          <div className="transactions-list">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-info">
                  <h4>{transaction.description}</h4>
                  <p className="transaction-date">{formatDate(transaction.date)}</p>
                  <span className="transaction-category">{transaction.category}</span>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(Math.abs(transaction.amount))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;