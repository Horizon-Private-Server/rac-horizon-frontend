import React from "react";

import { Box, Container } from "@mui/material";

export interface PageState {
    className?: any;
    children?: JSX.Element | JSX.Element[];
    marginBottom?: number;
}

const Page = (props: PageState) => {

    const {children, className, marginBottom = 150} = props;

    return <Container
        className={className ?? ""}
        style={{
            marginTop: 0,
            marginRight: 0,
            marginLeft: 0,
            marginBottom: marginBottom,
            padding: 0,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
        }}
    >
        <Box>
            {children}
        </Box>
    </Container>
}

export default Page;