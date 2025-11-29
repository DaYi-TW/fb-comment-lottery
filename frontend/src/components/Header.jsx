import React from 'react';
import { Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white sticky top-0 z-30 bg-opacity-80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Gift className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            FB Lottery <span className="text-indigo-600">Pro</span>
          </h1>
        </motion.div>
        
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-sm font-medium text-slate-500 hidden sm:block"
        >
           v1.0.0
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
