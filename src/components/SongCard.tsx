import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import type { Song } from "../api/types";

export function SongCard(props: {
  song: Song;
  selected?: boolean;
  onSelect: (song: Song) => void;
}) {
  const { song } = props;

  return (
    <Card elevation={0} sx={{ backgroundColor: "transparent", border: "none" }}>
      <CardActionArea
        onClick={() => props.onSelect(song)}
        sx={{
          borderRadius: 3,
          outline: props.selected ? "2px solid rgba(255,0,0,0.85)" : "2px solid transparent",
          "&:hover .thumb": { filter: "brightness(1.06)" }
        }}
      >
        <CardMedia
          component="img"
          className="thumb"
          height="180"
          image={song.thumbnailUrl}
          alt={song.title}
          sx={{
            borderRadius: 3,
            objectFit: "cover",
            transition: "filter 120ms ease"
          }}
        />
        <CardContent sx={{ px: 0.5, py: 1.2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }} noWrap title={song.title}>
            {song.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap title={song.artist}>
            {song.artist}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap title={`${song.album} • ${song.genre}`}>
            {song.album} • {song.genre}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}