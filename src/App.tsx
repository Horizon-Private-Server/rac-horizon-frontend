import React from 'react';


import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import {
  horizonThemeDark,
} from "./components/utils/HorizonTheme";

import './App.css';
import Nav from "./features/nav/Nav";

import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HelpIcon from '@mui/icons-material/Help';
import { Route, Routes } from 'react-router-dom';

import { BrowserRouter } from "react-router-dom";

import horizonLogo from "./assets/img/logo2b-cropped.png";
import Home from './features/home/Home';
import Setup from './features/setup/Setup';


export const ThemeContext = React.createContext({
  theme: "",
  setTheme: () => {},
});

const navMenu = [
  {
    label: "Home",
    tooltip: "Home",
    icon: <HomeIcon />,
    path: "/",
    hidden: false
  },
  {
    label: "How To Play",
    tooltip: "How To Play",
    icon: <HelpIcon />,
    path: "/setup",
    hidden: false
  },
  {
    label: "Up Your Arsenal",
    tooltip: "Up Your Arsenal",
    icon: <SportsEsportsIcon />,
    path: "/uya",
    hidden: false
  },
  {
    label: "Deadlocked",
    tooltip: "Deadlocked",
    icon: <SportsEsportsIcon />,
    path: "/dl",
    hidden: false
  }
];

function App() {

  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
          <ThemeContext.Provider value={{theme: "dark", setTheme: () => {}}}>
              <ThemeProvider
                  theme={horizonThemeDark}
              >
                  <Nav
                    header="Horizon Private Server"
                    headerAbbreviated="Horizon"
                    navItems={navMenu}
                    logo={<img src={horizonLogo} alt="Horizon Logo" width={240} height={124} style={{margin: 0, padding: 0}} />}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                    </Routes>
                    <Routes>
                      <Route path="/setup" element={<Setup />} />
                    </Routes>
                  </Nav>
              </ThemeProvider>
          </ThemeContext.Provider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;
