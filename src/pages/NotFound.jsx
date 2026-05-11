import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px', background: '#050505' }}>
      <div className="glow-bg"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div style={{ width: '350px', height: '350px', margin: '0 auto 24px' }}>
          <DotLottieReact
            src="https://lottie.host/803f2747-d57a-4c28-9f3f-914856f64264/K25XU46A4y.lottie"
            loop
            autoplay
          />
        </div>
        
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Oops! You're Lost</h2>
        <p style={{ color: 'var(--secondary-color)', maxWidth: '400px', margin: '0 auto 40px', lineHeight: 1.6 }}>
          The page you are looking for has either moved or doesn't exist. Let's get you back on track!
        </p>
        
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 32px' }}>
          <Home className="w-4 h-4" /> Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
