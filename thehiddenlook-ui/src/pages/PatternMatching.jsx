import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function PatternMatching() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [searchMethod, setSearchMethod] = useState('template');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const templateInputRef = useRef(null);

  // Données simulées pour la démonstration
  const demoResults = [
    { 
      frame_id: 125, 
      timestamp: "00:00:05", 
      confidence: 85,
      template_id: 1,
      position: {x: 120, y: 80, width: 200, height: 150}
    },
    { 
      frame_id: 250, 
      timestamp: "00:00:10", 
      confidence: 72,
      template_id: 2,
      position: {x: 300, y: 200, width: 180, height: 120}
    },
    { 
      frame_id: 375, 
      timestamp: "00:00:15", 
      confidence: 91,
      template_id: 1,
      position: {x: 50, y: 150, width: 200, height: 150}
    }
  ];

  const demoPatterns = [
    { id: 1, name: "Logo.png", preview: "/path/to/preview1" },
    { id: 2, name: "Objet.jpg", preview: "/path/to/preview2" }
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

  const handleTemplateUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      console.log('Templates sélectionnés:', files.map(f => f.name));
      const newTemplates = files.map((file, index) => ({
        id: templates.length + index + 1,
        name: file.name,
        file: file,
        preview: URL.createObjectURL(file)
      }));
      setTemplates([...templates, ...newTemplates]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const triggerTemplateInput = () => {
    templateInputRef.current.click();
  };

  const removeTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const searchPatterns = () => {
    if (!videoFile) {
      setStatus("❌ Veuillez d'abord sélectionner une vidéo");
      return;
    }
    if (templates.length === 0) {
      setStatus("❌ Veuillez ajouter au moins un template");
      return;
    }

    console.log("Recherche de patterns en cours...");
    setIsProcessing(true);
    setStatus(`⏳ Analyse de la vidéo avec ${templates.length} template(s) (méthode: ${searchMethod})`);

    // Simulation du traitement
    setTimeout(() => {
      setResults(demoResults);
      setIsProcessing(false);
      setStatus(`✅ Analyse terminée - ${demoResults.length} occurrence(s) trouvée(s)`);
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
    
    // Simulation d'export
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `pattern-results-${new Date().toISOString().slice(0,10)}.json`;
    
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
      left :'150px'
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
    templatesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '1rem'
    },
    templateCard: {
      position: 'relative',
      width: '120px',
      padding: '0.75rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    templatePreview: {
      width: '100%',
      height: '80px',
      objectFit: 'contain',
      marginBottom: '0.5rem'
    },
    templateName: {
      fontSize: '0.8rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'center'
    },
    removeTemplate: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      width: '24px',
      height: '24px',
      backgroundColor: '#f87171',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem'
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
          🔍 Recherche de Patterns dans une Vidéo
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
          <h2 style={styles.sectionTitle}>🖼️ Templates de Recherche</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={triggerTemplateInput}
              style={styles.fileInputButton}
            >
              Ajouter des templates...
            </button>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleTemplateUpload}
              style={styles.fileInput}
              ref={templateInputRef}
              multiple
            />
            
            {templates.length > 0 ? (
              <div style={styles.templatesContainer}>
                {templates.map(template => (
                  <div key={template.id} style={styles.templateCard}>
                    <button 
                      onClick={() => removeTemplate(template.id)}
                      style={styles.removeTemplate}
                    >
                      ×
                    </button>
                    <img 
                      src={template.preview} 
                      alt={template.name} 
                      style={styles.templatePreview}
                    />
                    <div style={styles.templateName}>{template.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#64748b', fontStyle: 'italic' }}>
                Aucun template ajouté. Veuillez ajouter des images à rechercher.
              </p>
            )}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>⚙️ Paramètres de Recherche</h2>
          
          <div style={styles.methodSelector}>
            <span>Méthode :</span>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="method"
                  value="template"
                  checked={searchMethod === 'template'}
                  onChange={() => setSearchMethod('template')}
                />
                Template Matching
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="method"
                  value="features"
                  checked={searchMethod === 'features'}
                  onChange={() => setSearchMethod('features')}
                />
                Feature Matching
              </label>
            </div>
          </div>
          
          <div style={styles.confidenceControl}>
            <span>Seuil de confiance :</span>
            <input
              type="range"
              min="0"
              max="100"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(e.target.value)}
              style={styles.confidenceSlider}
            />
            <span style={styles.confidenceValue}>{confidenceThreshold}%</span>
          </div>
          
          <button 
            onClick={searchPatterns}
            style={styles.button}
            disabled={!videoFile || templates.length === 0 || isProcessing}
          >
            {isProcessing ? 'Recherche en cours...' : 'Lancer la recherche'}
          </button>
        </section>

        {results.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>📊 Résultats</h2>
            
            <table style={styles.resultList}>
              <thead>
                <tr>
                  <th style={styles.resultHeader}>Frame</th>
                  <th style={styles.resultHeader}>Timestamp</th>
                  <th style={styles.resultHeader}>Template</th>
                  <th style={styles.resultHeader}>Confiance</th>
                  <th style={styles.resultHeader}>Position</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} style={styles.resultRow}>
                    <td style={styles.resultCell}>#{result.frame_id}</td>
                    <td style={styles.resultCell}>{result.timestamp}</td>
                    <td style={styles.resultCell}>
                      {templates.find(t => t.id === result.template_id)?.name || 'Inconnu'}
                    </td>
                    <td style={styles.resultCell}>
                      <span style={{
                        color: result.confidence > 80 ? '#16a34a' : result.confidence > 60 ? '#d97706' : '#dc2626',
                        fontWeight: '600'
                      }}>
                        {result.confidence}%
                      </span>
                    </td>
                    <td style={styles.resultCell}>
                      {`(x:${result.position.x}, y:${result.position.y}) [${result.position.width}×${result.position.height}]`}
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

export default PatternMatching;