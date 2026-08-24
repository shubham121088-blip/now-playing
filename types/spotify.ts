export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string; height: number; width: number }[];
  };
}

export interface CurrentlyPlaying {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack | null;
  currently_playing_type: string;
}