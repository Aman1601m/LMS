import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        background: 'var(--card-bg)',
        border: `1px solid ${type === 'success' ? '#10b981' : '#ef4444'}`,
        padding: '16px 20px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        minWidth: '300px',
        backdropFilter: 'blur(10px)'
      }}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
      ) : (
        <XCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
      )}
      <span style={{ fontSize: '0.875rem', color: 'white', fontWeight: 500, flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', cursor: 'pointer', padding: '4px' }}>
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
