import React from "react";
import { Box } from "@mui/material";

import HelpIcon from "@mui/icons-material/Help";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";

import SettingsInputHdmiIcon from "@mui/icons-material/SettingsInputHdmi";
import GavelIcon from "@mui/icons-material/Gavel";
import GamepadIcon from "@mui/icons-material/Gamepad";


const Setup = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
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
          label: "Connecting to Horizon (PS2)",
          description: "Setup guide for connecting to Horizon using your PlayStation 2 hardware.",
          url: "https://github.com/Horizon-Private-Server/horizon-wiki/blob/main/getting-online/ps2/README.md",
          icon: <SettingsInputHdmiIcon />
        },
        {
          label: "Connecting to Horizon (PCSX2)",
          description: "Setup guide for connecting to Horizon using the PCSX2 emulator.",
          url: "https://github.com/Horizon-Private-Server/horizon-wiki/blob/main/getting-online/pcsx2/README.md",
          icon: <SettingsInputHdmiIcon />
        },
        {
            label: "Survival Guides",
            description: "A guide to help new players dig into Survival.",
            url: "/survival",
            icon: <GamepadIcon />
        }
  ]
    

    return <Box
        display="flex"
        flexDirection={screenSize === ScreenSize.Desktop ? "row" : "column"}
        justifyContent={"flex-start"}
        flexWrap="wrap"
        p={4}
    >
        { sections.map((section) => {
            return <SectionCard 
                key={section.label}
                label={section.label}
                description={section.description}
                url={section.url}
                icon={section.icon}
            />
        })}

    </Box>
}

export default Setup;