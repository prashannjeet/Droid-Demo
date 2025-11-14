import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="company-info">
            <div className="footer-logo">
              <span className="footer-logo-icon">🚀</span>
              <span className="footer-brand">Droid Solutions</span>
            </div>
            <p className="company-description">
              Empowering businesses with intelligent automation and compliance solutions.
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Products</h4>
          <ul className="footer-links">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#inform-act">INFORM Act Compliance</a></li>
            <li><a href="#automation">Business Automation</a></li>
            <li><a href="#analytics">Analytics Suite</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#status">System Status</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="#linkedin" className="social-link" aria-label="LinkedIn">
              💼
            </a>
            <a href="#twitter" className="social-link" aria-label="Twitter">
              🐦
            </a>
            <a href="#github" className="social-link" aria-label="GitHub">
              🐙
            </a>
            <a href="#email" className="social-link" aria-label="Email">
              📧
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>&copy; {currentYear} Droid Solutions. All rights reserved.</p>
          </div>
          <div className="footer-meta">
            <span className="version">v1.0.0</span>
            <span className="divider">•</span>
            <span className="build-info">Built with React & TypeScript</span>
            <span className="divider">•</span>
            <span className="status">
              <span className="status-indicator"></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;