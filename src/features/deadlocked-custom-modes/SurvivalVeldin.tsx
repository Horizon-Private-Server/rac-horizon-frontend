import React from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    TableCell,
    TableRow,
    TableHead,
    TableContainer,
    TableBody,
    Link,
    Breadcrumbs,
    Stack
} from "@mui/material";
import { TextHeading, TextList } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { ChangingImage } from "../../components/base/ChangingImage";
import { MobileFriendlyIconRow, MobileFriendlyTextRow } from "../../components/base/MobileFriendlyRow";
import {Construction} from "@mui/icons-material";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const SurvivalVeldin = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate: NavigateFunction = useNavigate();

    const PLAYER_REVIVE_DELTA = "8,000";
    const MYSTERY_BOX_COST = "10,000";

    const cs = () => {

        if (screenSize === ScreenSize.Desktop) {
            return 64;
        }
        else if (screenSize === ScreenSize.Tablet) {
            return 56;
        }
        else {
            return 48;
        }
    };

    const WARNING_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_14.png"
        alt="Gate Reset Icon"
        width={20}
        height={20}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;

    const GATE_RESET_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_14.png"
        alt="Gate Reset Icon"
        width={cs()}
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;

    const ALL_ALPHA_MODS_ICON = <ChangingImage
        srcList={[
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_41.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_40.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_47.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_42.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png",
        ]}
        altList={[
            "Speed Mod Icon",
            "Ammo Mod Icon",
            "Aiming Mod Icon",
            "Impact Mod Icon",
            "Area Mod Icon",
            "Jackpot Mod Icon",
            "XP Mod Icon"
        ]}
        interval={1000}
        width={cs()}
        height={cs()}
        variant="sequential"
    />;

    const DREAD_TOKEN_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_35.png" alt="Dread Token Icon" width={cs()} height={cs()} />;
    const UPGRADE_WEAPON_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_37.png" alt="Upgrade Weapon Icon" width={cs()} height={cs()} />;

    const SUPERCHARGE_POWER_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_54.png"
        alt="Power Supercharge Icon"
        width={cs()}
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(45deg)"}}
    />;

    const INFINITE_AMMO_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_93.png"
        alt="Infinite Ammo Icon"
        width={cs()}
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;

    const SELF_REVIVE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_80.png" alt="Self-Revive Icon" width={cs()} height={cs()} />;
    const INVISIBILITY_CLOAK_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_19.png" alt="Invisibility Cloak Icon" width={cs()} height={cs()} />;
    const VOX_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_132.png" alt="Vox Icon" width={cs()} height={cs()} />;

    const INSTANT_HEALTH_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_18.png" alt="Instant Health Icon" width={cs()} height={cs()} />;
    const MAX_AMMO_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_93.png" alt="Max Ammo Icon" width={cs()} height={cs()} />;
    const NUKE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_22.png" alt="Nuke Icon" width={cs()} height={cs()} />;
    const FREEZE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_46.png" alt="Freeze Icon" width={cs()} height={cs()} />;
    const DOUBLE_POINTS_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Double Points Icon" width={cs()} height={cs()} />;
    const DOUBLE_XP_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png" alt="Double XP Icon" width={cs()} height={cs()} />;

    const INCREASE_HEALTH_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_18.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const INCREASE_DAMAGE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_12.png" alt="Increase Damage Icon" width={cs()} height={cs()} />;
    const INCREASE_SPEED_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png" alt="Increase Speed Icon" width={cs()} height={cs()} />;

    const SPEED_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png" alt="Speed Mod Icon" width={cs()} height={cs()} />
    const AMMO_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_41.png" alt="Ammo Mod Icon" width={cs()} height={cs()} />
    const AIMING_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_40.png" alt="Aiming Mod Icon" width={cs()} height={cs()} />
    const IMPACT_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_47.png" alt="Impact Mod Icon" width={cs()} height={cs()} />
    const AREA_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_42.png" alt="Area Mod Icon" width={cs()} height={cs()} />
    const JACKPOT_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Jackpot Mod Icon" width={cs()} height={cs()} />
    const XP_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png" alt="XP Mod Icon" width={cs()} height={cs()} />

    const WEAPON_UPGRADES = [
        {level: "V1", price: "Free"},
        {level: "V2", price: "8,000 Bolts"},
        {level: "V3", price: "12,000 Bolts"},
        {level: "V4", price: "20,000 Bolts"},
        {level: "V5", price: "40,000 Bolts"},
        {level: "V6", price: "60,000 Bolts"},
        {level: "V7", price: "90,000 Bolts"},
        {level: "V8", price: "150,000 Bolts"},
        {level: "V9", price: "220,000 Bolts"},
        {level: "V10", price: "350,000 Bolts"},

    ]

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/getting-started")} sx={{cursor: "pointer"}}>
                Getting Started
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/survival")} sx={{cursor: "pointer"}}>
                Survival
            </Link>
            <Typography color="text.primary">Veldin</Typography>
        </Breadcrumbs>

        <Stack direction="row" justifyContent="center" sx={{mt: 5}}>
            <Construction fontSize="large" />
            <Typography variant="h4" sx={{ml: 3, mr: 3}}>Coming Soon!</Typography>
            <Construction fontSize="large" />
        </Stack>

        <Box height="77vh" />

    </Box>;
}
