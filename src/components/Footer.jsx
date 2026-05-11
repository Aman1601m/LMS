import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--card-border)', background: 'var(--bg-color)', paddingTop: '64px', paddingBottom: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          
          {/* Column 1: About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', userSelect: 'none', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '16px' }}>S</span>
              </div>
              <span style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline' }}>
                <strong style={{ fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Smart Future</strong>
                <span style={{ fontWeight: 300, color: 'var(--secondary-color)', marginLeft: '6px' }}>Steps</span>
              </span>
            </div>
            <p style={{ color: 'var(--secondary-color)', lineHeight: 1.6, marginBottom: '24px' }}>
              Empowering the next generation of tech leaders with industry-relevant skills, hands-on projects, and 100% placement assistance.
            </p>

          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><a href="/#courses" className="footer-link">Courses</a></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Courses */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Top Courses</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/courses/digital-marketing" className="footer-link">Digital Marketing</Link></li>
              <li><Link to="/courses/data-analytics" className="footer-link">Data Analytics</Link></li>
              <li><Link to="/courses/mern-stack-development" className="footer-link">MERN Stack Development</Link></li>
              <li><Link to="/courses/python-development" className="footer-link">Python Development</Link></li>
              <li><Link to="/courses/ui-ux-design" className="footer-link">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin className="w-5 h-5" style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ color: 'var(--secondary-color)', lineHeight: 1.5 }}>
                  123 Tech Park, Phase 1,<br />
                  Indore, Madhya Pradesh 452001
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone className="w-5 h-5" style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <p style={{ color: 'var(--secondary-color)' }}>+91 98765 43210</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Mail className="w-5 h-5" style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <p style={{ color: 'var(--secondary-color)' }}>info@smartfuturesteps.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ color: 'var(--secondary-color)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Smart Future Steps. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', fontSize: '0.875rem' }}>
            <a href="#" className="footer-link-small">Privacy Policy</a>
            <a href="#" className="footer-link-small">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}


