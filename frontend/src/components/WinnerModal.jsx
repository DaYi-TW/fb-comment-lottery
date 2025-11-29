import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Sparkles } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const WinnerModal = ({ isOpen, onClose, winners }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen && winners.length > 0) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 6000);
            return () => clearTimeout(timer);
        } else {
            setShowConfetti(false);
        }
    }, [isOpen, winners]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                {showConfetti && <ReactConfetti recycle={false} numberOfPieces={500} />}
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />

                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-full opacity-20">
                             <Sparkles className="w-full h-full text-white animate-pulse" />
                         </div>
                         <div className="relative z-10">
                             <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                                <Trophy className="w-8 h-8 text-yellow-300" />
                             </div>
                             <h2 className="text-2xl font-bold text-white">Congratulations!</h2>
                             <p className="text-indigo-100 text-sm mt-1">We have found our winners</p>
                         </div>
                         <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                         >
                             <X className="w-6 h-6" />
                         </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        <div className="space-y-3">
                            {winners.map((w, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/50 transition-colors group"
                                >
                                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-700 transition-colors">{w.author}</h4>
                                        <p className="text-slate-600 text-sm mt-1 italic">"{w.content}"</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-center">
                        <button 
                            onClick={onClose}
                            className="text-slate-500 hover:text-slate-700 font-medium text-sm"
                        >
                            Close Window
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default WinnerModal;
