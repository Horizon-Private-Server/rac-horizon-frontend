import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, Tab, Tabs, CardContent, Card, CardActionArea, Divider, Button, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Link, Breadcrumbs, Autocomplete, TextField } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate, useLocation, useParams } from "react-router-dom";

import { a11yProps, TabPanel } from "../../components/base/TabPanel";

import { styled } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles"

import dlBackground from "../../assets/img/dl-background.jpg";

import { Stack } from "@mui/system";

import { tableCellClasses } from '@mui/material/TableCell';

import ArticleIcon from '@mui/icons-material/Article';
import HelpIcon from "@mui/icons-material/Help";
import StartIcon from '@mui/icons-material/Start';
import axios from "axios";
import { Backbar } from "../../components/base/Backbar";
import { computeSkillLevel, formatTime } from "../../components/base/Functions";
import { Pagination } from "../../components/base/Pagination";
import { FilterProps, GameRemoteListProps, GameRulesProps } from "../../components/base/Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { SectionCard, SectionCardProps } from "../../components/base/SectionCard";

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

interface GameModeCardProps {
    modeName: string;
    modeDescription: string;
    modeDetailsRoute: string;
    modeImage: string;
}

const GameModeCard2 = (props: GameModeCardProps) => {

    const { modeName, modeDetailsRoute, modeImage, modeDescription } = props;

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);


    return <Card  sx={{p: 0, zIndex: 1}}>
        
            <CardActionArea
                onClick={() => navigate(modeDetailsRoute)}
            >
                <CardContent sx={{ p: 0}}>
                    <Box
                        sx={{
                            WebkitMaskImage: "linear-gradient(65deg, transparent 20%, white)",
                            width: 500,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            right: 0
                        }}
                    >
                        <Box sx={{
                            backgroundImage: `url(${modeImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "60px -40px",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                        }} />
                    </Box>
                    <Box
                        sx={{
                            p: 3,
                            width: "70vw",
                            height: 200
                        }}
                    >
                        <Typography variant="overline" fontSize={20} fontWeight="bold">{modeName}</Typography>
                        <Typography sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{modeDescription}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

    </Card>
}

const GameModeCard = (props: GameModeCardProps) => {

    const { modeName, modeDetailsRoute, modeImage, modeDescription } = props;

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);


    return <Card  sx={{p: 0, zIndex: 1}}>
        
            <CardActionArea
                onClick={() => navigate(modeDetailsRoute)}
            >
                <CardContent sx={{ p: 0}}>
                    <Box
                        sx={{
                            WebkitMaskImage: "linear-gradient(65deg, transparent 20%, white)",
                            width: 500,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            right: 0
                        }}
                    >
                        <Box sx={{
                            backgroundImage: `url(${modeImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                        }} />
                    </Box>
                    <Box
                        sx={{
                            p: 3,
                            width: "70vw",
                            height: 200
                        }}
                    >
                        <Typography variant="overline" fontSize={20} fontWeight="bold">{modeName}</Typography>
                        <Typography sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{modeDescription}</Typography>
                    </Box>
                </CardContent>
            </CardActionArea>

    </Card>
}

const DeadlockedSurvival = () => {

    const classes = useStyles();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate = useNavigate();

    const survivalMaps: GameModeCardProps[] = [
        {
            modeName: "Orxon",
            modeDescription: 
                `The first map built for survival.
                This toxic mining facility might be abandoned, but you aren't alone.
                Fight wave after wave of lethal enemies and delve into deep into the toxic gas to uncover the secrets within.`,
            modeImage: "https://www.giantbomb.com/a/uploads/original/0/1717/1080843-orxon_surface.jpg",
            modeDetailsRoute: "/dl/survial/orxon"
        }
    ]



    return <Page className={classes.dlBackground}>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingLeft: 6}}>
            <Link underline="hover" color="inherit" href="/dl">
                Deadlocked
            </Link>
            <Typography color="text.primary">Survival</Typography>
        </Breadcrumbs>

        <Box sx={{p: 6}}>
            <GameModeCard2
                modeName="General Guide"
                modeDescription={
                    `Survival is the most ambitious game mode developed by Horzion for Deadlocked.
                    There are a lot of mechanics and map-specific features, but there are several core-mechanics that all maps share.
                    This guide is designed to help you get familiar the core gameplay.`
                }
                modeDetailsRoute="/dl/survival/overview"
                modeImage="https://static.wikia.nocookie.net/ratchet/images/0/08/Robot_zombie_promo_render.png"
            />
        </Box>

        <Typography variant="h4" marginBottom={2} marginLeft={6}>Survival Maps</Typography>
        <Divider sx={{ml: 6, mr: 6}} />

        <Box sx={{p: 6}}>
            { survivalMaps.map((gameMode: GameModeCardProps) => {
                return <>
                    <GameModeCard 
                        modeName={gameMode.modeName}
                        modeDescription={gameMode.modeDescription}
                        modeDetailsRoute={gameMode.modeDetailsRoute}
                        modeImage={gameMode.modeImage}
                    />
                    <Box sx={{mb: 2 }}/>
                </>
            })}
        </Box>



    </Page>;
}

export default DeadlockedSurvival;