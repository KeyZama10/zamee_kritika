import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope';
import Proposal from './components/Proposal';
import Success from './components/Success';

function App() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    const playAudio = () => {
      audio.play().catch(e => console.log("Audio playback failed (user interaction needed)", e));
    };

    // Try to play immediately
    playAudio();

    // Also play on first click if blocked
    document.addEventListener('click', playAudio, { once: true });

    return () => {
      audio.pause();
      document.removeEventListener('click', playAudio);
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden perspective-1000">

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="envelope"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-screen transform-style-3d"
          >
            <Envelope onOpen={() => setStep(1)} />
          </motion.div>
        )}
        {step === 1 && (
          <motion.div
            key="proposal"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-screen transform-style-3d"
          >
            <Proposal onYes={() => setStep(2)} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="success"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-screen transform-style-3d"
          >
            <Success />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
