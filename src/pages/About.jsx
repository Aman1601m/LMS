import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Trophy } from 'lucide-react';

export default function About() {
  return (
    <main style={{ padding: '160px 24px 80px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '80px' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '24px' }}>
          About Smart Future Steps
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: '1.25rem', color: 'var(--secondary-color)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          We are dedicated to bridging the gap between academic learning and industry requirements. 
          Our goal is to empower students and professionals with the cutting-edge skills needed to thrive in today's tech-driven world.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '80px' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '24px' }}>
            <Target className="w-8 h-8" />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>Our Mission</h2>
          <p style={{ color: 'var(--secondary-color)', lineHeight: 1.6 }}>
            To provide world-class tech education that is accessible, practical, and aligned with current industry standards. We strive to create job-ready professionals who can contribute immediately to the workforce.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', marginBottom: '24px' }}>
            <Eye className="w-8 h-8" />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>Our Vision</h2>
          <p style={{ color: 'var(--secondary-color)', lineHeight: 1.6 }}>
            To be the leading tech-education platform recognized globally for producing innovative thinkers, exceptional developers, and future leaders of the IT industry.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us / Stats */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Why Smart Future Steps?</h2>
          <p style={{ color: 'var(--secondary-color)' }}>We don't just teach, we build careers.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bento-item" style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ color: '#10b981', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Users className="w-10 h-10" />
            </div>
            <h3 style={{ fontSize: '2rem', marginBottom: '8px' }}>1000+</h3>
            <p style={{ color: 'var(--secondary-color)' }}>Students Trained</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bento-item" style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ color: '#f59e0b', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Trophy className="w-10 h-10" />
            </div>
            <h3 style={{ fontSize: '2rem', marginBottom: '8px' }}>500+</h3>
            <p style={{ color: 'var(--secondary-color)' }}>Successful Placements</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bento-item" style={{ textAlign: 'center', padding: '32px' }}>
            <div style={{ color: '#ef4444', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <Target className="w-10 h-10" />
            </div>
            <h3 style={{ fontSize: '2rem', marginBottom: '8px' }}>50+</h3>
            <p style={{ color: 'var(--secondary-color)' }}>Hiring Partners</p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
