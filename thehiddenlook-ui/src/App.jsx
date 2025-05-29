import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';

// Pages
import Home from './pages/Home';
import Annotation from './pages/Annotation';
import AnnotationsPreview from './components/AnnotationsPreview';
import Tracking from './pages/Tracking';
import SceneDetection from './pages/SceneDetection';
import PatternMatching from './pages/PatternMatching';
import FaceRecognition from './pages/FaceRecognition';
import Exports from './pages/Exports';

// Styles
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // You could add a token validation API call here
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading-screen">Chargement...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <div className={`main-content ${isAuthenticated ? 'authenticated' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/auth" 
            element={isAuthenticated ? <Navigate to="/" /> : <AuthPage setIsAuthenticated={setIsAuthenticated} />} 
          />

          {/* Protected routes */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/annotation" 
            element={isAuthenticated ? <Annotation /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/annotationspreview" 
            element={isAuthenticated ? <AnnotationsPreview /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/tracking" 
            element={isAuthenticated ? <Tracking /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/scenes" 
            element={isAuthenticated ? <SceneDetection /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/patterns" 
            element={isAuthenticated ? <PatternMatching /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/faces" 
            element={isAuthenticated ? <FaceRecognition /> : <Navigate to="/auth" />} 
          />
          <Route 
            path="/exports" 
            element={isAuthenticated ? <Exports /> : <Navigate to="/auth" />} 
          />

          {/* Catch-all route */}
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/" : "/auth"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;