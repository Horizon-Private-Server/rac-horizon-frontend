import React from "react";
import Page from "../../components/base/Page";
import {Typography, Box, CardContent, Card, CardActionArea, Link, Breadcrumbs} from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate} from "react-router-dom";

import { makeStyles, createStyles } from "@mui/styles"


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
                backgroundImage: `url(https://rac-horizon-resources.s3.amazonaws.com/backgrounds/dl-background.jpg)`,
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

const GameModeCard = (props: GameModeCardProps) => {

    const { modeName, modeDetailsRoute, modeImage, modeDescription } = props;

    const navigate = useNavigate();

    const {width} = useWindowDimensions();
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
                            height: screenSize === ScreenSize.Mobile ? "auto" : 200
                        }}
                    >
                        <Typography variant="overline" fontSize={20} fontWeight="bold" sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{modeName}</Typography>
                        <Typography sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}} width="70%">{modeDescription}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

    </Card>
}

const DeadlockedCustomModes = () => {

    const classes = useStyles();

    const gameModes: GameModeCardProps[] = [
        {
            modeName: "Search & Destroy",
            modeDescription: "A competitive gamemode where there is an attacking and defending team fighting over 2 bomb sites!",
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/snd"
        },
        {
            modeName: "Payload",
            modeDescription: "A competitive gamemode where there is an attacking and defeding team fighting over a mobile payload!",
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/payload"
        },
        {
            modeName: "Training",
            modeDescription: `A mode to help improve your accuracy with the fusion rifle and cycling.`,
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/training"
        },
        {
            modeName: "Infected",
            modeDescription: "A party gamemode where one person is infected. As the infected player kills other players, they also become infected.",
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/infected"
        },
        {
            modeName: "Gun Game",
            modeDescription: `A party gamemode where everyone starts out with the same weapons, once you get a kill with a weapon, you will be promoted to the next weapon. Get a kill with every weapon to win.`,
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/gun-game"
        },
        {
            modeName: "Spleef",
            modeDescription: `A party gamemode where the objective is to destroy the blocks out from under other players. The last player standing wins a round. The player with the most points at the end wins.`,
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/spleef"
        },
        {
            modeName: "Infinite Climber",
            modeDescription: `An endless torrent of rain is upon you and the water is rising! New platforms procedurally generate to offer you safe passage to the heavens, you must use your parkour skills to survive!`,
            modeImage: "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            modeDetailsRoute: "/dl/custom/modes/infinite-climber"
        },
    ]

    return <Page className={classes.dlBackground}>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 4}}>
            <Link underline="hover" color="inherit" href="/dl">
                Deadlocked
            </Link>
            <Typography color="text.primary">Custom Game Modes</Typography>
        </Breadcrumbs>

        <Box
            sx={{p: 4}}
        >
            { gameModes.map((gameMode: GameModeCardProps) => {
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
        </Box>

    </Page>;
}

export default DeadlockedCustomModes;