import React, { useState } from 'react';
import { useJob } from '../context/JobContext';
import ConfirmModal from '../components/ConfirmModal';
import { Moon, Sun, Download, Upload, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function Settings() {
  const { theme, setTheme, applications, importApplications, clearAllApplications } = useJob();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [message, setMessage] = useState(null);

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applications, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "job-applications.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    setMessage({ type: 'success', text: 'Applications exported successfully!' });
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const success = importApplications(parsed);
        if (success) {
          setMessage({ type: 'success', text: 'Data imported successfully!' });
        } else {
          setMessage({ type: 'error', text: 'Invalid JSON structure.' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to parse JSON file.' });
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    clearAllApplications();
    setShowClearConfirm(false);
    setMessage({ type: 'success', text: 'All application data cleared.' });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {message && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: message.type === 'success' ? '#15803d' : '#b91c1c',
          border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fca5a5'}`
        }}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Theme Preference */}
      <div className="card">
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Appearance</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Choose your interface light or dark theme.</p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setTheme('light')}
            className="btn"
            style={{
              flex: 1,
              padding: '12px',
              border: `2px solid ${theme === 'light' ? '#2563eb' : 'var(--border-color, #e2e8f0)'}`,
              backgroundColor: 'var(--bg-surface, #ffffff)',
              color: 'var(--text-main, #0f172a)',
              justifyContent: 'center'
            }}
          >
            <Sun size={18} /> Light
          </button>

          <button
            onClick={() => setTheme('dark')}
            className="btn"
            style={{
              flex: 1,
              padding: '12px',
              border: `2px solid ${theme === 'dark' ? '#2563eb' : 'var(--border-color, #e2e8f0)'}`,
              backgroundColor: 'var(--bg-surface, #ffffff)',
              color: 'var(--text-main, #0f172a)',
              justifyContent: 'center'
            }}
          >
            <Moon size={18} /> Dark
          </button>
        </div>
      </div>

      {/* Data Import / Export */}
      <div className="card">
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Data Management</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Export your records as JSON or restore backup files.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} /> Export Applications
          </button>

          <label className="btn btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
            <Upload size={16} /> Import Applications
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: '#fca5a5' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#dc2626' }}>Danger Zone</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Permanently clear all stored job applications.</p>

        <button className="btn btn-danger" onClick={() => setShowClearConfirm(true)}>
          <Trash2 size={16} /> Clear All Data
        </button>
      </div>

      <ConfirmModal
        isOpen={showClearConfirm}
        title="Clear All Applications?"
        message="Are you sure you want to clear all job tracker data? This action will completely erase your LocalStorage data."
        onConfirm={handleClear}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
}