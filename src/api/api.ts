import type { Song, SongApiItem } from "./types";

const DEFAULT_ENDPOINT = "https://song-api-9fde.onrender.com/velasco/songs";

function getSongsEndpoint(): string {
  return import.meta.env.VITE_SONGS_ENDPOINT ?? DEFAULT_ENDPOINT;
}

function tryGetYouTubeId(inputUrl: string): string | null {
  try {
    const u = new URL(inputUrl);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id || null;
    }

    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;

      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" && parts[1]) return parts[1];
    }

    return null;
  } catch {
    return null;
  }
}

function toThumbnailUrl(videoUrl: string): string {
  const id = tryGetYouTubeId(videoUrl);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "https://placehold.co/640x360?text=Song";
}

function mapSong(item: SongApiItem): Song {
  return {
    id: String(item.id),
    title: item.title,
    artist: item.artist,
    album: item.album,
    genre: item.genre,
    videoUrl: item.url,
    thumbnailUrl: toThumbnailUrl(item.url)
  };
}

export async function fetchSongs(signal?: AbortSignal): Promise<Song[]> {
  const endpoint = getSongsEndpoint();
  const res = await fetch(endpoint, { signal });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch songs: ${res.status} ${res.statusText} ${text}`);
  }

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) throw new Error("Songs response is not an array");

  return (data as SongApiItem[]).map(mapSong);
}