import { lazy, Suspense, type ComponentType } from "react";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { horizonThemeDark } from "./components/utils/HorizonTheme";

import "./App.css";
import Nav from "./features/nav/Nav";

import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HelpIcon from "@mui/icons-material/Help";
import { Route, Routes } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";

import horizonLogo from "./assets/img/logo-nav.webp";
import Home from "./features/home/Home";
import { CircularProgress, Stack, Typography } from "@mui/material";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "./components/utils/WindowDimensions";
import Redirect from "./components/base/Redirect";

type RouteModule = { default: ComponentType };

const lazyQueryRoute = (loadRoute: () => Promise<RouteModule>) =>
    lazy(async () => {
        const [routeModule, { default: QueryClientBoundary }] = await Promise.all([
            loadRoute(),
            import("./components/base/QueryClientBoundary"),
        ]);
        const RouteComponent = routeModule.default;

        return {
            default: () => (
                <QueryClientBoundary>
                    <RouteComponent />
                </QueryClientBoundary>
            ),
        };
    });

const DeadlockedHome = lazy(() => import("./features/deadlocked/DeadlockedHome"));
const DeadlockedStats = lazyQueryRoute(() => import("./features/deadlocked-stats/DeadlockedStats"));
const DeadlockedLeaderboard = lazyQueryRoute(() => import("./features/deadlocked-stats/DeadlockedLeaderboard"));
const DeadlockedDetails = lazyQueryRoute(() => import("./features/deadlocked-stats/DeadlockedDetails"));
const UYAHome = lazy(() => import("./features/uya/UYAHome"));
const UYAStats = lazy(() => import("./features/uya-stats/UYAStats"));
const UYALeaderboard = lazy(() => import("./features/uya-stats/UYALeaderboard"));
const UYADetails = lazy(() => import("./features/uya-stats/UYADetails"));
const UYAOnline = lazy(() => import("./features/uya-online/UYAOnline"));
const UYALive = lazy(() => import("./features/uya-live/UYALive"));
const UYAGameHistory = lazy(() => import("./features/uya-gamehistory/UYAGameHistory"));
const UYAGameDetails = lazy(() => import("./features/uya-gamehistory/UYAGameDetails"));
const DeadlockedSurvival = lazy(() => import("./features/deadlocked-custom-modes/DeadlockedSurvival"));
const ControlledChaosGameGenerator = lazy(() => import("./features/game-generators/ControlledChaosGameGenerator"));
const Setup = lazy(() => import("./features/setup/Setup"));
const DeadlockedPlayerSearch = lazyQueryRoute(() => import("./components/deadlocked-player-search/DeadlockedPlayerSearch"));

const SurvivalOrxon = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalOrxon").then((module) => ({ default: module.SurvivalOrxon })),
);
const SurvivalMountainPass = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalMountainPass").then((module) => ({ default: module.SurvivalMountainPass })),
);
const SurvivalVeldin = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalVeldin").then((module) => ({ default: module.SurvivalVeldin })),
);
const SurvivalValix = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalValix").then((module) => ({ default: module.SurvivalValix })),
);
const SurvivalTorval = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalTorval").then((module) => ({ default: module.SurvivalTorval })),
);
const SurvivalKavuIsland = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalKavuIsland").then((module) => ({ default: module.SurvivalKavuIsland })),
);
const SurvivalOozla = lazy(() =>
    import("./features/deadlocked-custom-modes/SurvivalOozla").then((module) => ({ default: module.SurvivalOozla })),
);
const DZOLinux = lazy(() => import("./features/deadlocked/DZOLinux").then((module) => ({ default: module.DZOLinux })));
const DZOMacOSX = lazy(() => import("./features/deadlocked/DZOMacOSX").then((module) => ({ default: module.DZOMacOSX })));
const DeadlockedCustomMaps = lazyQueryRoute(() =>
    import("./features/deadlocked-custom-maps/DeadlockedCustomMaps").then((module) => ({ default: module.DeadlockedCustomMaps })),
);
const UYACustomMaps = lazyQueryRoute(() =>
    import("./features/uya-custom-maps/UYACustomMaps").then((module) => ({ default: module.UYACustomMaps })),
);

