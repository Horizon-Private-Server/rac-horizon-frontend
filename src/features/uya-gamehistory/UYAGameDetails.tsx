import React, {Dispatch, useEffect, useState} from "react";

import {
    Box,
    Card,
    CardContent, Link,
    Paper, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

import {NavigateFunction, useNavigate, useParams} from "react-router-dom";

import {getHandler} from "../../utils/Requests";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import {AxiosResponse} from "axios";

import {UYAGameHistoryDetails, UYAGameHistoryEntry, UYAGameHistoryPlayer} from "../../utils/Interfaces";
import {Stack} from "@mui/system";
import {AccessTime, CheckCircleOutlined, DateRange, OpenInFull} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";


const UYAGameDetails = () => {

    const [game, setGame] = useState<UYAGameHistoryEntry>();
    const [players, setPlayers] = useState<UYAGameHistoryPlayer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const {gameId} = useParams();

    const navigate: NavigateFunction = useNavigate();

    const dispatch: Dispatch<AnyAction> = useAppDispatch();

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);
    const mobile = screenSize === ScreenSize.Mobile;

    // Helper function to format game duration
    const formatDuration = (duration: number): string => {
        const minutes = Math.floor(duration);
        const fractionalPart = duration - minutes;
        const seconds = Math.floor(fractionalPart * 60);
        const formattedSeconds = seconds.toString().padStart(2, '0'); // Ensures two digits

        return `${minutes}m ${formattedSeconds}s`;
    };

    function isRanked(players: UYAGameHistoryPlayer[]): boolean {
        if (players.length < 2) {
            return false;
        }

        return players.filter((player) => player.win).length > 0;
    }

    useEffect(() => {
        // TODO Re-implement this using React Query/Tanstack.
        getHandler<UYAGameHistoryDetails>(
            `/api/uya/gamehistory/details/${gameId}`,
            dispatch,
            (response: AxiosResponse<UYAGameHistoryDetails>) => {
                setGame(response.data.game);
                setPlayers(response.data.players);
            },
            () => {},
            setLoading
        )
    }, [])

    return <Box>


        <Box sx={{maxWidth: "50vw"}}>
            <HorizonBreadcrumbs
                paths={[
                    {text: "UYA", route: "/uya"},
                    {text: "Game History", route: "/uya/game-history"},
                    {text: "Details", route: "/uya/game-history/details/1"}
                ]}
            />
        </Box>

        {(!loading && game !== null) && (
            <Box sx={{m: 3}}>

                <Card component={Paper} sx={{mb: 2}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5">{game?.game_name.replaceAll("[IG] ", "")}</Typography>
                            <Typography variant="overline">{game?.game_map}</Typography>
                        </Stack>
                        <Box sx={{mb: 2}} />
                        <Typography>{game?.game_mode} / {game?.game_submode}</Typography>

                        <Stack direction="row" justifyContent="flex-start" sx={{mt: 3, mb: -1}}>
                            <Tooltip title="Game completed on">
                                <DateRange fontSize="small" />
                            </Tooltip>
                            <Typography variant="subtitle2">
                                &nbsp;
                                {new Date(game?.game_end_time ?? "").toLocaleDateString()}
                                &nbsp;
                                {new Date(game?.game_end_time ?? "").toLocaleTimeString()}
                            </Typography>
                        </Stack>

                    </CardContent>
                </Card>

                <Card component={Paper} sx={{mb: 2}}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h5" sx={{mb: 3}}>Rules</Typography>
                            <Typography variant="overline">
                                {isRanked(players) ? "ranked" : "unranked"}
                            </Typography>
                        </Stack>
                        <Typography>Time Limit: {game?.time_limit === 0 ? "None" : `${game?.time_limit}M`}</Typography>
                        <Typography>Player Count: {game?.player_count ?? 0}</Typography>
                    </CardContent>
                </Card>

                <Card component={Paper} sx={{mb: 2}}>
                    <CardContent>
                        <Typography variant="h5" sx={{mb: 3}}>Results</Typography>

                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableCell>
                                        <Typography>Full</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Player</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{mobile ? "W" : "Win"}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{mobile ? "K" : "Kills"}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{mobile ? "D" : "Deaths"}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{mobile ? "Fl." : "Flags"}</Typography>
                                    </TableCell>
                                    {!mobile && (
                                        <TableCell>
                                            <Typography>{mobile ? "B" : "Base Dmg."}</Typography>
                                        </TableCell>
                                    )}
                                </TableHead>
                                <TableBody>
                                    {players.sort((a: UYAGameHistoryPlayer, b: UYAGameHistoryPlayer) => {
                                        // Sort by win status first (true > false) and then by kills (higher kills first)
                                        if (a.win === b.win) {
                                            return b.kills - a.kills;
                                        }
                                        return a.win ? -1 : 1;
                                    })
                                    .map((player: UYAGameHistoryPlayer, index: number) => {
                                        return <TableRow>
                                            <TableCell sx={{m: 0}}>
                                                <Tooltip title="View performance details">
                                                    <IconButton disabled>
                                                        <OpenInFull fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    <Link
                                                        onClick={() => navigate(`/uya/stats/details/${player.player_id}`)}
                                                        sx={{
                                                            color: "white",
                                                            textDecoration: "underline #A0A0A0",
                                                            textDecorationThickness: 2,
                                                            cursor: "pointer"
                                                        }}
                                                    >
                                                        {player.username}
                                                    </Link>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <CheckCircleOutlined
                                                    color={player.win ? "success" : "disabled"}
                                                    fontSize="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">{player.kills}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">{player.deaths}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">{player.flag_captures}</Typography>
                                            </TableCell>
                                            {!mobile && (
                                                <TableCell>
                                                    <Typography variant="subtitle2">{player.base_dmg}</Typography>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Stack direction="row" justifyContent="flex-start" sx={{mt: 5}}>
                            <Tooltip title="Game Duration">
                                <AccessTime fontSize="small" />
                            </Tooltip>
                            <Typography>
                                &nbsp;{game?.game_duration ? formatDuration(game.game_duration) : "--"}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        )}

    </Box>;

}

export default UYAGameDetails;
