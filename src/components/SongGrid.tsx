import type { Song } from "../api/types";
import { SongCard } from "./SongCard";

export function SongGrid(props: {
  songs: Song[];
  selectedSongId?: string;
  onSelect: (song: Song) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {props.songs.map((s) => (
        <SongCard key={s.id} song={s} selected={s.id === props.selectedSongId} onSelect={props.onSelect} />
      ))}
    </div>
  );
}