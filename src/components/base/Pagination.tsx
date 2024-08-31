import { Button, Stack, Typography } from "@mui/material";
import { NumberSetState } from "./Interfaces";

function computePageNumber(totalPlayers: number, rowsPerPage: number) {

    if (rowsPerPage === 0) {
        return 0;
    }

    if ((totalPlayers % rowsPerPage) === 0) {
        return Math.floor(totalPlayers / rowsPerPage);
    }

    return Math.floor(totalPlayers / rowsPerPage) + 1;
}
  
export interface PaginationProps {
    page: number;
    totalResults: number;
    rowsPerPage: number;
    setPage: NumberSetState;
}


export const Pagination = (props: PaginationProps) => {

    const {page, totalResults, rowsPerPage, setPage} = props;

    return <Stack>
        <Typography sx={{ml: 2}}>{`Page ${page + 1} of ${computePageNumber(totalResults, rowsPerPage)}`}</Typography>
        <Stack direction="row" justifyContent="center">
            <Button onClick={() => setPage(page - 1)} disabled={page === 0}>Prev</Button>
            <Button onClick={() => setPage(page + 1)} disabled={(page + 1) === computePageNumber(totalResults, rowsPerPage)}>Next</Button>
        </Stack>
    </Stack>;
}