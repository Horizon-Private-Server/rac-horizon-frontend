import React from "react";

import { Typography, Box, Link } from "@mui/material";

import CenterObject from "../../components/base/CenterObject";
import LineBreak from "../../components/base/LineBreak";

import useWindowDimensions from "../../components/utils/WindowDimensions";

export interface HomeCardContentState {
    link: string;
    icon: string;
    iconAltText: string;
    title: string;
    description: string;
}

const HomeCardContent = (props: HomeCardContentState) => {

    const {link, icon, iconAltText, title, description} = props;


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { height, width } = useWindowDimensions();

    // Desktop view
    let size = 2;

    // Tablet or Non-Fullscreen view
    if (width <= 855) {
        size = 0;
    }
    // Mobile View
    else if (width <= 1500) {
        size = 1;
    }
    
    if (size === 0) {
        return <Link
            href={link}
            target="_blank"
            style={{textDecoration: "none", color: "white"}}
        >
            <CenterObject>
                <CenterObject orientation="vertical">
                    <img 
                        src={icon}
                        alt={iconAltText}
                        width={"60px"}
                        height={"60px"}

                    />
                </CenterObject>
            </CenterObject>
        </Link>;
    }

    if (size === 1) {
        return <Link
            href={link}
            target="_blank"
            style={{textDecoration: "none", color: "white"}}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start"
                }}
            >
                <img 
                    src={icon}
                    alt={iconAltText}
                    width={"60px"}
                    height={"60px"}

                />
                <Box sx={{marginRight: "12px"}} />
                <CenterObject orientation="vertical">
                    <Typography><b>{title}</b></Typography>
                </CenterObject>
            </Box>
            

            <LineBreak amount={12} />
            <Typography style={{minHeight: "80px"}}>{description}</Typography>

        </Link>;
    }

    return <Link
        href={link}
        target="_blank"
        style={{textDecoration: "none", color: "white"}}
    >
        <CenterObject>
            <CenterObject orientation="vertical">
                <img 
                    src={icon}
                    alt={iconAltText}
                    width={"100px"}
                    height={"100px"}

                />
            </CenterObject>
            <Box sx={{marginRight: "40px"}} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    minHeight: "116px"
                }}
            >
                <Typography variant="h5">{title}</Typography>
                <LineBreak amount={8} />
                <Box
                    sx={{
                        maxWidth: "80%"
                    }}
                >
                    <Typography>{description}</Typography>
                </Box>
            </Box>

        </CenterObject>
    </Link>;
}

export default HomeCardContent;