import { Alert, CircularProgress, Stack } from "@mui/material";
import { UseQueryResult } from "@tanstack/react-query";

type Props = {
    data: UseQueryResult;
    children: JSX.Element;
};

export const WaitFor = ({ data, children }: Props) => {
    const { isFetching, isError, error } = data;

    if (isFetching) {
        return (
            <Stack direction="row" justifyContent="center">
                <CircularProgress sx={{ mt: 10 }} />
            </Stack>
        );
    }

    // TODO: Expand on this to handle different errors.
    if (isError) {
        return <Alert severity="error">Failed to fetch data. Error: {error?.message}</Alert>;
    }

    return children;
};
