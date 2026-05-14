import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Star, Target, LineChart, Terminal, Shield, Database, Cpu, Globe, Box, GitBranch } from 'lucide-react';
import Skeleton from '../components/Skeleton';
import { courses as defaultCourses, stats, testimonials as defaultTestimonials, goals } from '../data/constants';
import API_BASE_URL from '../config/api';

const iconMap = {
  Code: <Code className="w-6 h-6" />,
  LineChart: <LineChart className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />
};

export default function Home({ setIsModalOpen, showToast }) {
  const [courses, setCourses] = useState(defaultCourses);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [courseRes, testRes, placedRes] = await Promise.all([
          fetch(`${API_BASE_URL}/courses`),
          fetch(`${API_BASE_URL}/testimonials`),
          fetch(`${API_BASE_URL}/placed-students`)
        ]);
        if (courseRes.ok) {
          const courseData = await courseRes.json();
          if (courseData.length > 0) setCourses(courseData);
        }
        if (testRes.ok) {
          const testData = await testRes.json();
          if (testData.length > 0) setTestimonials(testData);
        }
        if (placedRes.ok) {
          const placedData = await placedRes.json();
          setPlacedStudents(placedData);
        }
      } catch (err) {
        showToast('Failed to load live data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showToast]);

  return (
    <main style={{ padding: '160px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '120px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '100px', marginBottom: '32px', fontSize: '0.875rem', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
            Admissions Open {new Date().getFullYear()}
          </div>
          <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '32px', letterSpacing: '-0.02em' }}>
            Master the Future of <br /> Digital Technology
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--secondary-color)', maxWidth: '700px', margin: '0 auto 48px', lineHeight: 1.6 }}>
            Join central India's leading IT training institute. Learn from industry experts and get placed in top MNCs.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Start Learning Now</button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '120px' }}>
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-color)' }}>{stat.value}</div>
            <div style={{ color: 'var(--secondary-color)', fontWeight: 500 }}>{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Courses Section */}
      <section id="courses" style={{ marginBottom: '120px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Industry-Ready Programs</h2>
          <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Comprehensive curriculums designed by industry experts to get you hired.</p>
        </div>
        <div className="bento-grid">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bento-item">
                <Skeleton width="48px" height="48px" borderRadius="12px" style={{ marginBottom: '24px' }} />
                <Skeleton width="80%" height="28px" style={{ marginBottom: '16px' }} />
                <Skeleton width="100%" height="60px" />
              </div>
            ))
          ) : (
            courses.map((course, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bento-item">
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: course.color || '#3b82f6' }}>
                  {iconMap[course.icon] || <Code className="w-6 h-6" />}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{course.title}</h3>
                <p style={{ lineHeight: 1.6, marginBottom: '24px' }}>{course.description}</p>
                <Link to={`/courses/${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: 500 }}>
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Tools Section */}
      <section style={{ marginBottom: '120px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', marginBottom: '16px' }}
          >
            Master the Industry-Standard Tools
          </motion.h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--secondary-color)', maxWidth: '600px', margin: '0 auto' }}>Works seamlessly with the tools you already use and love.</p>
        </div>
        
        <div style={{ position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
          <motion.div 
            style={{ display: 'flex', gap: '24px', width: 'max-content' }}
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, idx) => (
              <React.Fragment key={idx}>
                {[
                  { name: 'VS Code', icon: <Terminal />, color: '#007acc' },
                  { name: 'GitHub', icon: <GitBranch />, color: '#ffffff' },
                  { name: 'React', icon: <Code />, color: '#61dafb' },
                  { name: 'Node.js', icon: <Cpu />, color: '#68a063' },
                  { name: 'MongoDB', icon: <Database />, color: '#47a248' },
                  { name: 'Python', icon: <Terminal />, color: '#3776ab' },
                  { name: 'AWS', icon: <Globe />, color: '#ff9900' },
                  { name: 'Docker', icon: <Box />, color: '#2496ed' },
                  { name: 'Postman', icon: <ArrowRight />, color: '#ff6c37' },
                  { name: 'Linux', icon: <Terminal />, color: '#fcc624' },
                  { name: 'Figma', icon: <Target />, color: '#f24e1e' }
                ].map((tool, i) => (
                  <motion.div
                    key={`${idx}-${i}`}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="glass-panel"
                    style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px', minWidth: '180px', border: `1px solid rgba(255,255,255,0.05)` }}
                  >
                    <div style={{ color: tool.color }}>{tool.icon}</div>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap' }}>{tool.name}</span>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '150px', height: '100%', background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 2 }}></div>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '100%', background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 2 }}></div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ marginBottom: '120px' }}>
        <div className="glass-panel" style={{ padding: '64px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--accent-purple)', filter: 'blur(80px)', borderRadius: '50%' }}></div>
          <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Why learn with us?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['Live Interactive Classes', 'Real-world Capstone Projects', 'Mock Interviews & Resume Building', '1-on-1 Mentorship Sessions'].map((feature, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle className="w-5 h-5" style={{ color: '#10b981' }} />
                  <span style={{ fontSize: '1.125rem' }}>{feature}</span>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: '40px', padding: '12px 32px' }} onClick={() => setIsModalOpen(true)}>Start Your Journey</button>
          </div>
        </div>
      </section>

      {/* Achieve Your Goal Section */}
      <section style={{ marginBottom: '120px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Achieve Your Goal</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--secondary-color)', maxWidth: '600px', margin: '0 auto' }}>We help you at every step of your career journey.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {goals.map((goal, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{iconMap[goal.icon] || <Target />}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{goal.title}</h3>
              <p style={{ color: 'var(--secondary-color)', lineHeight: 1.6 }}>{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Success Stories Section */}
      <section style={{ marginBottom: '120px' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Our Success Stories</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--secondary-color)', maxWidth: '600px', margin: '0 auto' }}>Students placed in top multinational companies.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <Skeleton width="80px" height="80px" borderRadius="50%" className="mx-auto mb-4" />
                <Skeleton width="60%" height="24px" className="mx-auto mb-2" />
                <Skeleton width="40%" height="20px" className="mx-auto" />
              </div>
            ))
          ) : (
            placedStudents.map((student, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 16px' }}>
                  <img src={student.image || 'https://i.pravatar.cc/150'} alt={student.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-color)' }} />
                  <div style={{ position: 'absolute', bottom: -5, right: -5, width: '32px', height: '32px', background: 'white', borderRadius: '50%', padding: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${student.company.toLowerCase().replace(/\s+/g, '')}.com&sz=128`} 
                      onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${student.company}&background=3b82f6&color=fff&bold=true&size=64`; }}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      alt="" 
                    />
                  </div>
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{student.name}</h4>
                <p style={{ color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase' }}>{student.company}</p>
                {student.package && <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)', marginTop: '4px' }}>{student.package}</p>}
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ marginBottom: '120px', overflow: 'hidden' }}>
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Student Testimonials</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--secondary-color)', maxWidth: '600px', margin: '0 auto' }}>Hear from our successful alumni.</p>
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
          <motion.div 
            style={{ display: 'flex', gap: '24px', width: 'max-content' }}
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div key={i} className="glass-panel" style={{ padding: '32px', width: '400px', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '4px', color: '#eab308', marginBottom: '16px' }}>
                  {[...Array(testimonial.rating || 5)].map((_, idx) => <Star key={idx} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>"{testimonial.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={testimonial.image || 'https://i.pravatar.cc/150'} alt={testimonial.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: '1rem' }}>{testimonial.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
