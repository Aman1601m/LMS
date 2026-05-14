import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, LogOut, Search, Edit2, BarChart2, Users, BookOpen, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '../components/Skeleton';
import API_BASE_URL from '../config/api';


export default function Admin({ showToast }) {
  const [activeTab, setActiveTab] = useState('leads');
  const [data, setData] = useState({ leads: [], courses: [], testimonials: [], placed: [] });
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    if (!file) return null;
    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formDataUpload
      });
      const data = await res.json();
      setIsUploading(false);
      return data.imageUrl;
    } catch (err) {
      showToast('Upload failed', 'error');
      setIsUploading(false);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [leadsRes, coursesRes, testRes, placedRes] = await Promise.all([
        fetch(`${API_BASE_URL}/leads`, { headers }),
        fetch(`${API_BASE_URL}/courses`, { headers }),
        fetch(`${API_BASE_URL}/testimonials`, { headers }),
        fetch(`${API_BASE_URL}/placed-students`, { headers })
      ]);
      
      const [leads, courses, testimonials, placed] = await Promise.all([
        leadsRes.json(), coursesRes.json(), testRes.json(), placedRes.json()
      ]);
      
      setData({ leads, courses, testimonials, placed });
    } catch (err) {
      showToast('Failed to fetch dashboard data', 'error');
    }
    setLoading(false);
  };

  const handleDelete = async (endpoint, id, type) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, { 
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setData(prev => ({ ...prev, [type]: prev[type].filter(item => item._id !== id) }));
        showToast('Deleted successfully');
      }
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    showToast('Logged out successfully');
    navigate('/login');
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === 'placed' ? 'placed-students' : activeTab;
    const url = editId ? `${API_BASE_URL}/${endpoint}/${editId}` : `${API_BASE_URL}/${endpoint}`;
    const method = editId ? 'PUT' : 'POST';
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const item = await res.json();
        showToast(editId ? 'Updated successfully' : 'Added successfully');
        if (editId) {
          setData(prev => ({ ...prev, [activeTab]: prev[activeTab].map(i => i._id === editId ? item : i) }));
        } else {
          setData(prev => ({ ...prev, [activeTab]: [item, ...prev[activeTab]] }));
        }
        setIsAddModalOpen(false);
        setEditId(null);
        setFormData({});
      }
    } catch (err) {
      showToast('Operation failed', 'error');
    }
  };

  const handleUpdateLeadStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setData(prev => ({ ...prev, leads: prev.leads.map(l => l._id === id ? { ...l, status } : l) }));
        showToast(`Status updated to ${status}`);
      }
    } catch (err) {
      showToast('Status update failed', 'error');
    }
  };

  const openAddModal = () => {
    setFormData({});
    setEditId(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setEditId(item._id);
    setIsAddModalOpen(true);
  };

  const renderTable = (items, type, endpoint, columns) => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--card-border)', textAlign: 'left' }}>
            {columns.map(col => <th key={col.key} style={{ padding: '16px' }}>{col.label}</th>)}
            <th style={{ padding: '16px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {columns.map(col => (
                <td key={col.key} style={{ padding: '16px', color: 'var(--secondary-color)' }}>
                  {col.render ? col.render(item[col.key], item) : item[col.key]}
                </td>
              ))}
              <td style={{ padding: '16px', display: 'flex', gap: '8px' }}>
                <button onClick={() => openEditModal(item)} style={{ color: 'var(--primary-color)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(endpoint, item._id, type)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={columns.length + 1} style={{ padding: '24px', textAlign: 'center', color: 'var(--secondary-color)' }}>No data found</td></tr>}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '260px', 
        borderRight: '1px solid var(--card-border)', 
        padding: '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px',
        position: 'sticky',
        top: '100px',
        height: 'calc(100vh - 100px)',
        background: 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ marginBottom: '24px', paddingLeft: '12px', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--secondary-color)', letterSpacing: '1px' }}>Management</h3>
        {[
          { id: 'leads', label: 'Leads', icon: <Users /> },
          { id: 'courses', label: 'Courses', icon: <BookOpen /> },
          { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare /> },
          { id: 'placed', label: 'Placements', icon: <BarChart2 /> }
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)} 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px', 
              textAlign: 'left', 
              borderRadius: '10px', 
              background: activeTab === item.id ? 'var(--card-bg)' : 'transparent',
              color: activeTab === item.id ? 'var(--primary-color)' : 'var(--secondary-color)',
              border: activeTab === item.id ? '1px solid var(--card-border)' : '1px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ opacity: activeTab === item.id ? 1 : 0.6 }}>{item.icon}</div>
            <span style={{ fontWeight: activeTab === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        ))}
        <button onClick={handleLogout} style={{ marginTop: 'auto', padding: '12px 16px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--secondary-color)' }}>Manage your institute's data and inquiries.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search className="w-4 h-4" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--secondary-color)' }} />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`} 
                style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '10px 12px 10px 40px', color: 'white', width: '250px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab !== 'leads' && (
              <button className="btn-primary" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                <Plus className="w-4 h-4" /> Add New
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: 'Total Leads', value: data.leads.length, icon: <Users />, color: '#3b82f6' },
            { label: 'Active Courses', value: data.courses.length, icon: <BookOpen />, color: '#10b981' },
            { label: 'Testimonials', value: data.testimonials.length, icon: <MessageSquare />, color: '#8b5cf6' },
            { label: 'Placements', value: data.placed.length, icon: <BarChart2 />, color: '#f59e0b' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ color: 'var(--secondary-color)', fontSize: '0.875rem', marginBottom: '4px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  {loading ? <Skeleton width="40px" height="24px" /> : stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Skeleton height="40px" />
              <Skeleton height="60px" />
              <Skeleton height="60px" />
              <Skeleton height="60px" />
            </div>
          ) : (
            <>
              {activeTab === 'leads' && renderTable(
                data.leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm)), 
                'leads', 'leads', [
                { key: 'name', label: 'Name' },
                { key: 'phone', label: 'Phone' },
                { key: 'courseOfInterest', label: 'Course' },
                { key: 'status', label: 'Status', render: (val, item) => (
                  <select 
                    value={val || 'New'} 
                    onChange={(e) => handleUpdateLeadStatus(item._id, e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--card-border)', borderRadius: '4px', padding: '4px' }}
                  >
                    {['New', 'Contacted', 'Interested', 'Enrolled'].map(s => <option key={s} value={s} style={{ color: 'black' }}>{s}</option>)}
                  </select>
                )}
              ])}
              
              {activeTab === 'courses' && renderTable(
                data.courses.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())), 
                'courses', 'courses', [
                { key: 'title', label: 'Course Title' },
                { key: 'category', label: 'Category' },
                { key: 'duration', label: 'Duration' },
                { key: 'syllabus', label: 'Topics', render: (s) => <span>{s ? s.length : 0} Topics</span> }
              ])}

              {activeTab === 'testimonials' && renderTable(
                data.testimonials.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())), 
                'testimonials', 'testimonials', [
                { key: 'image', label: 'Photo', render: (img) => <img src={img || 'https://i.pravatar.cc/150'} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="Profile" /> },
                { key: 'name', label: 'Student Name' },
                { key: 'role', label: 'Role/Company' }
              ])}

              {activeTab === 'placed' && renderTable(
                data.placed.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())), 
                'placed', 'placed-students', [
                { key: 'image', label: 'Photo', render: (img) => <img src={img || 'https://i.pravatar.cc/150'} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="Profile" /> },
                { key: 'name', label: 'Student Name' },
                { key: 'company', label: 'Company' },
                { key: 'package', label: 'Package' }
              ])}
            </>
          )}
        </div>
      </main>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsAddModalOpen(false); }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-content"
            >
              <h2 style={{ marginBottom: '24px' }}>{editId ? 'Edit' : 'Add New'} {activeTab}</h2>
              <form onSubmit={handleAddSubmit}>
                {activeTab === 'courses' && (
                  <>
                    <input className="form-input" placeholder="Title" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" placeholder="Description" required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" placeholder="Category" required value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" placeholder="Duration (e.g. 3 Months)" required value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} style={{ marginBottom: '16px' }} />
                    <textarea className="form-input" placeholder="Course Syllabus (One topic per line)" value={formData.syllabus?.join('\n') || ''} onChange={e => setFormData({...formData, syllabus: e.target.value.split('\n').filter(line => line.trim() !== '')})} style={{ marginBottom: '16px', height: '100px' }}></textarea>
                  </>
                )}
                {activeTab === 'testimonials' && (
                  <>
                    <input className="form-input" placeholder="Student Name" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" placeholder="Role/Company" required value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" type="number" min="1" max="5" placeholder="Rating (1 to 5)" required value={formData.rating || ''} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} style={{ marginBottom: '16px' }} />
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Student Photo</label>
                      <input type="file" onChange={async (e) => {
                        const url = await handleFileUpload(e.target.files[0]);
                        if (url) setFormData({...formData, image: url});
                      }} />
                      {isUploading && <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginTop: '4px' }}>Uploading...</p>}
                      {formData.image && <div style={{ marginTop: '8px' }}><img src={formData.image} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt="Preview" /></div>}
                    </div>
                    <textarea className="form-input" placeholder="Review text..." required value={formData.text || ''} onChange={e => setFormData({...formData, text: e.target.value})} style={{ marginBottom: '16px' }}></textarea>
                  </>
                )}
                {activeTab === 'placed' && (
                  <>
                    <input className="form-input" placeholder="Student Name" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" placeholder="Company" required value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} style={{ marginBottom: '16px' }} />
                    <input className="form-input" placeholder="Package (e.g. 5 LPA)" required value={formData.package || ''} onChange={e => setFormData({...formData, package: e.target.value})} style={{ marginBottom: '16px' }} />
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Student Photo</label>
                      <input type="file" onChange={async (e) => {
                        const url = await handleFileUpload(e.target.files[0]);
                        if (url) setFormData({...formData, image: url});
                      }} />
                      {isUploading && <p style={{ fontSize: '0.75rem', color: 'var(--primary-color)', marginTop: '4px' }}>Uploading...</p>}
                      {formData.image && <div style={{ marginTop: '8px' }}><img src={formData.image} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt="Preview" /></div>}
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                  <button type="button" className="btn-outline" onClick={() => setIsAddModalOpen(false)} style={{ flex: 1 }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
