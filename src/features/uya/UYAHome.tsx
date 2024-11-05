import React from "react";

import {Box, Grid} from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";
import ImageBacking from "../../components/base/ImageBacking";
import {Podcasts, EmojiEvents, Gamepad} from "@mui/icons-material";
import {UYA_BACKGROUND_IMAGES} from "../../utils/Constants";

const UYAHome = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const sections: SectionCardProps[] = [
        {
            label: "Players Online",
            description: "See who is currently online and in game!",
            url: "/uya/online",
            icon: <Podcasts />
        },
        {
            label: "UYA Live",
            description: "Watch live games as they unfold!",
            url: "/uya/live",
            icon: <Podcasts />,
            enabled: false
        },
        {
            label: "Stats & Leaderboards",
            description: "Track your progress and view the Horizon Leaderboards.",
            url: "/uya/stats",
            icon: <EmojiEvents />
        },
        {
            label: "Game History",
            description: "See past game stats and who played in past games!",
            url: "/uya/game-history",
            icon: <Gamepad />
        },
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

    return <ImageBacking backgroundUrl={UYA_BACKGROUND_IMAGES}>
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
                            enabled={section.enabled}
                        />
                    </Grid>
                })}
            </Grid>

        </Box>
    </ImageBacking>
}

export default UYAHome;