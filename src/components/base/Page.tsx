import React from "react";

import { Box, Container } from "@mui/material";

export interface PageState {
    className?: any;
    children?: JSX.Element | JSX.Element[];
}

const Page = (props: PageState) => {

    const {children, className} = props;

    return <Container
        className={className ?? ""}
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