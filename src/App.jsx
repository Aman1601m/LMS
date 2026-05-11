import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnrollModal from './components/EnrollModal';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import CourseDetails from './pages/CourseDetails';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import Toast from './components/Toast';
import NotFound from './pages/NotFound';
import { AnimatePresence } from 'framer-motion';
import './index.css';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="app-container">
      <div className="glow-bg"></div>
      {!isAdminPage && <Navbar setIsModalOpen={setIsModalOpen} />}
      
      <Routes>
        <Route path="/" element={<Home setIsModalOpen={setIsModalOpen} showToast={showToast} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses/:slug" element={<CourseDetails showToast={showToast} />} />
        <Route path="/login" element={<Login showToast={showToast} />} />
        <Route path="/admin" element={<Admin showToast={showToast} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {!isAdminPage && <Footer />}
      {!isAdminPage && <Chatbot />}
      <EnrollModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} showToast={showToast} />
      
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
