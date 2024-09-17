import React, {useState, useEffect, Dispatch} from "react";
import Page from "../../components/base/Page";
import { Typography, CardContent, Card, Divider} from "@mui/material";

import useWindowDimensions, { computeDeviceScale } from "../../components/utils/WindowDimensions";

import { useParams } from "react-router-dom";

import { makeStyles, createStyles } from "@mui/styles"

import dlBackground from "../../assets/img/dl-background.jpg";

import { Stack } from "@mui/system";


import PersonIcon from '@mui/icons-material/Person';
import {computeSkillLevel} from "../../components/base/Functions";
import { LoadableRow } from "../../components/base/LoadableRow";
import {
    DeadlockedPlayerDetails,
    Optional,
    Pagination,
    StatOffering
} from "../../utils/Interfaces";
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import StatsChart from "./StatsChart";
import {getHandler} from "../../utils/Requests";
import {AxiosResponse} from "axios";
import {AnyAction} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../app/hooks";

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

    const classes = useStyles();

    const [player, setPlayer] = useState<Optional<DeadlockedPlayerDetails>>();
    const [loading, setLoading] = useState<boolean>(false);

    const { horizonId } = useParams();

    const dispatch: Dispatch<AnyAction> = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    useEffect(() => {
        getHandler<DeadlockedPlayerDetails>(
            `/api/dl/stats/player/${horizonId}`,
            dispatch,
            (response: AxiosResponse<DeadlockedPlayerDetails, any>) => {
                setPlayer(response.data);
            },
            () => {},
            setLoading
        );
    }, [horizonId])

    let wlr = (player?.overall_stats.wins ?? 1) / (player?.overall_stats.losses ?? 1);
    if (isNaN(wlr)) {
        wlr = 0.00;
    }

    let kdr = (player?.overall_stats.kills ?? 1) / (player?.overall_stats.deaths ?? 1);
    if (isNaN(kdr)) {
        kdr = 0.00;
    }

    return <Page className={classes.dlBackground}>

        <HorizonBreadcrumbs
            paths={[
                {text: "Deadlocked", route: "/deadlocked"},
                {text: "Stats", route: "/deadlocked/stats"},
                {text: "Player Details", route: "/deadlocked/stats/details"}
            ]}
        />

        <Card sx={{width: "80vw"}}>
            <CardContent>
                <Stack direction="row">
                    <Stack direction="column" justifyContent="center">
                        <PersonIcon />
                    </Stack>
                    <Typography fontSize={28} fontWeight="bold" marginLeft={2}>
                        {player?.username}
                    </Typography>
                </Stack>
                <Divider variant="inset" sx={{ marginTop: 1, marginBottom: 1}} />

                <LoadableRow label="Overall Rank" value={player?.overall_stats.rank ?? 0} loading={loading} />
                <LoadableRow label="Skill Level" value={computeSkillLevel(player?.overall_stats.rank ?? 0)} loading={loading} />
                <LoadableRow 
                    label="Wins/Losses" 
                    value={`${player?.overall_stats.wins ?? 0} / ${player?.overall_stats.losses ?? 0} - (${wlr.toFixed(2)})`}
                    loading={loading} 
                />

                <LoadableRow 
                    label="Kills/Deaths" 
                    value={`${player?.overall_stats.kills ?? 0} / ${player?.overall_stats.deaths ?? 0} - (${kdr.toFixed(2)})`}
                    loading={loading} 
                />

                <LoadableRow label="Games Played" value={player?.overall_stats.games_played ?? 0} loading={loading} />

            </CardContent>
        </Card>

        <Card sx={{width: "80vw"}}>
            <CardContent>
                <StatsChart
                    deathmatchRank={player?.deathmatch_stats.rank ?? 0}
                    conquestRank={player?.conquest_stats.rank ?? 0}
                    kothRank={player?.koth_stats.rank ?? 0}
                    ctfRank={player?.ctf_stats.rank ?? 0}
                    juggernautRank={player?.juggernaut_stats.rank ?? 0}
                />
            </CardContent>
        </Card>

    </Page>;
}

export default DeadlockedDetails;