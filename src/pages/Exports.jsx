// Exports.jsx (version finale)

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Exports() {
  const location = useLocation();
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [exportHistory, setExportHistory] = useState([]);
  const [downloading, setDownloading] = useState(false);

  // Détecter automatiquement le service depuis l'URL (ex: /annotation => "annotation")
  const currentService = location.pathname.split('/')[1] || 'annotation';

  const handleExport = async () => {
    try {
      setDownloading(true);
      const response = await fetch('http://localhost:8000/export/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service: currentService,
          formats: [selectedFormat],
          user_id: 'user123' // simulé
        })
      });

      if (!response.ok) throw new Error('Erreur lors de lexport.');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentService}_export.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      alert(`Export ${selectedFormat.toUpperCase()} téléchargé avec succès!`);
    } catch (error) {
      alert(error.message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.appWindow}>
        <h1 style={styles.title}>📤 Module d'Export</h1>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>⚙️ Paramètres d'Export</h2>
          <div style={styles.formatSelector}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="exportFormat"
                value="json"
                checked={selectedFormat === 'json'}
                onChange={() => setSelectedFormat('json')}
              />
              Format JSON
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="exportFormat"
                value="csv"
                checked={selectedFormat === 'csv'}
                onChange={() => setSelectedFormat('csv')}
              />
              Format CSV
            </label>
          </div>

          <button 
            onClick={handleExport}
            style={styles.exportButton}
            disabled={downloading}
          >
            {downloading ? 'Téléchargement...' : 'Générer lexport'}
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📜 Historique des Exports</h2>
          <table style={styles.historyTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Service</th>
                <th style={styles.tableHeader}>Format</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Nom</th>
              </tr>
            </thead>
            <tbody>
              {exportHistory.length > 0 ? (
                exportHistory.map((item) => (
                  <tr key={item.filename} style={styles.tableRow}>
                    <td style={styles.tableCell}>{item.service}</td>
                    <td style={styles.tableCell}>{item.format.join(', ')}</td>
                    <td style={styles.tableCell}>{item.date}</td>
                    <td style={styles.tableCell}>{item.filename}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ ...styles.tableCell, textAlign: 'center', padding: '20px' }}>
                    Aucun export généré pour le moment
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
  },
  appWindow: {
    backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    width: '90%', maxWidth: '1000px', padding: '40px', position: 'relative'
  },
  title: { textAlign: 'center', color: '#2d3748', marginBottom: '30px' },
  section: { marginBottom: '30px' },
  sectionTitle: { fontSize: '1.2rem', marginBottom: '1rem', color: '#4a5568' },
  formatSelector: { display: 'flex', gap: '20px', marginBottom: '20px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  exportButton: {
    padding: '12px 24px', backgroundColor: '#06b6d4', color: 'white', border: 'none',
    borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: '500'
  },
  historyTable: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
  tableHeader: { backgroundColor: '#edf2f7', padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' },
  tableRow: { borderBottom: '1px solid #e2e8f0' },
  tableCell: { padding: '12px' }
};

export default Exports;
