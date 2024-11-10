import React from "react";

import { Box, Grid2, Stack } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";
import ImageBacking from "../../components/base/ImageBacking";
import { Podcasts, EmojiEvents, Gamepad, AddLocationAlt } from "@mui/icons-material";
import { UYA_BACKGROUND_IMAGES } from "../../utils/Constants";

const UYAHome = () => {
    const { width } = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const sections: SectionCardProps[] = [
        {
            label: "Players Online",
            description: "See who is currently online and in game!",
            url: "/uya/online",
            icon: <Podcasts />,
        },
        {
            label: "UYA Live",
            description: "Watch live games as they unfold!",
            url: "/uya/live",
            icon: <Podcasts />,
            enabled: false,
        },
        {
            label: "Stats & Leaderboards",
            description: "Track your progress and view the Horizon Leaderboards.",
            url: "/uya/stats",
            icon: <EmojiEvents />,
        },
        {
            label: "Custom Maps",
            description: "Browse a list of individual custom maps available for download.",
            url: "/uya/custom-maps",
            icon: <AddLocationAlt />,
        },
        {
            label: "Game History",
            description: "See past game stats and who played in past games!",
            url: "/uya/game-history",
            icon: <Gamepad />,
        },
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
        <ImageBacking backgroundUrl={UYA_BACKGROUND_IMAGES}>
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

export default UYAHome;
