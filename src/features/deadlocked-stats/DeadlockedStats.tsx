import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, Tab, Tabs, CardContent, Card, CardActionArea, Divider, Button, Link, Breadcrumbs } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate, useLocation } from "react-router-dom";

import { a11yProps, TabPanel } from "../../components/base/TabPanel";

import { makeStyles, createStyles } from "@mui/styles";

import dlBackground from "../../assets/img/dl-background.jpg";

import { Stack } from "@mui/system";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpIcon from "@mui/icons-material/Help";
import StartIcon from '@mui/icons-material/Start';
import axios from "axios";

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

export interface StatCardProps {
    label: string;
    offerings: string[];
}

const StatCard = (props: StatCardProps) => {

    const {label, offerings} = props;

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    function processName(name: string) {
        name = name.replaceAll("ACCOUNT_", " ").replaceAll("CUSTOM_", "").replaceAll("STAT_", "").replaceAll("_", " ")
        name = name.replaceAll("D1", "COUCH POTATO").replaceAll("D2", "CONTESTANT").replaceAll("D3", "GLADIATOR").replaceAll("D4", "HERO").replaceAll("D5", "EXTERMINATOR");

        const categories: string[] = ["OVERALL ", "DEATHMATCH ", "CTF ", "KOTH ", "JUGGERNAUT ", "CONQUEST ", "SURVIVAL ", "SND ", "PAYLOAD ", "TRAINING CYCLE ",  "TRAINING FUSION ", "CLIMBER ", "SPLEEF ", "GUNGAME ", "INFECTED "]
        categories.map((category) => name = name.replaceAll(category, ""));
        return name;
    }

    return <Card sx={{margin: 2}}>

        <CardContent>
            <Stack direction={"row"} justifyContent={"flex-start"}>
                <Stack direction={"column"} justifyContent={"center"}>
                    <EmojiEventsIcon />
                </Stack>
                <Box sx={{marginRight: 3}} />
                <Typography fontSize={24}>{label}</Typography>
            </Stack>
            <Divider variant="inset" sx={{marginTop: 1, marginBottom: 1}} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    maxWidth: screenSize === ScreenSize.Desktop ? "18vw" : screenSize === ScreenSize.Tablet ? "50vw" : "70vw",
                    minWidth: screenSize === ScreenSize.Desktop ? "18vw" : screenSize === ScreenSize.Tablet ? "50vw" : "70vw",
                    width: screenSize === ScreenSize.Desktop ? "18vw" : screenSize === ScreenSize.Tablet ? "50vw" : "70vw",
                }}
            >
                { offerings.map((offering) => {
                    return <Button
                        key={offering}
                        onClick={() => navigate(`/dl/leaderboard/${offering}`)}
                        sx={{justifyContent: "flex-start"}}
                    >
                        {processName(offering)}
                    </Button>
                })}
            </Box>

        </CardContent>
    </Card>
}

