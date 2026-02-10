import React from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    // Create an array of hearts with random starting positions and animation durations
    const hearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 10 + 10, // 10-20s duration
        delay: Math.random() * 5,
        size: Math.random() * 20 + 10, // 10-30px
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 0.8, 0],
                        x: [0, Math.random() * 50 - 25, 0] // Gentle Sway
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                    style={{
                        position: 'absolute',
                        left: heart.left,
                        fontSize: `${heart.size}px`,
                        color: 'rgba(255, 182, 193, 0.4)', // Light pink, transparent
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
