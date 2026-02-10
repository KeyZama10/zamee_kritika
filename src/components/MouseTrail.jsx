import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MouseTrail = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newHeart = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                rotation: Math.random() * 360,
                color: Math.random() > 0.5 ? '#ff69b4' : '#ff1493' // Hot pinks
            };

            setHearts((prev) => [...prev.slice(-15), newHeart]); // Keep last 15 hearts
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup old hearts periodically
        const interval = setInterval(() => {
            setHearts((prev) => prev.filter(h => Date.now() - h.id < 1000));
        }, 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, scale: 0.5, x: heart.x, y: heart.y }}
                        animate={{ opacity: 0, scale: 1.5, y: heart.y - 50 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-xl"
                        style={{ color: heart.color }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default MouseTrail;
