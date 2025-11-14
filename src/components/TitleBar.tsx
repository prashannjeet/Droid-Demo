import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TitleBarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const TitleBar: React.FC<TitleBarProps> = ({ onMenuToggle, isSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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
        <div className="title-section">
          <div className="company-logo">
            <span className="logo-icon">🚀</span>
            <span className="company-name">Droid Solutions</span>
          </div>
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>
      </div>
      
      <div className="title-bar-right">
        {isAuthenticated && userData && (
          <div className="user-profile-section">
            <button 
              className="profile-trigger"
              onClick={toggleProfileDropdown}
              aria-label="User profile menu"
            >
              <div className="user-avatar">
                👤
              </div>
              <div className="user-info">
                <span className="user-name">{userData.name}</span>
                <span className="user-role">{userData.role}</span>
              </div>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    {userData.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="dropdown-user-info">
                    <span className="dropdown-name">{userData.name}</span>
                    <span className="dropdown-email">{userData.email}</span>
                    <span className="dropdown-role">{userData.role}</span>
                  </div>
                </div>
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => navigate('/dashboard')}>
                    <span className="item-icon">📊</span>
                    <span>Dashboard</span>
                  </button>
                  <button className="dropdown-item" onClick={() => navigate('/inform-act-verification')}>
                    <span className="item-icon">📋</span>
                    <span>INFORM Act</span>
                  </button>
                  <hr className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span className="item-icon">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleBar;