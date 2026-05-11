import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { courses as defaultCourses } from '../data/constants';

export default function EnrollModal({ isModalOpen, setIsModalOpen, showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', courseOfInterest: 'MERN Stack Development' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseList, setCourseList] = useState(defaultCourses);

  useEffect(() => {
    if (isModalOpen) {
      fetch('http://localhost:5000/api/courses')
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            setCourseList(data);
            if (!formData.courseOfInterest || formData.courseOfInterest === 'MERN Stack Development') {
              setFormData(prev => ({ ...prev, courseOfInterest: data[0].title }));
            }
          }
        })
        .catch(err => console.error("Error fetching courses for modal", err));
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email', 'error');
      return false;
    }
    if (formData.phone.length < 10) {
      showToast('Please enter a valid 10-digit phone number', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast('Inquiry submitted successfully! We will call you soon.');
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', courseOfInterest: courseList.length > 0 ? courseList[0].title : 'MERN Stack Development' });
      } else { 
        showToast('Failed to submit. Please try again.', 'error');
      }
    } catch (err) { 
      showToast('Server error. Please check your connection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="modal-content"
      >
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Start Your Journey</h2>
        <p style={{ color: 'var(--secondary-color)', marginBottom: '32px' }}>Fill out the form below and our team will get in touch with you shortly.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" required className="form-input" placeholder="Enter Your Full Name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" required className="form-input" placeholder="Enter Your Email Address" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" name="phone" required className="form-input" placeholder="Enter Your Phone Number" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Course of Interest</label>
            <select name="courseOfInterest" className="form-input form-select" value={formData.courseOfInterest} onChange={handleChange}>
              {courseList.length > 0 ? (
                courseList.map((c, i) => (
                  <option key={i} value={c.title} style={{ background: '#0a0a0a' }}>{c.title}</option>
                ))
              ) : (
                <option value="MERN Stack Development" style={{ background: '#0a0a0a' }}>MERN Stack Development</option>
              )}
            </select>
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '16px' }} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enrollment Request'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
