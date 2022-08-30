import React from "react";

import { Box } from "@mui/material";

export interface PageState {
    amount: number;
}

const LineBreak = (props: PageState) => {

    const {amount} = props;

    return <Box sx={{ marginBottom: `${amount}px`}} />

}

export default LineBreak;