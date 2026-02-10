import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Sparkles from './Sparkles';

const Proposal = ({ onYes }) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hoverCount, setHoverCount] = useState(0);
    const [yesScale, setYesScale] = useState(1);
    const [deviceSize, setDeviceSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDeviceSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Handle resize
        const handleResize = () => {
            setDeviceSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const moveNoButton = () => {
        const maxX = deviceSize.width - 150; // Button width approx
        const maxY = deviceSize.height - 100; // Button height approx

        // Ensure it moves significantly
        const randomX = Math.random() * (maxX - 50) + 25;
        const randomY = Math.random() * (maxY - 50) + 25;

        setNoBtnPosition({ x: randomX, y: randomY });
        setHoverCount(prev => prev + 1);
        setYesScale(prev => prev + 0.1);
    };

    const getNoText = () => {
        const texts = [
            "No",
            "Are you sure?",
            "Really?",
            "Think again!",
            "Last chance!",
            "Surely not?",
            "You might regret this!",
            "Give it another thought!",
            "Are you absolutely certain?",
            "This could be a mistake!",
            "Have a heart!",
            "Don't be so cold!",
            "Change of heart?",
            "Wouldn't you reconsider?",
            "Is that your final answer?",
            "You're breaking my heart ;(",
            "Plsss? 🥺",
            "Pretty please? 🥺",
            "With a cherry on top? 🍒",
            "I'll buy you chocolate? 🍫"
        ];
        return texts[Math.min(hoverCount, texts.length - 1)];
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen w-full bg-[#ffeef2] p-4 text-center relative overflow-hidden"
        >
            <FloatingHearts />
            <Sparkles />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ rotateY: 180, rotateZ: 5, scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 50 }}
                className="mb-8 relative z-10 perspective-1000"
            >
                {/* Cute GIF placeholder */}
                <img
                    src="/welcome.gif"
                    alt="Cute Bear"
                    className="w-64 h-64 object-cover rounded-2xl shadow-xl mx-auto border-4 border-white transform-style-3d"
                />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold text-red-600 mb-12 relative z-10 drop-shadow-sm"
                style={{ fontFamily: 'Great Vibes, cursive' }}
            >
                Will you be my Valentine? 🌹
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="flex flex-col md:flex-row items-center justify-center gap-8 relative w-full h-32 md:h-auto z-20"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onYes}
                    animate={{ scale: yesScale }}
                    className="px-10 py-5 bg-white/30 backdrop-blur-md border border-white/50 text-red-600 text-2xl font-bold rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:bg-white/50 hover:scale-105 transition-all duration-300"
                >
                    Yes! ❤️
                </motion.button>

                <motion.button
                    style={hoverCount > 0 ? {
                        position: 'fixed',
                        left: noBtnPosition.x,
                        top: noBtnPosition.y,
                    } : {}}

                    animate={{ opacity: hoverCount > 0 ? 0.7 : 1 }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    className={`px-10 py-5 bg-gray-300 text-gray-700 text-2xl font-bold rounded-xl shadow-lg transition-all duration-100 ${hoverCount === 0 ? 'relative' : ''} glass`}
                >
                    {getNoText()}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Proposal;
