import React from "react";
import { Typography } from "@mui/material";
import { MobileFriendlyTextRow } from "../../../../components/base/MobileFriendlyRow";
import SurvivalTable from "../molecules/SurvivalTable";
import { SurvivalSpecialRound } from "../types";

export interface SpecialRoundTableProps {
    rounds: SurvivalSpecialRound[];
}

export const SpecialRoundTable = (props: SpecialRoundTableProps) => {

    const {rounds} = props;

    return <SurvivalTable
        columns={[
            {label: "Special Round"},
            {label: "Enemies"},
            {label: "First Round", hideOnMobile: true},
            {label: "Repeats", hideOnMobile: true},
        ]}
    >
        {rounds.map((round) => <MobileFriendlyTextRow
            key={round.name}
            firstCellText={round.name}
            descriptionText={<Typography>{round.enemies}{round.notes && <><br/><i>{round.notes}</i></>}</Typography>}
            remainingCells={[`Round ${round.firstRound}`, round.repeat]}
        />)}
    </SurvivalTable>;
};

export default SpecialRoundTable;
