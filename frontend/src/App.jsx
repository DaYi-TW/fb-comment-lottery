import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import ScraperInput from './components/ScraperInput';
import ResultsArea from './components/ResultsArea';
import SettingsPanel from './components/SettingsPanel';
import ElegantModal from './components/ElegantModal';

function App() {
  // State
  const [url, setUrl] = useState('');
  const [participants, setParticipants] = useState([]);
  const [scrapeLoading, setScrapeLoading] = useState(false);
  const [scrapeProgressCount, setScrapeProgressCount] = useState(0);
  const [currentJobId, setCurrentJobId] = useState(null); // Store Job ID
  
  // Lottery State
  const [count, setCount] = useState(1);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [allowDuplicate, setAllowDuplicate] = useState(false);
  const [drawLoading, setDrawLoading] = useState(false);
  const [winners, setWinners] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Refs for Polling
  const pollInterval = useRef(null);

  // Actions
  const handleScrape = async () => {
    if (!url) return;
    
    // Reset State
    setScrapeLoading(true);
    setScrapeProgressCount(0);
    setParticipants([]); 
    setCurrentJobId(null);
    
    try {
        // 1. Start Scrape (Async - Returns { jobId: "..." })
        const response = await axios.get('/fb/comments', { params: { url } });
        const jobId = response.data.jobId;
        setCurrentJobId(jobId);
        
        // 2. Start Polling with Job ID
        startPolling(jobId);
        
    } catch (err) {
        alert("Failed to start scrape: " + err.message);
        setScrapeLoading(false);
    }
  };

  const startPolling = (jobId) => {
    if (pollInterval.current) clearInterval(pollInterval.current);

    pollInterval.current = setInterval(async () => {
      try {
        const res = await axios.get('/fb/progress', { params: { jobId } });
        const { status, count } = res.data;
        
        // Update UI count
        setScrapeProgressCount(count);

        if (status === 'COMPLETED') {
           stopPolling();
           fetchResults(jobId);
        } else if (status === 'ERROR') {
           stopPolling();
           setScrapeLoading(false);
           alert("Scraping failed on server.");
        }
      } catch (e) {
        console.error("Polling error", e);
        // If 404 (Job not found), stop polling
        if (e.response && e.response.status === 404) {
            stopPolling();
            setScrapeLoading(false);
            alert("Job expired or not found.");
        }
      }
    }, 1000);
  };

  const stopPolling = () => {
    if (pollInterval.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = null;
    }
  };

  const fetchResults = async (jobId) => {
    try {
      const res = await axios.get('/fb/results', { params: { jobId } });
      setParticipants(res.data);
    } catch (err) {
      alert("Failed to fetch results: " + err.message);
    } finally {
      setScrapeLoading(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopPolling();
  }, []);

  const handleDraw = async () => {
    if (!participants.length) return;
    setDrawLoading(true);
    // Suspense
    await new Promise(r => setTimeout(r, 1000));
    
    try {
        const response = await axios.post('/fb/lottery', {
            count: parseInt(count),
            allowDuplicate,
            filterKeyword,
            participants
        });
        setWinners(response.data.winners);
        setShowModal(true);
    } catch (err) {
        alert("Draw failed: " + err.message);
    } finally {
        setDrawLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-['Inter'] relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAgNGgtMnYyaDJ2LTJ6bTQtNHYyaDJ2LTJoLTJ6bTAtNGgtMnYyaDJ2LTJ6bS0yIDBoLTJ2Mmgydi0yem0tMiAwdi0yaDJ2LTJoLTJ2LTJoLTJ2Mmgtc3YyaDJ2Mmgydi0yem0tMiA0aC0ydjJoMnYtMnptMiAwaC0ydjJoMnYtMnptLTQgMGgtMnYyaDJ2LTJ6bTIgMGgydjJoLTJ2LTJ6bTAgMGgtMnYyaDJ2LTJ6bTItMmgtMnYyaDJ2LTJ6bTAgMHYtMmgydi0yaDJ2LTJoLTJ2Mmgtc3YyaDJ2Mmgydi0yem0yLTJoMnYtMmgtMnYyem0wIDB2Mmgydi0yaC0yem0tNiAwaDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Left Sidebar - Settings */}
      <Sidebar>
        <SettingsPanel 
           count={count} setCount={setCount}
           filterKeyword={filterKeyword} setFilterKeyword={setFilterKeyword}
           allowDuplicate={allowDuplicate} setAllowDuplicate={setAllowDuplicate}
           onDraw={handleDraw}
           loading={drawLoading}
           hasData={participants.length > 0}
        />
      </Sidebar>

      {/* Center - Main Content */}
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <div className="flex-1 py-16 px-8 max-w-4xl mx-auto w-full relative z-10">
           
           {/* Brand Header */}
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-16 text-center"
           >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center justify-center mb-6"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-2xl">
                    <span className="text-sm font-bold tracking-widest">✨ AI POWERED LOTTERY</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 tracking-tight font-['Poppins']"
              >
                FairDraw
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-lg font-light max-w-2xl mx-auto leading-relaxed"
              >
                🎯 透明 · 公正 · 即時的 Facebook 留言抽獎系統
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>即時驗證</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>自動化處理</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>AI 認證</span>
                </div>
              </motion.div>
           </motion.div>

           {/* Scraper Input with Progress Prop */}
           <ScraperInput 
              url={url} 
              setUrl={setUrl} 
              onScrape={handleScrape} 
              loading={scrapeLoading}
              progress={scrapeProgressCount} 
           />
        </div>
      </main>

      {/* Right Panel - Participants List */}
      <ResultsArea participants={participants} />

      <ElegantModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        winners={winners} 
      />
    </div>
  );
}

export default App;