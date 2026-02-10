import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from './FloatingHearts';
import Sparkles from './Sparkles';

const Success = () => {
    useEffect(() => {
        // Intense confetti explosion
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center h-full w-full bg-[#ffeef2] p-4 text-center overflow-y-auto relative no-scrollbar"
        >
            <FloatingHearts />
            <Sparkles />

            <div className="z-10 w-full max-w-2xl flex flex-col items-center py-12 md:py-20">
                <motion.div
                    initial={{ scale: 0, rotate: -10, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 1.5, ease: "easeOut", type: "spring", bounce: 0.3 }}
                    className="relative mb-8"
                >
                    {/* Photo Frame UI - Polaroid Style */}
                    <div className="bg-white p-3 md:p-4 pb-10 md:pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.2)] transform rotate-2 max-w-[280px] md:max-w-sm mx-auto border border-gray-100">
                        <div className="w-56 h-64 md:w-64 md:h-72 bg-gray-900 flex items-center justify-center overflow-hidden relative shadow-inner">
                            <img
                                src="/shy.png"
                                alt="Us Together"
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className="absolute bottom-3 md:bottom-4 left-0 w-full text-center">
                            <p className="text-2xl md:text-3xl text-gray-800 transform -rotate-1" style={{ fontFamily: 'Sacramento, cursive' }}>Us soon? ❤️</p>
                        </div>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                    className="text-3xl md:text-7xl lg:text-8xl font-bold text-red-600 my-4 md:my-8 drop-shadow-md relative px-4"
                    style={{ fontFamily: 'Great Vibes, cursive', lineHeight: '1.3' }}
                >
                    I like you Kritika
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                    className="max-w-lg mx-auto p-4 md:p-6 rounded-xl bg-white/40 backdrop-blur-sm shadow-lg border border-pink-200 mt-2 md:mt-4 relative"
                >
                    <h2 className="text-2xl md:text-3xl text-pink-500 font-bold mb-3 md:mb-6" style={{ fontFamily: 'Great Vibes, cursive' }}>With All My Love</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
                        Thank you for being with me, for turning ordinary moments into unforgettable
                        memories, and for lighting up my world every day. Your love fills my heart and
                        inspires me to be the best version of myself. I'm forever grateful to have you by my
                        side. <br /><br />
                        With love - Zamee
                    </p>
                </motion.div>
            </div>



        </motion.div >
    );
};

export default Success;
