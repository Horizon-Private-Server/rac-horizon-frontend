import {Box, Button, Card, CardContent, Paper, Stack, Typography} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";

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
    baseUrl: string;
}

const Paginator = (props: PaginationProps) => {

    const {page, totalResults, rowsPerPage, baseUrl} = props;

    const navigate: NavigateFunction = useNavigate();

    console.log(`${baseUrl}?page=${page + 1}`)

    return <Card component={Paper} sx={{backgroundColor: "rgba(20, 20, 20, 0.80)"}}>
        <CardContent>

            <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ml: 2, mt: 1}}>{`Page ${page} of ${computePageNumber(totalResults, rowsPerPage)}`}</Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Button
                        onClick={() => navigate(`${baseUrl}?page=${page - 1}`)}
                        disabled={page <= 1}
                        sx={{color: "white"}}
                    >
                        <ArrowLeft fontSize="small" />&nbsp;Prev
                    </Button>

                    <Box sx={{ml: 2}} />

                    <Button
                        onClick={() => navigate(`${baseUrl}?page=${page + 1}`)}
                        disabled={page >= computePageNumber(totalResults, rowsPerPage)}
                        sx={{color: "white"}}
                    >
                        Next&nbsp;<ArrowRight fontSize="small" />
                    </Button>
                </Stack>
            </Stack>

        </CardContent>
    </Card>
}

export default Paginator;
