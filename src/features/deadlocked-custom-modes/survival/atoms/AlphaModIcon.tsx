import React from "react";
import { ChangingImage } from "../../../../components/base/ChangingImage";
import { useSurvivalIconSize } from "./SurvivalIcon";
import { ICON_AMMO_MOD, ICON_AREA_MOD, ICON_IMPACT_MOD, ICON_JACKPOT_MOD, ICON_SPEED_MOD, ICON_XP_MOD } from "../constants/icons";

// cycles through every alpha mod icon
export const AlphaModIcon = () => {

    const size = useSurvivalIconSize();

    return <ChangingImage
        srcList={[ICON_SPEED_MOD, ICON_AMMO_MOD, ICON_IMPACT_MOD, ICON_AREA_MOD, ICON_JACKPOT_MOD, ICON_XP_MOD]}
        altList={["Speed Mod Icon", "Ammo Mod Icon", "Impact Mod Icon", "Area Mod Icon", "Jackpot Mod Icon", "XP Mod Icon"]}
        interval={1000}
        width={size}
        height={size}
        variant="sequential"
    />;
};

export default AlphaModIcon;
