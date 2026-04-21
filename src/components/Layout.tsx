import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const drawerWidth = 240;

export function Layout(props: {
  query: string;
  onQueryChange: (q: string) => void;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawer = (
    <div className="h-full bg-[#0f0f0f]">
      <div className="px-4 py-4">
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          SONG UI
        </Typography>
      </div>

      <List>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText primary="Trending" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Music" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <div className="min-h-full bg-[#0f0f0f] text-zinc-100">
      <AppBar position="sticky" elevation={0}>
        <Toolbar className="flex gap-2">
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1, display: { md: "none" } }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 900, display: { xs: "none", sm: "block" } }}>
            SONG UI
          </Typography>

          <div className="mx-auto w-full max-w-2xl">
            <TextField
              fullWidth
              size="small"
              placeholder="Search"
              value={props.query}
              onChange={(e) => props.onQueryChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: "999px"
                }
              }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, borderRightColor: "rgba(255,255,255,0.08)" }
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#0f0f0f",
              borderRightColor: "rgba(255,255,255,0.08)"
            }
          }}
          open
        >
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <div className="mx-auto w-full max-w-7xl p-4">{props.children}</div>
        </Box>
      </Box>
    </div>
  );
}