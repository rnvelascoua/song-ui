import { Paper, Typography, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { Song } from "../api/types";

function isYouTubeUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be");
  } catch {
    return false;
  }
}

function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (u.pathname.startsWith("/embed/")) return url;
    }

    return null;
  } catch {
    return null;
  }
}

export function VideoPlayer(props: { song?: Song }) {
  if (!props.song) {
    return (
      <Paper
        variant="outlined"
        sx={{ borderColor: "rgba(255,255,255,0.10)", backgroundColor: "rgba(255,255,255,0.03)" }}
        className="p-4"
      >
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Select a song to play
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mt-1">
          Choose a card from the recommended list.
        </Typography>
      </Paper>
    );
  }

  const { song } = props;
  const ytEmbed = isYouTubeUrl(song.videoUrl) ? toYouTubeEmbedUrl(song.videoUrl) : null;

  return (
    <Paper
      variant="outlined"
      sx={{ borderColor: "rgba(255,255,255,0.10)", backgroundColor: "rgba(255,255,255,0.03)" }}
      className="p-3"
    >
      <div className="flex items-start justify-between gap-3 px-1 pb-3">
        <div className="min-w-0">
          <Typography variant="h6" sx={{ fontWeight: 900 }} noWrap title={song.title}>
            {song.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {song.artist} • {song.album} • {song.genre}
          </Typography>
        </div>

        <Button
          size="small"
          variant="outlined"
          endIcon={<OpenInNewIcon />}
          onClick={() => window.open(song.videoUrl, "_blank", "noopener,noreferrer")}
          sx={{ borderColor: "rgba(255,255,255,0.25)" }}
        >
          Open
        </Button>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
        {ytEmbed ? (
          <iframe
            className="h-full w-full"
            src={ytEmbed}
            title={song.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video className="h-full w-full" src={song.videoUrl} controls autoPlay />
        )}
      </div>
    </Paper>
  );
}