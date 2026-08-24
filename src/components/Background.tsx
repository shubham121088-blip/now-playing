import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundProps {
  imageUrl: string | null;
}

export const Background: React.FC<BackgroundProps> = ({ imageUrl }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#09090b]">
      <AnimatePresence mode="popLayout">
        {imageUrl ? (
          <motion.div
            key={imageUrl}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-[-50px] filter blur-[90px] brightness-75 saturate-150"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ) : (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-zinc-950 to-neutral-950"
          />
        )}
      </AnimatePresence>

      {/* Cinematic Vignette & Ambient Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[20px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};