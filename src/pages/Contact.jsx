import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <main style={{ padding: '160px 24px 80px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-text"
          style={{ fontSize: '3.5rem', marginBottom: '16px' }}
        >
          Get in Touch
        </motion.h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--secondary-color)', maxWidth: '600px', margin: '0 auto' }}>
          Have questions about our courses or placement support? Reach out to us.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
        
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '32px' }}>Contact Information</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>Email Us</h3>
                <p style={{ color: 'var(--secondary-color)' }}>info@smartfuturestep.in</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>Call Us</h3>
                <p style={{ color: 'var(--secondary-color)' }}>+91 9876543210</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(147, 51, 234, 0.1)', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>Visit Us</h3>
                <p style={{ color: 'var(--secondary-color)', marginBottom: '8px' }}>314, Shagun Arcade Vijay Nagar, Indore</p>
                <p style={{ color: 'var(--secondary-color)' }}></p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Send us a message</h3>
            <form>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" className="form-input" placeholder="Enter name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input type="email" className="form-input" placeholder="Enter email" required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" placeholder="Type your message here.." rows="4" style={{ resize: 'none' }} required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
