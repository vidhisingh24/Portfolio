import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles, Send, User } from 'lucide-react';

const responses = {
  "Who are you?": "I'm Vidhi Singh, an aspiring Software Engineer and Computer Engineering Student. I love building polished, high-performance web applications and exploring AI/ML concepts.",
  "Skills": "My tech stack includes C++, Python, JavaScript, React, Tailwind CSS, Node.js/Express, Git, and data science libraries like NumPy, Pandas, Scikit-learn, and TensorFlow.",
  "Projects": "I have built 4 major projects: MedEase AI (health tech ecosystem), ZeroWasteLink 2.0 (food waste rescue platform), AI Study Companion (student productivity tool), and DevTrack Analytics (GitHub dashboard).",
  "Education": "I'm a 1st-year Computer Engineering Student in India, learning CS core principles, Data Structures & Algorithms, and modern software design patterns.",
  "Contact": "You can email me at vidhiisingh2403@gmail.com, or connect on LinkedIn (linkedin.com/in/vidhi-singh) and GitHub (github.com/vidhisingh24). Let's build something!",
  "Experience": "I've contributed to open-source programs like GirlScript Summer of Code (GSSoC) and Summer of Source Code (SSOC), and I build full-stack projects independently.",
  "AI Journey": "My AI/ML journey includes studying algorithms, conducting data preprocessing with Pandas/NumPy, implementing models with Scikit-learn, and learning deep neural networks.",
  "GitHub": "You can find my open-source work at github.com/vidhisingh24. I actively commit, review pull requests, and maintain code repositories."
};

const VidhiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm VidhiBot. How can I help you learn more about Vidhi today?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleQuestionClick = (question) => {
    if (isTyping) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: question, isBot: false }]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const reply = responses[question] || "I'm sorry, I don't have a configured response for that question. Let's try one of the suggestions!";
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-effect w-[360px] max-w-[calc(100vw-2rem)] h-[480px] rounded-3xl overflow-hidden shadow-2xl flex flex-col mb-4 border border-glassBorder dark:border-glassBorderDark"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-lavender/60 via-softpink/60 to-skyblue/60 dark:from-slate-900/80 dark:to-slate-800/80 p-4 flex items-center justify-between border-b border-glassBorder dark:border-glassBorderDark">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-purple-600 dark:text-lavender">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white text-sm">VidhiBot</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Virtual Assistant • Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-700/30 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex gap-2 max-w-[85%] ${msg.isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.isBot ? "bg-purple-100 text-purple-600 dark:bg-slate-800 dark:text-lavender" : "bg-blue-100 text-blue-600 dark:bg-slate-700 dark:text-skyblue"
                  }`}>
                    {msg.isBot ? <Sparkles size={12} /> : <User size={12} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.isBot 
                      ? "bg-white/60 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-tl-none border border-white/40 dark:border-slate-800/80" 
                      : "bg-gradient-to-r from-lavender/40 to-skyblue/40 dark:from-slate-700 dark:to-slate-700/60 text-slate-900 dark:text-white rounded-tr-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 mr-auto max-w-[85%]">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 dark:bg-slate-800 dark:text-lavender flex items-center justify-center shrink-0">
                    <Sparkles size={12} />
                  </div>
                  <div className="bg-white/60 dark:bg-slate-800/50 p-3 rounded-2xl rounded-tl-none border border-white/40 dark:border-slate-800/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={scrollToBottom} />
            </div>

            {/* Quick Prompts Options */}
            <div className="p-3 border-t border-glassBorder dark:border-glassBorderDark bg-white/20 dark:bg-slate-900/40 space-y-2">
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium px-1">Select a question to ask VidhiBot:</p>
              <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto pr-1">
                {Object.keys(responses).map((q) => (
                  <button
                    key={q}
                    disabled={isTyping}
                    onClick={() => handleQuestionClick(q)}
                    className="text-[10px] font-medium bg-white/60 dark:bg-slate-800/40 hover:bg-lavender/30 dark:hover:bg-lavender/20 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full border border-glassBorder dark:border-glassBorderDark transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-lavender via-softpink to-skyblue text-slate-800 dark:text-slate-900 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all border border-white/20 cursor-pointer focus:outline-none outline-none"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare size={24} />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-400 border-2 border-white dark:border-slate-900 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default VidhiBot;