const navMenu = [
    {
        label: "Home",
        tooltip: "Home",
        icon: <HomeIcon />,
        path: "/",
        hidden: false,
    },
    {
        label: "Getting Started",
        tooltip: "Getting Started",
        icon: <HelpIcon />,
        path: "/getting-started",
        hidden: false,
    },
    {
        label: "Up Your Arsenal",
        tooltip: "Up Your Arsenal",
        icon: <SportsEsportsIcon />,
        path: "/uya",
        hidden: false,
    },
    {
        label: "Deadlocked",
        tooltip: "Deadlocked",
        icon: <SportsEsportsIcon />,
        path: "/deadlocked",
        hidden: false,
    },
];

function App() {
    const { width } = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={horizonThemeDark}>
                    <Nav
                        header="Horizon Private Server"
                        headerAbbreviated="Horizon"
                        navItems={navMenu}
                        logo={<img src={horizonLogo} alt="Horizon Logo" width={240} height={124} style={{ margin: 0, padding: 0 }} />}
                    >
                        <Suspense
                            fallback={
                                <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                                    <CircularProgress aria-label="Loading page" />
                                </Stack>
                            }
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/discord" element={<Redirect url="https://discord.gg/nJAXBK35Rm" />} />
                                <Route path="/wiki" element={<Redirect url="https://github.com/Horizon-Private-Server/horizon-wiki/blob/main/README.md" />} />
                                <Route path="/getting-started" element={<Setup />} />
                                <Route path="/deadlocked" element={<DeadlockedHome />} />
                                <Route path="/uya" element={<UYAHome />} />

                                <Route path="/uya/stats" element={<UYAStats />} />
                                <Route path="/uya/stats/details/:horizonId" element={<UYADetails />} />
                                <Route path="/uya/stats/leaderboard/:domain/:stat" element={<UYALeaderboard />} />
                                <Route path="/uya/custom-maps" element={<UYACustomMaps />} />
                                <Route path="/uya/online" element={<UYAOnline />} />
                                <Route path="/uya/live" element={<UYALive />} />
                                <Route path="/uya/game-history" element={<UYAGameHistory />} />
                                <Route path="/uya/game-history/:gameId" element={<UYAGameDetails />} />

                                <Route path="/deadlocked/stats/details/:horizonId" element={<DeadlockedDetails />} />
                                <Route path="/deadlocked/stats" element={<DeadlockedStats />} />
                                <Route path="/deadlocked/stats/leaderboard/:domain/:stat" element={<DeadlockedLeaderboard />} />
                                <Route path="/deadlocked/custom-maps" element={<DeadlockedCustomMaps />} />
                                <Route path="/deadlocked/player-search" element={<DeadlockedPlayerSearch />} />
                                {/*<Route path="/dl/games" element={<DeadlockedGames />}/>*/}
                                {/*<Route path="/dl/game/:gameId" element={<DeadlockedGameDetails />}/>*/}
                                {/*<Route path="/dl/custom/modes" element={<DeadlockedCustomModes />}/>*/}
                                {/*<Route path="/dl/custom/modes/infected" element={<DeadlockedInfected />}/>*/}
                                <Route path="/deadlocked/ccgg/:gameSeed" element={<ControlledChaosGameGenerator />} />
                                <Route path="/survival" element={<DeadlockedSurvival />} />
                                <Route path="/survival/orxon" element={<SurvivalOrxon />} />
                                <Route path="/survival/mountain-pass" element={<SurvivalMountainPass />} />
                                <Route path="/survival/veldin" element={<SurvivalVeldin />} />
                                <Route path="/survival/valix" element={<SurvivalValix />} />
                                <Route path="/survival/torval" element={<SurvivalTorval />} />
                                <Route path="/survival/kavu-island" element={<SurvivalKavuIsland />} />
                                <Route path="/survival/oozla" element={<SurvivalOozla />} />
                                <Route path="/dzo/linux" element={<DZOLinux />} />
                                <Route path="/dzo/macosx" element={<DZOMacOSX />} />
                            </Routes>
                        </Suspense>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            sx={{
                                pt: 2,
                                pb: 2,
                                backgroundColor: "#000000",
                                bottom: 0,
                                width: "100%",
                                maxWidth: "100%",
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                textAlign="center"
                                sx={{
                                    maxWidth: screenSize === ScreenSize.Desktop ? "60%" : "90%",
                                }}
                            >
                                Horizon Private Server nor any of its staff, developers or members are affiliated with Sony Interactive
                                Entertainment (SIE), Insomniac Games, Idol Minds or Mass Media Inc. Ratchet and Clank™ and PlayStation™ are
                                registered trademarks that belong to SIE. Horizon does not condone or support piracy of any kind. Please
                                support the official game releases.
                            </Typography>
                        </Stack>
                    </Nav>
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    );
}

export default App;
