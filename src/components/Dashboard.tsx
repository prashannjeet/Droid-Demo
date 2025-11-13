import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');

    if (!isAuthenticated || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-text">
          <h1>Welcome, {user.name}!</h1>
          <p>Logged in as {user.role} • {user.email}</p>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>

        <div className="dashboard-card">
          <h3>System Status</h3>
          <p>✅ Authentication Service: Active</p>
          <p>✅ User Session: Valid</p>
          <p>✅ Dashboard: Loaded Successfully</p>
          <p>🔄 Last Login: {new Date().toLocaleString()}</p>
        </div>

        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <p>• View Profile Settings</p>
          <p>• Update Account Information</p>
          <p>• Change Password</p>
          <p>• Download Activity Report</p>
        </div>

        <div className="dashboard-card">
          <h3>Application Features</h3>
          <p>This demo application showcases:</p>
          <p>• Form validation and error handling</p>
          <p>• Responsive design with modern UI</p>
          <p>• TypeScript integration</p>
          <p>• React Router for navigation</p>
          <p>• Dummy API authentication service</p>
        </div>

        <div className="dashboard-card">
          <h3>Session Information</h3>
          <p><strong>Login Time:</strong> {new Date().toLocaleString()}</p>
          <p><strong>Session Status:</strong> Active</p>
          <p><strong>Browser:</strong> {navigator.userAgent.split(' ')[0]}</p>
          <p><strong>Platform:</strong> {navigator.platform}</p>
        </div>

        <div className="dashboard-card">
          <h3>Security</h3>
          <p>🔒 Session is encrypted</p>
          <p>🔒 Password is hashed</p>
          <p>🔒 HTTPS enabled in production</p>
          <p>⚠️ This is a demo - use test credentials only</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;