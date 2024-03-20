import React from 'react';


import {ThemeProvider, StyledEngineProvider} from "@mui/material/styles";

import {
    horizonThemeDark,
} from "./components/utils/HorizonTheme";

import './App.css';
import Nav from "./features/nav/Nav";

import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HelpIcon from '@mui/icons-material/Help';
import {Route, Routes} from 'react-router-dom';

import {BrowserRouter} from "react-router-dom";

import horizonLogo from "./assets/img/logo2b-cropped.png";
import Home from './features/home/Home';
import Setup from './features/setup/Setup';
import DeadlockedHome from './features/deadlocked/DeadlockedHome';
import DeadlockedStats from './features/deadlocked-stats/DeadlockedStats';
import DeadlockedLeaderboard from './features/deadlocked-stats/DeadlockedLeaderboard';
import DeadlockedDetails from './features/deadlocked-stats/DeadlockedDetails';
import DeadlockedGames from './features/deadlocked-games/DeadlockedGames';
import DeadlockedGameDetails from './features/deadlocked-games/DeadlockedGameDetails';
import {Rules} from './features/setup/Rules';
import {SetupPS2} from './features/setup/SetupPS2';
import {SetupPCSX2} from './features/setup/SetupPCSX2';
import {ConfigurePCSX2} from './features/setup/ConfigurePCSX2';
import {FAQ} from './features/setup/FAQ';
import UYAHome from './features/uya/UYAHome';
import DeadlockedCustomModes from './features/deadlocked-custom-modes/DeadlockedCustomModes';
import {SurvivalOrxon} from './features/deadlocked-custom-modes/SurvivalOrxon';
import DeadlockedSurvival from './features/deadlocked-custom-modes/DeadlockedSurvival';
import {DeadlockedInfected} from './features/deadlocked-custom-modes/DeadlockedInfected';
import {SurvivalMountainPass} from "./features/deadlocked-custom-modes/SurvivalMountainPass";
import {SurvivalVeldin} from "./features/deadlocked-custom-modes/SurvivalVeldin";
import {DZOLinux} from "./features/deadlocked/DZOLinux";
import {Stack, Typography} from "@mui/material";
import useWindowDimensions, {computeDeviceScale, ScreenSize} from "./components/utils/WindowDimensions";


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

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

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
                            logo={
                                <img
                                    src={horizonLogo}
                                    alt="Horizon Logo"
                                    width={240}
                                    height={124}
                                    style={{margin: 0, padding: 0}}
                                />
                            }
                        >
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/getting-started" element={<Setup/>}/>
                                <Route path="/dl" element={<DeadlockedHome/>}/>
                                <Route path="/uya" element={<UYAHome/>}/>
                                <Route path="/dl/stats" element={<DeadlockedStats/>}/>
                                <Route path="/dl/leaderboard/:offering" element={<DeadlockedLeaderboard/>}/>
                                <Route path="/dl/details/:userId" element={<DeadlockedDetails/>}/>
                                <Route path="/dl/games" element={<DeadlockedGames/>}/>
                                <Route path="/dl/game/:gameId" element={<DeadlockedGameDetails/>}/>
                                <Route path="/dl/custom/modes" element={<DeadlockedCustomModes/>}/>
                                <Route path="/dl/custom/modes/infected" element={<DeadlockedInfected/>}/>
                                <Route path="/survival" element={<DeadlockedSurvival/>}/>
                                <Route path="/survival/orxon" element={<SurvivalOrxon/>}/>
                                <Route path="/survival/mountain-pass" element={<SurvivalMountainPass/>}/>
                                <Route path="/survival/veldin" element={<SurvivalVeldin/>}/>
                                <Route path="/dzo/linux" element={<DZOLinux/>}/>
                                <Route path="/rules" element={<Rules/>}/>
                                <Route path="/setup/ps2" element={<SetupPS2/>}/>
                                <Route path="/setup/pcsx2" element={<SetupPCSX2/>}/>
                                <Route path="/configure/pcsx2" element={<ConfigurePCSX2/>}/>
                                <Route path="/faq" element={<FAQ/>}/>
                            </Routes>
                            <Stack direction="row" justifyContent="center" sx={{mt: 2, pt: 2, pb: 2, backgroundColor: "#000000"}}>
                                <Typography variant="subtitle2" textAlign="center" sx={{maxWidth: screenSize === ScreenSize.Desktop ? "60%" : "90%"}}>
                                    Horizon Private Server nor any of its staff, developers or members are affiliated
                                    with Sony Interactive Entertainment (SIE), Insomniac Games, Idol Minds or Mass
                                    Media Inc. Ratchet and Clank™ and PlayStation™ are registered trademarks that
                                    belong to SIE. Horizon does not condone or support piracy of any kind. Please
                                    support the official game releases.
                                </Typography>
                            </Stack>
                        </Nav>
                    </ThemeProvider>
                </ThemeContext.Provider>
            </StyledEngineProvider>
        </BrowserRouter>
    );
}

export default App;
