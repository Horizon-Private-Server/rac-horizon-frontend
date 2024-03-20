import React from "react";

import {Card, CardActionArea, CardContent, SxProps} from "@mui/material";

export interface PageState {
    children?: JSX.Element | JSX.Element[];
    animated?: boolean;
    noPadding?: boolean;
    color?: string;
}

const PageCard = (props: PageState) => {

    const {children, animated, noPadding, color = "primary"} = props;

    let cardProps: SxProps = {height: "100%", bgcolor: color}
    if (noPadding) {
        cardProps = {height: "100%", p: 0, pb: "0px !important", bgcolor: color}
    }

    return <Card sx={cardProps}>
        {animated && (
            <CardActionArea sx={cardProps}>
                <CardContent sx={cardProps}>
                    {children}
                </CardContent>
            </CardActionArea>
        )}
        {!animated && (
            <CardContent sx={cardProps}>
                {children}
            </CardContent>
        )}
    </Card>


}

export default PageCard;