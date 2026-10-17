import React from "react";
import { MobileFriendlyIconRow } from "../../../../components/base/MobileFriendlyRow";
import SurvivalTable from "../molecules/SurvivalTable";
import SurvivalIcon from "../atoms/SurvivalIcon";
import { SurvivalIconItem } from "../types";

export interface IconItemTableProps {
    nameLabel: string;
    // labels for the cells after the icon column
    columns: string[];
    items: SurvivalIconItem[];
}

export const IconItemTable = (props: IconItemTableProps) => {

    const {nameLabel, columns, items} = props;

    return <SurvivalTable
        columns={[
            {label: nameLabel},
            {label: "Icon", hideOnMobile: true},
            ...columns.map((column) => ({label: column})),
        ]}
    >
        {items.map((item) => <MobileFriendlyIconRow
            key={item.name}
            firstCellText={item.name}
            icon={item.iconElement ?? item.iconAltText ?? <SurvivalIcon src={item.iconSrc} alt={`${item.name} Icon`} filter={item.iconFilter} />}
            remainingCells={item.cells}
        />)}
    </SurvivalTable>;
};

export default IconItemTable;
