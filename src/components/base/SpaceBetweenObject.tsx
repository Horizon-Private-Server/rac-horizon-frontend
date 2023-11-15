import React from "react";

import { Box } from "@mui/material";

export interface PageState {
    children?: JSX.Element | JSX.Element[];
    orientation?: "horizontal" | "vertical";
    wrap?: boolean;
}

const SpaceBetweenObject = (props: PageState) => {

    const {children, orientation, wrap} = props;

    const flexWrap = (wrap === undefined) ? "nowrap" : wrap ? "wrap" : "nowrap";
    const flexDirection = (orientation === undefined || orientation === "horizontal") ? "row" : "column"

    return <Box
        style={{
            display: "flex",
            flexDirection: flexDirection,
            justifyContent: "space-between",
            width: "100%",
            flexWrap: flexWrap
        }}
    >
        {children}
    </Box>
}

export default SpaceBetweenObject;