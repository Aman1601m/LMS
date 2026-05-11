import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ setIsModalOpen }) {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="glass-panel pill-nav">
      <Link to="/" onClick={handleHomeClick} style={{ marginRight: '24px', display: 'flex', alignItems: 'center', gap: '10px', userSelect: 'none' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}>
          <span style={{ color: 'white', fontWeight: 800, fontSize: '16px' }}>S</span>
        </div>
        <span style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline' }}>
          <strong style={{ fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Future</strong>
          <span style={{ fontWeight: 300, color: 'var(--secondary-color)', marginLeft: '6px' }}>Steps</span>
        </span>
      </Link>
      <Link to="/" onClick={handleHomeClick} className="nav-link">Home</Link>
      <a href="/#courses" className="nav-link">Courses</a>
      <Link to="/about" className="nav-link">About Us</Link>
      <Link to="/contact" className="nav-link">Contact Us</Link>
      <button className="btn-primary" style={{ whiteSpace: 'nowrap' }} onClick={() => setIsModalOpen(true)}>Enroll Now</button>
    </nav>
  );
}
