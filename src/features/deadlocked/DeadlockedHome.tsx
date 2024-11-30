import React from "react";
import { Box, Grid2, Stack } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import GamepadIcon from "@mui/icons-material/Gamepad";

import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";
import { AddLocationAlt, Handyman, Search } from "@mui/icons-material";
import { generateRandomString } from "../../components/utils/functions";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ImageBacking from "../../components/base/ImageBacking";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const DeadlockedHome = () => {
    const { width } = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const sections: SectionCardProps[] = [
        {
            label: "Survival Guides",
            description: "Learn the basics for survival and explore advanced strategies developed by the community.",
            url: "/survival",
            icon: <GamepadIcon />,
        },
        {
            label: "Game Generator",
            description: "Generate a random casual Deadlocked Game with reasonable, fun presets.",
            url: `/deadlocked/ccgg/${generateRandomString(20)}`,
            icon: <Handyman />,
        },
        {
            label: "Stats & Leaderboards",
            description:
                "Track your progress and see how you compare to other players. This leaderboard is more comprehensive than the leaderboard found in-game!",
            url: "/deadlocked/stats",
            icon: <EmojiEventsIcon />,
        },
        {
            label: "Custom Maps",
            description: "Browse a list of individual custom maps available for download.",
            url: "/deadlocked/custom-maps",
            icon: <AddLocationAlt />,
        },
        {
            label: "Player Search",
            description: "Search for a Deadlocked player by name.",
            url: "/deadlocked/player-search",
            icon: <Search />,
        },
        {
            label: "Game History",
            description: "View a list of all games played on Horizon!",
            url: "/deadlocked/game-history",
            icon: <SportsEsportsIcon />,
            enabled: false,
        },

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
    ];

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

    return (
        <ImageBacking backgroundUrl="https://rac-horizon-resources.s3.amazonaws.com/backgrounds/dl-background.jpg">
            {/* FIXME This is CSS hackery that "works" for the time being. */}
            <Box sx={{ height: `calc(${screenSize === ScreenSize.Mobile ? 180 : 100}vh - 280px)` }}>
                <Stack direction="column">
                    <Grid2 sx={{ p: 3 }} spacing={3} container>
                        {sections.map((section: SectionCardProps, index: number) => {
                            return (
                                <Grid2 key={index} size={{ xs: numCols }}>
                                    <SectionCard
                                        label={section.label}
                                        description={section.description}
                                        url={section.url}
                                        icon={section.icon}
                                        enabled={section.enabled}
                                    />
                                </Grid2>
                            );
                        })}
                    </Grid2>
                </Stack>
            </Box>
        </ImageBacking>
    );
};

export default DeadlockedHome;
