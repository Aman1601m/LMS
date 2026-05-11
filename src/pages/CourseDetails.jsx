import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BookOpen, Send } from 'lucide-react';
import { courses as defaultCourses } from '../data/constants';
import Loader from '../components/Loader';

export default function CourseDetails({ showToast }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', courseOfInterest: '' });

  useEffect(() => {
    let isMounted = true;
    const fetchCourse = async () => {
      // Artificial delay to show the awesome loader for a bit
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const res = await fetch('/api/courses', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          const found = data.find(c => c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
          if (found && isMounted) {
            setCourse(found);
            setFormData(prev => ({ ...prev, courseOfInterest: found.title }));
            return;
          }
        }
      } catch (err) {
        // Fallback handled below
      }

      const localFound = defaultCourses.find(c => c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
      if (localFound && isMounted) {
        setCourse(localFound);
        setFormData(prev => ({ ...prev, courseOfInterest: localFound.title }));
      } else if (isMounted) {
        navigate('/');
      }
    };
    fetchCourse();
    return () => { isMounted = false; };
  }, [slug, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.phone.length < 10) {
      showToast('Please enter a valid phone number', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast('Application submitted! Our team will call you soon.');
        setFormData({ name: '', email: '', phone: '', courseOfInterest: course.title });
      } else {
        showToast('Submission failed. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Server error. Please check your connection.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (!course) return <Loader />;

  return (
    <main style={{ padding: '160px 24px 80px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px', alignItems: 'start' }}>
        
        {/* Course Info (Left) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '100px', marginBottom: '24px', fontSize: '0.875rem' }}>
            {course.category || 'Professional Course'}
          </div>
          <h1 className="gradient-text" style={{ fontSize: '3.5rem', lineHeight: 1.2, marginBottom: '24px' }}>{course.title}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--secondary-color)', lineHeight: 1.6, marginBottom: '32px' }}>
            {course.description}
          </p>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
              <span>Duration: {course.duration || '3 Months'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
              <span>100% Practical</span>
            </div>
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>What you'll learn</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
            {['Industry-standard best practices', 'Hands-on projects & assignments', 'Interview preparation & mock tests', 'Real-world problem solving'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                <CheckCircle className="w-5 h-5" style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {course.syllabus && course.syllabus.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Course Curriculum</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {course.syllabus.map((topic, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.05 }}
                    style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary-color)', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '1.125rem' }}>{topic}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Enrollment Form (Right Sidebar) */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ position: 'sticky', top: '100px' }}>
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Enroll in {course.title}</h3>
            <p style={{ color: 'var(--secondary-color)', fontSize: '0.875rem', marginBottom: '24px' }}>Leave your details and our counselor will call you.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" className="form-input" placeholder="Enter name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" name="email" className="form-input" placeholder="Enter email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" name="phone" className="form-input" placeholder="Enter mobile number" required value={formData.phone} onChange={handleChange} />
              </div>
              
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Apply Now'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
