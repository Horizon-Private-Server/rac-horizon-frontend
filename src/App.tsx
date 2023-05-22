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
import DeadlockedHome from './features/deadlocked/DeadlockedHome';
import DeadlockedStats from './features/deadlocked-stats/DeadlockedStats';
import DeadlockedLeaderboard from './features/deadlocked-stats/DeadlockedLeaderboard';
import DeadlockedDetails from './features/deadlocked-stats/DeadlockedDetails';
import DeadlockedGames from './features/deadlocked-games/DeadlockedGames';
import DeadlockedGameDetails from './features/deadlocked-games/DeadlockedGameDetails';
import { Rules } from './features/setup/Rules';
import { SetupPS2 } from './features/setup/SetupPS2';
import { SetupPCSX2 } from './features/setup/SetupPCSX2';
import { ConfigurePCSX2 } from './features/setup/ConfigurePCSX2';
import { FAQ } from './features/setup/FAQ';
import UYAHome from './features/uya/UYAHome';
import DeadlockedCustomModes from './features/deadlocked-custom-modes/DeadlockedCustomModes';
import { DeadlockedSurvivalOverview } from './features/deadlocked-custom-modes/DeadlockedSurvivalOverview';
import DeadlockedSurvival from './features/deadlocked-custom-modes/DeadlockedSurvival';
import { DeadlockedInfected } from './features/deadlocked-custom-modes/DeadlockedInfected';


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
    label: "Getting Started",
    tooltip: "Getting Started",
    icon: <HelpIcon />,
    path: "/getting-started",
    hidden: false
  },
  {
    label: "Up Your Arsenal",
    tooltip: "Up Your Arsenal",
    icon: <SportsEsportsIcon />,
    path: "/uya",
    hidden: process.env.NODE_ENV === 'production'
  },
  {
    label: "Deadlocked",
    tooltip: "Deadlocked",
    icon: <SportsEsportsIcon />,
    path: "/dl",
    hidden: process.env.NODE_ENV === 'production'
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
                      <Route path="/getting-started" element={<Setup />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl" element={<DeadlockedHome />} />
                    </Routes>
                    <Routes>
                      <Route path="/uya" element={<UYAHome />} />
                    </Routes>

                    <Routes>
                      <Route path="/dl/stats" element={<DeadlockedStats />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/leaderboard/:offering" element={<DeadlockedLeaderboard />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/details/:userId" element={<DeadlockedDetails />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/games" element={<DeadlockedGames />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/game/:gameId" element={<DeadlockedGameDetails />} />
                    </Routes>

                    <Routes>
                      <Route path="/dl/custom/modes" element={<DeadlockedCustomModes />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/custom/modes/infected" element={<DeadlockedInfected />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/survival" element={<DeadlockedSurvival />} />
                    </Routes>
                    <Routes>
                      <Route path="/dl/survival/overview" element={<DeadlockedSurvivalOverview />} />
                    </Routes>

                    <Routes>
                      <Route path="/rules" element={<Rules />} />
                    </Routes>
                    <Routes>
                      <Route path="/setup/ps2" element={<SetupPS2 />} />
                    </Routes>
                    <Routes>
                      <Route path="/setup/pcsx2" element={<SetupPCSX2 />} />
                    </Routes>
                    <Routes>
                      <Route path="/configure/pcsx2" element={<ConfigurePCSX2 />} />
                    </Routes>
                    <Routes>
                      <Route path="/faq" element={<FAQ />} />
                    </Routes>

                  </Nav>
              </ThemeProvider>
          </ThemeContext.Provider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;
