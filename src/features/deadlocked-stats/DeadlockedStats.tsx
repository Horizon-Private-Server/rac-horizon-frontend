import React, {useState, useEffect, Dispatch} from "react";

import {
    Typography,
    Box,
    CardContent,
    Card,
    Divider,
    Button,
    Link,
    Breadcrumbs,
    CircularProgress
} from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import { useNavigate } from "react-router-dom";

import { Stack } from "@mui/system";

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {AxiosResponse} from "axios";
import {getHandler} from "../../utils/Requests";
import {Pagination, StatOffering} from "../../utils/Interfaces";
import {useAppDispatch} from "../../app/hooks";
import {AnyAction} from "@reduxjs/toolkit";
import DeadlockedBacking from "../deadlocked/DeadlockedBacking";


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

    return <Card sx={{margin: 2}}>

        <CardContent>
            <Stack direction="row" justifyContent="flex-start">
                <Stack direction="column" justifyContent="center">
                    <EmojiEventsIcon />
                </Stack>
                <Box sx={{marginRight: 3}} />
                <Typography fontSize={16} variant="overline">{label}</Typography>
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
                        onClick={() => navigate(`/deadlocked/leaderboard/${label}/${offering}`)}
                        sx={{justifyContent: "flex-start"}}
                    >
                        {offering.replaceAll("_", " ")}
                    </Button>
                })}
            </Box>

        </CardContent>
    </Card>
}

const DeadlockedStats = () => {

    const [statOfferings, setStatOfferings] = useState<StatOffering[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const dispatch: Dispatch<AnyAction> = useAppDispatch();


    useEffect(() => {

        getHandler<Pagination<StatOffering>>(
            "/api/dl/stats/offerings",
            dispatch,
            (response: AxiosResponse<Pagination<StatOffering>, any>) => {
                setStatOfferings(response.data.results);
            },
            () => {},
            setLoading
        );

    }, [dispatch])


    function convertOfferingsToCards() {

        let cards: {label: string, offerings: string[]}[] = [];

        statOfferings.map((statOffering: StatOffering) => {
            let filtered = cards.filter((card) => card.label === statOffering.domain);

            if (filtered.length > 0) {
                filtered[0].offerings.push(statOffering.stat)
            }
            else {
                cards.push({label: statOffering.domain, offerings: [statOffering.stat]})
            }
        })

        return cards
    }

    return <DeadlockedBacking>

        <Box>
            <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingLeft: 7.5}}>
                <Link underline="hover" color="inherit" href="/deadlocked">
                    Deadlocked
                </Link>
                <Typography color="text.primary">Leaderboards</Typography>
            </Breadcrumbs>

            <Box>
                {loading && (
                    <Stack direction="row" justifyContent="center">
                        <CircularProgress sx={{mt: 10}} />
                    </Stack>
                )}

                {!loading && (
                    <Box
                        display="flex"
                        flexDirection={screenSize === ScreenSize.Desktop ? "row" : "column"}
                        justifyContent="flex-start"
                        flexWrap="wrap"
                        sx={{pl: 5, pb: 5, pr: 5}}
                    >
                        { convertOfferingsToCards().map((card) => {
                            return <StatCard label={card.label} offerings={card.offerings} key={card.label} />;
                        })}
                    </Box>
                )}
            </Box>
        </Box>

    </DeadlockedBacking>;
}

export default DeadlockedStats;