import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0f0f",
      paper: "#181818"
    },
    primary: { main: "#ff0000" }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: ["Roboto", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"].join(",")
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15,15,15,0.9)",
          backdropFilter: "blur(10px)"
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);