import React from "react";

import { Box } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

export interface RowListSetState {
    children?: JSX.Element | JSX.Element[];
}

const RowListSet = (props: RowListSetState) => {

    const {children} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    let compChildren : JSX.Element[] = [];

    if (children instanceof Element) {
        compChildren.push(children as JSX.Element);
    }
    else {
        (children as JSX.Element[]).map((elem) => compChildren.push(elem));
    }

    const colCounts = {
        [ScreenSize.Desktop]: 3,
        [ScreenSize.Tablet]: 2,
        [ScreenSize.Mobile]: 1,
    }

    let colCount : number = colCounts[screenSize] >= compChildren.length ? compChildren.length : colCounts[screenSize];

    let cols = Array(colCount);
    for (let i : number = 0; i < cols.length; ++i) {
        cols[i] = [];
    }

    let colsIndex : number = 0;
    let counter : number = 0;

    compChildren.map((elem, index) => { 
        cols[colsIndex].push(elem);

        counter++;

        if (counter > Math.floor(compChildren.length / colCount)) {
            counter = 0;
            colsIndex++;
        }

        return null;

    });

    return <Box
        sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}
    >
        { cols.map((elems : JSX.Element[], index : number) => {
            return <Box
                key={index}
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}
            >
                { elems.map((elem : JSX.Element, subIndex : number) => {
                    return <Box key={subIndex}>{elem}</Box>;
                })}
            </Box>;
        })}
    </Box>;
}

export default RowListSet;