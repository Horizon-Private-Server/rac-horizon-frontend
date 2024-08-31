import React, {useState, useEffect, Dispatch} from "react";

import {
    Typography,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    Breadcrumbs,
    Box
} from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles"

import dlBackground from "../../assets/img/dl-background.jpg";


import { tableCellClasses } from '@mui/material/TableCell';

import { computeSkillLevel, formatTime } from "../../components/base/Functions";
import Paginator from "../../components/base/Paginator";
import {getHandler} from "../../utils/Requests";
import {LeaderboardEntry, Pagination} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import DeadlockedBacking from "../deadlocked/DeadlockedBacking";
import {AxiosResponse} from "axios";

const useStyles = makeStyles(() =>
    createStyles({
        dlBackground: {
            "&": {
                position: "relative", 
                height: "100%",
                width: "100%",
                display: "flex",
                opacity: 1.0,
                zIndex: 0
            },
            "&:after": {
                backgroundImage: `url(${dlBackground})`,
                backgroundSize: "cover",
                position: "absolute",
                top: "0px",
                left: "0px",
                right: "0px",
                zIndex: -1,
                opacity: 0.32,
                height: "100%",
                width: "100%",
                content: '""',
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat"
            }
        }
    })
);

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
      backgroundColor: "rgba(10, 10, 10, 0.5)",
      borderBottom: "none",
      padding: 0
    },
    '&:nth-of-type(even)': {
        backgroundColor: "rgba(41, 0, 0, 0.5)",
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

    const classes = useStyles();

    const [page, setPage] = useState<number>(0);
    const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [totalPlayers, setTotalPlayers] = useState<number>(1);

    const dispatch: Dispatch<AnyAction> = useAppDispatch();

    const { domain } = useParams();
    const { stat } = useParams();

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate = useNavigate();

    function processUserNames(name: string) {
        return name;
    }

    function processValue(offering?: string, amount?: number) {
        if (offering?.endsWith("time") || offering?.includes("time_played")) {
            return formatTime(amount ?? 0);
        }
        if (offering?.includes("DISCONNECTS")) {
            return `${amount ?? 0}%`;
        }
        if (offering?.includes("XP")) {
            return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return `${amount}`;
    }


    useEffect(() => {
        getHandler<Pagination<LeaderboardEntry>>(
            `/api/dl/stats/leaderboard/${domain}/${stat}?page=${page}`,
            dispatch,
            (response: AxiosResponse<Pagination<LeaderboardEntry>, any>) => {
                setPlayers(response.data.results);
                setTotalPlayers(response.data.count);
            },
            () => {},
        )
    }, [domain, stat, page])

    return <DeadlockedBacking>

        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{mt: 2, mb: 3, ml: 2}}>
                <Link underline="hover" color="inherit" href="/deadlocked">
                    Deadlocked
                </Link>
                <Link underline="hover" color="inherit" onClick={() => navigate(-1)}>
                    Leaderboards
                </Link>
                <Typography color="text.primary">{domain?.replaceAll("_", " ")}&nbsp;{stat?.replaceAll("_", " ")}</Typography>
            </Breadcrumbs>

            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Rank</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Player</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography fontWeight="bold">Amount</Typography>
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
                        let rowNum: number = (page * 100) + index + 1;
                        return <StyledTableRow key={player.username}>
                            <StyledTableCell sx={{width: "10vw"}}>
                                <Typography>{rowNum}</Typography>
                            </StyledTableCell>

                            <StyledTableCell sx={{width: stat?.includes("rank") ? screenSize === ScreenSize.Mobile ? "40vw" : "30vw" : screenSize === ScreenSize.Mobile ? "50vw" : "40vw"}}>

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
                                         whiteSpace: "no-wrap"
                                    }}
                                    textOverflow="ellipsis"
                                    noWrap
                                >
                                    {<Link href={`/dl/details/${player.horizon_id}`}>{processUserNames(player.username)}</Link>}
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
            <Box sx={{mt: 3}} />
            <Paginator totalResults={totalPlayers} rowsPerPage={100} page={page} setPage={setPage} />
        </Box>

    </DeadlockedBacking>;
}

export default DeadlockedLeaderboard;
