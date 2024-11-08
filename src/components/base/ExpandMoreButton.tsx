import {IconButtonProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMoreButton = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default ExpandMoreButton;
