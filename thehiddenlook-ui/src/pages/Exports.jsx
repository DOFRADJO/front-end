import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Exports() {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [exportHistory, setExportHistory] = useState([]);
  const fileInputRef = useRef(null);

  // Données simulées pour l'historique
  const demoHistory = [
    { id: 1, type: 'Annotations', format: 'JSON', date: '2023-05-15', size: '45KB' },
    { id: 2, type: 'Scenes', format: 'CSV', date: '2023-05-14', size: '12KB' },
    { id: 3, type: 'Face Recognition', format: 'JSON', date: '2023-05-13', size: '78KB' }
  ];

  const handleExport = () => {
    // Simulation d'export
    const newExport = {
      id: exportHistory.length + 1,
      type: 'Custom Export',
      format: selectedFormat.toUpperCase(),
      date: new Date().toISOString().split('T')[0],
      size: `${Math.floor(Math.random() * 100)}KB`
    };
    
    setExportHistory([newExport, ...exportHistory]);
    alert(`Export ${selectedFormat} généré avec succès!`);
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
          >
            Générer l'Export
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📜 Historique des Exports</h2>
          <table style={styles.historyTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Type</th>
                <th style={styles.tableHeader}>Format</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Taille</th>
              </tr>
            </thead>
            <tbody>
              {exportHistory.length > 0 ? (
                exportHistory.map((item) => (
                  <tr key={item.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{item.type}</td>
                    <td style={styles.tableCell}>{item.format}</td>
                    <td style={styles.tableCell}>{item.date}</td>
                    <td style={styles.tableCell}>{item.size}</td>
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
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f2f5',
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
    position: 'relative'
  },
  title: {
    textAlign: 'center',
    color: '#2d3748',
    marginBottom: '30px'
  },
  section: {
    marginBottom: '30px'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#4a5568',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  formatSelector: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  exportButton: {
    padding: '12px 24px',
    backgroundColor: '#06b6d4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#0891b2'
    }
  },
  historyTable: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '15px'
  },
  tableHeader: {
    backgroundColor: '#edf2f7',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #e2e8f0'
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    ':hover': {
      backgroundColor: '#f8fafc'
    }
  },
  tableCell: {
    padding: '12px'
  }
};

export default Exports;