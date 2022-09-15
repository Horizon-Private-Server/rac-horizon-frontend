import React from "react";

import { Box } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

export interface ImageParagraphState {
    children?: JSX.Element | JSX.Element[];
    image: string | JSX.Element;
    imageAltText?: string;
    imageSide?: "left" | "right";
}

const InlineImage = (props: ImageParagraphState) => {

    const {children, image, imageAltText, imageSide} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    let compImageSide = imageSide ?? "right";

    let compImg : JSX.Element = <Box />;

    if (screenSize !== ScreenSize.Mobile) {
        if ((typeof image) === typeof "") {
            compImg = <img 
                src={image as string}
                alt={imageAltText ?? image as string}
                width={"33%"}
            />;
        }
        else {
            compImg = image as JSX.Element;
        }
    }

    if (compImageSide === "left") {
        return <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            {compImg}
            <Box sx={{marginRight: "20px"}} />
            <Box>
                {children}
            </Box>
        </Box>;
    }
    else {
        return <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <Box>
                {children}
            </Box>
            <Box sx={{marginRight: "20px"}} />
            {compImg}
        </Box>;
    }
}

export default InlineImage;