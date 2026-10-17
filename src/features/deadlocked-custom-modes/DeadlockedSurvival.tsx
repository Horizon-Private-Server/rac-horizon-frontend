import React from "react";
import Page from "../../components/base/Page";
import { Typography, Box, CardContent, Card, CardActionArea, Link, Breadcrumbs} from "@mui/material";

import useWindowDimensions from "../../components/utils/WindowDimensions";

import { useNavigate } from "react-router-dom";

import SurvivalPrestigeCalculator from "../survival-prestige-calculator/SurvivalPrestigeCalculator";


interface GameModeCardProps {
    modeName: string;
    modeDescription: string;
    modeDetailsRoute: string;
    modeImage: string;
}

const GameModeCard = (props: GameModeCardProps) => {

    const { modeName, modeDetailsRoute, modeImage, modeDescription } = props;

    const navigate = useNavigate();

    const {width} = useWindowDimensions();

    return <Card  sx={{p: 0, zIndex: 1}}>
        
            <CardActionArea
                onClick={() => navigate(modeDetailsRoute)}
            >
                <CardContent sx={{ p: 0}}>
                    <Box
                        sx={{
                            WebkitMaskImage: "linear-gradient(65deg, transparent 20%, white)",
                            width: 500,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            right: 0
                        }}
                    >
                        <Box sx={{
                            backgroundImage: `url(${modeImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                        }} />
                    </Box>
                    <Box
                        sx={{
                            p: 3,
                            width: "70vw",
                            height: 200
                        }}
                    >
                        <Typography variant="overline" fontSize={20} fontWeight="bold" sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{modeName}</Typography>
                        <Typography sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{modeDescription}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

    </Card>
}

const DeadlockedSurvival = () => {

    const {width} = useWindowDimensions();

    const navigate = useNavigate();

    const survivalMaps: GameModeCardProps[] = [
        {
            modeName: "Orxon",
            modeDescription: 
                `The first map built for survival.
                This toxic mining facility might be abandoned, but you aren't alone.
                Fight wave after wave of lethal enemies and delve into deep into the toxic gas to uncover the secrets within.`,
            modeImage: "https://www.giantbomb.com/a/uploads/original/0/1717/1080843-orxon_surface.jpg",
            modeDetailsRoute: "/survival/orxon"
        },
        {
            modeName: "Mountain Pass",
            modeDescription:
                `The second fully featured Survival map.
                These majestic peaks and scattered monoliths hide many secrets.
                Fight through unending waves of enemies to earn the blessings of the gods.`,
            modeImage: "https://rac-horizon-cdn.s3.amazonaws.com/level-frames/survival_mpass.png",
            modeDetailsRoute: "/survival/mountain-pass"
        },
        {
            modeName: "Veldin",
            modeDescription:
                `A stripped-down, pure iteration of Survival.
                Ratchet's homeworld now plays host to the most intense iteration of survival.
                No easter eggs or drawn-out mechanics, this is pure survival on a tiny map with a 50% harder difficulty.`,
            modeImage: "https://rac-horizon-cdn.s3.amazonaws.com/level-frames/veldin.png",
            modeDetailsRoute: "/survival/veldin"
        },
        {
            modeName: "Valix Lighthouse",
            modeDescription:
                `Valix Lighthouse scatters the fight across a chain of islands linked by jump pads.
                Power the Soul Collectors to cross the void, but do not expect the lighthouse to offer safe harbor.`,
            modeImage: "https://rac-horizon-cdn.s3.us-east-2.amazonaws.com/level-frames/survival_valix.png",
            modeDetailsRoute: "/survival/valix"
        },
        {
            modeName: "Torval Ruins",
            modeDescription:
                `Torval Ruins has double the difficulty of Mountain Pass, and enemies spawn closer to you.
                There are no boss rounds, but minibosses can appear during normal rounds.`,
            modeImage: "https://rac-horizon-cdn.s3.us-east-2.amazonaws.com/level-frames/survival_torval.png",
            modeDetailsRoute: "/survival/torval"
        },
        {
            modeName: "Kavu Island",
            modeDescription:
                `Survival on Kavu Island is built around the store.
                Almost everything in Survival can be bought here if you have the bolts for it.`,
            modeImage: "https://rac-horizon-cdn.s3.us-east-2.amazonaws.com/level-frames/survival_kavu.png",
            modeDetailsRoute: "/survival/kavu-island"
        },
        {
            modeName: "Oozla",
            modeDescription:
                `Oozla's rain-soaked swamp turns every narrow path into a trap.
                Control the chokepoints and venture off the beaten path for secrets buried in the muck.`,
            modeImage: "https://rac-horizon-cdn.s3.us-east-2.amazonaws.com/level-frames/survival_oozla.png",
            modeDetailsRoute: "/survival/oozla"
        }
    ]

    return <Page>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingLeft: 6}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/deadlocked")} sx={{cursor: "pointer"}}>
                Deadlocked
            </Link>
            <Typography color="text.primary">Survival Guides</Typography>
        </Breadcrumbs>

        <Box sx={{p: 6}}>
            <Box
                sx={{
                    mb: 4,
                    p: {xs: 3, sm: 4},
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    background: (theme) => `linear-gradient(120deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
                    boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.25)",
                }}
            >
                <Typography
                    component="h1"
                    variant="h3"
                    sx={{fontSize: {xs: "2rem", sm: "2.75rem"}, fontWeight: 800, lineHeight: 1.1}}
                >
                    What is Survival?
                </Typography>
                <Box sx={{width: 72, height: 4, my: 2, borderRadius: 2, bgcolor: "secondary.main"}} />
                <Typography
                    sx={{fontSize: {xs: "1rem", sm: "1.1rem"}, lineHeight: 1.7}}
                >
                    Survival pits you against wave after wave of lethal enemies with the goal of surviving as long as possible.
                    Your high score is the number of rounds you complete before every player is down.
                </Typography>
            </Box>

            { survivalMaps.map((gameMode: GameModeCardProps) => {
                return <>
                    <GameModeCard 
                        modeName={gameMode.modeName}
                        modeDescription={gameMode.modeDescription}
                        modeDetailsRoute={gameMode.modeDetailsRoute}
                        modeImage={gameMode.modeImage}
                    />
                    <Box sx={{mb: 2 }}/>
                </>
            })}
            <Box sx={{mb: 5}}/>
            <SurvivalPrestigeCalculator />
        </Box>



    </Page>;
}

export default DeadlockedSurvival;