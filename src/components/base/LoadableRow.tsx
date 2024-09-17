import { Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../utils/WindowDimensions";

export interface LoadableRowProps {
    label: string;
    value: string | number;
    loading: boolean;
}

export const LoadableRow = (props: LoadableRowProps) => {
    const {label, value, loading} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    if (loading) {
        return <Skeleton variant="rectangular" width={screenSize === ScreenSize.Mobile ? "80vw" : "20vw"} height={30} sx={{mb: 2}} />
    }

    return <Stack
        direction="row"
        justifyContent="space-between"
        width={screenSize === ScreenSize.Mobile ? "100%" : "20vw"}
    >
        <Typography fontSize={screenSize === ScreenSize.Mobile ? 12 : 14} variant="overline">
            {label}
        </Typography>
        <Typography fontSize={screenSize === ScreenSize.Mobile ? 12 : 14} variant="overline">
            {value}
        </Typography>
    </Stack>;
};

export interface LoadableValueProps {
    label: string;
    loading: boolean;
}

export const LoadableValue = (props: LoadableValueProps) => {
    const {label, loading} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    if (loading) {
        return <Stack direction="column" justifyContent="center">
            <Skeleton variant="rectangular" width={screenSize === ScreenSize.Mobile ? "100vw" : "20vw"} height={30} />
        </Stack>;
    }

    return <Stack
        direction="row"
        justifyContent="space-between"
        width={screenSize === ScreenSize.Mobile ? "100vw" : "30vw"}
    >
        <Typography fontSize={screenSize === ScreenSize.Mobile ? 14 : 18} variant="overline">
            {label}
        </Typography>
    </Stack>;

};