import React from "react";

import {
    Box,
    Typography,
    Link,
    Breadcrumbs,
    Stack
} from "@mui/material";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import {Construction} from "@mui/icons-material";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const SurvivalVeldin = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate: NavigateFunction = useNavigate();

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, ml: 2}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/deadlocked")} sx={{cursor: "pointer"}}>
                Deadlocked
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/survival")} sx={{cursor: "pointer"}}>
                Survival
            </Link>
            <Typography color="text.primary">Veldin</Typography>
        </Breadcrumbs>

        <Stack direction="row" justifyContent="center" sx={{mt: 5}}>
            <Construction fontSize="large" />
            <Typography variant="h4" sx={{ml: 3, mr: 3}}>Coming Soon!</Typography>
            <Construction fontSize="large" />
        </Stack>

        <Box sx={{mb: screenSize === ScreenSize.Mobile ? 120 : screenSize === ScreenSize.Tablet ? 128 : 128}} />

    </Box>;
}
