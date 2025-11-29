import React from 'react';
import { Loader2, Play, Sparkles } from 'lucide-react';

const SettingsPanel = ({ 
  count, setCount, 
  filterKeyword, setFilterKeyword, 
  allowDuplicate, setAllowDuplicate, 
  onDraw, loading, hasData 
}) => {
  
  return (
    <div className="space-y-8">
      {/* Winners Count */}
      <div className="group">
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
          中獎人數
        </label>
        <div className="relative">
          <input 
            type="number" 
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all font-mono text-lg"
            value={count}
            min="1"
            onChange={(e) => setCount(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs font-bold">PERSONS</div>
        </div>
      </div>

      {/* Keyword Filter */}
      <div className="group">
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider group-hover:text-purple-400 transition-colors">
          關鍵字過濾 (選填)
        </label>
        <input 
          type="text" 
          placeholder="#抽獎"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
      </div>

      {/* Toggle Switch */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-200 group-hover:text-white">允許重複中獎</span>
          <span className="text-xs text-gray-500">同一人可多次獲獎</span>
        </div>
        <button 
          onClick={() => setAllowDuplicate(!allowDuplicate)}
          className={`
            w-12 h-7 rounded-full transition-all duration-300 relative shadow-inner
            ${allowDuplicate ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-700'}
          `}
        >
          <div 
            className={`
              w-5 h-5 bg-white rounded-full absolute top-1 shadow-md transition-all duration-300
              ${allowDuplicate ? 'left-6' : 'left-1'}
            `} 
          />
        </button>
      </div>

      {/* Draw Button */}
      <button
        onClick={onDraw}
        disabled={loading || !hasData}
        className={`
          w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 relative overflow-hidden group
          ${loading || !hasData
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
            : 'bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'
          }
        `}
      >
        {/* Button Shine */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <div className="relative flex items-center justify-center gap-3">
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Protocol...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>立即開獎</span>
              <Play className="w-4 h-4 fill-current" />
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default SettingsPanel;