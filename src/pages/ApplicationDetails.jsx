import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '../context/JobContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import { ArrowLeft, ExternalLink, Edit2, Trash2, MapPin, DollarSign, Calendar, Globe } from 'lucide-react';

export default function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getApplicationById, deleteApplication } = useJob();
  const [showConfirm, setShowConfirm] = useState(false);

  const app = getApplicationById(id);

  if (!app) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <h2>Application Not Found</h2>
        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>The requested job application could not be located.</p>
        <button className="btn btn-primary" onClick={() => navigate('/applications')}>
          Back to Applications
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteApplication(app.id);
    navigate('/applications');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <button 
        onClick={() => navigate('/applications')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          color: '#64748b',
          cursor: 'pointer',
          fontWeight: '500',
          width: 'fit-content'
        }}
      >
        <ArrowLeft size={16} /> Back to Applications
      </button>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color, #e2e8f0)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
          <div>
            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.5rem' }}>{app.company}</h1>
            <div style={{ fontSize: '1.1rem', color: '#2563eb', fontWeight: '500' }}>{app.position}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <StatusBadge status={app.status} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: '#64748b' }}><MapPin size={18} /></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Location</div>
              <div style={{ fontWeight: '500' }}>{app.location || 'Not Specified'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: '#64748b' }}><DollarSign size={18} /></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Salary</div>
              <div style={{ fontWeight: '500' }}>{app.salary || 'Not Specified'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ color: '#64748b' }}><Calendar size={18} /></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Applied Date</div>
              <div style={{ fontWeight: '500' }}>{app.appliedDate}</div>
            </div>
          </div>
        </div>

        {app.jobUrl && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>Job Posting Link</div>
            <a 
              href={app.jobUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
            >
              <Globe size={15} /> Open Job Posting <ExternalLink size={14} />
            </a>
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>Notes</h3>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--bg-main, #f8fafc)',
            borderRadius: '8px',
            border: '1px solid var(--border-color, #e2e8f0)',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5',
            color: 'var(--text-main, #0f172a)'
          }}>
            {app.notes || 'No notes added for this job application.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
          <button className="btn btn-secondary" onClick={() => navigate(`/applications/edit/${app.id}`)}>
            <Edit2 size={15} /> Edit
          </button>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            <Trash2 size={15} /> Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Job Application?"
        message="Are you sure you want to delete this job application? This action cannot be reverted."
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}