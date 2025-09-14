import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🏦 Bank Dashboard</h1>
          <nav className="nav">
            <Link to="/" className={isActiveRoute('/')}>
              Dashboard
            </Link>
            <Link to="/accounts" className={isActiveRoute('/accounts')}>
              Accounts
            </Link>
            <Link to="/transactions" className={isActiveRoute('/transactions')}>
              Transactions
            </Link>
            <Link to="/work-certificate" className={isActiveRoute('/work-certificate')}>
              Attestation
            </Link>
            <Link to="/settings" className={isActiveRoute('/settings')}>
              Settings
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 Bank Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;