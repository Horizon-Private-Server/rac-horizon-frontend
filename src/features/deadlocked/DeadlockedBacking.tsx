import React from "react";
import {Box, Grid} from "@mui/material";

import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

import dlBackground from "../../assets/img/dl-background.jpg";

export interface DeadlockedBackingProps {
    children: JSX.Element | JSX.Element[];
}

const DeadlockedBacking = (props: DeadlockedBackingProps) => {

    const {children} = props;

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <Box
        sx={{
            "&": {
                background: "rgba(0, 0, 0, 0.0)",
                position: "relative",
                overflowX: "hidden",
                height: "100%",
                width: "100%",
                display: "flex",
                opacity: 1.0,
                zIndex: 0
            },
            "&:after": {
                backgroundImage: `url(${dlBackground})`,
                backgroundSize: "cover",
                backgroundPositionX: screenSize === ScreenSize.Mobile ? 0 : 241,
                position: "absolute",
                overflowX: "hidden",
                zIndex: -1,
                opacity: 0.35,
                height: "100%",
                width: screenSize === ScreenSize.Mobile ? "100vw" : "calc(100vw - 241px)",
                content: '""',
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat"
            }
        }}
    >
        {children}
    </Box>;
}

export default DeadlockedBacking;
