import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getClasses,
  addClass,
  deleteClass,
  annotateImages,
  exportAnnotations
} from '../api/api';

function Annotation() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState('');
  const [files, setFiles] = useState([]);
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  const handleAddClass = async () => {
    if (newClass.trim() === '') return;

    try {
      const response = await addClass(newClass);
      alert(response.message);
      setNewClass('');
      fetchClasses();
    } catch (error) {
      if (error.response && error.response.data.detail) {
        alert("❌ Classe déjà existante : " + error.response.data.detail);
      } else {
        alert("❌ Erreur lors de l'ajout de la classe.");
      }
    }
  };

  const handleDeleteClass = async (name) => {
    await deleteClass(name);
    fetchClasses();
  };

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setLabels(new Array(selectedFiles.length).fill(''));
  };

  const handleLabelChange = (index, value) => {
    const updated = [...labels];
    updated[index] = value;
    setLabels(updated);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("⚠️ Vous devez d'abord sélectionner au moins une image.");
      return;
    }

    if (files.length !== labels.length || labels.includes('')) {
      alert("⚠️ Chaque image doit avoir une classe sélectionnée.");
      return;
    }

    try {
      setStatus("⏳ Annotation en cours...");
      setProgress(10);

      const simulateProgress = async () => {
        for (let i = 20; i <= 90; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 150));
          setProgress(i);
        }
      };

      await simulateProgress();

      const result = await annotateImages(files, labels);
      setProgress(100);
      setStatus(`✅ ${result.message}`);

      setTimeout(() => {
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error(error);
      setStatus("❌ Échec de l'annotation");
      setProgress(0);
    }
  };

  const handleExport = async () => {
    if (files.length === 0 || labels.length === 0) {
      alert("⚠️ Vous devez d'abord annoter des images avant d'exporter.");
      return;
    }

    try {
      setStatus("📦 Exportation en cours...");
      const result = await exportAnnotations();
      setStatus("✅ Export terminé ! Le fichier a été généré avec succès.");
    } catch (error) {
      console.error(error);
      setStatus("❌ Aucune annotation trouvée pour l'export.");
    }
  };

  const handlePreview = () => {
    if (files.length === 0) {
      alert("⚠️ Aucune image sélectionnée.");
      return;
    }

    const summary = files.map((file, idx) => {
      const label = labels[idx] || "❌ Non attribuée";
      return `🖼️ ${file.name} → 🏷️ ${label}`;
    }).join('\n');

    alert("📋 Aperçu des annotations :\n\n" + summary);
  };

  // Styles
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
      left :'350px'
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
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
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
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.1rem'
    },
    inputGroup: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1rem'
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid #cbd5e0',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border 0.3s ease'
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
      }
    },
    fileInputContainer: {
      position: 'relative',
      marginBottom: '1rem'
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
      transition: 'all 0.3s ease',
      display: 'inline-block',
      ':hover': {
        backgroundColor: '#cbd5e0',
        transform: 'translateY(-2px)'
      }
    },
    fileInput: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: 0,
      cursor: 'pointer'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      color: '#e53e3e',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      marginLeft: '1rem',
      padding: '0.25rem',
      borderRadius: '4px',
      ':hover': {
        backgroundColor: '#fee2e2'
      }
    },
    classList: {
      listStyle: 'none',
      paddingLeft: 0,
      margin: 0
    },
    classItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      borderBottom: '1px solid #edf2f7',
      ':last-child': {
        borderBottom: 'none'
      }
    },
    imageList: {
      listStyle: 'none',
      paddingLeft: 0,
      margin: 0
    },
    imageItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem',
      borderBottom: '1px solid #edf2f7',
      gap: '1rem',
      ':last-child': {
        borderBottom: 'none'
      }
    },
    select: {
      padding: '0.5rem',
      borderRadius: '6px',
      border: '1px solid #cbd5e0',
      minWidth: '200px',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    status: {
      fontWeight: '600',
      margin: '1.5rem 0 0.5rem',
      color: 'inherit'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#edf2f7',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '0.5rem'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4f46e5',
      transition: 'width 0.4s ease'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      justifyContent: 'center'
    },
    fileName: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.appWindow}>
        {/* Bouton de retour à l'accueil */}
        <button 
          onClick={() => navigate('/')} 
          style={styles.backButton}
          title="Retour à l'accueil"
        >
          ← Accueil
        </button>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>🗂️ Gestion des classes</h3>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={newClass}
              onChange={(e) => setNewClass(e.target.value)}
              placeholder="Nouvelle classe"
              style={styles.input}
              onKeyPress={(e) => e.key === 'Enter' && handleAddClass()}
            />
            <button onClick={handleAddClass} style={styles.button}>Ajouter</button>
          </div>
          <ul style={styles.classList}>
            {classes.map((cls, idx) => (
              <li key={idx} style={styles.classItem}>
                <span>{cls}</span>
                <button 
                  onClick={() => handleDeleteClass(cls)} 
                  style={styles.deleteButton}
                  title="Supprimer cette classe"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>📥 Upload d'images</h3>
          <div style={styles.fileInputContainer}>
            <button style={styles.fileInputButton}>
              Sélectionner des fichiers
              <input 
                type="file" 
                multiple 
                onChange={handleFilesChange} 
                style={styles.fileInput}
                accept="image/*"
              />
            </button>
          </div>
          {files.length > 0 && (
            <div>
              <h4 style={{ ...styles.sectionTitle, fontSize: '1rem' }}>🖼️ Associer une classe à chaque image</h4>
              <ul style={styles.imageList}>
                {files.map((file, idx) => (
                  <li key={idx} style={styles.imageItem}>
                    <span style={styles.fileName}>{file.name}</span>
                    <select
                      value={labels[idx]}
                      onChange={(e) => handleLabelChange(idx, e.target.value)}
                      style={styles.select}
                    >
                      <option value="">-- Sélectionner --</option>
                      {classes.map((cls, index) => (
                        <option key={index} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {status && (
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ 
              ...styles.status,
              color: status.startsWith('✅') ? '#38a169' : 
                    status.startsWith('❌') ? '#e53e3e' : 
                    status.startsWith('⏳') ? '#3182ce' : 
                    status.startsWith('📦') ? '#805ad5' : '#4a5568'
            }}>
              {status}
            </p>
            {progress > 0 && progress < 100 && (
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
              </div>
            )}
          </div>
        )}

        <div style={styles.actionButtons}>
          <button onClick={handleSubmit} style={styles.button}>✅ Annoter</button>
          <button onClick={handleExport} style={{ ...styles.button, backgroundColor: '#805ad5' }}>📦 Exporter</button>
          <button onClick={handlePreview} style={{ ...styles.button, backgroundColor: '#e2e8f0', color: '#2d3748' }}>📋 Aperçu</button>
        </div>
      </div>
    </div>
  );
}

export default Annotation;