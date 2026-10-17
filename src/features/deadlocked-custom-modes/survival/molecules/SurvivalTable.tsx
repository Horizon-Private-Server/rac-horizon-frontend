import React from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../../../components/utils/WindowDimensions";

export interface SurvivalTableColumn {
    label: string;
    hideOnMobile?: boolean;
}

export interface SurvivalTableProps {
    columns: SurvivalTableColumn[];
    children: JSX.Element | JSX.Element[];
}

export const SurvivalTable = (props: SurvivalTableProps) => {

    const {columns, children} = props;

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <TableContainer>
        <TableHead>
            <TableRow>
                {columns
                    .filter((column) => !(column.hideOnMobile && screenSize === ScreenSize.Mobile))
                    .map((column) => <TableCell key={column.label}><Typography fontWeight="bold">{column.label}</Typography></TableCell>)
                }
            </TableRow>
        </TableHead>
        <TableBody>
            {children}
        </TableBody>
    </TableContainer>;
};

export default SurvivalTable;
