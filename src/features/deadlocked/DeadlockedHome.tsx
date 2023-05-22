import React from "react";
import Page from "../../components/base/Page";
import { Box } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { makeStyles, createStyles } from "@mui/styles";

import dlBackground from "../../assets/img/dl-background.jpg";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpIcon from "@mui/icons-material/Help";
import StartIcon from "@mui/icons-material/Start";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GamepadIcon from "@mui/icons-material/Gamepad";
import SatelliteIcon from "@mui/icons-material/Satellite";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";


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

const DeadlockedHome = () => {

    const classes = useStyles();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const sections: SectionCardProps[] = [
        {
            label: "Stats & Leaderboards", 
            description: "Track your progress and see how you compare to other players. This leaderboard is more comprehensive than the leaderboard found in-game!", 
            url: "/dl/stats",
            icon: <EmojiEventsIcon />
        },
        {
            label: "Game History", 
            description: "View a list of all games played on Horizon!", 
            url: "/dl/games",
            icon: <SportsEsportsIcon />
        },
        {
            label: "Setup Guide", 
            description: "View the Horizon setup guides to get you started with PS2, PCSX2 and installing custom maps.", 
            url: "/setup",
            icon: <StartIcon />
        },
        {
            label: "FAQ", 
            description: "The Deadlocked/Gladiator team get a lot of the same questions, so much so that we started writing them down. If you're just joining the Deadlocked community and have a question, there's a good chance it's in the Deadlocked FAQ!", 
            url: "/dl/faq",
            icon: <HelpIcon />
        },
        {
            label: "Custom Game Modes", 
            description: "Explore the casual and competitive custom game modes only available on Horizon. Special thanks to Dnawrkshp for leading development.", 
            url: "/dl/custom/modes",
            icon: <GamepadIcon />
        },
        {
            label: "Custom Maps", 
            description: "Explore the collection of custom maps only available on Horizon. Special thanks to Badger41 for leading custom map development.", 
            url: "/dl/custom/maps",
            icon: <SatelliteIcon />
        },
        {
            label: "Survival", 
            description: "A guide for Horizon's most ambitions custom game mode.", 
            url: "/dl/survival",
            icon: <LocalFireDepartmentIcon />
        },
    ]



    return <Page className={classes.dlBackground}>
        
        <Box
            display="flex"
            flexDirection={screenSize === ScreenSize.Desktop ? "row" : "column"}
            justifyContent={"flex-start"}
            flexWrap="wrap"
            p={4}
        >

            { sections.map((section) => {
                return <SectionCard 
                    key={section.label}
                    label={section.label}
                    description={section.description}
                    url={section.url}
                    icon={section.icon}
                />
            })}

        </Box>
    </Page>;
}

export default DeadlockedHome;