import React from "react";
import { Alert, CircularProgress, Divider, Typography } from "@mui/material";
import { Layout } from "./components/Layout";
import { SongGrid } from "./components/SongGrid";
import { VideoPlayer } from "./components/VideoPlayer";
import type { Song } from "./api/types";
import { fetchSongs } from "./api/api";

export default function App() {
  const [query, setQuery] = React.useState("");
  const [songs, setSongs] = React.useState<Song[]>([]);
  const [selected, setSelected] = React.useState<Song | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchSongs(ac.signal);
        setSongs(data);
        setSelected((prev) => prev ?? data[0]);
      } catch (e) {
        if ((e as any)?.name === "AbortError") return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter((s) => `${s.title} ${s.artist} ${s.album} ${s.genre}`.toLowerCase().includes(q));
  }, [songs, query]);

  return (
    <Layout query={query} onQueryChange={setQuery}>
      {loading ? (
        <div className="flex items-center justify-center p-10">
          <CircularProgress />
        </div>
      ) : error ? (
        <Alert severity="error" variant="outlined">
          {error}
        </Alert>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-3">
            <VideoPlayer song={selected} />

            {selected && (
              <div className="space-y-1">
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  {selected.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selected.artist} • {selected.album} • {selected.genre}
                </Typography>
              </div>
            )}

            <Divider sx={{ borderColor: "rgba(255,255,255,0.10)" }} />

            <Typography variant="body2" color="text.secondary">
              Search like YouTube, then click a card in “Recommended” to play.
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Recommended
            </Typography>
            <SongGrid songs={filtered} selectedSongId={selected?.id} onSelect={setSelected} />
          </div>
        </div>
      )}
    </Layout>
  );
}