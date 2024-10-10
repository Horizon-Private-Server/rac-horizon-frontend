import React, {useEffect, useState, Dispatch} from 'react';
import {Card, CardContent, Typography, CircularProgress, Box, Tooltip} from '@mui/material';

import {useAppDispatch} from "../../app/hooks";

import {AxiosResponse} from "axios";
import {getHandler} from "../../utils/Requests";

import {
    UYAOnlinePlayer,
    UYAOnlinePlayerResponse,
    UYAOnlineGame,
    UYAOnlineGameResponse, Optional,
} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";
import ImageBacking from "../../components/base/ImageBacking";
import {Stack} from "@mui/system";
import {AccessTime} from "@mui/icons-material";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import {UYA_BACKGROUND_IMAGES} from "../../utils/Constants";


const UYAOnline: React.FC = () => {
    const [players, setPlayers] = useState<UYAOnlinePlayer[]>([]);
    const [games, setGames] = useState<UYAOnlineGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdatedGames, setLastUpdatedGames] = useState<Optional<Date>>(null);
    const [lastUpdatedPlayers, setLastUpdatedPlayers] = useState<Optional<Date>>(null);

    const [errorBanner, setErrorBanner] = useState<string>("");

    const dispatch: Dispatch<AnyAction> = useAppDispatch();


    useEffect(() => {
        const fetchPlayers = () => {
            getHandler<UYAOnlinePlayerResponse>(
                `/api/uya/online/players`,
                dispatch,
                (response: AxiosResponse<UYAOnlinePlayerResponse, any>) => {
                    console.log(response.data.results);
                    setPlayers(response.data.results);
                    setLastUpdatedPlayers(new Date(Date.now()));
                },
                () => {
                    setErrorBanner("Couldn't connect to server!");
                },
                setLoading
            );
        };

        fetchPlayers(); // Fetch the data on the first render

        const playerInterval = setInterval(() => {
            fetchPlayers(); // Fetch the data every minute (60000 milliseconds)
        }, 60000);

        return () => clearInterval(playerInterval); // Clean up the interval on component unmount
    }, [dispatch]);

    useEffect(() => {
        const fetchGames = () => {
            getHandler<UYAOnlineGameResponse>(
                `/api/uya/online/games`,
                dispatch,
                (response: AxiosResponse<UYAOnlineGameResponse, any>) => {
                    console.log(response.data.results);
                    setGames(response.data.results);
                    setLastUpdatedGames(new Date(Date.now()));
                },
                () => {
                    setErrorBanner("Couldn't connect to server!");
                },
                setLoading
            );
        };

        fetchGames(); // Fetch the data on the first render

        const gameInterval = setInterval(() => {
            fetchGames(); // Fetch the data every minute (60000 milliseconds)
        }, 60000);

        return () => clearInterval(gameInterval); // Clean up the interval on component unmount
    }, [dispatch]);

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <ImageBacking backgroundUrl={UYA_BACKGROUND_IMAGES}>

            <Box sx={{width: "100%", m: 4, height: "calc(100vh - 345px)"}}>

                <Box sx={{maxWidth: "50vw", mt: -4, ml: -2}}>
                    <HorizonBreadcrumbs
                        paths={[
                            {text: "UYA", route: "/uya"},
                            {text: "Live", route: "/uya/live"},
                        ]}
                    />
                </Box>

                <Card sx={{mb: 2}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Online Players</Typography>
                        {players.length > 0 ? (
                            players.map((player) => (
                                <Typography key={player.username}>{player.username}</Typography>
                            ))
                        )
                        : (
                            <Typography variant="subtitle2" sx={{mt: 2}}>No players online</Typography>
                        )}
                        <Stack direction="row" justifyContent="flex-start" sx={{mt: 4, mb: -2}}>
                            <Tooltip title="Players last updated">
                                <AccessTime fontSize="small" />
                            </Tooltip>
                            &nbsp;
                            <Typography variant="subtitle2">
                                {lastUpdatedPlayers?.toLocaleTimeString() ?? "--"}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>

                <Card sx={{mb: 2}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>Active Games</Typography>
                        {games.length > 0 ? (
                            games.map((game) => (
                                <Box key={game.name}>
                                    <Typography variant="h6">{game.name}</Typography>
                                    <Typography>Status: {game.game_status}</Typography>
                                    <Typography>Started: {new Date(game.time_started).toLocaleString()}</Typography>
                                    <Typography>Map: {game.map}</Typography>
                                    <Typography>Game Mode: {game.game_mode}</Typography>
                                    <Typography>Time Limit: {game.time_limit}</Typography>
                                    <Typography>Players:</Typography>
                                    {game.players.map((player) => (
                                        <Stack>
                                            <li key={player.username}>{player.username}</li>
                                        </Stack>
                                    ))}
                                </Box>
                            ))
                        )
                        : (
                            <Typography variant="subtitle2" sx={{mt: 2}}>No active games</Typography>
                        )}
                        <Stack direction="row" justifyContent="flex-start" sx={{mt: 4, mb: -2}}>
                            <Tooltip title="Games last updated">
                                <AccessTime fontSize="small" />
                            </Tooltip>
                            &nbsp;
                            <Typography variant="subtitle2">
                                {lastUpdatedGames?.toLocaleTimeString() ?? "--"}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>

            </Box>
        </ImageBacking>
    );
};
export default UYAOnline;
