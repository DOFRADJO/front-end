import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SceneDetection() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Données simulées pour le démonstration
  const demoScenes = [
    { scene_id: 1, start: "00:00:00", end: "00:01:30" },
    { scene_id: 2, start: "00:01:30", end: "00:03:00" },
    { scene_id: 3, start: "00:03:00", end: "00:05:45" }
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
      // Simulation de détection de scènes
      setTimeout(() => {
        setScenes(demoScenes);
      }, 1500);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const detectScenes = () => {
    if (!videoFile) {
      setStatus("❌ Veuillez d'abord sélectionner une vidéo");
      return;
    }

    console.log("Détection des scènes en cours...");
    setIsProcessing(true);
    setStatus("⏳ Analyse de la vidéo en cours...");

    // Simulation du traitement
    setTimeout(() => {
      setScenes(demoScenes);
      setIsProcessing(false);
      setStatus("✅ Détection terminée - " + demoScenes.length + " scènes trouvées");
      console.log("Scènes détectées:", demoScenes);
    }, 3000);
  };

  const handleTimeChange = (id, field, value) => {
    const updatedScenes = scenes.map(scene => {
      if (scene.scene_id === id) {
        return { ...scene, [field]: value };
      }
      return scene;
    });
    setScenes(updatedScenes);
    console.log("Scène modifiée:", id, field, value);
  };

  const exportScenes = () => {
    if (scenes.length === 0) {
      setStatus("❌ Aucune scène à exporter");
      return;
    }

    console.log("Export des scènes:", scenes);
    setStatus("📦 Fichier JSON généré avec succès");
    
    // Simulation d'export
    const dataStr = JSON.stringify(scenes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `scenes-${new Date().toISOString().slice(0,10)}.json`;
    
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
      margin: '50px',
      left :'250px'
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
    sceneList: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem'
    },
    sceneHeader: {
      backgroundColor: '#edf2f7',
      padding: '0.75rem',
      textAlign: 'left',
      borderBottom: '1px solid #e2e8f0'
    },
    sceneRow: {
      borderBottom: '1px solid #e2e8f0',
      ':hover': {
        backgroundColor: '#f8fafc'
      }
    },
    sceneCell: {
      padding: '0.75rem',
      verticalAlign: 'middle'
    },
    timeInput: {
      padding: '0.5rem',
      border: '1px solid #cbd5e0',
      borderRadius: '4px',
      width: '80px',
      textAlign: 'center'
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
    }
  };

  const getStatusStyle = () => {
    if (status.startsWith('✅')) return { ...styles.status, ...styles.successStatus };
    if (status.startsWith('❌')) return { ...styles.status, ...styles.errorStatus };
    if (status.startsWith('⏳')) return { ...styles.status, ...styles.processingStatus };
    return styles.status;
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
          🎬 Découpage de Scènes Vidéo
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
          <h2 style={styles.sectionTitle}>✂️ Découpage des Scènes</h2>
          
          <button 
            onClick={detectScenes}
            style={styles.button}
            disabled={!videoFile || isProcessing}
          >
            {isProcessing ? 'Analyse en cours...' : 'Détecter les scènes automatiquement'}
          </button>

          {scenes.length > 0 && (
            <table style={styles.sceneList}>
              <thead>
                <tr>
                  <th style={styles.sceneHeader}>Scène</th>
                  <th style={styles.sceneHeader}>Début</th>
                  <th style={styles.sceneHeader}>Fin</th>
                  <th style={styles.sceneHeader}>Durée</th>
                </tr>
              </thead>
              <tbody>
                {scenes.map((scene) => (
                  <tr key={scene.scene_id} style={styles.sceneRow}>
                    <td style={styles.sceneCell}>Scène {scene.scene_id}</td>
                    <td style={styles.sceneCell}>
                      <input
                        type="text"
                        value={scene.start}
                        onChange={(e) => handleTimeChange(scene.scene_id, 'start', e.target.value)}
                        style={styles.timeInput}
                      />
                    </td>
                    <td style={styles.sceneCell}>
                      <input
                        type="text"
                        value={scene.end}
                        onChange={(e) => handleTimeChange(scene.scene_id, 'end', e.target.value)}
                        style={styles.timeInput}
                      />
                    </td>
                    <td style={styles.sceneCell}>
                      {/* Calcul simple de durée */}
                      {calculateDuration(scene.start, scene.end)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {status && (
          <div style={getStatusStyle()}>
            {status}
          </div>
        )}

        <div style={styles.actionButtons}>
          <button 
            onClick={exportScenes}
            style={{ 
              ...styles.button,
              backgroundColor: '#7c3aed'
            }}
            disabled={scenes.length === 0}
          >
            📤 Exporter en JSON
          </button>
          <button 
            onClick={exportScenes}
            style={{ 
              ...styles.button,
              backgroundColor: '#10b981'
            }}
            disabled={scenes.length === 0}
          >
            📊 Exporter en CSV
          </button>
        </div>
      </div>
    </div>
  );
}


export default SceneDetection;