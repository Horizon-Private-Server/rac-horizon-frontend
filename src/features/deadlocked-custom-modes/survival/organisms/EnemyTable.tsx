import React from "react";
import { Typography } from "@mui/material";
import { MobileFriendlyTextRow } from "../../../../components/base/MobileFriendlyRow";
import SurvivalTable from "../molecules/SurvivalTable";
import { SurvivalEnemy } from "../types";
import { rarityFromProbability } from "../utils";

export interface EnemyTableProps {
    enemies: SurvivalEnemy[];
}

export const EnemyTable = (props: EnemyTableProps) => {

    const {enemies} = props;

    return <SurvivalTable
        columns={[
            {label: "Enemy"},
            {label: "Description"},
            {label: "First Appears On", hideOnMobile: true},
            {label: "Spawn Chance", hideOnMobile: true},
        ]}
    >
        {enemies.map((enemy) => <MobileFriendlyTextRow
            key={enemy.name}
            firstCellText={enemy.name}
            descriptionText={typeof enemy.description === "string" ? <Typography>{enemy.description}</Typography> : enemy.description}
            remainingCells={[
                enemy.firstAppears,
                rarityFromProbability(enemy.probability, enemy.specialRoundOnly),
            ]}
        />)}
    </SurvivalTable>;
};

export default EnemyTable;