const DeadlockedStats = () => {

    const classes = useStyles();

    const [offerings, setOfferings] = useState([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);


    useEffect(() => {
        axios.get("http://dev.codeprojects.net:9000/api/offerings").then((response)=> {
            console.log(response.data);
            setOfferings(response.data);
        }).catch()
    }, [])

    let cards = [
        {label: "Overall", offerings: ["ACCOUNT_STAT_OVERALL_RANK", "ACCOUNT_STAT_WINS", "ACCOUNT_STAT_LOSSES", "ACCOUNT_STAT_DISCONNECTS", "ACCOUNT_STAT_KILLS", "ACCOUNT_STAT_DEATHS", "ACCOUNT_STAT_GAMES_PLAYED", "ACCOUNT_STAT_SQUATS"]},
        {label: "King of the Hill", offerings: ["ACCOUNT_STAT_KOTH_RANK", "ACCOUNT_STAT_KOTH_WINS", "ACCOUNT_STAT_KOTH_LOSSES", "ACCOUNT_STAT_KOTH_KILLS", "ACCOUNT_STAT_KOTH_DEATHS", "ACCOUNT_STAT_KOTH_TIME"]},
        {label: "Capture the Flag", offerings: ["ACCOUNT_STAT_CTF_RANK", "ACCOUNT_STAT_CTF_WINS", "ACCOUNT_STAT_CTF_LOSSES", "ACCOUNT_STAT_CTF_KILLS", "ACCOUNT_STAT_CTF_DEATHS", "ACCOUNT_STAT_CTF_FLAGS_CAPTURED"]},
        {label: "Deathmatch", offerings: ["ACCOUNT_STAT_DEATHMATCH_RANK", "ACCOUNT_STAT_DEATHMATCH_WINS", "ACCOUNT_STAT_DEATHMATCH_LOSSES", "ACCOUNT_STAT_DEATHMATCH_KILLS", "ACCOUNT_STAT_DEATHMATCH_DEATHS"]},
        {label: "Juggernaut", offerings: ["ACCOUNT_STAT_JUGGERNAUT_RANK", "ACCOUNT_STAT_JUGGERNAUT_WINS", "ACCOUNT_STAT_JUGGERNAUT_LOSSES", "ACCOUNT_STAT_JUGGERNAUT_KILLS", "ACCOUNT_STAT_JUGGERNAUT_DEATHS", "ACCOUNT_STAT_JUGGERNAUT_TIME"]},
        {label: "Conquest", offerings: ["ACCOUNT_STAT_CONQUEST_RANK", "ACCOUNT_STAT_CONQUEST_WINS", "ACCOUNT_STAT_CONQUEST_LOSSES", "ACCOUNT_STAT_CONQUEST_KILLS", "ACCOUNT_STAT_CONQUEST_DEATHS", "ACCOUNT_STAT_CONQUEST_NODES_TAKEN"]},
        {label: "Weapons", offerings: ["ACCOUNT_STAT_WRENCH_KILLS", "ACCOUNT_STAT_WRENCH_DEATHS", "ACCOUNT_STAT_DUAL_VIPER_KILLS", "ACCOUNT_STAT_DUAL_VIPER_DEATHS", "ACCOUNT_STAT_MAGMA_CANNON_KILLS", "ACCOUNT_STAT_MAGMA_CANNON_DEATHS", "ACCOUNT_STAT_ARBITER_KILLS", "ACCOUNT_STAT_ARBITER_DEATHS", "ACCOUNT_STAT_FUSION_RIFLE_KILLS", "ACCOUNT_STAT_FUSION_RIFLE_DEATHS", "ACCOUNT_STAT_HUNTER_MINE_KILLS", "ACCOUNT_STAT_HUNTER_MINE_DEATHS", "ACCOUNT_STAT_B6_OBLITERATOR_KILLS", "ACCOUNT_STAT_B6_OBLITERATOR_DEATHS", "ACCOUNT_STAT_SCORPION_FLAIL_KILLS", "ACCOUNT_STAT_SCORPION_FLAIL_DEATHS", "ACCOUNT_STAT_HOLOSHIELD_KILLS", "ACCOUNT_STAT_HOLOSHIELD_DEATHS"]},
        {label: "Survival", offerings: ["CUSTOM_STAT_SURVIVAL_RANK", "CUSTOM_STAT_SURVIVAL_GAMES_PLAYED", "CUSTOM_STAT_SURVIVAL_TIME_PLAYED", "CUSTOM_STAT_SURVIVAL_KILLS", "CUSTOM_STAT_SURVIVAL_DEATHS", "CUSTOM_STAT_SURVIVAL_REVIVES", "CUSTOM_STAT_SURVIVAL_TIMES_REVIVED", "CUSTOM_STAT_SURVIVAL_D1_HIGH_SCORE", "CUSTOM_STAT_SURVIVAL_D2_HIGH_SCORE", "CUSTOM_STAT_SURVIVAL_D3_HIGH_SCORE", "CUSTOM_STAT_SURVIVAL_D4_HIGH_SCORE", "CUSTOM_STAT_SURVIVAL_D5_HIGH_SCORE", "CUSTOM_STAT_SURVIVAL_WRENCH_KILLS", "CUSTOM_STAT_SURVIVAL_DUAL_VIPER_KILLS", "CUSTOM_STAT_SURVIVAL_MAGMA_CANNON_KILLS", "CUSTOM_STAT_SURVIVAL_ARBITER_KILLS", "CUSTOM_STAT_SURVIVAL_FUSION_RIFLE_KILLS", "CUSTOM_STAT_SURVIVAL_MINE_LAUNCHER_KILLS", "CUSTOM_STAT_SURVIVAL_B6_OBLITERATOR_KILLS", "CUSTOM_STAT_SURVIVAL_SCORPION_FLAIL_KILLS", "CUSTOM_STAT_SURVIVAL_XP"]},
        {label: "Vehicles", offerings: ["ACCOUNT_STAT_ROADKILLS", "ACCOUNT_STAT_VEHICLE_SQUATS"]},
        {label: "Search & Destroy", offerings: ["CUSTOM_STAT_SND_RANK", "CUSTOM_STAT_SND_WINS", "CUSTOM_STAT_SND_LOSSES", "CUSTOM_STAT_SND_GAMES_PLAYED", "CUSTOM_STAT_SND_KILLS", "CUSTOM_STAT_SND_DEATHS", "CUSTOM_STAT_SND_PLANTS", "CUSTOM_STAT_SND_DEFUSES", "CUSTOM_STAT_SND_NINJA_DEFUSES", "CUSTOM_STAT_SND_WINS_ATTACKING", "CUSTOM_STAT_SND_WINS_DEFENDING", "CUSTOM_STAT_SND_TIME_PLAYED"]},
        {label: "Payload", offerings: ["CUSTOM_STAT_PAYLOAD_RANK", "CUSTOM_STAT_PAYLOAD_WINS", "CUSTOM_STAT_PAYLOAD_LOSSES", "CUSTOM_STAT_PAYLOAD_GAMES_PLAYED", "CUSTOM_STAT_PAYLOAD_KILLS", "CUSTOM_STAT_PAYLOAD_DEATHS", "CUSTOM_STAT_PAYLOAD_POINTS", "CUSTOM_STAT_PAYLOAD_KILLS_WHILE_HOT", "CUSTOM_STAT_PAYLOAD_KILLS_ON_HOT", "CUSTOM_STAT_PAYLOAD_TIME_PLAYED"]},
        {label: "Training (Cycle)", offerings: ["CUSTOM_STAT_TRAINING_RANK", "CUSTOM_STAT_TRAINING_GAMES_PLAYED", "CUSTOM_STAT_TRAINING_TIME_PLAYED", "CUSTOM_STAT_TRAINING_TOTAL_KILLS", "CUSTOM_STAT_TRAINING_CYCLE_BEST_POINTS", "CUSTOM_STAT_TRAINING_CYCLE_BEST_COMBO", "CUSTOM_STAT_TRAINING_CYCLE_KILLS", "CUSTOM_STAT_TRAINING_CYCLE_DEATHS", "CUSTOM_STAT_TRAINING_CYCLE_FUSION_HITS", "CUSTOM_STAT_TRAINING_CYCLE_FUSION_MISSES", "CUSTOM_STAT_TRAINING_CYCLE_FUSION_ACCURACY"]},
        {label: "Training (Fusion)", offerings: ["CUSTOM_STAT_TRAINING_RANK", "CUSTOM_STAT_TRAINING_GAMES_PLAYED", "CUSTOM_STAT_TRAINING_TIME_PLAYED", "CUSTOM_STAT_TRAINING_TOTAL_KILLS", "CUSTOM_STAT_TRAINING_FUSION_BEST_POINTS", "CUSTOM_STAT_TRAINING_FUSION_BEST_TIME", "CUSTOM_STAT_TRAINING_FUSION_KILLS", "CUSTOM_STAT_TRAINING_FUSION_HITS", "CUSTOM_STAT_TRAINING_FUSION_MISSES", "CUSTOM_STAT_TRAINING_FUSION_ACCURACY", "CUSTOM_STAT_TRAINING_FUSION_BEST_COMBO"]},
        {label: "Infinite Climber", offerings: ["CUSTOM_STAT_CLIMBER_RANK", "CUSTOM_STAT_CLIMBER_WINS", "CUSTOM_STAT_CLIMBER_LOSSES", "CUSTOM_STAT_CLIMBER_GAMES_PLAYED", "CUSTOM_STAT_CLIMBER_HIGH_SCORE", "CUSTOM_STAT_CLIMBER_TIME_PLAYED"]},
        {label: "Spleef", offerings: ["CUSTOM_STAT_SPLEEF_RANK", "CUSTOM_STAT_SPLEEF_WINS", "CUSTOM_STAT_SPLEEF_LOSSES", "CUSTOM_STAT_SPLEEF_GAMES_PLAYED", "CUSTOM_STAT_SPLEEF_ROUNDS_PLAYED", "CUSTOM_STAT_SPLEEF_POINTS", "CUSTOM_STAT_SPLEEF_TIME_PLAYED", "CUSTOM_STAT_SPLEEF_BOXES_BROKEN"]},
        {label: "Gun Game", offerings: ["CUSTOM_STAT_GUNGAME_RANK", "CUSTOM_STAT_GUNGAME_WINS", "CUSTOM_STAT_GUNGAME_LOSSES", "CUSTOM_STAT_GUNGAME_GAMES_PLAYED", "CUSTOM_STAT_GUNGAME_KILLS", "CUSTOM_STAT_GUNGAME_DEATHS", "CUSTOM_STAT_GUNGAME_DEMOTIONS", "CUSTOM_STAT_GUNGAME_TIMES_DEMOTED", "CUSTOM_STAT_GUNGAME_TIMES_PROMOTED", "CUSTOM_STAT_GUNGAME_TIME_PLAYED"]},
        {label: "Infected", offerings: ["CUSTOM_STAT_INFECTED_RANK", "CUSTOM_STAT_INFECTED_WINS", "CUSTOM_STAT_INFECTED_LOSSES", "CUSTOM_STAT_INFECTED_GAMES_PLAYED", "CUSTOM_STAT_INFECTED_KILLS", "CUSTOM_STAT_INFECTED_DEATHS", "CUSTOM_STAT_INFECTED_INFECTIONS", "CUSTOM_STAT_INFECTED_TIMES_INFECTED", "CUSTOM_STAT_INFECTED_TIME_PLAYED", "CUSTOM_STAT_INFECTED_WINS_AS_SURVIVOR", "CUSTOM_STAT_INFECTED_WINS_AS_FIRST_INFECTED"]},
    ]

    return <Page className={classes.dlBackground}>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingLeft: 7.5}}>
            <Link underline="hover" color="inherit" href="/dl">
                Deadlocked
            </Link>
            <Typography color="text.primary">Leaderboards</Typography>
        </Breadcrumbs>
        
        <Box
            display="flex"
            flexDirection={screenSize === ScreenSize.Desktop ? "row" : "column"}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
            sx={{pl: 5, pb: 5, pr: 5}}
        >

            { cards.map((card) => { return <StatCard label={card.label} offerings={card.offerings} key={card.label} />; })}

        </Box>

    </Page>;
}

export default DeadlockedStats;