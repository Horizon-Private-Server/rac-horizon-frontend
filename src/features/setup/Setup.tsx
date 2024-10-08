import React from "react";
import {Box, Grid} from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";

import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi";
import GavelIcon from "@mui/icons-material/Gavel";

const Setup = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    // const sections: SectionCardProps[] = [
    //     {
    //         label: "Horizon Rules & Policies", 
    //         description: "View all of the Horizon rules and policies governing the Horizon Discord Server as well as all servers run and managed by Horizon.", 
    //         url: "/rules",
    //         icon: <GavelIcon />
    //     },
    //     {
    //         label: "Connecting to Horizon (PS2)", 
    //         description: "Setup guide for connecting to Horizon using your PlayStation 2 hardware.", 
    //         url: "/setup/ps2",
    //         icon: <SettingsInputHdmiIcon />
    //     },
    //     {
    //         label: "Connecting to Horizon (PCSX2)", 
    //         description: "Setup guide for connecting to Horizon using the PCSX2 emulator.", 
    //         url: "/setup/pcsx2",
    //         icon: <SettingsInputHdmiIcon />
    //     },
    //     {
    //         label: "PCSX2 Tweaks & Optimizations", 
    //         description: "A setup guide to improve your experice with using PCSX2.", 
    //         url: "/configure/pcsx2",
    //         icon: <SettingsSuggestIcon />
    //     },
    //     {
    //         label: "FAQ", 
    //         description: "We get a lot of the same questions, so much so that we started writing them down. If you're just joining Horizon and have a question, there's a good chance it's already in the FAQs!", 
    //         url: "/faq",
    //         icon: <HelpIcon />
    //     },
    // ]
    const sections: SectionCardProps[] = [
        {
          label: "Horizon Rules & Policies",
          description: "View all of the Horizon rules and policies governing the Horizon Discord Server as well as all servers run and managed by Horizon.",
          url: "https://github.com/Horizon-Private-Server/horizon-wiki/blob/main/horizon-policies/README.md",
          icon: <GavelIcon />
        },
        {
          label: "PS2 Setup",
          description: "Setup guide for connecting to Horizon using your PlayStation 2 hardware.",
          url: "https://github.com/Horizon-Private-Server/horizon-wiki/blob/main/getting-online/ps2/README.md",
          icon: <SettingsInputHdmiIcon />
        },
        {
          label: "PCSX2 Setup",
          description: "Setup guide for connecting to Horizon using the PCSX2 emulator.",
          url: "https://github.com/Horizon-Private-Server/horizon-wiki/blob/main/getting-online/pcsx2/README.md",
          icon: <SettingsInputHdmiIcon />
        }
    ]

    let numCols: number = 12;

    if (screenSize === ScreenSize.Tablet) {
        numCols = 6;
    }
    if (screenSize === ScreenSize.Desktop) {
        numCols = 4;
    }
    if (width > 1500) {
        numCols = 3;
    }

    return <>
        <Box sx={{p: 1}}>
            <Grid sx={{p: 0}} container>
                { sections.map((section) => {
                    return <Grid key={section.label} xs={numCols} sx={{p: 1}} item>
                        <SectionCard
                            key={section.label}
                            label={section.label}
                            description={section.description}
                            url={section.url}
                            icon={section.icon}
                        />
                    </Grid>
                })}
            </Grid>
            <Box sx={{mb: 109}} />
        </Box>
    </>
}

export default Setup;