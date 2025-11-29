import React from 'react';
import { ArrowUp } from 'lucide-react';

const ScraperInput = ({ url, setUrl, onScrape, loading, progress }) => {
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onScrape();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-stone-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative flex flex-col p-6 bg-white rounded-2xl border border-stone-200 shadow-sm focus-within:border-stone-300 focus-within:shadow-md transition-all">
          <textarea
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste Facebook Post URL here to begin..."
            className="w-full resize-none outline-none text-stone-800 placeholder:text-stone-400 text-lg bg-transparent font-sans"
            rows={5}
            disabled={loading}
          />
          
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-stone-400 flex items-center gap-2">
               <span className="bg-stone-100 px-2 py-1 rounded text-stone-500">Public Posts Only</span>
            </div>
            <button
              onClick={onScrape}
              disabled={!url || loading}
              className={`
                p-2 rounded-lg transition-all duration-200 flex items-center gap-2
                ${!url || loading 
                  ? 'bg-stone-100 text-stone-300 cursor-not-allowed' 
                  : 'bg-stone-800 text-stone-50 hover:bg-stone-700 shadow-sm'
                }
              `}
            >
              {loading ? (
                <span className="text-xs font-medium px-2 flex items-center gap-2 animate-pulse">
                   Scanning... ({progress || 0})
                </span>
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-stone-400">
        FairDraw AI uses advanced browser automation to verify every comment.
      </p>
    </div>
  );
};

export default ScraperInput;