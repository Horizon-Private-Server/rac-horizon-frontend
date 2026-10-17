import React from "react";
import { Stack, Typography } from "@mui/material";
import SurvivalIcon from "../atoms/SurvivalIcon";
import { ICON_FILTER_PURPLE, ICON_GATE_RESET } from "../constants/icons";

export interface IconCalloutProps {
    children: string | JSX.Element | (string | JSX.Element)[];
    marginBottom?: number;
}

// small warning icon followed by bold text
export const IconCallout = (props: IconCalloutProps) => {

    const {children, marginBottom} = props;

    return <Stack direction="row" justifyContent="flex-start" sx={{mb: marginBottom ?? 1}}>
        <SurvivalIcon src={ICON_GATE_RESET} alt="Warning Icon" filter={ICON_FILTER_PURPLE} size={20} />
        <Typography sx={{ml: 1}}>
            <b>{children}</b>
        </Typography>
    </Stack>;
};

export default IconCallout;
