import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, Tab, Tabs, CardContent, Card, CardActionArea, Link, Breadcrumbs} from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate } from "react-router-dom";

import { makeStyles, createStyles } from "@mui/styles"

import dlBackground from "../../assets/img/dl-background.jpg";

import SurvivalPrestigeCalculator from "../survival-prestige-calculator/SurvivalPrestigeCalculator";

const useStyles = makeStyles(() =>
    createStyles({
        dlBackground: {
            "&": {
                position: "relative", 
                height: "100%",
                width: "100%",
                display: "flex",
                opacity: 1.0,
                zIndex: 0
            },
            "&:after": {
                backgroundImage: `url(${dlBackground})`,
                backgroundSize: "cover",
                position: "absolute",
                top: "0px",
                left: "0px",
                right: "0px",
                zIndex: -1,
                opacity: 0.32,
                height: "100%",
                width: "100%",
                content: '""',
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat"
            }
        }
    })
);

interface GameModeCardProps {
    modeName: string;
    modeDescription: string;
    modeDetailsRoute: string;
    modeImage: string;
}

const GameModeCard2 = (props: GameModeCardProps) => {

    const { modeName, modeDetailsRoute, modeImage, modeDescription } = props;

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);


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
                            backgroundPosition: "60px -40px",
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
                        <Typography variant="overline" fontSize={20} fontWeight="bold">{modeName}</Typography>
                        <Typography sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{modeDescription}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

    </Card>
}

const GameModeCard = (props: GameModeCardProps) => {

    const { modeName, modeDetailsRoute, modeImage, modeDescription } = props;

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);


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

    const classes = useStyles();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

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
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/survival_mpass.png",
            modeDetailsRoute: "/survival/mountain-pass"
        },
        {
            modeName: "Veldin",
            modeDescription:
                `A stripped-down, pure iteration of Survival.
                Ratchet's homeworld now plays host to the most intense iteration of survival.
                No easter eggs or drawn-out mechanics, this is pure survival on a tiny map with a 50% harder difficulty.`,
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/veldin.png",
            modeDetailsRoute: "/survival/veldin"
        }
    ]

    return <Page>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingLeft: 6}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/getting-started")} sx={{cursor: "pointer"}}>
                Getting Started
            </Link>
            <Typography color="text.primary">Survival</Typography>
        </Breadcrumbs>

        <Box sx={{p: 6}}>
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