// components/NowPlaying.tsx
'use client';
import { useEffect, useState } from 'react';

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  images: { url: string }[];
}

interface SpotifyTrackItem {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

interface SpotifyCurrentlyPlaying {
  item: SpotifyTrackItem | null;
  is_playing: boolean;
  progress_ms: number;
  // Other properties can be added if needed
}

const NowPlaying: React.FC = () => {
  const [track, setTrack] = useState<SpotifyCurrentlyPlaying | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentTrack = async () => {
    try {
      const res = await fetch('/api/current-track', {
        headers: {
          // Replace YOUR_ACCESS_TOKEN with your actual token management logic.
          Authorization: `Bearer YOUR_ACCESS_TOKEN`
        },
      });

      // Handle no content (Spotify returns 204 when nothing is playing)
      if (res.status === 204) {
        setTrack({ item: null, is_playing: false, progress_ms: 0 });
        return;
      }

      const data: SpotifyCurrentlyPlaying = await res.json();
      setTrack(data);
    } catch (err) {
      console.error('Error fetching track:', err);
      setError('Failed to load track');
    }
  };

  useEffect(() => {
    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 30000); // Refresh every 30 seconds.
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {track && track.item ? (
        <div>
          <h3>Now Playing: {track.item.name}</h3>
          <p>
            Artist:{' '}
            {track.item.artists.map((artist) => artist.name).join(', ')}
          </p>
          {track.item.album.images[0] && (
            <img
              src={track.item.album.images[0].url}
              alt="Album Art"
              width={100}
            />
          )}
        </div>
      ) : (
        <p>No track is currently playing</p>
      )}
    </div>
  );
};

export default NowPlaying;
