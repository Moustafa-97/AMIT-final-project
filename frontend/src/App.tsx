import React from "react";
import "./App.css";
import MainApp from "./Routes/MainApp";
// import { PaletteMode } from "@mui/material";
// import { ThemeProvider } from "@mui/system";
import { CssBaseline } from "@mui/material";
// import { useThemeContext } from "./Pages/theme/ThemeContextProvider";

// for cookies::
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {

  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <MainApp />
        
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
