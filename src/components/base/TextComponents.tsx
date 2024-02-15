import React from "react";

import { Box, Typography, Divider, Stack } from "@mui/material";


export interface TextListProps {
    items: (string|JSX.Element)[];
    ordered: boolean;
}

export const TextList = (props: TextListProps) => {

    const {items, ordered} = props;

    return <Box sx={{ml: 4, mt: 3}}>

        { items.map((item, index) => {
            return <Stack key={index} direction="row" justifyContent="flex-start">
                <Typography marginRight={1}>{ordered ? `${index + 1}. ` : "• "}</Typography>
                <Typography  marginBottom={0.25}>{item}</Typography>
            </Stack>
        })}

    </Box>

}

export interface TextHeadingProps {
    heading: string | JSX.Element;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}


export const TextHeading = (props: TextHeadingProps) => {

    const {heading, variant} = props;

    let bottomMargin: number = 3;
    let topMargin: number = 0;

    if (variant === "h5" || variant === "h6") {
        bottomMargin = 2;
        topMargin = 3;
    }

    return <Box marginBottom={bottomMargin} marginTop={topMargin}>
        <Typography variant={variant} fontWeight="bold">{heading}</Typography>
        { variant !== "h6" && <Divider sx={{mb: bottomMargin, mt: 1}} variant="middle" /> }
    </Box>
}

export interface CodeBoxProps {
  children: string | string[] | JSX.Element | JSX.Element[];
}

export const CodeBox = (props: CodeBoxProps) => {

    const {children} = props;

    return <Box bgcolor="#404040">
        <Typography fontWeight="bold" fontFamily="monospace" marginLeft={1}>{children}</Typography>
    </Box>
}
