
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Sparkles from './Sparkles';

const Envelope = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
    };

    // Animation Variants based on the reference CSS
    const flapVariants = {
        closed: {
            rotateX: 0,
            zIndex: 30, // Higher than letter
            transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" } // Slower
        },
        open: {
            rotateX: 180,
            zIndex: 10, // Lower than letter eventually, but visually it goes back
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const letterVariants = {
        closed: {
            y: 0,
            zIndex: 20,
            scale: 1,
            opacity: 0,
            transition: { duration: 0.5 }
        },
        open: {
            y: isMobile ? -50 : -150, // Less lift on mobile to keep it on screen
            zIndex: 40,
            scale: isMobile ? 1.5 : 1.8, // Smaller scale on mobile
            opacity: 1,
            transition: {
                duration: 1.5,
                delay: 0.8, // Slightly more delay to let flap start
                ease: "easeInOut",
                opacity: { duration: 1, delay: 0.8 } // Fade in first/during
            }
        }
    };

    const textVariants = {
        closed: {
            opacity: 0,
            transition: { duration: 0.5 }
        },
        open: {
            opacity: 1,
            transition: { delay: 2.2, duration: 1.5, ease: "easeOut" } // Fade in AFTER letter is done moving (0.6 delay + 1.5 duration = 2.1s)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#ffeef2] overflow-hidden">
            <div className="absolute inset-0 bg-[#ffeef2]"></div>
            <FloatingHearts />
            <Sparkles />

            <div className="relative group cursor-pointer" onClick={handleOpen} style={{ marginTop: '150px' }}>
                <div
                    className="relative w-[300px] h-[200px] bg-pink-700 rounded-b-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-shadow duration-300 group-hover:shadow-[0_20px_60px_rgba(236,72,153,0.5)]"
                    style={{ perspective: '1000px' }}
                >
                    {/* The Front Flap (Top) */}
                    <motion.div
                        variants={flapVariants}
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        className="absolute top-0 left-0 w-0 h-0 z-30 pointer-events-none origin-top"
                        style={{
                            borderLeft: '150px solid transparent',
                            borderRight: '150px solid transparent',
                            borderTop: '110px solid #be185d',
                            transformStyle: 'preserve-3d'
                        }}
                    />

                    {/* The Letter */}
                    <motion.div
                        variants={letterVariants}
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        className="absolute bottom-0 left-[5%] w-[90%] h-[90%] bg-white rounded-md shadow-2xl p-6 flex flex-col items-center justify-start z-20 origin-bottom"
                    >
                        {/* Letter Content */}
                        <motion.div
                            variants={textVariants}
                            initial="closed"
                            animate={isOpen ? "open" : "closed"}
                            className="w-full text-left space-y-3 h-full overflow-y-auto scrollbar-hide"
                        >
                            {/* Decorative Lines */}
                            <div className="w-full h-1 bg-gray-200 rounded"></div>

                            <p className="text-sm font-bold text-red-600 text-center mt-2">
                                My Dearest Kritika...
                            </p>
                            <p className="text-[9px] text-gray-700 leading-relaxed">
                                Every moment with you is a treasure, every laugh a melody, and every hug a little piece of home. You make my world brighter just by being in it, and I'm so grateful for you. May your days be filled with joy, your heart with warmth, and your dreams with endless possibilities.
                            </p>

                            <div className="text-right mt-2">
                                <p className="text-[9px] text-red-500 font-bold">
                                    Yours loving,<br />Zamee ❤️
                                </p>
                            </div>

                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onOpen(); }}
                                    className="px-3 py-1 bg-red-500 text-white text-[9px] rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    Continue
                                </button>
                            </div>
                        </motion.div>

                        {/* Floating Scroll Arrow */}
                        <motion.div
                            className="absolute bottom-3 right-5 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: [0, 3, 0] }}
                            transition={{
                                opacity: { delay: 4.5, duration: 1 }, // Appear 2s after text (starts at 2.2s + fade)
                                y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                            }}
                        >
                            <span className="text-[10px] text-red-500 font-bold">scroll down🥹</span>
                        </motion.div>
                    </motion.div>

                    {/* The Pocket (Front/Bottom) */}
                    <div
                        className="absolute bottom-0 left-0 w-0 h-0 z-30 pointer-events-none"
                        style={{
                            borderLeft: '150px solid #9d174d',
                            borderRight: '150px solid #9d174d',
                            borderBottom: '110px solid #831843',
                            borderTop: '90px solid transparent'
                        }}
                    />

                    {/* Hearts Animation Container */}
                    {isOpen && (
                        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-50 overflow-visible">
                            <motion.div
                                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                animate={{ opacity: [0, 1, 0], y: -300, x: -20, scale: 1 }}
                                transition={{ duration: 2, delay: 0.6 }}
                                className="absolute bottom-10 left-10 text-2xl"
                            >❤️</motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                                animate={{ opacity: [0, 1, 0], y: -400, x: 20, scale: 1.2 }}
                                transition={{ duration: 2.5, delay: 0.8 }}
                                className="absolute bottom-10 right-20 text-3xl"
                            >💖</motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 0, scale: 0.6 }}
                                animate={{ opacity: [0, 1, 0], y: -350, x: 0, scale: 1 }}
                                transition={{ duration: 3, delay: 1 }}
                                className="absolute bottom-10 right-30 left-30 mx-auto text-xl"
                            >💕</motion.div>
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    {!isOpen && (
                        <p className="text-pink-800 font-serif italic animate-pulse">Click to Open</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Envelope;
