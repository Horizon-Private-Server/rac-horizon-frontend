import React, { useEffect, useState } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, Tab, Tabs } from "@mui/material";

import PageCard from "../../components/base/PageCard";
import CenterObject from "../../components/base/CenterObject";
import LineBreak from "../../components/base/LineBreak";

import { useAppSelector } from "../../app/hooks";

import { useAppDispatch } from "../../app/hooks";

import githubIcon from "../../assets/img/GitHub-Icon.png";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { a11yProps, TabPanel } from "../../components/base/TabPanel";
import PS2Setup from "./PS2Setup";
import PCSX2Setup from "./PCSX2Setup";


const Setup = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {}, [])

    const [tabIndex, setTabIndex] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    

    return <Page>
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="PlayStation 2 Setup" {...a11yProps(0)} />
                <Tab label="PCSX2 Setup" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabIndex} index={0}>
                <PS2Setup />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <PCSX2Setup />
            </TabPanel>
        </Box>
    </Page>;
}

export default Setup;