import React from 'react';
import { NowPlaying } from './components/NowPlaying';

export function App() {
  return <NowPlaying />;
}

export default App;

import FullscreenButton from './components/FullscreenButton';

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* Fullscreen Toggle Button */}
      <FullscreenButton />

      {/* Main Vinyl / Player Area */}
      <div className="text-white text-center">
        <p className="text-2xl font-bold tracking-wider">Now Playing</p>
        <p className="text-white/60 text-sm mt-2">Vinyl Player Component</p>
      </div>

    </div>
  );
}