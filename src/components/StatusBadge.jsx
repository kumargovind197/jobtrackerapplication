import React from 'react';
import { Clock, MessageSquareCheck, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  const getBadgeConfig = (st) => {
    switch (st) {
      case 'Applied':
        return { label: 'Applied', bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', icon: Clock };
      case 'Interview':
        return { label: 'Interview', bg: '#fef3c7', text: '#b45309', border: '#fde68a', icon: MessageSquareCheck };
      case 'Offer':
        return { label: 'Offer', bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', icon: CheckCircle2 };
      case 'Rejected':
        return { label: 'Rejected', bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5', icon: XCircle };
      case 'Withdrawn':
        return { label: 'Withdrawn', bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', icon: MinusCircle };
      default:
        return { label: status, bg: '#f1f5f9', text: '#475569', border: '#cbd5e1', icon: Clock };
    }
  };

  const config = getBadgeConfig(status);
  const Icon = config.icon;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: '600',
      backgroundColor: config.bg,
      color: config.text,
      border: `1px solid ${config.border}`,
      whiteSpace: 'nowrap'
    }}>
      <Icon size={13} />
      {config.label}
    </span>
  );
}