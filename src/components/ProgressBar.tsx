import React from 'react';

interface ProgressBarProps {
  progressMs: number;
  durationMs: number;
  isConnected: boolean;
  isPlaying: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progressMs,
  durationMs,
  isConnected,
  isPlaying,
}) => {
  if (!isConnected || durationMs === 0) return null;

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const percentage = Math.min(100, Math.max(0, (progressMs / durationMs) * 100));

  return (
    <div className="w-full max-w-md mx-auto px-6 z-20 mt-2">
      <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-1.5">
        <span>{formatTime(progressMs)}</span>
        <span>{formatTime(durationMs)}</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-white/80 rounded-full transition-all duration-300 ease-linear"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};