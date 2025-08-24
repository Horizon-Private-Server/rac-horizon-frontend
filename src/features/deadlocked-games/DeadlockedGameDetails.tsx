import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, CardContent, Card, Divider, TableContainer, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import {useParams} from "react-router-dom";

import { styled } from "@mui/material/styles";

import { Stack } from "@mui/system";

import axios from "axios";
import { Backbar } from "../../components/base/Backbar";

import Skeleton from '@mui/material/Skeleton';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { formatTime } from "../../components/base/Functions";
import { LoadableRow, LoadableValue } from "../../components/base/LoadableRow";

import { tableCellClasses } from '@mui/material/TableCell';
import NotFoundCard from "../../components/base/NotFoundCard";
import {GameDetailProps, GameRulesProps, PostGamePlayerDataProps} from "../../utils/Interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      borderBottom: "none",
      background: "rgba(0, 0, 0, 0.15)"
    },
    [`&.${tableCellClasses.body}`]: {
      borderBottom: "none",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      borderBottom: "none",
      padding: 0
    },
    '&:nth-of-type(even)': {
        borderBottom: "none",
        padding: 0
      },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export interface TeamCardProps {
    name: string;
    gameMode: string;
    team: PostGamePlayerDataProps[]
}

export interface TeamScorecardStats {
    kills: number;
    deaths: number;
    target1: number;
    target1Name: string;
    target2: number;
    target2Name: number;
    rankDelta: number;
}


