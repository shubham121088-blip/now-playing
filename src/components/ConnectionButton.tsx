import React from 'react';
import { Music, LogOut } from 'lucide-react';
import { redirectToSpotifyAuthorize, logoutSpotify } from '../services/spotify';

interface ConnectionButtonProps {
  isConnected: boolean;
}

export const ConnectionButton: React.FC<ConnectionButtonProps> = ({ isConnected }) => {
  return (
    <div className="absolute top-6 right-6 z-50">
      {!isConnected ? (
        <button
          onClick={() => redirectToSpotifyAuthorize()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/10 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <Music className="w-4 h-4 text-emerald-400" />
          <span>Connect Spotify</span>
        </button>
      ) : (
        <button
          onClick={() => logoutSpotify()}
          title="Disconnect Spotify"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-red-500/20 backdrop-blur-md text-white/80 hover:text-red-400 text-xs font-medium border border-white/10 hover:border-red-500/30 transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Connected</span>
          <LogOut className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 ml-1 transition-opacity" />
        </button>
      )}
    </div>
  );
};