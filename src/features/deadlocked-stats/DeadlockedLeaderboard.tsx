import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Button, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Link, Breadcrumbs } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles"

import dlBackground from "../../assets/img/dl-background.jpg";

import { Stack } from "@mui/system";

import { tableCellClasses } from '@mui/material/TableCell';

import axios from "axios";
import { computeSkillLevel, formatTime } from "../../components/base/Functions";
import { Pagination } from "../../components/base/Pagination";

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

    const [page, setPage] = useState(0);
    const [players, setPlayers] = useState([]);
    const [totalPlayers, setTotalPlayers] = useState(0);

    const { offering } = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate = useNavigate();

    function processUserNames(name: string) {
        return name;
    }

    function processValue(offering?: string, amount?: number) {
        if (offering?.endsWith("TIME") || offering?.includes("TIME_PLAYED")) {
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
        axios.get(`http://dev.codeprojects.net:9000/api/leaderboard/${offering}/${page}`).then((response)=> {
            setPlayers(response.data.results);
            setTotalPlayers(response.data.total_players);
        }).catch()
    }, [page, offering])

    return <Page className={classes.dlBackground}>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingBottom: 2}}>
            <Link underline="hover" color="inherit" href="/dl">
                Deadlocked
            </Link>
            <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate(-1)}
            >
                Leaderboards
            </Link>
            <Typography color="text.primary">{offering?.replaceAll("ACCOUNT_", "").replaceAll("CUSTOM_", "").replaceAll("STAT_", "").replaceAll("_", " ")}</Typography>
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
                    { offering?.includes("RANK") && (
                        <StyledTableCell>
                            <Typography fontWeight="bold">Skill Level</Typography>
                        </StyledTableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                { players.map((player: LeaderboardRowProps, index) => {
                    let rowNum: number = (page * 100) + index + 1;
                    return <StyledTableRow key={player.name}>
                        <StyledTableCell sx={{width: "10vw"}}>
                            <Typography>{rowNum}</Typography>
                        </StyledTableCell>

                        <StyledTableCell sx={{width: offering?.includes("RANK") ? screenSize === ScreenSize.Mobile ? "40vw" : "30vw" : screenSize === ScreenSize.Mobile ? "50vw" : "40vw"}}>

                            <Typography 
                                overflow="hidden" 
                                sx={{
                                    width: offering?.includes("RANK") 
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
                                {<Link href={`/dl/details/${player.id}`}>{processUserNames(player.name)}</Link>}
                            </Typography>

                        </StyledTableCell>

                        <StyledTableCell sx={{width: offering?.includes("RANK") ? "20vw" : "30vw"}}>
                            <Typography>{processValue(offering, player.amount)}</Typography>
                        </StyledTableCell>

                        { offering?.includes("RANK") && (
                            <StyledTableCell sx={{width: offering?.includes("RANK") ? "10vw" : "20vw"}}>
                                <Typography>{computeSkillLevel(player.amount)}</Typography>
                            </StyledTableCell>
                        )}

                    </StyledTableRow>
                })}
            </TableBody>
        </TableContainer>
        <Pagination totalResults={totalPlayers} rowsPerPage={100} page={page} setPage={setPage} />


    </Page>;
}

export default DeadlockedLeaderboard;