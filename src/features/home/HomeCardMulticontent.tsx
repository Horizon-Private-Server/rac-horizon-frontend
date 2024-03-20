import React from "react";

import {Typography, Box, Link, Tooltip, Stack, Grid} from "@mui/material";

import CenterObject from "../../components/base/CenterObject";
import SpaceBetweenObject from "../../components/base/SpaceBetweenObject";
import LineBreak from "../../components/base/LineBreak";

import useWindowDimensions from "../../components/utils/WindowDimensions";

export interface ActionIcon {
    icon: JSX.Element | Element | string;
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

        return <Box sx={{mt: 1.5, pb: 1}}>
            <Stack direction="row" justifyContent="center">
                <Stack direction="row" justifyContent="flex-start">
                    <img
                        src={icon}
                        alt={iconAltText}
                        width={"24px"}
                        height={"24px"}
                        style={{objectFit: "contain"}}
                    />
                    {mobileTitle && (
                        <Stack direction="column" justifyContent="center">
                            <Typography sx={{mt: 0.30, ml: 1}}>{mobileTitle ?? ""}</Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" sx={{mr: 2}}>
                {actionIcons.map((actionIcon: ActionIcon) => {
                    return <Tooltip title={actionIcon.altText} sx={{ml: 1}}>
                        <Link onClick={() => actionIcon.action()} sx={{cursor: "pointer", ml: 1, mt: 2}}>
                            <img src={actionIcon.icon as string} width={48} height={48} alt={actionIcon.altText}/>
                        </Link>
                    </Tooltip>
                })}
            </Stack>
        </Box>
    }

    if (size === 1) {
        return <Box sx={{p: 2}}>
            <Stack direction="row" justifyContent="space-between">
                <Box>
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
                            width={60}
                            height={60}
                            style={{objectFit: "contain"}}

                        />
                        <Box sx={{marginRight: "12px"}} />
                        <CenterObject orientation="vertical">
                            <Typography><b>{title}</b></Typography>
                        </CenterObject>
                    </Box>

                    <LineBreak amount={12} />
                    <Typography style={{minHeight: "80px"}} sx={{mr: 2}}>{description}</Typography>
                </Box>

                <Stack direction="column" justifyContent="flex-start">
                    {actionIcons.map((actionIcon: ActionIcon) => {
                        return <Tooltip title={actionIcon.altText} sx={{ml: 1}}>
                            <Link onClick={() => actionIcon.action()} sx={{cursor: "pointer"}}>
                                <img src={actionIcon.icon as string} width={48} height={48} alt={actionIcon.altText} />
                            </Link>
                        </Tooltip>
                    })}
                </Stack>

            </Stack>

        </Box>;
    }

    return <Box sx={{height: "100%", p: 2}}>
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
                                <img src={actionIcon.icon as string} width={60} height={60} alt={actionIcon.altText}/>
                            </Link>
                        </Tooltip>
                    })}
                </Stack>
            </Stack>

        </SpaceBetweenObject>
    </Box>;
}

export default HomeCardMulticontent;
