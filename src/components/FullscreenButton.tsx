import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

export default function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <button
      onClick={toggleFullscreen}
      style={{ zIndex: 999999 }}
      className="fixed top-6 right-6 p-4 bg-zinc-900/90 hover:bg-black text-white rounded-full shadow-2xl border border-white/20 transition-all cursor-pointer flex items-center justify-center"
      title="Toggle Fullscreen"
    >
      {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
    </button>
  );
}