const TeamCard = (props: TeamCardProps) => {

    const {name, team, gameMode} = props;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const bgColorMap = {
        blue: "rgba(0, 76, 115, 1.0)",
        red: "rgba(109, 19, 21, 1.0)",
        green: "rgba(39, 75, 36, 1.0)",
        orange: "rgba(145, 43, 28, 1.0)",
        yellow: "rgba(191, 153, 38, 1.0)",
        purple: "rgba(115, 39, 99, 1.0)",
        aqua: "rgba(38, 115, 115, 1.0)",
        pink: "rgba(191, 115, 153, 1.0)",
        olive: "rgba(76, 76, 38, 1.0)",
        maroon: "rgba(76, 0, 0, 1.0)",
    }


    function getModeHeaders(gameMode: string) {

        if (gameMode === null || gameMode === undefined|| gameMode === "") {
            return ["Kills", "Deaths"];
        }

        let modeStats = {
            "Deathmatch": ["Score", "Kills", "Deaths", "Suicides"],
            "King of the Hill": ["Score", "Kills", "Deaths", "Hill Time"],
            "Capture the Flag": ["Kills", "Deaths", "Flags Captured"],
            "Juggernaut": ["Kills", "Deaths", "Juggernaut Time"],
            "Conquest": ["Kills", "Deaths", "Nodes Captured"],
            "Survival": ["Kills", "Deaths", "Revives", "Times Revived", "XP"],
            "Search and Destroy": ["Kills", "Deaths", "Plants", "Defuses"],
            "Payload": ["Kills", "Deaths", "Points"],
        }

        return modeStats[gameMode as keyof typeof modeStats];
    }

    function getModeTemplate(player: PostGamePlayerDataProps, gameMode: string) {

        let gs = player.game_stats;

        if (gameMode === null || gameMode === undefined || gameMode === "") {
            return [gs.deathmatch.kills, gs.deathmatch.deaths];
        }

        let modeTemplate = {
            // @ts-ignore
            "Deathmatch": [gs.score, gs.kills, gs.deaths, gs.suicides],
            // @ts-ignore
            "King of the Hill": [gs.score, gs.kills, gs.deaths, formatTime(parseInt(gs.koth.time), true)],
            // "Capture the Flag": [gs.ctf.kills, gs.ctf.deaths, gs.ctf.flags],
            // "Juggernaut": [gs.juggernaut.kills, gs.juggernaut.deaths, formatTime(gs.juggernaut.time, true)],
            // "Conquest": [gs.conquest.kills, gs.conquest.deaths, gs.conquest.nodes],
            // "Survival": [addCommasToNumber(gs.survival.kills), gs.survival.deaths, gs.survival.revives, gs.survival.times_revived, addCommasToNumber(gs.survival.xp)],
            // "Search and Destroy": [gs.snd.kills, gs.snd.deaths, gs.snd.plants, gs.snd.defuses + gs.snd.ninja_defuses],
            // "Payload": [gs.payload.kills, gs.payload.deaths, gs.payload.points],
        }

        return modeTemplate[gameMode as keyof typeof modeTemplate];
    }


    if (gameMode === undefined || gameMode === null || gameMode === "") {
        return <Box>
            <Skeleton variant="rectangular" width="78.5vw" height={200} sx={{mt: 2}} />
            <Skeleton variant="rectangular" width="78.5vw" height={200} sx={{mt: 2}} />
            <Skeleton variant="rectangular" width="78.5vw" height={200} sx={{mt: 2}} />
        </Box>
    }


    return <Card sx={{background: `linear-gradient(65deg, transparent ${screenSize === ScreenSize.Mobile ? "80%" : "90%"}, ${bgColorMap[name as keyof typeof bgColorMap]})`, marginBottom: 1}}>
        <CardContent sx={{pl: screenSize === ScreenSize.Mobile ? 1 : 2, pr: screenSize === ScreenSize.Mobile ? 1 : 2}}>
            <Stack direction="row" justifyContent="space-between">
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{pl: 3}}>
                                <Typography fontWeight="bold" fontSize={screenSize === ScreenSize.Mobile ? 12 : 16}>Player</Typography>
                            </StyledTableCell>
                            { getModeHeaders(gameMode).map((header: string) => {
                                return <StyledTableCell sx={{pl: 0}}>
                                    <Typography
                                        fontWeight="bold"
                                        align="center"
                                        fontSize={screenSize === ScreenSize.Mobile ? 12 : 16}
                                        overflow="hidden"
                                        sx={{
                                            width: screenSize === ScreenSize.Mobile ? "16vw" : "8vw",
                                            whiteSpace: "no-wrap"
                                        }}
                                        textOverflow="ellipsis"
                                        noWrap
                                    >
                                        {header}
                                    </Typography>
                                </StyledTableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{p: 0}}>
                        {
                            // @ts-ignore
                            team.players.map((player: PostGamePlayerDataProps) => {

                            return <StyledTableRow key={player.name} sx={{pt: 0, pb: 0}}>

                                <StyledTableCell sx={{pl: 3, pb: 0.5, pt: 0.5}}>
                                    <Typography
                                        overflow="hidden"
                                        sx={{
                                            width: screenSize === ScreenSize.Mobile ? "10vw" : "20vw",
                                            whiteSpace: "no-wrap"
                                        }}
                                        textOverflow="ellipsis"
                                        fontSize={screenSize === ScreenSize.Mobile ? 12 : 16}
                                        noWrap
                                    >
                                        {<Link href={`/dl/details/${player.id}`}>{player.name}</Link>}
                                    </Typography>

                                </StyledTableCell>

                                {getModeTemplate(player, gameMode).map((value: number | string) => {
                                    return <StyledTableCell sx={{pl: 0, ml: 2, pt: 0.5, pb: 0.5}}>
                                        <Typography
                                            overflow="hidden"
                                            align="center"
                                            sx={{
                                                width: screenSize === ScreenSize.Mobile ? "16vw" : "8vw",
                                                whiteSpace: "no-wrap"
                                            }}
                                            fontSize={screenSize === ScreenSize.Mobile ? 12 : 16}
                                            textOverflow="ellipsis"
                                            noWrap
                                        >
                                            {value}
                                        </Typography>
                                    </StyledTableCell>
                                })}

                            </StyledTableRow>
                        })}
                    </TableBody>
                </TableContainer>

                { screenSize !== ScreenSize.Mobile && (
                    // @ts-ignore
                    <Typography variant="overline" sx={{filter: "drop-shadow(0rem 0rem 1rem black)", width: 100, textAlign: "right"}}>{`${name}:\t${team.score}`}</Typography>
                )}

            </Stack>
        </CardContent>
    </Card>

}


const DeadlockedGameDetails = () => {

    let DEFAULT_GAME_PROPS: GameDetailProps = {
        version: 0,
        id: 0,
        name: "",
        skill_level: 1,
        starting_players: [""],
        rules: {
            chargeboots: false,
            weapons: {
                dual_vipers: false, magma_cannon: false, the_arbiter: false, fusion_rifle: false, b6_obliterator: false, hunter_mine_launcher: false, scorpion_flail: false, holoshield_launcher: false
            },
            vehicles: {
                hoverbike: false, puma: false, hovership: false, landstalker: false
            }
        },
        map: "",
        game_mode: "",
        start_time: "",
        end_time: "",
        teams: {
            Blue: []
        }
    }

    const [gameData, setGameData] = useState(DEFAULT_GAME_PROPS);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const { gameId } = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const weaponIcons = {
        dualVipers: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_27.png",
        magmaCannon: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_31.png",
        theArbiter: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_30.png",
        fusionRifle: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_32.png",
        hunterMineLauncher: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_28.png",
        b6Obliterator: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_24.png",
        holoshieldLauncher: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_25.png",
        scorpionFlail: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_26.png",
    }

    const vehicleIcons = {
        hoverbike: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_137.png",
        puma: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_138.png",
        hovership: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_139.png",
        landstalker: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_141.png",
    }


    useEffect(() => {
        setLoading(true);
        setNotFound(false);
        axios.get(`http://dev.codeprojects.net:9000/api/game/details/${gameId}`).then((response)=> {
            setGameData(response.data);
            setNotFound(false);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.log(error);
            if (error.response.status === 404) {
                setNotFound(true);
            }
        });
    }, [gameId])


    if (notFound) {
        return <Page>
            <Backbar />
            <NotFoundCard message="Sorry, looks like this game doesn't exist!" />
        </Page>
    }

    const rules: GameRulesProps = gameData.rules;

    let orderedTeams: any[] = [];

    Object.keys(gameData?.teams).map((teamName) => {
        let team = gameData?.teams[teamName];
        // @ts-ignore
        team.name = teamName;
        orderedTeams.push(team)
    })

    // @ts-ignore
    orderedTeams.sort((team1, team2) => {
        // @ts-ignore
        return team2.score - team1.score;
    })

    console.log(orderedTeams);


    return <Page>

        <Box sx={{marginLeft: screenSize === ScreenSize.Mobile ? 2 : 0}}>
            <Backbar />
        </Box>

        <Card sx={{width: screenSize === ScreenSize.Mobile ? "100vw" : "80vw"}}>
            <CardContent sx={{pl: screenSize === ScreenSize.Mobile ? 2 : 2,  pr: screenSize === ScreenSize.Mobile ? 2 : 2}}>
                <Stack direction="row">
                    <Stack direction="column" justifyContent="center">
                        <SportsEsportsIcon />
                    </Stack>
                    <Box sx={{marginRight: 2}} />
                    <LoadableValue label={gameData?.name} loading={loading} />
                </Stack>
                <Divider variant="inset" sx={{ marginTop: 1, marginBottom: 1}} />

                <Stack direction={screenSize === ScreenSize.Mobile ? "column" : "row"} justifyContent="space-between">

                    <Box sx={{align: screenSize === ScreenSize.Mobile ? "center" : "left"}}>
                        <LoadableRow label="Game Mode" value={gameData.game_mode} loading={loading} />
                        <LoadableRow label="Map" value={gameData?.map} loading={loading} />
                    </Box>

                    <Box sx={{marginBottom: 2}} />

                    <Stack direction="row" sx={{pl: 0, ml: 0}} justifyContent={screenSize === ScreenSize.Mobile ? "space-between" : "flex-start"}>
                        <Stack direction="column" justifyContent="flex-start" sx={{pt: 1}}>
                            <Typography variant="overline" textAlign="left">Weapons</Typography>
                            <Stack direction="row" justifyContent="flex-start">
                                <img src={weaponIcons.dualVipers} alt="Dual Vipers" style={{opacity: rules.weapons.dual_vipers ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={weaponIcons.magmaCannon} alt="Magma Cannon" style={{opacity: rules.weapons.magma_cannon ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={weaponIcons.theArbiter} alt="The Arbiter" style={{opacity: rules.weapons.the_arbiter ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={weaponIcons.fusionRifle} alt="Fusion Rifle" style={{opacity: rules.weapons.fusion_rifle ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                            </Stack>
                            <Stack direction="row" justifyContent="flex-start">
                                <img src={weaponIcons.hunterMineLauncher} alt="Hunter Mine Launcher" style={{opacity: rules.weapons.hunter_mine_launcher ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={weaponIcons.b6Obliterator} alt="B6 Obliterator" style={{opacity: rules.weapons.b6_obliterator ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={weaponIcons.holoshieldLauncher} alt="Holoshield Launcher" style={{opacity: rules.weapons.holoshield_launcher ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={weaponIcons.scorpionFlail} alt="Scorpion Flail" style={{opacity: rules.weapons.scorpion_flail ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                            </Stack>
                        </Stack>
                        <Box sx={{mr: 5.5}}/>
                        <Stack direction="column" justifyContent="flex-start" sx={{pt: 1}}>
                            <Typography variant="overline" textAlign="left">Vehicles</Typography>
                            <Stack direction="row" justifyContent="flex-start">
                                <img src={vehicleIcons.hoverbike} alt="Hoverbike" style={{opacity: rules.vehicles.hoverbike ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={vehicleIcons.puma} alt="Puma" style={{opacity: rules.vehicles.puma ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                            </Stack>
                            <Stack direction="row" justifyContent="flex-start">
                                <img src={vehicleIcons.hovership} alt="Hovership" style={{opacity: rules.vehicles.hovership ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                                <img src={vehicleIcons.landstalker} alt="Landstalker" style={{opacity: rules.vehicles.landstalker ? 1.0 : 0.15, margin: 2}} width={32} height={32} />
                            </Stack>
                        </Stack>
                    </Stack>

                </Stack>

                <Box sx={{marginBottom: 2}} />

                <Divider><Typography fontSize={24}>Scoreboard</Typography></Divider>
                <Box>
                    { orderedTeams.map((key) => {
                        return <TeamCard
                            gameMode={gameData?.game_mode}
                            key={key}
                            team={key}
                            name={key.name}
                        />
                    })}
                </Box>

            </CardContent>
        </Card>

    </Page>;
}

export default DeadlockedGameDetails;
