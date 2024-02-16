import React from "react";

import { Card, CardActionArea, CardContent } from "@mui/material";

export interface PageState {
    children?: JSX.Element | JSX.Element[];
    animated?: boolean;
}

const PageCard = (props: PageState) => {

    const {children, animated} = props;

    if (!animated) {
        return <Card sx={{width: "100$", height: "100%"}}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    }

    return <Card sx={{width: "100$", height: "100%"}}>
        <CardActionArea >
            <CardContent>
                {children}
            </CardContent>
        </CardActionArea>
    </Card>
}

export default PageCard;