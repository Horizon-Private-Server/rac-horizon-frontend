import React from "react";
import {Box} from "@mui/material";

import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../utils/WindowDimensions";
import {randomChoice} from "./Functions";

export interface ImageBackingProps {
    backgroundUrl: string | string[];
    children: JSX.Element | JSX.Element[];
}

const ImageBacking = (props: ImageBackingProps) => {

    const {children, backgroundUrl} = props;

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    let compBackgroundUrl: string = "";

    if (typeof backgroundUrl !== "string") {
        compBackgroundUrl = randomChoice<string>(backgroundUrl);
    }
    else {
        compBackgroundUrl = backgroundUrl;
    }

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
                backgroundImage: `url(${compBackgroundUrl})`,
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

export default ImageBacking;
