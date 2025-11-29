import React, { useState } from 'react';
import axios from 'axios';
import { Settings, PlayCircle } from 'lucide-react';
import WinnerModal from './WinnerModal';

const LotterySection = ({ participants }) => {
    const [count, setCount] = useState(1);
    const [filterKeyword, setFilterKeyword] = useState('');
    const [allowDuplicate, setAllowDuplicate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [winners, setWinners] = useState([]);

    const handleDraw = async () => {
        if (!participants?.length) return;
        setLoading(true);
        
        // Fake suspense
        await new Promise(r => setTimeout(r, 1500));
        
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
            alert("Lottery failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <WinnerModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                winners={winners} 
            />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                    <Settings className="w-5 h-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-900">Draw Configuration</h3>
                </div>

                <div className="space-y-6 flex-1">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Number of Winners
                        </label>
                        <input 
                            type="number" 
                            className="block w-full rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={count}
                            min="1"
                            onChange={(e) => setCount(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Keyword Filter (Optional)
                        </label>
                        <input 
                            type="text" 
                            className="block w-full rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm placeholder:text-slate-400"
                            placeholder="e.g. #win"
                            value={filterKeyword}
                            onChange={(e) => setFilterKeyword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900">Allow Duplicates</span>
                            <span className="text-xs text-slate-500">Multiple wins per user</span>
                        </span>
                        <button 
                            type="button"
                            onClick={() => setAllowDuplicate(!allowDuplicate)}
                            className={`
                                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
                                ${allowDuplicate ? 'bg-indigo-600' : 'bg-slate-200'}
                            `}
                        >
                            <span className={`
                                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                ${allowDuplicate ? 'translate-x-5' : 'translate-x-0'}
                            `}/>
                        </button>
                    </div>
                </div>

                <div className="pt-8 mt-auto">
                    <button 
                        onClick={handleDraw}
                        disabled={loading || !participants.length}
                        className={`
                            w-full flex items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all duration-200 active:scale-95
                            ${loading || !participants.length 
                                ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-200'
                            }
                        `}
                    >
                        {loading ? (
                            "Drawing Winners..." 
                        ) : (
                            <>
                                <PlayCircle className="w-5 h-5" />
                                <span>Start Draw</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default LotterySection;
