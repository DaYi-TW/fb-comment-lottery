import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const ElegantModal = ({ isOpen, onClose, winners }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                <ReactConfetti 
                    recycle={true} 
                    numberOfPieces={600} 
                    gravity={0.2}
                    colors={['#FFD700', '#FFA500', '#FF4500', '#00FFFF', '#FF00FF']} 
                />
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div 
                    initial={{ scale: 0.5, opacity: 0, rotateX: 20 }}
                    animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="relative w-full max-w-2xl bg-gray-900/90 border border-white/20 rounded-[2rem] shadow-[0_0_100px_-20px_rgba(168,85,247,0.5)] overflow-hidden"
                >
                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 animate-pulse"></div>
                    
                    {/* Content Container */}
                    <div className="relative z-10 p-12 text-center">
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-white/60 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-10"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-yellow-500/40 mb-6 rotate-3 hover:rotate-6 transition-transform">
                                <Trophy className="w-12 h-12 text-white drop-shadow-lg" />
                            </div>
                            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 tracking-tight mb-2 drop-shadow-sm">
                                CONGRATS!
                            </h2>
                            <p className="text-purple-200 text-lg font-medium tracking-widest uppercase">
                                Winner Verification Complete
                            </p>
                        </motion.div>

                        <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {winners.map((w, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 + (index * 0.1) }}
                                    className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                                >
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-xl shadow-inner border border-white/20">
                                            {index + 1}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                                {w.author}
                                            </h3>
                                            <div className="flex items-start gap-2 mt-2 text-gray-400 group-hover:text-gray-200 transition-colors">
                                                <Star className="w-4 h-4 mt-1 text-yellow-500 fill-yellow-500" />
                                                <p className="text-sm italic leading-relaxed">"{w.content}"</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-10 pt-8 border-t border-white/10"
                        >
                            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-semibold">
                                Powered by FairDraw AI Protocol
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ElegantModal;