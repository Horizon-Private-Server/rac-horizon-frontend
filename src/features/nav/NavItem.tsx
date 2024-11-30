import React from "react"
import { useNavigate, useLocation } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavItemState } from "./navSlice";
import {ListItemButton} from "@mui/material";

function NavItem(navItem: NavItemState) {

    const {label, tooltip, icon, path, hidden} = navItem;

    const navigate = useNavigate();
    const { pathname } = useLocation();

    if (hidden) return null;

    return (
        <Tooltip title={tooltip} placement="right">
            <ListItemButton
                selected={pathname === path}
                onClick={() => {
                    navigate(path);
                }}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        </Tooltip>
    );
}

export default NavItem;