import React from 'react';
import { Gift, Settings, Trophy, BarChart3, Menu } from 'lucide-react';

const Sidebar = ({ children }) => {
  return (
    <div className="w-80 h-screen border-r border-white/10 bg-black/20 backdrop-blur-2xl flex flex-col flex-shrink-0 z-20">
      {/* Brand */}
      <div className="p-8 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide text-white font-['Poppins']">
            FairDraw <span className="text-cyan-400">.AI</span>
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white font-medium shadow-lg shadow-purple-500/20 border border-white/10">
          <Trophy className="w-5 h-5" />
          當前抽獎
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
          <BarChart3 className="w-5 h-5" />
          歷史紀錄
        </button>
      </div>

      {/* Settings Area (Injected Controls) */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="pt-6 border-t border-white/10">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-6 px-2 flex items-center gap-2">
            <Settings className="w-3 h-3" />
            設定參數
          </h3>
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-400">System Online</span>
        </div>
        <div className="text-[10px] text-gray-600 uppercase tracking-wider">
          v2.0.0 · Hyper Mode
        </div>
      </div>
    </div>
  );
};

export default Sidebar;