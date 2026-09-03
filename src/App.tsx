import React from 'react';
import { NowPlaying } from './components/NowPlaying';

export function App() {
  return <NowPlaying />;
}

export default App;

import FullscreenButton from './components/FullscreenButton'; // Adjust path if it's right in src/

export default function App() {
  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      
      {/* Your Fullscreen Button */}
      <FullscreenButton />

      {/* Your Vinyl / Player Code goes here */}
      <div className="text-white">
        <p>Your Vinyl Player</p>
      </div>

    </div>
  );
}