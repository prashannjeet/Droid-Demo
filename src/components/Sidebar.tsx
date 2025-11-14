import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  description: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard',
      description: 'View your account overview and quick actions'
    },
    {
      id: 'inform-act',
      label: 'INFORM Act Verification',
      icon: '📋',
      path: '/inform-act-verification',
      description: 'Complete your annual business verification'
    }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Don't show sidebar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo">🤖</div>
            <div className="brand-info">
              <h2 className="brand-name">Droid Demo</h2>
              <p className="brand-tagline">Seller Portal</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu-item">
                <button
                  className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <div className="menu-content">
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-description">{item.description}</span>
                  </div>
                  <span className="menu-arrow">→</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="app-info">
            <p className="version-info">Version 1.0.0</p>
            <p className="build-info">Built with React & TypeScript</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;