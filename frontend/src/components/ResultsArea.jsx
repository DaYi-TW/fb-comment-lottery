import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageSquare, Clock } from 'lucide-react';

const ResultsArea = ({ participants }) => {
  if (!participants.length) return null;

  return (
    <motion.aside 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-96 h-screen border-l border-white/10 bg-black/20 backdrop-blur-2xl flex flex-col flex-shrink-0"
    >
      <div className="p-6 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            參與者
          </h3>
          <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            {participants.length} 人
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {participants.map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Avatar: First Letter */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-lg flex-shrink-0">
                    {p.author ? p.author.charAt(0).toUpperCase() : '?'}
                  </div>
                  
                  {/* Full Name */}
                  <span className="font-semibold text-gray-200 group-hover:text-white transition-colors text-sm">
                    {p.author}
                  </span>
                </div>

                {/* Timestamp */}
                <span className="flex items-center gap-1 text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors whitespace-nowrap mt-1">
                    <Clock className="w-3 h-3" />
                    {p.timestamp || '-'}
                </span>
            </div>

            <div className="flex gap-2 items-start pl-11">
              <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed group-hover:text-gray-300">
                {p.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
};

export default ResultsArea;
