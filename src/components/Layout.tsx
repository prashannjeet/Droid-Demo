import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TitleBar from './TitleBar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-layout">
      {!isLoginPage && (
        <>
          <TitleBar 
            onMenuToggle={toggleSidebar} 
            isSidebarOpen={isSidebarOpen}
          />
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={closeSidebar}
          />
        </>
      )}
      
      <main className={`main-content ${
        !isLoginPage && isAuthenticated 
          ? isSidebarOpen 
            ? 'with-sidebar-open' 
            : 'with-sidebar-closed'
          : 'full-width'
      }`}>
        <div className="page-content">
          {children}
        </div>
        {!isLoginPage && <Footer />}
      </main>
    </div>
  );
};

export default Layout;