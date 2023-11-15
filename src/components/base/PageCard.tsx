import React from "react";

import { Card, CardActionArea, CardContent } from "@mui/material";

export interface PageState {
    children?: JSX.Element | JSX.Element[];
}

const PageCard = (props: PageState) => {

    const {children} = props;

    const cardStyles = {
        minWidth: "32.8%",
        maxWidth: "32.8%",
        width: "32.8%",
    }

    return <Card
        sx={cardStyles}
    >
        <CardActionArea
            style={{
                height: "100%"
            }}
        >
            <CardContent style={{height: "100%"}}>
                {children}
            </CardContent>
        </CardActionArea>
    </Card>
}

export default PageCard;