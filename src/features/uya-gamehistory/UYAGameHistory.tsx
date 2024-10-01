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

import {isNumeric} from "../../components/base/Functions";
import Paginator from "../../components/base/Paginator";
import {getHandler} from "../../utils/Requests";
import {Optional, Pagination, UYAGameHistoryEntry} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";
import {AxiosResponse} from "axios";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import Skeleton from "@mui/material/Skeleton";
import ImageBacking from "../../components/base/ImageBacking";
import {UYA_BACKGROUND_IMAGES} from "../../utils/Constants";

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
    const screenSize: ScreenSize = computeDeviceScale(width);
    const mobile: boolean = screenSize === ScreenSize.Mobile;

    const navigate: NavigateFunction = useNavigate();


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

    return <ImageBacking backgroundUrl={UYA_BACKGROUND_IMAGES}>
        <Box sx={{width: screenSize === ScreenSize.Mobile ? "100%" : "calc(100% - 50px)"}}>

            <HorizonBreadcrumbs
                paths={[
                    {text: "UYA", route: "/uya"},
                    {text: "Game History", route: "/uya/game-history"},
                ]}
            />

            {loading && (
                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        mr: screenSize === ScreenSize.Mobile ? 0 : 10,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                    }}
                >
                    <Table size="small">
                        <TableHead sx={{backgroundColor: "rgba(0, 10, 0, 0.75)", borderBottom: "none", padding: 0}}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Name</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Mode</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Map</Typography>
                            </StyledTableCell>
                            {!mobile && (
                                <StyledTableCell>
                                    <Typography fontWeight="bold">Date</Typography>
                                </StyledTableCell>
                            )}
                        </TableHead>
                        <TableBody>
                            { Array.from(Array(100).keys()).map((_: any, index: number) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={60} height={24} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={60} height={24} />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Skeleton variant="text" width={60} height={24} sx={{ml: -5}}/>
                                    </StyledTableCell>
                                    {!mobile && (
                                        <StyledTableCell>
                                            <Skeleton variant="text" width={60} height={24} />
                                        </StyledTableCell>
                                    )}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {(!loading && gameHistory.length > 0) && (

                <TableContainer
                    component={Paper}
                    sx={{
                        ml: screenSize === ScreenSize.Mobile ? 0 : 3,
                        mr: screenSize === ScreenSize.Mobile ? 0 : 10,
                        backgroundColor: "rgba(0, 0, 0, 0.0)",
                    }}
                >
                    <Table size="small">
                        <TableHead sx={{backgroundColor: "rgba(0, 10, 0, 0.75)", borderBottom: "none", padding: 0}}>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Name</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Map</Typography>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Typography fontWeight="bold">Game Mode</Typography>
                            </StyledTableCell>
                            {!mobile && (
                                <StyledTableCell>
                                    <Typography fontWeight="bold">Date</Typography>
                                </StyledTableCell>
                            )}
                        </TableHead>
                        <TableBody>
                            {gameHistory.map((game: UYAGameHistoryEntry, index) => (
                                <StyledTableRow key={game.game_name + index}>
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
                                                onClick={() => navigate(`/uya/game-history/${game.id}`)}
                                            >
                                                {game.game_name.replaceAll("[IG] ", "")}
                                            </Link>
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography>{game.game_map}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography>{game.game_mode}</Typography>
                                    </StyledTableCell>
                                    {!mobile && (
                                        <StyledTableCell>
                                            <Typography>
                                                {new Date(game.game_end_time).toLocaleDateString()}
                                                &nbsp;
                                                {new Date(game.game_end_time).toLocaleTimeString()}
                                            </Typography>
                                        </StyledTableCell>
                                    )}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box sx={{ ml: screenSize === ScreenSize.Mobile ? 0 : 3, mr: screenSize === ScreenSize.Mobile ? 0 : -3 }}>
                <Paginator
                    totalResults={totalGames}
                    rowsPerPage={100}
                    page={page}
                    baseUrl={`/uya/game-history`}
                />
            </Box>
        </Box>
    </ImageBacking>
}

export default UYAGameHistory;
