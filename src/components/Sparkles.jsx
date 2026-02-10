import React from 'react';
import { motion } from 'framer-motion';

const Sparkles = () => {
    // Generate random sparkles
    const sparkles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1, // 1-5px
        duration: Math.random() * 2 + 1, // 1-3s
        delay: Math.random() * 2
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180]
                    }}
                    transition={{
                        duration: sparkle.duration,
                        repeat: Infinity,
                        delay: sparkle.delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        left: sparkle.left,
                        top: sparkle.top,
                        width: `${sparkle.size}px`,
                        height: `${sparkle.size}px`,
                        backgroundColor: '#FFF',
                        borderRadius: '50%',
                        boxShadow: '0 0 5px #FFF, 0 0 10px #FFD700' // White core with Gold glow
                    }}
                />
            ))}
        </div>
    );
};

export default Sparkles;
