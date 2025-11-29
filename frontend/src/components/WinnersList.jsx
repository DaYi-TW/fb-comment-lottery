import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, PartyPopper } from 'lucide-react';

const WinnersList = ({ winners }) => {
    return (
        <motion.div 
            className="bg-gradient-to-b from-yellow-50 to-white rounded-2xl shadow-lg border border-yellow-100 overflow-hidden h-[500px] flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="p-4 bg-yellow-100/50 border-b border-yellow-200 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-yellow-800">Winners Circle</h3>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
                <AnimatePresence>
                    {winners.length === 0 ? (
                        <motion.div 
                            className="h-full flex flex-col items-center justify-center text-gray-400 gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <PartyPopper className="w-12 h-12 opacity-20" />
                            <p>Waiting for draw...</p>
                        </motion.div>
                    ) : (
                        winners.map((w, index) => (
                            <motion.div
                                key={`${w.author}-${index}`}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-4 rounded-xl shadow-sm border border-yellow-100 relative overflow-hidden group hover:shadow-md transition-shadow"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Crown className="w-16 h-16 text-yellow-500 transform rotate-12" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                            #{index + 1}
                                        </span>
                                        <h4 className="font-bold text-gray-900 text-lg">{w.author}</h4>
                                    </div>
                                    <p className="text-gray-600 text-sm bg-gray-50 p-2 rounded-lg mt-2 border border-gray-100">
                                        "{w.content}"
                                    </p>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default WinnersList;