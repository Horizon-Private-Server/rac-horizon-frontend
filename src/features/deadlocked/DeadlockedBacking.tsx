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
                position: "relative",
                overflowX: "hidden",
                height: "calc(100vh - 140px)",
                width: screenSize === ScreenSize.Mobile ? "100vw" : "calc(100vw - 241px)",
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
                top: "0px",
                left: "0px",
                right: "0px",
                zIndex: -1,
                opacity: 0.35,
                height: "100%",
                width: "100%",
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
