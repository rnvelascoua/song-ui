export type SongApiItem = {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  url: string; // YouTube URL
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;

  videoUrl: string;
  thumbnailUrl: string;
};