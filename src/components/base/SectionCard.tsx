import React from "react";

import {Typography, Box, Stack, CardContent, Card, CardActionArea, Divider, Paper} from "@mui/material";

import { useNavigate } from "react-router-dom";

export interface SectionCardProps {
    label: string;
    description: string;
    url: string;
    icon: JSX.Element;
    enabled?: boolean;
}

export const SectionCard = ({label, description, url, icon, enabled = true}: SectionCardProps) => {

    const navigate = useNavigate();

    if (enabled) {
        return <Card component={Paper} sx={{maxWidth: "90vw"}}>
            <CardActionArea
                onClick={() => {
                    if (url.includes("http://") || url.includes("https://")) {
                        window.open(url, "_blank", "noreferrer");
                    }
                    else {
                        navigate(url);
                    }
                }}
            >
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Stack direction="column" justifyContent="center" marginRight={4}>
                            {icon}
                        </Stack>
                        <Typography fontWeight="bold" fontSize={20}>{label}</Typography>
                    </Stack>
                    <Box sx={{mb: 1}}/>
                    <Divider variant="inset"/>
                    <Box sx={{mb: 2}}/>
                    <Typography height="12vh" flexWrap="wrap">{description}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    }

    return <Card component={Paper} sx={{maxWidth: "90vw", opacity: 0.65}}>
        <CardContent>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Stack direction="column" justifyContent="center" marginRight={4}>
                    {icon}
                </Stack>
                <Typography fontWeight="bold" fontSize={20}>{label}</Typography>
            </Stack>
            <Box sx={{mb: 1}}/>
            <Divider variant="inset"/>
            <Box sx={{mb: 2}}/>
            <Typography height="9vh" flexWrap="wrap">{description}</Typography>
            <Typography variant="overline" sx={{mt: -10}}>COMING SOON</Typography>


        </CardContent>
    </Card>
}


