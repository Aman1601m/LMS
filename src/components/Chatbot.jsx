import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, HelpCircle } from 'lucide-react';

const QUICK_QUESTIONS = [
  "What courses do you offer?",
  "Tell me about placements",
  "Where is the institute located?",
  "How can I enroll?",
  "Do you provide certificates?"
];

const AI_RESPONSES = {
  courses: "We offer industry-leading courses in MERN Stack Development, Data Analytics, Python, Cyber Security, Digital Marketing, and DevOps. All courses include 100% placement support!",
  placements: "Smart Future Step has a 100% placement track record. Our alumni work at top companies like TCS, Wipro, Infosys, and many more with packages up to 12 LPA.",
  location: "Our institute is located in the heart of Indore. We offer both offline and online classes for your convenience.",
  enroll: "You can enroll by clicking the 'Enroll Now' button in the menu or by leaving your contact details here. Our team will call you within 24 hours!",
  certificates: "Yes, we provide industry-recognized certificates upon completion of the course and successful project submission.",
  default: "I'm not sure I understand that. But I can help you with courses, placements, or enrollment. Feel free to ask or contact us at info@smartfuturestep.com"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I am your Smart Future Step Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Proactive Greeting: Open chatbot after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { type: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // AI Logic
    setTimeout(() => {
      let botResponse = AI_RESPONSES.default;
      const lowerText = text.toLowerCase();

      if (lowerText.includes('course')) botResponse = AI_RESPONSES.courses;
      else if (lowerText.includes('placement') || lowerText.includes('job')) botResponse = AI_RESPONSES.placements;
      else if (lowerText.includes('location') || lowerText.includes('address')) botResponse = AI_RESPONSES.location;
      else if (lowerText.includes('enroll') || lowerText.includes('admission')) botResponse = AI_RESPONSES.enroll;
      else if (lowerText.includes('certificate')) botResponse = AI_RESPONSES.certificates;

      setMessages([...newMessages, { type: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999 }}>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--primary-color), var(--accent-purple))',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5)',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {isOpen ? <X size={32} /> : <Bot size={32} />}
        </motion.div>
        
        {/* Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: '#ef4444',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
              padding: '4px 8px',
              borderRadius: '100px',
              border: '2px solid #050505'
            }}
          >
            AI
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-panel"
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '0',
              width: '380px',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              padding: '0'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>Smart Assistant</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--secondary-color)' }}>Online | Ready to help</p>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', display: 'flex', gap: '8px', flexDirection: msg.type === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: msg.type === 'user' ? 'var(--primary-color)' : 'var(--card-bg)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {msg.type === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div style={{ 
                    padding: '12px 16px', 
                    borderRadius: '16px', 
                    background: msg.type === 'user' ? 'var(--primary-color)' : 'var(--card-bg)', 
                    color: msg.type === 'user' ? '#000' : 'inherit',
                    fontWeight: msg.type === 'user' ? '500' : '400',
                    border: '1px solid var(--card-border)', 
                    fontSize: '0.875rem', 
                    lineHeight: 1.5 
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={14} />
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', display: 'flex', gap: '4px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--secondary-color)' }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div style={{ padding: '0 20px 10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {QUICK_QUESTIONS.map((q, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSend(q)}
                    style={{ padding: '6px 12px', borderRadius: '100px', border: '1px solid var(--card-border)', background: 'transparent', color: 'var(--primary-color)', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div style={{ padding: '20px', borderTop: '1px solid var(--card-border)' }}>
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                style={{ display: 'flex', gap: '8px' }}
              >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)', borderRadius: '100px', padding: '10px 20px', color: 'white', fontSize: '0.875rem', outline: 'none' }}
                />
                <button 
                  type="submit"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
