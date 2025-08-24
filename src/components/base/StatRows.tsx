import React from "react";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {addCommasToNumber, computeSkillLevel} from "./Functions";

export const StatRows = ({label, value}: {label: string | JSX.Element, value: string | JSX.Element}) => {

    let labelFormat: JSX.Element = typeof label === "string" ?
        <Typography variant="overline" fontSize={15}>{label}</Typography> :
        label;

    let valueFormat: JSX.Element = typeof value === "string" ?
        <Typography variant="overline" fontSize={15}>{value}</Typography> :
        value;

    return <Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2, mb: 2}}>
        {labelFormat}
        {valueFormat}
    </Stack>
}


export const StatSubtitle = ({value, subtitle}: {value: string | JSX.Element, subtitle: string}) => {

    let valueFormat: JSX.Element = typeof value === "string" ?
        <Typography variant="overline" textAlign="right" fontSize={15}>{value}</Typography> :
        value;

    return <Stack direction="column" justifyContent="space-between">
        {valueFormat}
        <Typography variant="subtitle2" textAlign="right" fontSize={12} color="secondary.main" sx={{mt: -1}}>
            {subtitle}
        </Typography>
    </Stack>
}

export const RankRow = ({label, rank}: {label: string, rank: number}) => {

    let skillNumber: number = parseInt(computeSkillLevel(rank ?? 0).split(".")[0])

    return <StatRows
        label={label}
        value={
            <Stack direction="row" justifyContent="space-between">
                <Box sx={{mt: 1}}>
                    <img
                        src={`https://rac-horizon-cdn.s3.amazonaws.com/icons/skill_levels/tex_${66 + skillNumber}.png`}
                        alt={`Deadlocked Number Icon ${skillNumber}`}
                        width={40}
                        height={40}
                    />
                </Box>
                <Divider orientation="vertical" sx={{ml: 2, mr: 2}} />
                <StatSubtitle
                    value={computeSkillLevel(rank ?? 0)}
                    subtitle={`(${rank})` ?? "(0)"}
                />
            </Stack>
        }
    />
}

export const RatioRow = ({label, n, d}: {label: string | JSX.Element, n: number, d: number}) => {

    let ratio = (n ?? 1) / (d ?? 1);
    if (isNaN(ratio)) {
        ratio = 0.00;
    }

    if (!isFinite(ratio)) {
        ratio = parseFloat(n.toString());
    }

    return <StatRows
        label={label}
        value={
            <StatSubtitle
                value={`${addCommasToNumber(n ?? 0)} / ${addCommasToNumber(d ?? 0)}`}
                subtitle={`(${ratio.toFixed(2)})` ?? "(0.00)"}
            />
        }
    />
}
