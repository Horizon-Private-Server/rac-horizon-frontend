import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";

export interface SurvivalBreadcrumbsProps {
    mapName: string;
}

export const SurvivalBreadcrumbs = (props: SurvivalBreadcrumbsProps) => {

    const {mapName} = props;
    const navigate: NavigateFunction = useNavigate();

    return <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, ml: 2}}>
        <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
            Horizon
        </Link>
        <Link underline="hover" color="inherit" onClick={() => navigate("/deadlocked")} sx={{cursor: "pointer"}}>
            Deadlocked
        </Link>
        <Link underline="hover" color="inherit" onClick={() => navigate("/survival")} sx={{cursor: "pointer"}}>
            Survival Guides
        </Link>
        <Typography color="text.primary">{mapName}</Typography>
    </Breadcrumbs>;
};

export default SurvivalBreadcrumbs;
