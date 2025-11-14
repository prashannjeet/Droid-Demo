import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TitleBarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const TitleBar: React.FC<TitleBarProps> = ({ onMenuToggle, isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/inform-act-verification':
        return 'INFORM Act Verification';
      case '/login':
        return 'Login';
      default:
        return 'Droid Demo';
    }
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userDataString = localStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // Don't show title bar on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <div className="title-bar">
      <div className="title-bar-left">
        <button 
          className="menu-toggle-btn" 
          onClick={onMenuToggle}
          aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>
      
      <div className="title-bar-right">
        {isAuthenticated && userData && (
          <div className="user-info">
            <div className="user-avatar">
              {userData.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{userData.name}</span>
              <span className="user-role">{userData.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleBar;