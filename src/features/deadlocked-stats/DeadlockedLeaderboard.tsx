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
import {LeaderboardEntry, Optional, Pagination} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import DeadlockedBacking from "../deadlocked/DeadlockedBacking";
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

export interface LeaderboardRowProps {
    id: number;
    name: string;
    amount: number;
}

const DeadlockedLeaderboard = () => {

    const [searchParams] = useSearchParams();
    const pageRaw: Optional<string> = searchParams.get("page");

    // TODO Probably a much better way to do this.
    const page = pageRaw === null ? 1 : isNumeric(parseInt(pageRaw)) ? parseInt(pageRaw) : 1;

    const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [totalPlayers, setTotalPlayers] = useState<number>(0);

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
        getHandler<Pagination<LeaderboardEntry>>(
            `/api/dl/stats/leaderboard/${domain}/${stat}?page=${page}`,
            dispatch,
            (response: AxiosResponse<Pagination<LeaderboardEntry>, any>) => {
                setPlayers(response.data.results);
                setTotalPlayers(response.data.count);
            },
            () => {},
            setLoading
        )
    }, [domain, stat, page])

    return <DeadlockedBacking>

        <Box>
            <HorizonBreadcrumbs
                paths={[
                    {text: "Deadlocked", route: "/deadlocked"},
                    {text: "Stats", route: "/deadlocked/stats"},
                    {
                        text: `Leaderboard - ${domainFormatting(domain ?? "", screenSize === ScreenSize.Mobile)} / ${statFormatting(stat ?? "", screenSize === ScreenSize.Mobile)}`,
                        route: `/deadlocked/stats/leaderboard/${domain}/${stat}`
                    }
                ]}
            />

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
                        <TableRow sx={{backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0}}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Rank</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Player</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Score</Typography>
                            </StyledTableCell>
                            { stat?.includes("rank") && (
                                <StyledTableCell>
                                    <Typography fontWeight="bold">Skill Level</Typography>
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { Array.from(Array(100).keys()).map((_: any, index: number) => {

                            return <StyledTableRow key={index}>

                                <StyledTableCell sx={{width: "10vw"}}>
                                    <Skeleton variant="text" width={40} height={24} />
                                </StyledTableCell>

                                <StyledTableCell
                                    sx={{
                                        width: stat?.includes("rank")
                                            ? screenSize === ScreenSize.Mobile
                                                ? "40vw"
                                                : "30vw"
                                            : screenSize === ScreenSize.Mobile
                                                ? "50vw"
                                                : "40vw"
                                    }}
                                >
                                    <Box sx={{
                                        width: stat?.includes("rank")
                                            ? screenSize === ScreenSize.Mobile
                                                ? "40vw"
                                                : "30vw"
                                            : screenSize === ScreenSize.Mobile
                                                ? "50vw"
                                                : "40vw"
                                    }}>
                                        <Skeleton variant="text" width={150} height={24} />
                                    </Box>

                                </StyledTableCell>

                                <StyledTableCell sx={{width: stat?.includes("rank") ? "20vw" : "30vw"}}>
                                    <Skeleton variant="text" width={60} height={24} />
                                </StyledTableCell>

                                { stat?.includes("rank") && (
                                    <StyledTableCell sx={{width: stat?.includes("rank") ? "10vw" : "20vw"}}>
                                        <Skeleton variant="text" width={40} height={24} />
                                    </StyledTableCell>
                                )}

                            </StyledTableRow>
                        })}
                    </TableBody>
                </TableContainer>
            )}

            {(!loading && players.length > 0) && (

                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                        mr: screenSize === ScreenSize.Mobile ? 0 : -3
                    }}
                >
                    <TableHead>
                        <TableRow sx={{backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0}}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Rank</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Player</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Score</Typography>
                            </StyledTableCell>
                            { stat?.includes("rank") && (
                                <StyledTableCell>
                                    <Typography fontWeight="bold">Skill Level</Typography>
                                </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { players.map((player: LeaderboardEntry, index) => {

                            return <StyledTableRow key={player.username}>

                                <StyledTableCell sx={{width: "10vw"}}>
                                    <Typography>{player.rank}</Typography>
                                </StyledTableCell>

                                <StyledTableCell
                                    sx={{
                                        width: stat?.includes("rank")
                                            ? screenSize === ScreenSize.Mobile
                                                ? "40vw"
                                                : "30vw"
                                            : screenSize === ScreenSize.Mobile
                                                ? "50vw"
                                                : "40vw"
                                    }}
                                >

                                    <Typography
                                        overflow="hidden"
                                        sx={{
                                            width: stat?.includes("rank")
                                                ? screenSize === ScreenSize.Mobile
                                                    ? "40vw"
                                                    : "30vw"
                                                : screenSize === ScreenSize.Mobile
                                                    ? "50vw"
                                                    : "40vw",
                                            whiteSpace: "no-wrap",
                                            cursor: "pointer"
                                        }}
                                        textOverflow="ellipsis"
                                        noWrap
                                    >
                                        {
                                            <Link
                                                sx={{
                                                    color: "white",
                                                    textDecoration: "underline #A0A0A0",
                                                    textDecorationThickness: 2
                                                }}
                                                onClick={() => navigate(`/deadlocked/stats/details/${player.id}`)}
                                            >
                                                {processUserNames(player.username)}
                                            </Link>
                                        }
                                    </Typography>

                                </StyledTableCell>

                                <StyledTableCell sx={{width: stat?.includes("rank") ? "20vw" : "30vw"}}>
                                    <Typography>{processValue(stat, player.score)}</Typography>
                                </StyledTableCell>

                                { stat?.includes("rank") && (
                                    <StyledTableCell sx={{width: stat?.includes("rank") ? "10vw" : "20vw"}}>
                                        <Typography>{computeSkillLevel(player.score)}</Typography>
                                    </StyledTableCell>
                                )}

                            </StyledTableRow>
                        })}
                    </TableBody>
                </TableContainer>

            )}

            <Box sx={{ml: screenSize === ScreenSize.Mobile ? 0 : 3, mr: screenSize === ScreenSize.Mobile ? 0 : -3}}>
                <Paginator
                    totalResults={totalPlayers}
                    rowsPerPage={100}
                    page={page}
                    baseUrl={`/deadlocked/stats/leaderboard/${domain}/${stat}`}
                />
            </Box>

        </Box>

    </DeadlockedBacking>
}

export default DeadlockedLeaderboard;
