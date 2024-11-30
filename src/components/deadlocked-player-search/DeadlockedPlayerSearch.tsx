import React, {useState, useEffect} from "react"
import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../utils/WindowDimensions";
import HorizonBreadcrumbs from "../base/HorizonBreadcrumbs";
import {Alert, Box, Card, CardActionArea, CardContent, CircularProgress, InputAdornment, LinearProgress, Paper, Stack, TextField, Typography} from "@mui/material";
import {useDeadlockedPlayerSearch} from "../../hooks/deadlocked-stats";
import {PlayerBase} from "../../utils/Interfaces";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ArrowForwardIos, Person, Search} from "@mui/icons-material";


const DeadlockedPlayerSearch = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    // TODO The backend supports pagination, but the frontend doesn't care.
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");

    const navigate: NavigateFunction = useNavigate();

    const {data, status, isFetching} = useDeadlockedPlayerSearch(debouncedQuery, page);

    useEffect(() => {
        const timeOutId = setTimeout(() => setDebouncedQuery(query), 300);
        return () => clearTimeout(timeOutId);
    }, [query]);

    return (
        <Box sx={{width: screenSize === ScreenSize.Mobile ? "100%" : "calc(100% - 50px)", minHeight: "calc(100vh - 156px)"}}>

            <HorizonBreadcrumbs
                paths={[
                    {text: "Deadlocked", route: "/deadlocked"},
                    {text: "Player Search", route: "/deadlocked/search"}
                ]}
            />

            {status === "error" && (
                <Box sx={{width: "100%", pl: 2, pr: 2}}>
                    <Alert severity="error">Players could not be retrieved.</Alert>
                </Box>
            )}

            <Box sx={{p: 2}}>
                <TextField
                    fullWidth
                    label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    inputProps={{
                        maxLength: 16,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            {isFetching && (
                <Box sx={{width: "100%", pl: 2, pr: 2}}>
                    <LinearProgress />
                </Box>
            )}

            <Box sx={{mb: 2}} />

            {status === "success" && (
                <Box sx={{p: 2}}>
                    {data?.results.map((player: PlayerBase, index: number) => {
                        return <Card key={index} component={Paper} sx={{mb: 1}}>
                            <CardActionArea onClick={() => {navigate(`/deadlocked/stats/details/${player.id}`)}}>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Stack direction="row">
                                            <Person />
                                            <Box sx={{mr: 2}} />
                                            <Typography>{player.username}</Typography>
                                        </Stack>
                                        <ArrowForwardIos />
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    })}
                </Box>
            )}

        </Box>
    );

}

export default DeadlockedPlayerSearch;
