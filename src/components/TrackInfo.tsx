import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpotifyTrack } from '../types/spotify';

interface TrackInfoProps {
  track: SpotifyTrack | null;
  isConnected: boolean;
  isPlaying: boolean;
}

export const TrackInfo: React.FC<TrackInfoProps> = ({ track, isConnected, isPlaying }) => {
  return (
    <div className="text-center h-24 flex flex-col justify-center px-4 max-w-lg mx-auto z-20">
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-1"
          >
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-white/90">
              Connect to Spotify
            </h2>
            <p className="text-xs md:text-sm text-white/50">
              Link your account to experience the cinematic vinyl visualizer
            </p>
          </motion.div>
        ) : !track ? (
          <motion.div
            key="noplaying"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-1"
          >
            <h2 className="text-xl md:text-2xl font-semibold tracking-wide text-white/70">
              Nothing Playing
            </h2>
            <p className="text-xs md:text-sm text-white/40">
              Play a song on Spotify to start the experience
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1"
          >
            <h1 className="text-lg md:text-2xl font-bold tracking-tight text-white truncate max-w-md mx-auto">
              {track.name}
            </h1>
            <p className="text-sm md:text-base font-medium text-white/70 truncate max-w-sm mx-auto">
              {track.artists.map((a) => a.name).join(', ')}
            </p>
            <p className="text-xs text-white/40 uppercase tracking-widest truncate max-w-xs mx-auto pt-0.5">
              {track.album.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};