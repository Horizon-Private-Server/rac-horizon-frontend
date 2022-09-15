import React, { useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box} from "@mui/material";

import CenterObject from "../../components/base/CenterObject";
import LineBreak from "../../components/base/LineBreak";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import RowListSet from "../../components/base/RowListSet";

import { makeStyles, createStyles } from "@mui/styles";


const useStyles = makeStyles(() =>
createStyles({
    noTBMargin: {
        marginTop: "2px",
        marginBottom: "2px"
    }
})
);


const PS2Setup = () => {

    const classes = useStyles();

    useEffect(() => {}, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    let title : JSX.Element = <Box />;
    if (screenSize !== ScreenSize.Mobile) {
        title = <CenterObject><Typography variant="h5">Setup Horizon on your PlayStation 2</Typography></CenterObject>;
    }
    else {
        title = <Typography><b>Setup Horizon on your PlayStation 2</b></Typography>;
    }

    const requiredItems = [
        {color: "success", text: "PlayStation 2 Console"},
        {color: "success", text: "PS2 Controller (DualShock 2 or other)"},
        {color: "success", text: "PS2 8MB+ memory Card"},
        {color: "success", text: "Ratchet &amp; Clank: Up Your Arsenal or Ratchet: Deadlocked (Gladiator) Disc"},
        {color: "success", text: "A Network Cable and Physical Network Connection to a Network Router"},
        {color: "primary", text: "Network Adapter (Only required if you have an older \"fat\" PS2, all \"slim\" PS2s have a built-in network adapter)"},
        {color: "primary", text: "USB Flash Drive (Required if you have a PAL or NTSC-J PS2 and Game Disc OR if you plan on playing custom maps"},
        {color: "primary", text: "Free McBoot memory card (Required if you have a PAL or NTSC-J PS2 and game disc)"},
    ]

    return <Page>

        {title}

        <LineBreak amount={20} />

        <Typography paragraph>
            PlayStation 2 is the preferred method for playing Ratchet and Clank: Up Your Arsenal and Ratchet: Deadlocked and will provide the best experience
            in terms of setup time and gameplay experience. The following guide will walk you through connection to the Horizon Private Server.
            No PS2 modifications or cheat devices (e.g., CodeBreaker, ActionReplay) are required to access Horizon.
        </Typography>

        <Typography variant="h6">Required items</Typography>

        <LineBreak amount={12}/>

        <RowListSet>
            { requiredItems.map((elem, index) => {
                return <ul key={index} className={classes.noTBMargin}><li><Typography sx={{ color: `${elem.color}.main` }}>{elem.text}</Typography></li></ul>;
            })}
        </RowListSet>

        <LineBreak amount={12}/>

        <Typography paragraph sx={{ color: 'secondary.main' }}>Note: You will NOT need the PlayStation 2 Network Setup Disc as both games contain the required setup configurators.</Typography>

    </Page>;
}

export default PS2Setup;