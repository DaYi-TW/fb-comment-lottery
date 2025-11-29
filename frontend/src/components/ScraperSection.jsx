import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, Loader2, ArrowRight } from 'lucide-react';

const ScraperSection = ({ onScrapeComplete }) => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleScrape = async (e) => {
        e.preventDefault();
        if (!url) return;
        
        setLoading(true);
        setStatus('loading');
        try {
            const response = await axios.get('/fb/comments', { params: { url } });
            onScrapeComplete(response.data);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
            onScrapeComplete([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-12 px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                    Fair & Transparent Giveaways.
                </h2>
                <p className="text-lg text-slate-600">
                    Paste your Facebook post URL below to start gathering comments instantly.
                </p>
            </motion.div>

            <motion.form 
                onSubmit={handleScrape}
                className="relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 p-2">
                    <div className="pl-4 text-slate-400">
                        <Search className="w-6 h-6" />
                    </div>
                    <input 
                        type="text" 
                        className="flex-1 block w-full border-0 bg-transparent py-4 pl-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-lg"
                        placeholder="https://www.facebook.com/posts/..." 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`
                            inline-flex items-center justify-center rounded-lg py-3 px-6 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                            transition-all duration-200 ease-in-out gap-2
                            ${loading 
                                ? 'bg-slate-400 cursor-wait' 
                                : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 hover:shadow-indigo-200 hover:shadow-lg'
                            }
                        `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Processing</span>
                            </>
                        ) : (
                            <>
                                <span>Scrape</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default ScraperSection;
