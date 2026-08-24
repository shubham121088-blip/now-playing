import React, { useState, useEffect, useRef } from 'react';
import { VinylRecord } from './VinylRecord';
import { TrackInfo } from './TrackInfo';
import { ProgressBar } from './ProgressBar';
import { Background } from './Background';
import { ConnectionButton } from './ConnectionButton';
import { fetchCurrentlyPlaying, handleSpotifyRedirect, getAccessToken } from '../services/spotify';
import { SpotifyTrack } from '../types/spotify';

export const NowPlaying: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progressMs, setProgressMs] = useState<number>(0);
  const [durationMs, setDurationMs] = useState<number>(0);

  const progressRef = useRef<number>(0);
  progressRef.current = progressMs;

  // Handle Auth Callback & Initialization
  useEffect(() => {
    (async () => {
      const success = await handleSpotifyRedirect();
      if (success || getAccessToken()) {
        setIsConnected(true);
      }
    })();
  }, []);

  // Poll Spotify Playback State
  useEffect(() => {
    if (!isConnected) return;

    let isMounted = true;

    const poll = async () => {
      const data = await fetchCurrentlyPlaying();
      if (!isMounted || !data) return;

      setIsPlaying(data.is_playing);
      if (data.item) {
        setTrack((prev) => (prev?.id !== data.item?.id ? data.item : prev));
        setProgressMs(data.progress_ms);
        setDurationMs(data.item.duration_ms);
      } else {
        setTrack(null);
      }
    };

    poll();
    const interval = setInterval(poll, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isConnected]);

  // Smooth client-side progress tick when playing
  useEffect(() => {
    if (!isPlaying) return;

    const tickInterval = setInterval(() => {
      setProgressMs((prev) => {
        if (durationMs && prev >= durationMs) return durationMs;
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(tickInterval);
  }, [isPlaying, durationMs]);

  const albumArtUrl = track?.album.images[0]?.url || null;

  return (
    <main className="relative w-screen h-screen flex flex-col justify-between items-center py-10 overflow-hidden select-none">
      {/* Fullscreen Cinematic Blurred Background */}
      <Background imageUrl={albumArtUrl} />

      {/* Spotify Connection / Disconnect Button */}
      <ConnectionButton isConnected={isConnected} />

      {/* Center Vinyl Disc Hero Element */}
      <VinylRecord imageUrl={albumArtUrl} isPlaying={isPlaying} />

      {/* Track Information & Progress Bar Container */}
      <div className="w-full flex flex-col items-center gap-3 pb-6">
        <TrackInfo track={track} isConnected={isConnected} isPlaying={isPlaying} />
        <ProgressBar
          progressMs={progressMs}
          durationMs={durationMs}
          isConnected={isConnected}
          isPlaying={isPlaying}
        />
      </div>
    </main>
  );
};