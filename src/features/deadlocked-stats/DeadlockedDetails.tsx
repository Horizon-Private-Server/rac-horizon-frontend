import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, Tab, Tabs, CardContent, Card, CardActionArea, Divider, Button, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate, useParams } from "react-router-dom";


import { styled } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles"

import dlBackground from "../../assets/img/dl-background.jpg";

import { Stack } from "@mui/system";

import axios from "axios";
import { Backbar } from "../../components/base/Backbar";

import Skeleton from '@mui/material/Skeleton';

import PersonIcon from '@mui/icons-material/Person';
import { computeSkillLevel } from "../../components/base/Functions";
import { PlayerDetailProps } from "../../components/base/Interfaces";
import { LoadableRow } from "../../components/base/LoadableRow";

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

const DeadlockedDetails = () => {

    let DEFAULT_PLAYER_PROPS: PlayerDetailProps = {
        id: 0,
        name: "",
        friend_count: 0,
        stats: {
            overall: { rank: 0, wins: 0, losses: 0, disconnects: 0, kills: 0, deaths: 0, games_played: 0, squats: 0 },
            deathmatch: { rank: 0, wins: 0, losses: 0, kills: 0, deaths: 0, },
            koth: { rank: 0, wins: 0, losses: 0, kills: 0, deaths: 0, time: 0, },
            ctf: { rank: 0, wins: 0, losses: 0, kills: 0, deaths: 0, flags: 0, },
            juggernaut: { rank: 0, wins: 0, losses: 0, kills: 0, deaths: 0, time: 0, },
            conquest: { rank: 0, wins: 0, losses: 0, kills: 0, deaths: 0, nodes: 0, },
            weapon: {
                wrench: { kills: 0, deaths: 0 },
                dual_vipers: { kills: 0, deaths: 0 },
                magma_cannon: { kills: 0, deaths: 0 },
                the_arbiter: { kills: 0, deaths: 0 },
                fusion_rifle: { kills: 0, deaths: 0 },
                hunter_mine_launcher: { kills: 0, deaths: 0 },
                b6_obliterator: { kills: 0, deaths: 0 },
                scorpion_flail: { kills: 0, deaths: 0 },
                holoshield_launcher: { kills: 0, deaths: 0 }
            },
            vehicle: { kills: 0, squats: 0 },
            snd: { rank: 0, wins: 0, losses: 0, games_played: 0, kills: 0, deaths: 0, plants: 0, defuses: 0, ninja_defuses: 0, wins_attacking: 0, wins_defending: 0, time_played: 0 },
            payload: { rank: 0, wins: 0, losses: 0, games_played: 0, kills: 0, deaths: 0, points: 0, kills_while_hot: 0, kills_on_hot: 0, time_played: 0, },
            spleef: { rank: 0, wins: 0, losses: 0, games_played: 0, rounds_played: 0, points: 0, time_played: 0, boxes_broken: 0, },
            infected: { rank: 0, wins: 0, losses: 0, games_played: 0, kills: 0, deaths: 0, infections: 0, times_infected: 0, time_played: 0, wins_as_survivor: 0, wins_as_first_infected: 0, },
            gungame: { rank: 0, wins: 0, losses: 0, games_played: 0, kills: 0, deaths: 0, demotions: 0, times_demoted: 0, times_promoted: 0, time_played: 0, },
            climber: { rank: 0, wins: 0, losses: 0, games_played: 0, high_score: 0, time_played: 0, },
            survival: { rank: 0, games_played: 0, time_played: 0, kills: 0, deaths: 0, revives: 0, times_revived: 0, xp: 0,
                high_scores: { couch_potato: 0, contestant: 0, gladiator: 0, hero: 0, exterminator: 0, },
                weapon_kills: { wrench: 0, dual_vipers: 0, magma_cannon: 0, the_arbiter: 0, fusion_rifle: 0, hunter_mine_launcher: 0, b6_obliterator: 0, scorpion_flail: 0, },
            },
            training: { rank: 0, games_played: 0, time_played: 0, total_kills: 0,
                fusion: { best_points: 0, best_time: 0, kills: 0, hits: 0, misses: 0, accuracy: 0, best_combo: 0, },
                cycle: { best_points: 0, best_combo: 0, kills: 0, deaths: 0, fusion_hits: 0, fusion_misses: 0, fusion_accuracy: 0, },
            }
        },
    } 

    const classes = useStyles();

    const [playerData, setPlayerData] = useState(DEFAULT_PLAYER_PROPS);
    const [loading, setLoading] = useState(false);

    const { userId } = useParams();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);


    useEffect(() => {
        setLoading(true);
        axios.get(`http://dev.codeprojects.net:9000/api/details/${userId}`).then((response)=> {
            setPlayerData(response.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [userId])

    let wlr = playerData.stats.overall.wins / playerData.stats.overall.losses;
    if (isNaN(wlr)) {
        wlr = 0.00;
    }

    let kdr = playerData.stats.overall.kills / playerData.stats.overall.deaths;
    if (isNaN(kdr)) {
        kdr = 0.00;
    }

    return <Page className={classes.dlBackground}>
        <Backbar />

        <Card sx={{width: "80vw"}}>
            <CardContent>
                <Stack direction="row">
                    <Stack direction="column" justifyContent={"center"}>
                        <PersonIcon />
                    </Stack>
                    <Typography fontSize={28} fontWeight={"bold"} marginLeft={2}>
                        {playerData?.name}
                    </Typography>
                </Stack>
                <Divider variant="inset" sx={{ marginTop: 1, marginBottom: 1}} />

                <LoadableRow label="Overall Rank" value={playerData.stats.overall.rank} loading={loading} />
                <LoadableRow label="Skill Level" value={computeSkillLevel(playerData.stats.overall.rank)} loading={loading} />
                <LoadableRow 
                    label="Wins/Losses" 
                    value={`${playerData.stats.overall.wins} / ${playerData.stats.overall.losses} - (${wlr.toFixed(2)})`} 
                    loading={loading} 
                />

                <LoadableRow 
                    label="Kills/Deaths" 
                    value={`${playerData.stats.overall.kills} / ${playerData.stats.overall.deaths} - (${kdr.toFixed(2)})`} 
                    loading={loading} 
                />

                <LoadableRow label="Games Played" value={playerData.stats.overall.games_played} loading={loading} />

            </CardContent>
        </Card>

    </Page>;
}

export default DeadlockedDetails;