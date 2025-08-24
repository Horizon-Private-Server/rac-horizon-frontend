import React, {Dispatch, useEffect, useState} from "react";

import {
    Box,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

import {NavigateFunction, useNavigate, useParams, useSearchParams} from "react-router-dom";

import {styled} from "@mui/material/styles";

import {tableCellClasses} from '@mui/material/TableCell';

import {
    computeSkillLevel,
    domainFormatting,
    formatTime,
    isNumeric,
    statFormatting
} from "../../components/base/Functions";
import Paginator from "../../components/base/Paginator";
import {getHandler} from "../../utils/Requests";
import {LeaderboardEntry, Optional, Pagination} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import {AxiosResponse} from "axios";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import Skeleton from "@mui/material/Skeleton";
import ImageBacking from "../../components/base/ImageBacking";
import {useDeadlockedLeaderboard} from "../../hooks/deadlocked-stats";

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

    const {domain, stat} = useParams();

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

    const {data, status} = useDeadlockedLeaderboard(domain ?? "overall", stat ?? "rank", page ?? 1);

    return <ImageBacking backgroundUrl="https://rac-horizon-cdn.s3.amazonaws.com/backgrounds/dl-background.jpg">

        <Box sx={{width: screenSize === ScreenSize.Mobile ? "100%" : "calc(100% - 50px)"}}>
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

            <Box sx={{m: screenSize === ScreenSize.Mobile ? 0 : 3, mt: 0, width: "100%"}}>
                <Paginator
                    totalResults={data?.count ?? 0}
                    rowsPerPage={100}
                    page={page}
                    baseUrl={`/deadlocked/stats/leaderboard/${domain}/${stat}`}
                />
            </Box>

            {status === "pending" && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        mr: screenSize === ScreenSize.Mobile ? 0 : 10,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                    }}
                >
                    <Table size="small">
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

                                    <StyledTableCell sx={{pt: 0, pb: 0}}>
                                        <Skeleton variant="text" width={50} height={24} />
                                    </StyledTableCell>

                                    <StyledTableCell sx={{pt: 0, pb: 0}}>
                                        <Skeleton variant="text" width={140} height={24} sx={{ml: -5}} />
                                    </StyledTableCell>

                                    <StyledTableCell sx={{pt: 0, pb: 0}}>
                                        <Skeleton variant="text" width={60} height={24} />
                                    </StyledTableCell>

                                    { stat?.includes("rank") && (
                                        <StyledTableCell sx={{pt: 0, pb: 0}}>
                                            <Skeleton variant="text" width={40} height={24} />
                                        </StyledTableCell>
                                    )}

                                </StyledTableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {(status === "success" && (data?.results.length ?? 0) > 0) && (

                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        mr: screenSize === ScreenSize.Mobile ? 0 : 10,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                    }}
                >
                    <Table size="small">
                        <TableHead sx={{backgroundColor: "rgba(81, 10, 10, 0.75)", borderBottom: "none", padding: 0}}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Rank</Typography>
                            </StyledTableCell>
                            <StyledTableCell sx={{maxWidth: "40%"}}>
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
                        </TableHead>
                        <TableBody>
                            { data?.results.map((player: LeaderboardEntry) => {

                                return <StyledTableRow key={player.username}>

                                    <StyledTableCell>
                                        <Typography>{player.rank}</Typography>
                                    </StyledTableCell>

                                    <StyledTableCell sx={{maxWidth: "40vw%"}}>
                                        <Typography
                                            overflow="hidden"
                                            sx={{
                                                whiteSpace: "no-wrap",
                                                cursor: "pointer",
                                                maxWidth: "40vw",
                                            }}
                                            textOverflow="ellipsis"
                                            noWrap
                                        >
                                            {
                                                <Link
                                                    sx={{
                                                        maxWidth: "40vw",
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

                                    <StyledTableCell>
                                        <Typography>{processValue(stat, player.score)}</Typography>
                                    </StyledTableCell>

                                    { stat?.includes("rank") && (
                                        <StyledTableCell>
                                            <Typography>{computeSkillLevel(player.score)}</Typography>
                                        </StyledTableCell>
                                    )}

                                </StyledTableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box sx={{m: screenSize === ScreenSize.Mobile ? 0 : 3, mt: 0, width: "100%"}}>
                <Paginator
                    totalResults={data?.count ?? 0}
                    rowsPerPage={100}
                    page={page}
                    baseUrl={`/deadlocked/stats/leaderboard/${domain}/${stat}`}
                />
            </Box>

        </Box>

    </ImageBacking>
}

export default DeadlockedLeaderboard;
