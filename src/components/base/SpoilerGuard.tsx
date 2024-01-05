import React, { useState } from "react";

import {Button, Box, Stack} from "@mui/material";

export interface SpoilerGuardProps {
    weight: number;
    children: JSX.Element | JSX.Element[];
}


const SpoilerGuard = (props: SpoilerGuardProps) => {

    const [show, setShow] = useState<boolean>(false)

    const {children, weight} = props;

    return <Box>
        {!show && (
            <Stack direction="row" justifyContent="center">
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setShow(true)}
                    sx={{
                        mt: 2,
                        filter: "drop-shadow(0rem 0rem 0.5rem black)",
                        zIndex: 10
                    }}
                >
                    Show Spoiler
                </Button>
            </Stack>
        )}

        {show && (
            <Box>
                {children}
            </Box>
        )}
        {!show && (
            <Box sx={{filter: `blur(${weight}px)`, mt: -6.5}}>
                {children}
            </Box>
        )}

    </Box>

}

export default SpoilerGuard;
