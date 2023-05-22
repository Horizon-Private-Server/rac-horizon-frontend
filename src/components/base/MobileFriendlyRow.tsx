import { Stack, TableCell, TableRow, Typography, Box } from "@mui/material";
import React from "react";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../utils/WindowDimensions";


export interface MobileFriendlyIconRowProps {
    firstCellText: string | JSX.Element;
    icon: string | JSX.Element;
    remainingCells: (string|JSX.Element)[];
}

export const MobileFriendlyIconRow = (props: MobileFriendlyIconRowProps) => {

    const {firstCellText, icon, remainingCells} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <TableRow>
        <TableCell>
            <Typography>{firstCellText}</Typography>
            {screenSize === ScreenSize.Mobile && ( <Stack direction="row" justifyContent="flex-start" marginTop={2}>{icon}</Stack> )}
        </TableCell>

        {screenSize !== ScreenSize.Mobile && ( 
            <TableCell>{icon}</TableCell> 
        )}

        {remainingCells.map((element, index) => {
            return <TableCell key={index}>
                <Typography>
                    {element}
                </Typography>
            </TableCell>
        })}
    </TableRow>;
};

export interface MobileFriendlyTextRowProps {
    firstCellText: string | JSX.Element;
    descriptionText: string | JSX.Element;
    remainingCells: (string|JSX.Element)[];
}

export const MobileFriendlyTextRow = (props: MobileFriendlyTextRowProps) => {

    const {firstCellText, descriptionText, remainingCells} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <TableRow>
        <TableCell>
            <Typography>{firstCellText}</Typography>
            {screenSize === ScreenSize.Mobile && ( 
                <Stack direction="row" justifyContent="flex-start" marginTop={2}>
                    <Stack direction="column" justifyContent="space-between">
                        {remainingCells.map((element, index) => {
                            return <Typography key={index}>
                                {element}
                            </Typography>
                        })}
                    </Stack>
                </Stack>
            )}
        </TableCell>

        <TableCell>{descriptionText}</TableCell>


        {remainingCells.map((element, index) => {
            if (screenSize === ScreenSize.Mobile) {
                return <Box />;
            }
            return <TableCell key={index}>
                <Typography>
                    {element}
                </Typography>
            </TableCell>;
        })}

    </TableRow>;
};