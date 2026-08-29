import React from 'react';
import { NowPlaying } from './components/NowPlaying';

export function App() {
  return <NowPlaying />;
}

export default App;
import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

// Inside your component function:
const [isFullscreen, setIsFullscreen] = useState(false);

// Optional: Keep state synced if user exits via ESC key
useEffect(() => {
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
}, []);

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error enabling fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
<button
  onClick={toggleFullscreen}
  className="fixed top-4 right-4 z-50 p-3 bg-black/60 hover:bg-black text-white/80 hover:text-white rounded-full transition-all border border-white/10 backdrop-blur-sm"
  title="Toggle Fullscreen"
>
  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
</button>
