import React from "react";

import {
    Typography,
    CardContent,
    Card,
    Divider,
    Box,
    CircularProgress,
    Alert,
    CardActions, IconButtonProps, Collapse, Tooltip
} from "@mui/material";

import { useParams } from "react-router-dom";

import { Stack } from "@mui/system";


import PersonIcon from '@mui/icons-material/Person';
import {addCommasToNumber, formatTime} from "../../components/base/Functions";

import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs";
import StatsChart from "./StatsChart";
import {useDeadlockedPlayerDetails} from "../../hooks/deadlocked-stats";
import ImageBacking from "../../components/base/ImageBacking";
import {useWindowContentDimensions} from "../../components/utils/WindowDimensions";
import {RankRow, RatioRow, StatRows} from "../../components/base/StatRows";
import {BarChart, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import ExpandMoreButton from "../../components/base/ExpandMoreButton";


const StatsCard = ({label, icon, expanded, children}: {label: string, icon?: JSX.Element, expanded?: boolean, children: JSX.Element | JSX.Element[]}) => {

    const [expandedState, setExpandedState] = React.useState<boolean>(expanded ?? false);

    const {cwidth} = useWindowContentDimensions();

    return <Card sx={{width: cwidth - 50, mb: 2}}>
        <CardContent>
            <Stack direction="row" justifyContent="space-between" sx={{mt: -1, mb: -2}}>

                <Stack direction="row">
                    {icon !== undefined && (
                        <Stack direction="column" justifyContent="center">
                            {icon}
                        </Stack>
                    )}
                    <Stack direction="column" justifyContent="center">
                        <Typography variant="h5" sx={{ml: 2}}>
                            {label}
                        </Typography>
                    </Stack>
                </Stack>

                <CardActions disableSpacing>
                    <ExpandMoreButton
                        expand={expandedState}
                        onClick={() => setExpandedState(!expandedState)}
                    >
                        <ExpandMoreIcon />
                    </ExpandMoreButton>
                </CardActions>
            </Stack>

            <Collapse in={expandedState} timeout="auto" unmountOnExit>
                <Divider variant="fullWidth" sx={{mt: 2, mb: 3}} />
                {children}
            </Collapse>
        </CardContent>
    </Card>
}

const DeadlockedDetails = () => {

    const { horizonId } = useParams();

    const {data, status} = useDeadlockedPlayerDetails(parseInt(horizonId ?? "0"));

    const {cwidth} = useWindowContentDimensions();

    let content: JSX.Element;

    if (status === "pending") {
        content = (
            <Box sx={{height: "68vh"}}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{mt: 10, mb: 10}}>
                   <CircularProgress size={60} />
                </Stack>
            </Box>
        )
    }
    else if (status === "error") {
        content = (
            <Box sx={{height: "75vh"}}>
                <Alert severity="error">
                    Unable to retrieve stats.
                </Alert>
            </Box>
        )
    }
    else {
        content = (
            <Box sx={{ml: 2, width: cwidth - 50}}>

                <StatsCard label={data?.username ?? ""} icon={<PersonIcon />} expanded>
                    <RankRow label="Overall Rank" rank={data?.overall_stats.rank ?? 0} />
                    <RatioRow label="Wins/Losses" n={data?.overall_stats.wins ?? 0} d={data?.overall_stats.losses ?? 0} />
                    <RatioRow label="Kills/Deaths" n={data?.overall_stats.kills ?? 0} d={data?.overall_stats.deaths ?? 0} />
                    <StatRows label="Games Played" value={`${addCommasToNumber(data?.overall_stats.games_played ?? 0)}`} />
                    <StatRows label="Squats" value={`${addCommasToNumber(data?.overall_stats.squats ?? 0)}`} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard label="Rank Distribution" icon={<BarChart />}>
                    <Stack direction="row" justifyContent="center">
                        <StatsChart
                            deathmatchRank={data?.deathmatch_stats.rank ?? 0}
                            conquestRank={data?.conquest_stats.rank ?? 0}
                            kothRank={data?.koth_stats.rank ?? 0}
                            ctfRank={data?.ctf_stats.rank ?? 0}
                            juggernautRank={data?.juggernaut_stats.rank ?? 0}
                        />
                    </Stack>
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard
                    label="CTF Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_85.png"
                            alt="Deadlocked Flag Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <RankRow label="CTF Rank" rank={data?.ctf_stats.rank ?? 0} />
                    <RatioRow label="Wins/Losses" n={data?.ctf_stats.wins ?? 0} d={data?.ctf_stats.losses ?? 0} />
                    <RatioRow label="Kills/Deaths" n={data?.ctf_stats.kills ?? 0} d={data?.ctf_stats.deaths ?? 0} />
                    <StatRows label="Flags Captured" value={`${addCommasToNumber(data?.ctf_stats.flags_captured ?? 0)}`} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard
                    label="KOTH Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_84.png"
                            alt="Deadlocked Hill Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <RankRow label="KOTH Rank" rank={data?.koth_stats.rank ?? 0} />
                    <RatioRow label="Wins/Losses" n={data?.koth_stats.wins ?? 0} d={data?.koth_stats.losses ?? 0} />
                    <RatioRow label="Kills/Deaths" n={data?.koth_stats.kills ?? 0} d={data?.koth_stats.deaths ?? 0} />
                    <StatRows label="Hill Time" value={`${formatTime(data?.koth_stats.time ?? 0)}`} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard
                    label="Deathmatch Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_89.png"
                            alt="Deadlocked Skull Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <RankRow label="Deathmatch Rank" rank={data?.deathmatch_stats.rank ?? 0} />
                    <RatioRow label="Wins/Losses" n={data?.deathmatch_stats.wins ?? 0} d={data?.deathmatch_stats.losses ?? 0} />
                    <RatioRow label="Kills/Deaths" n={data?.deathmatch_stats.kills ?? 0} d={data?.deathmatch_stats.deaths ?? 0} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard
                    label="Juggernaut Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_12.png"
                            alt="Deadlocked Fist Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <RankRow label="Juggernaut Rank" rank={data?.juggernaut_stats.rank ?? 0} />
                    <RatioRow label="Wins/Losses" n={data?.juggernaut_stats.wins ?? 0} d={data?.juggernaut_stats.losses ?? 0} />
                    <RatioRow label="Kills/Deaths" n={data?.juggernaut_stats.kills ?? 0} d={data?.juggernaut_stats.deaths ?? 0} />
                    <StatRows label="Juggernaut Time" value={`${formatTime(data?.juggernaut_stats.time ?? 0)}`} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard
                    label="Conquest Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_17.png"
                            alt="Deadlocked Node Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <RankRow label="Conquest Rank" rank={data?.conquest_stats.rank ?? 0}/>
                    <RatioRow label="Wins/Losses" n={data?.conquest_stats.wins ?? 0} d={data?.conquest_stats.losses ?? 0}/>
                    <RatioRow label="Kills/Deaths" n={data?.conquest_stats.kills ?? 0} d={data?.conquest_stats.deaths ?? 0}/>
                    <StatRows label="Nodes Captured" value={`${addCommasToNumber(data?.conquest_stats.nodes_taken ?? 0)}`} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

                <StatsCard
                    label="Weapon Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_93.png"
                            alt="Deadlocked Ammo Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_102.png" alt="Wrench Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ ml: 2, mr: 2 }} />
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Wrench</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.wrench_kills ?? 0}
                        d={data?.weapon_stats.wrench_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_27.png" alt="Dual Vipers Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Dual Vipers</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.dual_viper_kills ?? 0}
                        d={data?.weapon_stats.dual_viper_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_31.png" alt="Magma Cannon Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Magma Cannon</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.magma_cannon_kills ?? 0}
                        d={data?.weapon_stats.magma_cannon_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_30.png" alt="Arbiter Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>The Arbiter</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.arbiter_kills ?? 0}
                        d={data?.weapon_stats.arbiter_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_32.png" alt="Fusion Rifle Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Fusion Rifle</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.fusion_rifle_kills ?? 0}
                        d={data?.weapon_stats.fusion_rifle_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_28.png" alt="Hunter Mine Launcher Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Hunter Mine Launcher</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.hunter_mine_launcher_kills ?? 0}
                        d={data?.weapon_stats.hunter_mine_launcher_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_24.png" alt="B6-Obliterator Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>B6-Obliterator</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.b6_obliterator_kills ?? 0}
                        d={data?.weapon_stats.b6_obliterator_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_26.png" alt="Scorpion Flail Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Scorpion Flail</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.scorpion_flail_kills ?? 0}
                        d={data?.weapon_stats.scorpion_flail_deaths ?? 0}
                    />

                    <Divider />

                    <RatioRow
                        label={
                            <Stack direction="row" spacing={2} sx={{mb: -2}}>
                                <img src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_25.png" alt="Holoshield Launcher Icon" width={48} height={48} />
                                <Divider orientation="vertical" sx={{ml: 2, mr: 2}}/>
                                <Typography variant="overline" fontSize={14} sx={{mt: 0, mb: 0}}>Holoshield Launcher</Typography>
                            </Stack>
                        }
                        n={data?.weapon_stats.holoshield_launcher_kills ?? 0}
                        d={data?.weapon_stats.holoshield_launcher_deaths ?? 0}
                    />

                    <Box sx={{mb: -2}} />

                </StatsCard>

                <StatsCard
                    label="Vehicle Stats"
                    icon={
                        <img
                            src="https://rac-horizon-resources.s3.us-east-1.amazonaws.com/icons/all/tex_105.png"
                            alt="Deadlocked Fist Icon"
                            width={24}
                            height={24}
                        />
                    }
                >
                    <StatRows label="Roadkills" value={`${addCommasToNumber(data?.vehicle_stats.roadkills ?? 0)}`} />
                    <StatRows label="Vehicle Squats" value={`${addCommasToNumber(data?.vehicle_stats.squats ?? 0)}`} />
                    <Box sx={{mb: -2}} />
                </StatsCard>

            </Box>
        )
    }

    return <ImageBacking backgroundUrl="https://rac-horizon-resources.s3.amazonaws.com/backgrounds/dl-background.jpg">
        <Box>
            <HorizonBreadcrumbs
                paths={[
                    {text: "Deadlocked", route: "/deadlocked"},
                    {text: "Stats", route: "/deadlocked/stats"},
                    {text: "Player Details", route: "/deadlocked/stats/details"}
                ]}
            />
            {content}
        </Box>
    </ImageBacking>
}

export default DeadlockedDetails;