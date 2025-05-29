import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SceneDetection() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [frames, setFrames] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const videoURL = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = videoURL;
      }
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const detectScenes = async () => {
    if (!videoFile) {
      setStatus("❌ Veuillez d'abord sélectionner une vidéo");
      return;
    }

    setIsProcessing(true);
    setStatus("⏳ Analyse de la vidéo en cours...");

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      const response = await axios.post('http://localhost:8000/scene-splitter/detect', formData);
      setScenes(response.data.scenes);
      setStatus(`✅ Détection terminée - ${response.data.scenes.length} scènes trouvées`);
    } catch (error) {
      console.error(error);
      const detail = error.response?.data?.detail || "Erreur inconnue";
      setStatus(`⚠️ La vidéo a été traitée mais la réponse a échoué : ${detail}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteVideoData = async () => {
    if (!videoFile) {
      setStatus("❌ Aucune vidéo à supprimer");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/scene-splitter/delete?filename=${videoFile.name}`);
      setVideoFile(null);
      setScenes([]);
      setFrames([]);
      setStatus("✅ Vidéo et données supprimées avec succès");
    } catch (error) {
      console.error(error);
      setStatus("❌ Échec de la suppression de la vidéo");
    }
  };

  const fetchAllSceneDetails = async () => {
    if (!videoFile) return;

    try {
      const [scenesRes, framesRes] = await Promise.all([
        axios.get(`http://localhost:8000/scene-splitter/scenes/${videoFile.name}`),
        axios.get(`http://localhost:8000/scene-splitter/frames/${videoFile.name}`)
      ]);

      setScenes(scenesRes.data);
      setFrames(framesRes.data);
      setStatus("✅ Scènes + frames récupérées avec succès");
    } catch (error) {
      console.error(error);
      const detail = error.response?.data?.detail || "Erreur inconnue";
      setStatus(`❌ Erreur lors de la récupération : ${detail}`);
    }
  };

  const handleTimeChange = (id, field, value) => {
    const updated = scenes.map(scene =>
      scene.scene_id === id ? { ...scene, [field]: value } : scene
    );
    setScenes(updated);
  };

  const calculateDuration = (start, end) => {
    const toSec = t => {
      const [h, m, s] = t.split(':').map(Number);
      return h * 3600 + m * 60 + s;
    };
    const total = toSec(end) - toSec(start);
    const h = Math.floor(total / 3600).toString().padStart(2, '0');
    const m = Math.floor((total % 3600) / 60).toString().padStart(2, '0');
    const s = (total % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getStatusStyle = () => {
    if (status.startsWith('✅')) return { color: '#15803d', backgroundColor: '#dcfce7' };
    if (status.startsWith('❌')) return { color: '#b91c1c', backgroundColor: '#fee2e2' };
    if (status.startsWith('⏳')) return { color: '#1d4ed8', backgroundColor: '#dbeafe' };
    return {};
  };

    const styles = {
    pageBackground: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
    appWindow: { backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1)', width: '90%', maxWidth: '1000px', padding: '40px', position: 'relative', margin: '50px', left: '250px' },
    backButton: { position: 'absolute', top: '20px', left: '20px', padding: '0.5rem 1rem', backgroundColor: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    section: { marginBottom: '2rem', padding: '1.5rem', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' },
    sectionTitle: { color: '#4a5568', marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem' },
    button: { padding: '0.75rem 1.5rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' },
    deleteButton: { padding: '0.75rem 1.5rem', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', marginLeft: '1rem' },
    fileInputButton: { padding: '0.75rem 1.5rem', backgroundColor: '#e2e8f0', color: '#2d3748', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' },
    videoContainer: { position: 'relative', width: '100%', marginTop: '1rem' },
    video: { width: '100%', borderRadius: '8px' },
    sceneList: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    sceneHeader: { backgroundColor: '#edf2f7', padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0' },
    sceneRow: { borderBottom: '1px solid #e2e8f0' },
    sceneCell: { padding: '0.75rem' },
    timeInput: { padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: '4px', width: '80px', textAlign: 'center' },
    status: { margin: '1rem 0', padding: '0.75rem', borderRadius: '8px', fontWeight: '600' },
    actionButtons: { display: 'flex', gap: '1rem', marginTop: '1.5rem' }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.appWindow}>
        <button onClick={() => navigate('/')} style={styles.backButton}>← Accueil</button>

        <h1 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '2rem' }}>🎬 Découpage de Scènes Vidéo</h1>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📹 Vidéo Source</h2>
          <button onClick={triggerFileInput} style={styles.fileInputButton}>
            {videoFile ? videoFile.name : 'Sélectionner une vidéo...'}
          </button>
          <input type="file" accept="video/*" onChange={handleVideoUpload} ref={fileInputRef} hidden />
          {videoFile && (
            <div style={styles.videoContainer}>
              <video ref={videoRef} controls style={styles.video} />
            </div>
          )}
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>✂️ Découpage des Scènes</h2>
          <div style={styles.actionButtons}>
            <button onClick={detectScenes} style={styles.button} disabled={!videoFile || isProcessing}>
              {isProcessing ? 'Analyse en cours...' : 'Détecter les scènes automatiquement'}
            </button>
            <button onClick={deleteVideoData} style={styles.deleteButton} disabled={!videoFile}>
              Supprimer la vidéo
            </button>
            <button onClick={fetchAllSceneDetails} style={styles.fileInputButton} disabled={!videoFile}>
              🔁 Récupérer scènes + frames
            </button>
          </div>

          {scenes.length > 0 && (
            <table style={styles.sceneList}>
              <thead>
                <tr>
                  <th style={styles.sceneHeader}>Scène</th>
                  <th style={styles.sceneHeader}>Début</th>
                  <th style={styles.sceneHeader}>Fin</th>
                  <th style={styles.sceneHeader}>Durée</th>
                  <th style={styles.sceneHeader}>Frames</th>
                </tr>
              </thead>
              <tbody>
                {scenes.map(scene => {
                  const sceneFrames = frames.filter(f => f.scene_id === scene.scene_id);
                  return (
                    <tr key={scene.scene_id} style={styles.sceneRow}>
                      <td style={styles.sceneCell}>Scène {scene.scene_id}</td>
                      <td style={styles.sceneCell}>
                        <input type="text" value={scene.start} onChange={(e) => handleTimeChange(scene.scene_id, 'start', e.target.value)} style={styles.timeInput} />
                      </td>
                      <td style={styles.sceneCell}>
                        <input type="text" value={scene.end} onChange={(e) => handleTimeChange(scene.scene_id, 'end', e.target.value)} style={styles.timeInput} />
                      </td>
                      <td style={styles.sceneCell}>{calculateDuration(scene.start, scene.end)}</td>
                      <td style={styles.sceneCell}>
                        {sceneFrames.length > 0 ? (
                          sceneFrames.map(frame => (
                            <img key={frame._id} src={`http://localhost:8000/${frame.image_path}`} alt="frame" width="80" style={{ marginRight: '5px' }} />
                          ))
                        ) : (
                          <span style={{ color: '#999' }}>Non disponible</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        {status && <div style={getStatusStyle()}>{status}</div>}
      </div>
    </div>
  );
}

export default SceneDetection;
