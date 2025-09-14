import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    if (path === '/work-certificate' && (location.pathname === '/' || location.pathname === '/work-certificate')) {
      return 'nav-link active';
    }
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🏦 Bank Dashboard</h1>
          <nav className="nav">
            <Link to="/work-certificate" className={isActiveRoute('/work-certificate')}>
              Attestation
            </Link>
            <Link to="/daira-investigation" className={isActiveRoute('/daira-investigation')}>
              Daira Investigation
            </Link>
            <Link to="/wilaya-investigation" className={isActiveRoute('/wilaya-investigation')}>
              Wilaya Investigation
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