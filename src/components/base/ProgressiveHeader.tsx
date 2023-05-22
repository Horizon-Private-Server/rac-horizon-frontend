import React from "react";

import { Typography } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

export interface ProgressiveHeaderState {
    headerText?: string;
}

const ProgressiveHeader = (props: ProgressiveHeaderState) => {

    const {headerText} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <>
        { screenSize === ScreenSize.Desktop ? 
            <Typography variant="h5">{headerText}</Typography> 
            :
            screenSize === ScreenSize.Tablet ?
                <Typography variant="h6">{headerText}</Typography>
                :
                <Typography><b>{headerText}</b></Typography>
        }
    </>
}

export default ProgressiveHeader;