import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJob } from '../context/JobContext';
import StatusBadge from '../components/StatusBadge';
import { Plus, Briefcase, Clock, MessageSquareCheck, CheckCircle2, XCircle, Eye } from 'lucide-react';

export default function Dashboard() {
  const { applications } = useJob();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(a => a.status === 'Applied').length;
    const interview = applications.filter(a => a.status === 'Interview').length;
    const offer = applications.filter(a => a.status === 'Offer').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    return { total, applied, interview, offer, rejected };
  }, [applications]);

  const recentApps = useMemo(() => {
    return [...applications]
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
      .slice(0, 5);
  }, [applications]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Banner */}
      <div className="welcome-banner">
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.4rem' }}>Welcome back! 👋</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>Track your job search, organize interviews, and land your dream role.</p>
        </div>
        <button className="btn btn-primary" style={{ backgroundColor: '#ffffff', color: '#2563eb' }} onClick={() => navigate('/applications/add')}>
          <Plus size={16} /> Add Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}><Briefcase size={20} /></div>
          <div><div className="stat-value">{stats.total}</div><div className="stat-label">Total Applications</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}><Clock size={20} /></div>
          <div><div className="stat-value">{stats.applied}</div><div className="stat-label">Applied</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fef3c7', color: '#d97706' }}><MessageSquareCheck size={20} /></div>
          <div><div className="stat-value">{stats.interview}</div><div className="stat-label">Interviews</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}><CheckCircle2 size={20} /></div>
          <div><div className="stat-value">{stats.offer}</div><div className="stat-label">Offers</div></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}><XCircle size={20} /></div>
          <div><div className="stat-value">{stats.rejected}</div><div className="stat-label">Rejected</div></div>
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="card">
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Application Progress Breakdown</h3>
        <div style={{ height: '10px', borderRadius: '5px', backgroundColor: '#e2e8f0', overflow: 'hidden', display: 'flex' }}>
          {stats.total > 0 ? (
            <>
              <div style={{ width: `${(stats.applied / stats.total) * 100}%`, backgroundColor: '#3b82f6' }} title="Applied" />
              <div style={{ width: `${(stats.interview / stats.total) * 100}%`, backgroundColor: '#f59e0b' }} title="Interview" />
              <div style={{ width: `${(stats.offer / stats.total) * 100}%`, backgroundColor: '#22c55e' }} title="Offer" />
              <div style={{ width: `${(stats.rejected / stats.total) * 100}%`, backgroundColor: '#ef4444' }} title="Rejected" />
            </>
          ) : (
            <div style={{ width: '100%', backgroundColor: '#cbd5e1' }} />
          )}
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3b82f6' }} /> Applied</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }} /> Interview</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e' }} /> Offer</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} /> Rejected</span>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #e2e8f0)' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Recent Applications</h3>
          <Link to="/applications" style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>View All →</Link>
        </div>

        {recentApps.length === 0 ? (
          <p style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>No applications yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: '600' }}>{app.company}</td>
                    <td>{app.position}</td>
                    <td>{app.appliedDate}</td>
                    <td><StatusBadge status={app.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ padding: '4px 8px' }} onClick={() => navigate(`/applications/${app.id}`)}>
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}