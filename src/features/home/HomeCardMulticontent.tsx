import React from "react";

import {Typography, Box, Link, Tooltip, Stack} from "@mui/material";

import CenterObject from "../../components/base/CenterObject";
import SpaceBetweenObject from "../../components/base/SpaceBetweenObject";
import LineBreak from "../../components/base/LineBreak";

import useWindowDimensions from "../../components/utils/WindowDimensions";

export interface ActionIcon {
    icon: JSX.Element;
    altText: string;
    action: () => void;
}

export interface HomeCardMulticontentState {
    icon: string;
    title: string | JSX.Element;
    iconAltText: string;
    mobileTitle?: string | JSX.Element;
    description: string;
    actionIcons: ActionIcon[];
}

const HomeCardMulticontent = (props: HomeCardMulticontentState) => {

    const {icon, title, mobileTitle, description, iconAltText, actionIcons} = props;


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
        return <Box sx={{height: "100%"}}>
            <div style={{textAlign: "center"}}>{mobileTitle ?? ""}</div>
            <CenterObject>
                <CenterObject orientation="vertical">
                    <img
                        src={icon}
                        alt={iconAltText}
                        width={"60px"}
                        height={"60px"}
                        style={{objectFit: "contain"}}
                    />
                </CenterObject>
            </CenterObject>
        </Box>
    }

    if (size === 1) {
        return <Box sx={{height: "100%"}}>
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
                    style={{objectFit: "contain"}}

                />
                <Box sx={{marginRight: "12px"}} />
                <CenterObject orientation="vertical">
                    <Typography><b>{title}</b></Typography>
                </CenterObject>
            </Box>


            <LineBreak amount={12} />
            <Typography style={{minHeight: "80px"}}>{description}</Typography>

        </Box>;
    }

    return <Box sx={{height: "100%"}}>
        <SpaceBetweenObject>
            <CenterObject orientation="vertical">
                <img
                    src={icon}
                    alt={iconAltText}
                    width={"100px"}
                    height={"100%"}
                    style={{objectFit: "contain"}}

                />
            </CenterObject>
            <Box sx={{marginRight: "40px"}} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    minHeight: "116px",
                    width: "100%"
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

            <Stack direction="column" justifyContent="flex-end">
                <Stack direction="column" justifyContent="flex-end">
                    {actionIcons.map((actionIcon: ActionIcon) => {
                        return <Tooltip title={actionIcon.altText} sx={{ml: 1}}>
                            <Link onClick={() => actionIcon.action()} sx={{cursor: "pointer"}}>
                                {actionIcon.icon}
                            </Link>
                        </Tooltip>
                    })}
                </Stack>
            </Stack>

        </SpaceBetweenObject>
    </Box>;
}

export default HomeCardMulticontent;
