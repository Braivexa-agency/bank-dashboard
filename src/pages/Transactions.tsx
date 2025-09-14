import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import './Transactions.css';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  useEffect(() => {
    // Mock data
    setTransactions([
      {
        id: '1',
        accountId: '1',
        amount: -125.50,
        type: 'debit',
        description: 'Whole Foods Market',
        date: new Date('2024-01-15'),
        category: 'Groceries',
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
      {
        id: '4',
        accountId: '1',
        amount: -89.99,
        type: 'debit',
        description: 'Amazon Purchase',
        date: new Date('2024-01-12'),
        category: 'Shopping',
        status: 'completed',
      },
      {
        id: '5',
        accountId: '3',
        amount: -1200.00,
        type: 'debit',
        description: 'Rent Payment',
        date: new Date('2024-01-10'),
        category: 'Housing',
        status: 'completed',
      },
      {
        id: '6',
        accountId: '1',
        amount: 150.00,
        type: 'credit',
        description: 'Freelance Payment',
        date: new Date('2024-01-08'),
        category: 'Income',
        status: 'completed',
      },
      {
        id: '7',
        accountId: '2',
        amount: -75.30,
        type: 'debit',
        description: 'Gas Station',
        date: new Date('2024-01-07'),
        category: 'Transportation',
        status: 'pending',
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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'groceries': return '🛒';
      case 'income': return '💰';
      case 'cash': return '💵';
      case 'shopping': return '🛍️';
      case 'housing': return '🏠';
      case 'transportation': return '⛽';
      default: return '💳';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p className="page-description">View and manage your transaction history</p>
        </div>
        
        <div className="transaction-filters">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'credit' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('credit')}
          >
            Credits
          </button>
          <button 
            className={filter === 'debit' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('debit')}
          >
            Debits
          </button>
        </div>
      </div>

      <div className="transactions-list-detailed">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className={`transaction-card ${transaction.type}`}>
            <div className="transaction-icon">
              {getCategoryIcon(transaction.category)}
            </div>
            
            <div className="transaction-details">
              <h3>{transaction.description}</h3>
              <p className="transaction-meta">
                {formatDate(transaction.date)} • {transaction.category}
              </p>
              <span className={`status-badge ${transaction.status}`}>
                {transaction.status}
              </span>
            </div>
            
            <div className={`transaction-amount-large ${transaction.type}`}>
              {transaction.type === 'credit' ? '+' : '-'}
              {formatCurrency(Math.abs(transaction.amount))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;