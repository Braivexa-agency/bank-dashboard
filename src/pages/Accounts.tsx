import React, { useState, useEffect } from 'react';
import { Account } from '../types';
import './Accounts.css';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    // Mock data
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
      {
        id: '3',
        name: 'Credit Card',
        type: 'credit',
        balance: -1250.75,
        currency: 'USD',
        accountNumber: '****9012',
      },
      {
        id: '4',
        name: 'Investment Portfolio',
        type: 'investment',
        balance: 15750.25,
        currency: 'USD',
        accountNumber: '****3456',
      },
    ]);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getAccountTypeIcon = (type: Account['type']) => {
    switch (type) {
      case 'checking': return '💳';
      case 'savings': return '🏦';
      case 'credit': return '💰';
      case 'investment': return '📈';
      default: return '💳';
    }
  };

  return (
    <div className="accounts-page">
      <h1>Your Accounts</h1>
      <p className="page-description">Manage and view all your bank accounts</p>
      
      <div className="accounts-grid">
        {accounts.map(account => (
          <div key={account.id} className={`account-card-detailed ${account.type}`}>
            <div className="account-header">
              <span className="account-icon">{getAccountTypeIcon(account.type)}</span>
              <div className="account-title">
                <h3>{account.name}</h3>
                <p className="account-number">{account.accountNumber}</p>
              </div>
            </div>
            
            <div className="account-details">
              <div className="account-type-badge">
                {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
              </div>
              <div className={`account-balance-large ${account.balance < 0 ? 'negative' : 'positive'}`}>
                {formatCurrency(account.balance)}
              </div>
            </div>
            
            <div className="account-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Transfer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;