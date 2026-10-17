import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { MobileFriendlyTextRow } from "../../../../components/base/MobileFriendlyRow";
import SurvivalTable from "../molecules/SurvivalTable";
import PrestigeName from "../atoms/PrestigeName";
import { PRESTIGE_TIERS, WEAPON_UPGRADES } from "../constants/data";

export const WeaponUpgradeTable = () => {
    return <SurvivalTable columns={[{label: "Weapon Level"}, {label: "Cost"}]}>
        {WEAPON_UPGRADES.map((weapon) => <TableRow key={weapon.level}>
            <TableCell><Typography>{weapon.level}</Typography></TableCell>
            <TableCell><Typography>{weapon.price}</Typography></TableCell>
        </TableRow>)}
    </SurvivalTable>;
};

export const PrestigeTable = () => {
    return <SurvivalTable columns={[{label: "Prestige"}, {label: "Cost"}, {label: "Damage Multiplier", hideOnMobile: true}]}>
        {PRESTIGE_TIERS.map((tier) => <MobileFriendlyTextRow
            key={tier.level}
            firstCellText={<PrestigeName level={tier.level} />}
            descriptionText={<Typography fontWeight="bold">{tier.cost}</Typography>}
            remainingCells={[<Typography fontWeight="bold">{tier.multiplier}</Typography>]}
        />)}
    </SurvivalTable>;
};
