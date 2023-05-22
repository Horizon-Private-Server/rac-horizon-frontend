import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ToolBarButtonProps {
    label: string;
    previous?: string;
    icon: JSX.Element;
}

export const ToolBarButton = (props: ToolBarButtonProps) => {

    const { label, icon, previous } = props;

    const navigate = useNavigate();

    return (
        <Button startIcon={icon} onClick={() => {
            if (previous !== undefined && previous !== null && previous !== "") {
                navigate(previous);
            }
            else {
                navigate(-1);
            }
            
        }}>
            {label}
        </Button>
    );
};

interface ToolBarProps {
    previous?: string;
    children?: JSX.Element;
}

export const Backbar = (props: ToolBarProps) => {
    const {previous, children} = props;
    return (
        <Box paddingTop={2} paddingBottom={2}>
            <ToolBarButton
                label="Back"
                icon={<ArrowBackIcon />}
                previous={previous}
            />
            {children}
        </Box>
    );
};