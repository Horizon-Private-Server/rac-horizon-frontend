import React from "react";
import { Typography } from "@mui/material";

export const PRESTIGE_COLORS: string[] = [
    "white",
    "dodgerblue",
    "green",
    "purple",
    "cyan",
    "red",
];

export interface PrestigeNameProps {
    level: number;
}

export const PrestigeName = (props: PrestigeNameProps) => {

    const {level} = props;
    const label = level <= 0 ? "Base Weapon" : `Prestige ${level}`;

    return <Typography fontWeight="bold" color={PRESTIGE_COLORS[level] ?? "white"}>{label}</Typography>;
};

export default PrestigeName;
