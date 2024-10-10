import React from "react";
import {Box, Grid} from "@mui/material";

import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

import GamepadIcon from "@mui/icons-material/Gamepad";

import {SectionCard, SectionCardProps} from "../../components/base/SectionCard";
import {Handyman} from "@mui/icons-material";
import {generateRandomString} from "../../components/utils/functions";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ImageBacking from "../../components/base/ImageBacking";

const DeadlockedHome = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const sections: SectionCardProps[] = [
        {
            label: "Survival Guides",
            description: "Track your progress and see how you compare to other players. This leaderboard is more comprehensive than the leaderboard found in-game!",
            url: "/survival",
            icon: <GamepadIcon />
        },
        {
            label: "Game Generator",
            description: "Generate a random casual Deadlocked Game with reasonable, fun presets.",
            url: `/deadlocked/ccgg/${generateRandomString(20)}`,
            icon: <Handyman />
        },
        {
            label: "Stats & Leaderboards",
            description: "Track your progress and view the Horizon Leaderboards.",
            url: "/deadlocked/stats",
            icon: <EmojiEventsIcon />
        },
        // {
        //     label: "Game History",
        //     description: "View a list of all games played on Horizon!",
        //     url: "/dl/games",
        //     icon: <SportsEsportsIcon />
        // },
        // {
        //     label: "Setup Guide",
        //     description: "View the Horizon setup guides to get you started with PS2, PCSX2 and installing custom maps.",
        //     url: "/setup",
        //     icon: <StartIcon />
        // },
        // {
        //     label: "FAQ",
        //     description: "The Deadlocked/Gladiator team get a lot of the same questions, so much so that we started writing them down. If you're just joining the Deadlocked community and have a question, there's a good chance it's in the Deadlocked FAQ!",
        //     url: "/dl/faq",
        //     icon: <HelpIcon />
        // },
        // {
        //     label: "Custom Game Modes",
        //     description: "Explore the casual and competitive custom game modes only available on Horizon. Special thanks to Dnawrkshp for leading development.",
        //     url: "/dl/custom/modes",
        //     icon: <GamepadIcon />
        // },
        // {
        //     label: "Custom Maps",
        //     description: "Explore the collection of custom maps only available on Horizon. Special thanks to Badger41 for leading custom map development.",
        //     url: "/dl/custom/maps",
        //     icon: <SatelliteIcon />
        // },
        // {
        //     label: "Survival",
        //     description: "A guide for Horizon's most ambitions custom game mode.",
        //     url: "/dl/survival",
        //     icon: <LocalFireDepartmentIcon />
        // },
    ]

    let numCols: number = 12;

    if (screenSize === ScreenSize.Tablet) {
        numCols = 6;
    }
    if (screenSize === ScreenSize.Desktop) {
        numCols = 4;
    }
    if (width > 1500) {
        numCols = 3;
    }

    return <ImageBacking backgroundUrl="https://rac-horizon-resources.s3.amazonaws.com/backgrounds/dl-background.jpg">
        <Box
            sx={{width: "100%", p: 4, height: "calc(100vh - 280px)"}}
            display="flex"
            flexDirection={screenSize === ScreenSize.Desktop ? "row" : "column"}
            justifyContent="flex-start"
            flexWrap="wrap"
        >
            <Grid sx={{p: 0}} container>
                { sections.map((section) => {
                    return <Grid key={section.label} xs={numCols} sx={{p: 1}} item>
                        <SectionCard
                            label={section.label}
                            description={section.description}
                            url={section.url}
                            icon={section.icon}
                        />
                    </Grid>
                })}
            </Grid>

        </Box>
    </ImageBacking>
}

export default DeadlockedHome;