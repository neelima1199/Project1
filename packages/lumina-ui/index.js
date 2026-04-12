import React from 'react';

export const ObsidianCard = ({ children, className = "", title = "", subtitle = "", onClick, style = {} }) => (
  <div className={`obsidian-card ${className}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', ...style }}>
    {subtitle && <div className="mono" style={{ marginBottom: '0.5rem', color: 'var(--accent-brass)' }}>{subtitle}</div>}
    {title && <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>{title}</h3>}
    {children}
  </div>
);

export const PillButton = ({ children, onClick, className = "", dark = false, style = {} }) => {
  const styles = {
    background: dark ? 'var(--text-obsidian)' : 'transparent',
    color: dark ? 'var(--bg-bone)' : 'var(--text-obsidian)',
    border: `1px solid ${dark ? 'transparent' : 'var(--text-obsidian)'}`,
    ...style,
  };

  return (
    <button
      onClick={onClick}
      className={`pill-button ${className}`}
      style={styles}
    >
      {children}
    </button>
  );
};

export const GlassCard = ({ children, style = {}, className = "" }) => (
  <div
    className={className}
    style={{
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      padding: '2.5rem',
      ...style,
    }}
  >
    {children}
  </div>
);

export const NeonButton = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      background: 'transparent',
      color: 'var(--accent-brass)',
      border: '1px solid var(--accent-brass)',
      borderRadius: '100px',
      padding: '0.75rem 2rem',
      cursor: 'pointer',
      fontFamily: 'IBM Plex Mono, monospace',
      fontSize: '0.75rem',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      transition: 'all 0.3s ease',
      ...style,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'var(--accent-brass)';
      e.currentTarget.style.color = '#000';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = 'var(--accent-brass)';
    }}
  >
    {children}
  </button>
);

export const SectionTitle = ({ children, subtitle, align = "left" }) => (
  <div style={{ textAlign: align, marginBottom: '6rem' }}>
    {subtitle && <div className="mono" style={{ marginBottom: '1rem', color: 'var(--accent-brass)' }}>{subtitle}</div>}
    <h2 style={{ fontSize: '3.5rem', margin: 0 }}>{children}</h2>
  </div>
);

export const BrassLine = () => <div className="brass-line" />;
