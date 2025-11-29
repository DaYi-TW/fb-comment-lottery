import React from 'react';
import { motion } from 'framer-motion';

const ParticipantsTable = ({ participants }) => {
    
    const getInitials = (name) => {
        return name ? name.slice(0, 2).toUpperCase() : '??';
    };

    const getColor = (name) => {
        const colors = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <motion.div 
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h3 className="font-semibold text-slate-900">Participants</h3>
                    <p className="text-sm text-slate-500">Verified comments ready for the draw</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                    {participants.length} Entries
                </span>
            </div>
            
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">#</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">Time</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Comment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {participants.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center">
                                    <div className="text-slate-400 mb-2">No participants yet</div>
                                    <p className="text-sm text-slate-400">Scrape a post to get started</p>
                                </td>
                            </tr>
                        ) : (
                            participants.map((p, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 ${getColor(p.author)}`}>
                                                {getInitials(p.author)}
                                            </div>
                                            <div className="font-medium text-slate-900">{p.author}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                                        {p.timestamp || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{p.content}</p>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ParticipantsTable;