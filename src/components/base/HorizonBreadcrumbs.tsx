import {Breadcrumbs, IconButton, Link, Skeleton, Stack, Tooltip, Typography} from "@mui/material";
import React from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Optional, Path} from "../../utils/Interfaces";
import {ArrowBack} from "@mui/icons-material";
import useWindowDimensions from "../utils/WindowDimensions";

export interface StyledBreadcrumbsProps {
    paths: Optional<Path>[];
}

const HorizonBreadcrumbs = (props: StyledBreadcrumbsProps) => {

    let historyLength: number = window.history.length;
    let historyPosition: number = window.history.state.idx;

    const {width} = useWindowDimensions();
    let mobile: boolean = width <= 600;

    const {paths} = props;
    const navigate: NavigateFunction = useNavigate();

    return <Stack direction="row" justifyContent="flex-start" sx={{mt: 2, ml: 2, mb: 1, width: "100%"}}>

        {(historyLength > 1 && historyPosition > 0) && (
            <Tooltip title="Return to the previous page">
                <Stack direction="column" justifyContent="center" sx={{mt: -1.75, pt: 0, mr: mobile ? 0 : 2, ml: mobile ? -2 : 0}}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBack fontSize="small" />
                    </IconButton>
                </Stack>
            </Tooltip>
        )}

        <Breadcrumbs sx={{mb: 2}}>
            { paths.map((path: Optional<Path>, index: number) => {

                if (!path) {
                    return <Skeleton variant="rectangular" width={120} height={20} key={index + 1000} />
                }

                if (index < paths.length - 1) {
                    return <Link
                        fontSize={mobile ? 12 : 16}
                        key={index}
                        underline="always"
                        color="inherit"
                        onClick={() => navigate(paths[index]?.route as string)}
                        sx={{
                            cursor: "pointer",
                            ":hover": {
                                color: "#DFDFDF"
                            }
                        }}
                    >
                        {paths[index]?.text as string}
                    </Link>
                }
                else {
                    return <Typography
                        key={index}
                        fontSize={mobile ? 12 : 16}
                        fontWeight="bold"
                        color="text.primary"
                    >
                        {paths[paths.length - 1]?.text as string}
                    </Typography>
                }
            })}

        </Breadcrumbs>
    </Stack>

}

export default HorizonBreadcrumbs;
