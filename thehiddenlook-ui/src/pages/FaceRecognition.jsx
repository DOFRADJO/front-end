import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function FaceRecognition() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [detectionMethod, setDetectionMethod] = useState('haar');
  const [minConfidence, setMinConfidence] = useState(80);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Données simulées pour démonstration
  const demoResults = [
    { 
      frame_id: 45, 
      timestamp: "00:00:02", 
      confidence: 92,
      face_id: 1,
      position: {x: 120, y: 80, width: 200, height: 200},
      emotion: "happy"
    },
    { 
      frame_id: 90, 
      timestamp: "00:00:04", 
      confidence: 85,
      face_id: 2,
      position: {x: 300, y: 150, width: 180, height: 180},
      emotion: "neutral"
    },
    { 
      frame_id: 135, 
      timestamp: "00:00:06", 
      confidence: 78,
      face_id: 1,
      position: {x: 50, y: 100, width: 200, height: 200},
      emotion: "surprised"
    }
  ];

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Fichier vidéo sélectionné:', file.name);
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = videoURL;
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const detectFaces = () => {
    if (!videoFile) {
      setStatus("❌ Veuillez d'abord sélectionner une vidéo");
      return;
    }

    console.log("Détection des visages en cours...");
    setIsProcessing(true);
    setStatus(`⏳ Analyse de la vidéo (méthode: ${detectionMethod})`);

    // Simulation du traitement
    setTimeout(() => {
      setResults(demoResults);
      setIsProcessing(false);
      setStatus(`✅ Analyse terminée - ${demoResults.length} visage(s) détecté(s)`);
      console.log("Résultats:", demoResults);
    }, 3000);
  };

  const exportResults = () => {
    if (results.length === 0) {
      setStatus("❌ Aucun résultat à exporter");
      return;
    }

    console.log("Export des résultats:", results);
    setStatus("📦 Fichier JSON généré avec succès");
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `face-recognition-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Styles cohérents avec votre design
  const styles = {
    pageBackground: {
      minHeight: '100vh',
      //backgroundColor: '#f0f2f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    appWindow: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '1000px',
      padding: '40px',
      position: 'relative',
      margin: 0
    },
  
    backButton: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '0.5rem 1rem',
      backgroundColor: '#e2e8f0',
      color: '#2d3748',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#cbd5e0',
        transform: 'translateY(-2px)'
      }
    },
    section: {
      marginBottom: '2rem',
      padding: '1.5rem',
      borderRadius: '12px',
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0'
    },
    sectionTitle: {
      color: '#4a5568',
      marginTop: 0,
      marginBottom: '1rem',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4f46e5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#4338ca',
        transform: 'translateY(-2px)'
      },
      ':disabled': {
        backgroundColor: '#cbd5e0',
        cursor: 'not-allowed',
        transform: 'none'
      }
    },
    fileInputButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e2e8f0',
      color: '#2d3748',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#cbd5e0',
        transform: 'translateY(-2px)'
      }
    },
    fileInput: {
      display: 'none'
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      marginTop: '1rem'
    },
    video: {
      width: '100%',
      borderRadius: '8px',
      display: 'block'
    },
    resultList: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem'
    },
    resultHeader: {
      backgroundColor: '#edf2f7',
      padding: '0.75rem',
      textAlign: 'left',
      borderBottom: '1px solid #e2e8f0'
    },
    resultRow: {
      borderBottom: '1px solid #e2e8f0',
      ':hover': {
        backgroundColor: '#f8fafc'
      }
    },
    resultCell: {
      padding: '0.75rem',
      verticalAlign: 'middle'
    },
    status: {
      margin: '1rem 0',
      padding: '0.75rem',
      borderRadius: '8px',
      fontWeight: '600'
    },
    successStatus: {
      color: '#15803d',
      backgroundColor: '#dcfce7'
    },
    errorStatus: {
      color: '#b91c1c',
      backgroundColor: '#fee2e2'
    },
    processingStatus: {
      color: '#1d4ed8',
      backgroundColor: '#dbeafe'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    methodSelector: {
      margin: '1rem 0',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    radioGroup: {
      display: 'flex',
      gap: '1rem'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer'
    },
    confidenceControl: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      margin: '1rem 0'
    },
    confidenceSlider: {
      flexGrow: 1
    },
    confidenceValue: {
      minWidth: '40px',
      textAlign: 'center'
    },
    emotionBadge: {
      padding: '0.25rem 0.5rem',
      borderRadius: '12px',
      fontSize: '0.8rem',
      fontWeight: '600'
    }
  };

  const getStatusStyle = () => {
    if (status.startsWith('✅')) return { ...styles.status, ...styles.successStatus };
    if (status.startsWith('❌')) return { ...styles.status, ...styles.errorStatus };
    if (status.startsWith('⏳')) return { ...styles.status, ...styles.processingStatus };
    return styles.status;
  };

  const getEmotionBadgeStyle = (emotion) => {
    const colors = {
      happy: { bg: '#dcfce7', text: '#166534' },
      sad: { bg: '#dbeafe', text: '#1e40af' },
      angry: { bg: '#fee2e2', text: '#991b1b' },
      surprised: { bg: '#fef3c7', text: '#92400e' },
      neutral: { bg: '#e2e8f0', text: '#1e293b' },
      fear: { bg: '#ede9fe', text: '#5b21b6' },
      disgust: { bg: '#ecfccb', text: '#3f6212' }
    };
    
    const selected = colors[emotion] || colors.neutral;
    return {
      ...styles.emotionBadge,
      backgroundColor: selected.bg,
      color: selected.text
    };
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.appWindow}>
        <button 
          onClick={() => navigate('/')} 
          style={styles.backButton}
        >
          ← Accueil
        </button>

        <h1 style={{ 
          textAlign: 'center', 
          color: '#2d3748',
          marginBottom: '2rem'
        }}>
          😊 Reconnaissance Faciale
        </h1>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📹 Vidéo Source</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={triggerFileInput}
              style={styles.fileInputButton}
            >
              {videoFile ? videoFile.name : 'Sélectionner une vidéo...'}
            </button>
            <input 
              type="file" 
              accept="video/*"
              onChange={handleVideoUpload}
              style={styles.fileInput}
              ref={fileInputRef}
            />
            
            {videoFile && (
              <div style={styles.videoContainer}>
                <video
                  ref={videoRef}
                  controls
                  style={styles.video}
                />
              </div>
            )}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>⚙️ Paramètres de Détection</h2>
          
          <div style={styles.methodSelector}>
            <span>Méthode :</span>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="method"
                  value="haar"
                  checked={detectionMethod === 'haar'}
                  onChange={() => setDetectionMethod('haar')}
                />
                Cascade Haar
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="method"
                  value="dnn"
                  checked={detectionMethod === 'dnn'}
                  onChange={() => setDetectionMethod('dnn')}
                />
                Réseau de Neurones
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="method"
                  value="hog"
                  checked={detectionMethod === 'hog'}
                  onChange={() => setDetectionMethod('hog')}
                />
                HOG
              </label>
            </div>
          </div>
          
          <div style={styles.confidenceControl}>
            <span>Seuil de confiance minimum :</span>
            <input
              type="range"
              min="50"
              max="100"
              value={minConfidence}
              onChange={(e) => setMinConfidence(e.target.value)}
              style={styles.confidenceSlider}
            />
            <span style={styles.confidenceValue}>{minConfidence}%</span>
          </div>
          
          <button 
            onClick={detectFaces}
            style={styles.button}
            disabled={!videoFile || isProcessing}
          >
            {isProcessing ? 'Analyse en cours...' : 'Détecter les visages'}
          </button>
        </section>

        {results.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📊 Résultats de Détection</h2>
            
            <table style={styles.resultList}>
              <thead>
                <tr>
                  <th style={styles.resultHeader}>Frame</th>
                  <th style={styles.resultHeader}>Timestamp</th>
                  <th style={styles.resultHeader}>Confiance</th>
                  <th style={styles.resultHeader}>Position</th>
                  <th style={styles.resultHeader}>Émotion</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} style={styles.resultRow}>
                    <td style={styles.resultCell}>#{result.frame_id}</td>
                    <td style={styles.resultCell}>{result.timestamp}</td>
                    <td style={styles.resultCell}>
                      <span style={{
                        color: result.confidence > 85 ? '#16a34a' : result.confidence > 70 ? '#d97706' : '#dc2626',
                        fontWeight: '600'
                      }}>
                        {result.confidence}%
                      </span>
                    </td>
                    <td style={styles.resultCell}>
                      {`(x:${result.position.x}, y:${result.position.y}) [${result.position.width}×${result.position.height}]`}
                    </td>
                    <td style={styles.resultCell}>
                      <span style={getEmotionBadgeStyle(result.emotion)}>
                        {result.emotion}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {status && (
          <div style={getStatusStyle()}>
            {status}
          </div>
        )}

        <div style={styles.actionButtons}>
          <button 
            onClick={exportResults}
            style={{ 
              ...styles.button,
              backgroundColor: '#7c3aed'
            }}
            disabled={results.length === 0}
          >
            📤 Exporter en JSON
          </button>
          <button 
            onClick={exportResults}
            style={{ 
              ...styles.button,
              backgroundColor: '#10b981'
            }}
            disabled={results.length === 0}
          >
            📊 Exporter en CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaceRecognition;