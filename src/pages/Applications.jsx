import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJob } from '../context/JobContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import { Search, Eye, Edit2, Trash2, ExternalLink, Plus } from 'lucide-react';

export default function Applications() {
  const { applications, deleteApplication } = useJob();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [deleteId, setDeleteId] = useState(null);

  const filteredApps = useMemo(() => {
    return applications
      .filter(app => {
        const matchesSearch = 
          app.company.toLowerCase().includes(search.toLowerCase()) ||
          app.position.toLowerCase().includes(search.toLowerCase()) ||
          (app.location && app.location.toLowerCase().includes(search.toLowerCase()));
        
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'Newest') return new Date(b.appliedDate) - new Date(a.appliedDate);
        if (sortBy === 'Oldest') return new Date(a.appliedDate) - new Date(b.appliedDate);
        if (sortBy === 'Company A-Z') return a.company.localeCompare(b.company);
        if (sortBy === 'Company Z-A') return b.company.localeCompare(a.company);
        return 0;
      });
  }, [applications, search, statusFilter, sortBy]);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteApplication(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Filter Bar */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by company, position, location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '36px' }}
            />
          </div>

          <select className="form-control" style={{ width: '150px' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <label style={{ fontSize: '0.875rem', color: '#64748b' }}>Sort:</label>
          <select className="form-control" style={{ width: '150px' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Company A-Z">Company A-Z</option>
            <option value="Company Z-A">Company Z-A</option>
          </select>

          <button className="btn btn-primary" onClick={() => navigate('/applications/add')}>
            <Plus size={16} /> Add Job
          </button>
        </div>
      </div>

      {/* Main List */}
      {filteredApps.length === 0 ? (
        <EmptyState message="No matching job applications found" actionText="Add Application" actionLink="/applications/add" />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="card desktop-table-container" style={{ padding: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: '600' }}>{app.company}</td>
                    <td>{app.position}</td>
                    <td style={{ color: '#64748b' }}>{app.location || 'N/A'}</td>
                    <td style={{ color: '#64748b' }}>{app.salary || 'N/A'}</td>
                    <td>{app.appliedDate}</td>
                    <td><StatusBadge status={app.status} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary" style={{ padding: '6px' }} title="View Details" onClick={() => navigate(`/applications/${app.id}`)}>
                          <Eye size={15} />
                        </button>
                        <button className="btn btn-secondary" style={{ padding: '6px' }} title="Edit" onClick={() => navigate(`/applications/edit/${app.id}`)}>
                          <Edit2 size={15} />
                        </button>
                        <button className="btn btn-danger" style={{ padding: '6px' }} title="Delete" onClick={() => setDeleteId(app.id)}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="mobile-cards-container" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
            {filteredApps.map((app) => (
              <div key={app.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{app.company}</h3>
                    <div style={{ color: '#2563eb', fontWeight: '500', fontSize: '0.95rem' }}>{app.position}</div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem', color: '#64748b', margin: '0.75rem 0' }}>
                  <div>📍 {app.location || 'N/A'}</div>
                  <div>💰 {app.salary || 'N/A'}</div>
                  <div>📅 Applied: {app.appliedDate}</div>
                </div>

                <div style={{ display: 'flex', gap: '8px', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => navigate(`/applications/${app.id}`)}>
                    <Eye size={14} /> View
                  </button>
                  <button className="btn btn-secondary" style={{ flex: 1, padding: '6px' }} onClick={() => navigate(`/applications/edit/${app.id}`)}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button className="btn btn-danger" style={{ padding: '6px 12px' }} onClick={() => setDeleteId(app.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Delete Job Application?"
        message="Are you sure you want to delete this job record? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}