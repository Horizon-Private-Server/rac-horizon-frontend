import React, {Dispatch, useEffect, useState} from "react";

import {Box, Link, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from "@mui/material";

import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

import {NavigateFunction, useNavigate, useParams, useSearchParams} from "react-router-dom";

import {styled} from "@mui/material/styles";

import {tableCellClasses} from '@mui/material/TableCell';

import {
    computeSkillLevel,
    domainFormatting,
    formatTime,
    isNumeric, statFormatting,
    titleCase
} from "../../components/base/Functions";
import Paginator from "../../components/base/Paginator";
import {getHandler} from "../../utils/Requests";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import {AxiosResponse} from "axios";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import Skeleton from "@mui/material/Skeleton";

import {
    UYAPlayerDetails,
    Optional,
    Pagination,
    UYAGameHistoryDetails,
    UYAGameHistoryPlayer,
    UYAGameHistoryEntry
} from "../../utils/Interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: theme.palette.common.white,
      borderBottom: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderBottom: "none",
      paddingTop: 5,
      paddingBottom: 5
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(40, 40, 40, 0.75)",
        borderBottom: "none",
        padding: 0
    },
    '&:nth-of-type(even)': {
        backgroundColor: "rgba(20, 20, 20, 0.75)",
        borderBottom: "none",
        padding: 0
      },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableRowSingle = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(40, 40, 40, 0.75)",
        borderBottom: "none",
        padding: 0
    },
    '&:nth-of-type(even)': {
        backgroundColor: "rgba(20, 20, 20, 0.75)",
        borderBottom: "none",
        padding: 0
      },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const UYAGameDetails = () => {


    const [game, setGame] = useState<UYAGameHistoryEntry>();
    const [players, setPlayers] = useState<UYAGameHistoryPlayer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { gameId } = useParams();

    const navigate: NavigateFunction = useNavigate();

    const dispatch: Dispatch<AnyAction> = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

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
            {loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 5
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game ID</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Player Count</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Name</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Map</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Mode</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game SubMode</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(Array(10).keys()).map((_, index: number) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={60} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={100} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={80} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={80} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={80} height={24} />
                                </StyledTableCell>
                                {/* Add more skeletons as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}


            {(!loading && game !== null) && (
            <TableContainer
                component={Paper}
                sx={{
                    ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                    marginBottom: 5
                }}
            >
                <TableHead>
                    <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Game ID</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Player Count</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Game Name</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Game Map</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Game Mode</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Game Sub Mode</Typography>
                        </StyledTableCell>
                        {/* Add more headers as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                        <StyledTableRowSingle>
                            <StyledTableCell>
                                <Typography>{game?.id}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.player_count}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_name}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_map}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_mode}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_submode}</Typography>
                            </StyledTableCell>
                            {/* Add more cells as needed */}
                        </StyledTableRowSingle>
                </TableBody>
            </TableContainer>
        )}

        {loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 5
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Time Limit</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Create Time</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Start Time</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game End Time</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Duration</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(Array(10).keys()).map((_, index: number) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={60} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={100} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={80} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={80} height={24} />
                                </StyledTableCell>
                                {/* Add more skeletons as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}


            {(!loading && game !== null) && (
            <TableContainer
                component={Paper}
                sx={{
                    ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                    backgroundColor: "rgba(0, 0, 0, 0.0)",
                    mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                    marginBottom: 5
                }}
            >
                <TableHead>
                    <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                        <StyledTableCell>
                        <Typography fontWeight="bold">Time Limit</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                        <Typography fontWeight="bold">Game Create Time</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                        <Typography fontWeight="bold">Game Start Time</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                        <Typography fontWeight="bold">Game End Time</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                        <Typography fontWeight="bold">Game Duration</Typography>
                        </StyledTableCell>
                        {/* Add more headers as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                        <StyledTableRowSingle>
                            <StyledTableCell>
                                <Typography>{game?.time_limit === 0 ? 'None' : 'No'}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_create_time ? formatDateToLocal(game.game_create_time) : 'N/A'}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_start_time ? formatDateToLocal(game.game_start_time) : 'N/A'}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_end_time ? formatDateToLocal(game.game_end_time) : 'N/A'}</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography>{game?.game_duration ? formatDuration(game.game_duration) : 'N/A'}</Typography>
                            </StyledTableCell>
                            {/* Add more cells as needed */}
                        </StyledTableRowSingle>
                </TableBody>
            </TableContainer>
        )}



{loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 5
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Username</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Win</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Flag Captures</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Flag Saves</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Base Damage</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(Array(10).keys()).map((_, index: number) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={60} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={100} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                {/* Add more skeletons as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}

{(!loading && players.length > 0) && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 3
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Username</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Win</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Flag Captures</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Flag Saves</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Base Damage</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.sort((a: UYAGameHistoryPlayer, b: UYAGameHistoryPlayer) => {
                        // Sort by win status first (true > false) and then by kills (higher kills first)
                        if (a.win === b.win) {
                            return b.kills - a.kills;
                        }
                        return a.win ? -1 : 1;
                    }).map((player: UYAGameHistoryPlayer, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Typography
                                        overflow="hidden"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            cursor: "pointer"
                                        }}
                                        textOverflow="ellipsis"
                                        noWrap
                                    >
                                        <Link
                                            sx={{
                                                color: "white",
                                                textDecoration: "underline #A0A0A0",
                                                textDecorationThickness: 2
                                            }}
                                            onClick={() => navigate(`/uya/stats/details/${player.player_id}`)}
                                            >
                                            {player.username}
                                        </Link>
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{player.win ? 'Yes' : 'No'}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{player.kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{player.deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{player.flag_captures}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{player.flag_saves}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{player.base_dmg}</Typography>
                                </StyledTableCell>
                                {/* Add more cells as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}




{loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 5
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Username</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Flux Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Blitz Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Gravity Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Rocket Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">N60 Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Lava Gun Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Morph Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Mine Glove Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Wrench Kills</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(Array(10).keys()).map((_, index: number) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={60} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={100} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                {/* Add more skeletons as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}

{(!loading && players.length > 0) && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 3
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Username</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Flux Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Blitz Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Gravity Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Rocket Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">N60 Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Lava Gun Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Morph Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Mine Glove Kills</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Wrench Kills</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.sort((a: UYAGameHistoryPlayer, b: UYAGameHistoryPlayer) => {
                        // Sort by win status first (true > false) and then by kills (higher kills first)
                        if (a.win === b.win) {
                            return b.kills - a.kills;
                        }
                        return a.win ? -1 : 1;
                    }).map((player: UYAGameHistoryPlayer, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Typography
                                        overflow="hidden"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            cursor: "pointer"
                                        }}
                                        textOverflow="ellipsis"
                                        noWrap
                                    >
                                        <Link
                                            sx={{
                                                color: "white",
                                                textDecoration: "underline #A0A0A0",
                                                textDecorationThickness: 2
                                            }}
                                            onClick={() => navigate(`/uya/stats/details/${player.player_id}`)}
                                            >
                                            {player.username}
                                        </Link>
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.flux_rifle_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.blitz_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.gravity_bomb_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.rocket_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.n60_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.lava_gun_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.morph_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.mine_glove_kills}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.wrench_kills}</Typography>
                                </StyledTableCell>
                                {/* Add more cells as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}



{loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 5
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Username</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Flux Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Blitz Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Gravity Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Rocket Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">N60 Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Lava Gun Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Morph Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Mine Glove Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Wrench Deaths</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(Array(10).keys()).map((_, index: number) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={60} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={100} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Skeleton variant="text" width={150} height={24} />
                                </StyledTableCell>
                                {/* Add more skeletons as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}

{(!loading && players.length > 0) && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3,
                        marginBottom: 3
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Username</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Flux Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Blitz Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Gravity Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Rocket Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">N60 Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Lava Gun Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Morph Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Mine Glove Deaths</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                            <Typography fontWeight="bold">Wrench Deaths</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {players.sort((a: UYAGameHistoryPlayer, b: UYAGameHistoryPlayer) => {
                        // Sort by win status first (true > false) and then by kills (higher kills first)
                        if (a.win === b.win) {
                            return b.kills - a.kills;
                        }
                        return a.win ? -1 : 1;
                    }).map((player: UYAGameHistoryPlayer, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell>
                                    <Typography
                                        overflow="hidden"
                                        sx={{
                                            whiteSpace: "nowrap",
                                            cursor: "pointer"
                                        }}
                                        textOverflow="ellipsis"
                                        noWrap
                                    >
                                        <Link
                                            sx={{
                                                color: "white",
                                                textDecoration: "underline #A0A0A0",
                                                textDecorationThickness: 2
                                            }}
                                            onClick={() => navigate(`/uya/stats/details/${player.player_id}`)}
                                            >
                                            {player.username}
                                        </Link>
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.flux_rifle_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.blitz_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.gravity_bomb_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.rocket_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.n60_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.lava_gun_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.morph_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.mine_glove_deaths}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                <Typography>{player.wrench_deaths}</Typography>
                                </StyledTableCell>
                                {/* Add more cells as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}


    


    
</Box>;
    
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//     <Box>
//         <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Game Details</Typography>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Game ID:</Typography>
//                 <Typography>{game?.id}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Status:</Typography>
//                 <Typography>{game?.status}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Game Map:</Typography>
//                 <Typography>{game?.game_map}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Game Name:</Typography>
//                 <Typography>{game?.game_name}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Game Mode:</Typography>
//                 <Typography>{game?.game_mode}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Player Count:</Typography>
//                 <Typography>{game?.player_count}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight="bold">Game Duration:</Typography>
//                 <Typography>{game?.game_duration} minutes</Typography>
//             </Box>
//         </Box>
//     </Box>

//         {/* Player Header */}
//         <Box sx={{ display: 'flex', backgroundColor: "rgba(81, 10, 10, 0.75)", padding: 1 }}>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Username</Typography>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Win</Typography>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Kills</Typography>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Deaths</Typography>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Flag Captures</Typography>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Flag Saves</Typography>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//                 <Typography fontWeight="bold">Base Damage</Typography>
//             </Box>
//             {/* Add more headers as needed */}
//         </Box>

//         {/* Player Rows */}
//         {players && players.length > 0 ? (
//                 [...players]
//                     .sort((a: UYAGameHistoryPlayer, b: UYAGameHistoryPlayer) => {
//                         // Sort by win status first (true > false) and then by kills (higher kills first)
//                         if (a.win === b.win) {
//                             return b.kills - a.kills;
//                         }
//                         return a.win ? -1 : 1;
//                     })
//                 .map((player: UYAGameHistoryPlayer, index: number) => (
//                 <Box key={player.player_id} sx={{ display: 'flex', padding: 1, backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.05)' : 'transparent' }}>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.username}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.win ? 'Yes' : 'No'}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.kills}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.deaths}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.flag_captures}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.flag_saves}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1 }}>
//                         <Typography>{player.base_dmg}</Typography>
//                     </Box>
//                     {/* Add more columns as needed */}
//                 </Box>
//             ))
//         ) : (
//             <Typography>No players available.</Typography>
//         )}
// </Box>;
}

export default UYAGameDetails;


function formatDateToLocal(dateString: string): string {
    // Convert the UTC string to a Date object
    const date = new Date(dateString);

    // Define options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // Use 12-hour format with AM/PM
        timeZoneName: 'short' // Show the time zone abbreviation
    };

    // Format the date to local time using toLocaleDateString
    return date.toLocaleDateString('en-US', options);
}

// Helper function to format game duration
const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration);
    const fractionalPart = duration - minutes;
    const seconds = Math.floor(fractionalPart * 60);
    const formattedSeconds = seconds.toString().padStart(2, '0'); // Ensures two digits

    return `${minutes}m ${formattedSeconds}s`;
};