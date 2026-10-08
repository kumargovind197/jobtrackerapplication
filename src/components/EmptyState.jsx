import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus } from 'lucide-react';

export default function EmptyState({ message, actionText, actionLink }) {
  return (
    <div style={{
      padding: '3rem 1.5rem',
      textAlign: 'center',
      backgroundColor: 'var(--bg-surface, #ffffff)',
      borderRadius: '12px',
      border: '1px dashed var(--border-color, #e2e8f0)',
      margin: '1rem 0'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-main, #f8fafc)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem auto',
        color: '#64748b'
      }}>
        <Briefcase size={28} />
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text-main, #0f172a)' }}>
        {message || 'No applications found'}
      </h3>
      <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-sub, #64748b)', fontSize: '0.9rem' }}>
        Start tracking your job search by adding your first application.
      </p>
      {actionLink && (
        <Link to={actionLink} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '0.9rem'
        }}>
          <Plus size={16} />
          {actionText || 'Add Application'}
        </Link>
      )}
    </div>
  );
}