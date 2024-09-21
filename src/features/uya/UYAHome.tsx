import React from "react";
import Page from "../../components/base/Page";
import { Box } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { makeStyles, createStyles } from "@mui/styles";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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

const UYAHome = () => {

    const classes = useStyles();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const sections: SectionCardProps[] = [
        {
            label: "Stats & Leaderboards",
            description: "Track your progress and view Horizon Leaderboards.",
            url: "/uya/stats",
            icon: <EmojiEventsIcon />
        },
    ]

    return <Page className={classes.dlBackground}>
        
        <Box
            display="flex"
            flexDirection={screenSize === ScreenSize.Desktop ? "row" : "column"}
            justifyContent="flex-start"
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

export default UYAHome;