import React from "react";
import Page from "../../components/base/Page";
import { Typography } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";


const PCSX2Setup = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <Page>
        <Typography>Setup Horizon on PCSX2</Typography>
    </Page>;
}

export default PCSX2Setup;