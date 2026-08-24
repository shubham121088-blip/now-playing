import React from 'react';
import { motion } from 'framer-motion';
import { Disc3 } from 'lucide-react';

interface VinylRecordProps {
  imageUrl: string | null;
  isPlaying: boolean;
}

export const VinylRecord: React.FC<VinylRecordProps> = ({ imageUrl, isPlaying }) => {
  return (
    <div className="relative flex items-center justify-center my-auto">
      {/* Soft Ambient Glow Under Vinyl */}
      <div className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full bg-white/5 blur-3xl pointer-events-none transition-all duration-700" />

      {/* Vinyl Outer Sleeve / Shadow */}
      <div className="absolute w-[310px] h-[310px] md:w-[430px] md:h-[430px] rounded-full bg-black/60 shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none" />

      {/* Rotating Vinyl Disc */}
      <motion.div
        animate={{ rotate: isPlaying ? 360 : undefined }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'linear',
        }}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-[#111] vinyl-grooves relative flex items-center justify-center shadow-2xl border border-white/10 cursor-default select-none group"
      >
        {/* Glossy Reflection Overlay */}
        <div className="absolute inset-0 rounded-full vinyl-reflection pointer-events-none z-10" />

        {/* Vinyl Center Label */}
        <div className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden relative border-[3px] border-[#222] shadow-inner z-20 bg-neutral-900 flex items-center justify-center">
          {imageUrl ? (
            <motion.img
              key={imageUrl}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={imageUrl}
              alt="Album Artwork"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 text-neutral-500">
              <Disc3 className="w-8 h-8 animate-spin-slow opacity-40" />
            </div>
          )}

          {/* Center Spindle Hole */}
          <div className="absolute w-4 h-4 rounded-full bg-black border-2 border-neutral-700 z-30 shadow-md" />
        </div>
      </motion.div>
    </div>
  );
};