import React from "react";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export interface ImageHeaderState {
    header: string;
    banner: string;
}

const ImageHeader = (props: ImageHeaderState) => {

    const {header, banner} = props;

    return <Box
        sx={{
            backgroundImage: `url(${banner})`,
            width: "100%",
            height: "100%"
        }}
    >
        <Typography variant="h2" style={{marginLeft: "30px"}}>{header}</Typography>
    </Box>;

}

export default ImageHeader;