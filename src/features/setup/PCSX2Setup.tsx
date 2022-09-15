import React, { useEffect, useState } from "react";
import Page from "../../components/base/Page";
import { Typography, Box } from "@mui/material";

import PageCard from "../../components/base/PageCard";
import CenterObject from "../../components/base/CenterObject";
import LineBreak from "../../components/base/LineBreak";

import { useAppSelector } from "../../app/hooks";

import { useAppDispatch } from "../../app/hooks";

import githubIcon from "../../assets/img/GitHub-Icon.png";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";


const PCSX2Setup = () => {

    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    useEffect(() => {}, [])

    const [tabIndex, setTabIndex] = useState(0);


    return <Page>
        <Typography>Setup Horizon on PCSX2</Typography>
    </Page>;
}

export default PCSX2Setup;