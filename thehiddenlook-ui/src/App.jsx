import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Annotation from './pages/Annotation';
import AnnotationsPreview from './components/AnnotationsPreview';  
import Tracking from './pages/Tracking';
import SceneDetection from './pages/SceneDetection';
import PatternMatching from './pages/PatternMatching';
import FaceRecognition from './pages/FaceRecognition';
import Exports from './pages/Exports';
import AuthForm from './pages/AuthForm';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annotation" element={<Annotation />} />
          <Route path="/annotationspreview" element={<AnnotationsPreview />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/scenes" element={<SceneDetection />} />
          <Route path="/patterns" element={<PatternMatching />} />
          <Route path="/faces" element={<FaceRecognition />} />
          <Route path="/exports" element={<Exports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
