import React from "react";
import { Typography } from "@mui/material";
import { MobileFriendlyTextRow } from "../../../../components/base/MobileFriendlyRow";
import SurvivalTable from "../molecules/SurvivalTable";
import { SurvivalGambit } from "../types";

export interface GambitTableProps {
    gambits: SurvivalGambit[];
}

export const GambitTable = (props: GambitTableProps) => {

    const {gambits} = props;

    return <SurvivalTable
        columns={[
            {label: "Gambit"},
            {label: "Description"},
            {label: "Goal", hideOnMobile: true},
        ]}
    >
        {gambits.map((gambit) => <MobileFriendlyTextRow
            key={gambit.name}
            firstCellText={gambit.name}
            descriptionText={typeof gambit.description === "string" ? <Typography>{gambit.description}</Typography> : gambit.description}
            remainingCells={[gambit.completeOn]}
        />)}
    </SurvivalTable>;
};

export default GambitTable;
