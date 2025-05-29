import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const modules = [
  { label: '📂 Annotation', path: '/annotation' },
  { label: '🎯 Tracking', path: '/tracking' },
  { label: '🎬 Scènes', path: '/scenes' },
  { label: '🔍 Recherche', path: '/patterns' },
  { label: '😊 Visages', path: '/faces' },
  { label: '📤 Exports', path: '/exports' }
];

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/auth');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <span style={styles.navTitle}>IAVAP PRO</span>
        <div style={styles.navLinks}>
          {modules.map((mod, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(mod.path)} 
              style={location.pathname === mod.path ? styles.activeNavButton : styles.navButton}
            >
              {mod.label}
            </button>
          ))}
          <button onClick={handleLogout} style={styles.logoutButton}>Se déconnecter</button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px'
  },
  navContent: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navTitle: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#2d3748'
  },
  navLinks: {
    display: 'flex',
    gap: '12px'
  },
  navButton: {
    background: 'transparent',
    color: '#4a5568',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease'
  },
  activeNavButton: {
    background: '#4f46e5',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  logoutButton: {
    background: '#e53e3e',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginLeft: '12px'
  }
};

export default Navbar;
