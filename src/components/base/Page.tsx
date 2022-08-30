import React from "react";

import { Box, Container } from "@mui/material";

export interface PageState {
    children?: JSX.Element | JSX.Element[];
}

const Page = (props: PageState) => {

    const {children} = props;

    return <Container 
        style={
            {
                padding: "0px", 
                maxWidth: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }
        }
    >
        <Box>
            {children}
        </Box>
    </Container>
}

export default Page;