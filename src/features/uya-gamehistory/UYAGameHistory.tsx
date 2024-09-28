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
import {UYAGameHistoryEntry, Optional, Pagination} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import {AxiosResponse} from "axios";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import Skeleton from "@mui/material/Skeleton";

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



const UYAGameHistory = () => {

    const [searchParams] = useSearchParams();
    const pageRaw: Optional<string> = searchParams.get("page");

    // TODO Probably a much better way to do this.
    const page = pageRaw === null ? 1 : isNumeric(parseInt(pageRaw)) ? parseInt(pageRaw) : 1;

    const [gameHistory, setGameHistory] = useState<UYAGameHistoryEntry[]>([]);
    const [totalGames, setTotalGames] = useState<number>(0);


    const [loading, setLoading] = useState<boolean>(false);

    const dispatch: Dispatch<AnyAction> = useAppDispatch();

    const { domain } = useParams();
    const { stat } = useParams();

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate: NavigateFunction = useNavigate();

    function processUserNames(name: string) {
        return name;
    }

    function processValue(offering?: string, amount?: number) {
        if (offering?.endsWith("time") || offering?.includes("time_played")) {
            return formatTime(amount ?? 0);
        }
        if (offering?.includes("disconnects")) {
            return `${amount ?? 0}%`;
        }
        if (offering?.includes("XP")) {
            return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return `${amount}`;
    }


    useEffect(() => {
        // TODO Re-implement this using React Query/Tanstack.
        getHandler<Pagination<UYAGameHistoryEntry>>(
            `/api/uya/gamehistory/history?page=${page}`,
            dispatch,
            (response: AxiosResponse<Pagination<UYAGameHistoryEntry>, any>) => {
                setGameHistory(response.data.results);
                setTotalGames(response.data.count);
            },
            () => {},
            setLoading
        )
    }, [domain, stat, page])

    return <Box>
            {loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Map</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Name</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Mode</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Submode</Typography>
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
                                    <Skeleton variant="text" width={100} height={24} />
                                </StyledTableCell>
                                {/* Add more skeletons as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}

            {(!loading && gameHistory.length > 0) && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0 }}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Map</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Name</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Mode</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Submode</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Time Limit</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Weapons Enabled</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Duration</Typography>
                            </StyledTableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gameHistory.map((game: UYAGameHistoryEntry, index) => (
                            <StyledTableRow key={game.game_name + index}>
                                <StyledTableCell>
                                    <Typography>{game.game_map}</Typography>
                                </StyledTableCell>
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
                                            onClick={() => navigate(`/uya/stats/details/${game.game_name}`)}
                                        >
                                            {processUserNames(game.game_name)}
                                        </Link>
                                    </Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{game.game_mode}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{game.game_submode}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{formatTimeLimit(game.time_limit)}</Typography>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {game.n60_enabled && <Typography>N60</Typography>}
                                        {game.lava_gun_enabled && <Typography>Lava Gun</Typography>}
                                        {game.gravity_bomb_enabled && <Typography>Gravity Bomb</Typography>}
                                        {game.flux_rifle_enabled && <Typography>Flux Rifle</Typography>}
                                        {game.mine_glove_enabled && <Typography>Mine Glove</Typography>}
                                        {game.morph_enabled && <Typography>Morph</Typography>}
                                        {game.blitz_enabled && <Typography>Blitz</Typography>}
                                        {game.rocket_enabled && <Typography>Rocket</Typography>}
                                    </Box>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Typography>{formatDuration(game.game_duration)}</Typography>
                                </StyledTableCell>
                                {/* Add more cells as needed */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            )}

            <Box sx={{ ml: screenSize === ScreenSize.Mobile ? 0 : 3, mr: screenSize === ScreenSize.Mobile ? 0 : -3 }}>
                <Paginator
                    totalResults={totalGames}
                    rowsPerPage={100}
                    page={page}
                    baseUrl={`/uya/gamehistory/history`}
                />
            </Box>
        </Box>
}

// Helper function to format game duration
const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration);
    const fractionalPart = duration - minutes;
    const seconds = Math.floor(fractionalPart * 60);
    const formattedSeconds = seconds.toString().padStart(2, '0'); // Ensures two digits

    return `${minutes}m ${formattedSeconds}s`;
};

// Helper function to format the time limit
const formatTimeLimit = (timeLimit: number): string => {
    if (timeLimit === 0) {
        return "No Time Limit";
    }
    
    const minutes = Math.floor(timeLimit);
    return `${minutes}m`;
};

export default UYAGameHistory;
