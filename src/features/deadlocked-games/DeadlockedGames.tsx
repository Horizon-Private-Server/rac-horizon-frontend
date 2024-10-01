import React, { useState, useEffect } from "react";
import Page from "../../components/base/Page";
import { Typography, Box, CardContent, Card, CardActionArea, Link, Breadcrumbs, Autocomplete, TextField } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";

import {useNavigate} from "react-router-dom";


import { makeStyles, createStyles } from "@mui/styles"

import { Stack } from "@mui/system";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { selectGameFilters, selectPage, setFilters, setPage } from "./deadlockedGamesSlice";
import {FilterProps, GameRemoteListProps, GameRulesProps} from "../../utils/Interfaces";

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
                backgroundImage: `url(https://rac-horizon-resources.s3.amazonaws.com/backgrounds/dl-background.jpg)`,
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

export interface GameCardProps {
    id: number;
    name: string;
    mode: string;
    map: string;
    playerCount: number;
    startingPlayerCount: number;
    gameStartTime: string;
    gameEndTime: string;
    rules: GameRulesProps;
}


function formatDate(dateString: string) {
    let date = new Date(dateString)
    let options = {weekday: 'long', month: 'long', day: 'numeric', year: "numeric"};
    
    // @ts-ignore
    return date.toLocaleString('en-US', options);
}


const GameCard = (props: GameCardProps) => {
    const {id, name, mode, map, playerCount, startingPlayerCount, gameStartTime, gameEndTime, rules} = props;
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const skillIcons = {
        1: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_67.png",
        2: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_68.png",
        3: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_69.png",
        4: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_70.png",
        5: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_71.png",
        6: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_72.png",
        7: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_73.png",
        8: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_74.png",
        9: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_75.png",
        10: "https://rac-horizon-resources.s3.amazonaws.com/icons/skill_levels/tex_76.png",
    }

    const weaponIcons = {
        dualVipers: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_27.png",
        magmaCannon: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_31.png",
        theArbiter: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_30.png",
        fusionRifle: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_32.png",
        hunterMineLauncher: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_28.png",
        b6Obliterator: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_24.png",
        holoshieldLauncher: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_25.png",
        scorpionFlail: "https://rac-horizon-resources.s3.amazonaws.com/icons/weapons/tex_26.png",
    }

    const vehicleIcons = {
        hoverbike: "https://rac-horizon-resources.s3.amazonaws.com/icons/vehicles/tex_137.png",
        puma: "https://rac-horizon-resources.s3.amazonaws.com/icons/vehicles/tex_138.png",
        hovership: "https://rac-horizon-resources.s3.amazonaws.com/icons/vehicles/tex_139.png",
        landstalker: "https://rac-horizon-resources.s3.amazonaws.com/icons/vehicles/tex_141.png",
    }

    function getFrameFromLevel(level: string): string {
        const frames = {
            
            "Battledome SP": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/battledome+sp.png",
            "Containment Suite": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/containment+suite.png",

            "Desert Prison": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/desert+prison.png",
            "Dark Cathedral Interior": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/dc+interior.jpg",
            "Snivelak": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/snivelak.jpg",
            "Ghost Ship": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost+ship.png",
            "Canal City": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/canal+city.png",
            "Blackwater City": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/blackwater+city.jpg",
            "Blackwater Docks": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/blackwater+docks.png",
            "Shaar SP": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/shaar+sp.jpg",
            "Bakisi Isles": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/bakisi+isles.jpg",
            "Annihilation Nation": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/annihilation+nation.png",

            "Hoven Gorge": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/hoven+gorge.png",
            "Korgon Outpost": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/korgon+outpost.jpg",
            "Launch Site": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/launch+site.png",
            "Marcadia Palace": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/marcadia+palace.bmp",
            "Metropolis MP": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/metropolis+mp.jpg",
            "Torval Lost Factory": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/torval+lost+factory.png",
            "Torval SP": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/torval+sp.png",
            "Tyhrranosis": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/tyhrranosis.jpg",

            "Battledome Tower": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/battledome-planet.webp",
            "Catacrom Graveyard": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/catacrom-planet.webp",
            "Sarathos Swamp": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/sarathos-planet.webp",
            "Dark Cathedral": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/kronos-planet.webp",
            "Temple of Shaar": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/shaar-planet.webp",
            "Mining Facility": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/orxon-planet.webp",
            "Valix Lighthouse": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/valix-planet.webp",
            "Torval Ruins": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/torval-planet.webp",
            "Tempus Station": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/stygia-planet.webp",
            "Maraxus Prison": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/maraxus-planet.webp",
            "Ghost Station": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/ghost-station-planet.webp",

            "Orxon": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/orxon-survival-planet.webp",
            "Veldin": "https://rac-horizon-resources.s3.amazonaws.com/level-frames/veldin.png"
        }

        let image: string = frames[level as keyof typeof frames];

        if (image === undefined) {
            image = "https://rac-horizon-resources.s3.amazonaws.com/level-frames/default.avif";
        }

        return image;

    }

    return <Card key={id} sx={{p: 0, zIndex: 1}}>


        
            <CardActionArea
                onClick={() => navigate(`/dl/game/${id}`)}
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
                            backgroundImage: `url(${getFrameFromLevel(map)})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                        }} />

                    </Box>

                    <Stack direction="row" justifyContent="flex-start" sx={{minWidth: "70vw", minHeight: "10vh"}}>
                        <Stack direction="column" justifyContent="space-between" sx={{pt: 3, pl: 3, pr: 3, pb: 2, minWidth: 260}}>
                            <Stack direction="column" justifyContent="space-between">
                                <Typography variant="overline" fontWeight="bold" fontSize={16} sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{name}</Typography>
                                <Typography variant="overline" textAlign="left" sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{mode}</Typography>
                                <Typography variant="overline" textAlign="left" sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{map}</Typography>
                            </Stack>
                            <Box sx={{marginBottom: 2}} />
                            <Typography variant="overline" textAlign="left" sx={{filter: "drop-shadow(0rem 0rem 1rem black)"}}>{formatDate(gameEndTime)}</Typography>
                        </Stack>
                        { screenSize === ScreenSize.Desktop && (
                            <>
                                <Stack direction="column" justifyContent="flex-start" sx={{p: 3}}>
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

                                <Stack direction="column" justifyContent="flex-start" sx={{p: 3}}>
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
                            </>
                        )}
                    </Stack>



                </CardContent>
            </CardActionArea>

    </Card>
}

const DeadlockedGames = () => {

    const classes = useStyles();

    const [games, setGames] = useState([]);
    const [totalGames, setTotalGames] = useState(0);
    const [filterURL, setFilterURL] = useState("");

    const gameFilters = useSelector(selectGameFilters);
    const page = useSelector(selectPage);

    const dispatch = useDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate = useNavigate();

    useEffect(() => {

        let gameFiltersLocal = "";

        let iter = 0;

        gameFilters.map((filter) => {
            gameFiltersLocal += `${iter === 0 ? "?" : "&"}filter=${filter.serialized}`
            iter++;
            return 0;
        });

        axios.get(`http://dev.codeprojects.net:9000/api/game/list/${page}${gameFiltersLocal}`).then((response)=> {
            setGames(response.data.games);
            setTotalGames(response.data.total_games);
        }).catch()
    }, [page, gameFilters])

    let filters: FilterProps[] = [
        { title: "--- Vanilla Game Modes ---", serialized: "", filterType: "", isDivider: true},
        { title: "King of the Hill", serialized: "koth", filterType: "mode", isDivider: false},
        { title: "Capture the Flag", serialized: "ctf", filterType: "mode", isDivider: false},
        { title: "Deathmatch", serialized: "dm", filterType: "mode", isDivider: false},
        { title: "Juggernaut", serialized: "jugg", filterType: "mode", isDivider: false},
        { title: "Conquest", serialized: "cq", filterType: "mode", isDivider: false},
        { title: "Glitch Game", serialized: "glitch", filterType: "mode", isDivider: false},
        { title: "PVP", serialized: "pvp", filterType: "mode", isDivider: false},
        { title: "1v1", serialized: "1v1", filterType: "mode", isDivider: false},

        { title: "--- Custom Game Modes ---", serialized: "", filterType: "", isDivider: true},
        { title: "Survival", serialized: "survival", filterType: "mode", isDivider: false},
        { title: "Search & Destroy", serialized: "snd", filterType: "mode", isDivider: false},
        { title: "Payload", serialized: "payload", filterType: "mode", isDivider: false},

        { title: "--- Weapons ---", serialized: "", filterType: "", isDivider: true},
        { title: "Cycle", serialized: "cycle", filterType: "weapons", isDivider: false},
        { title: "Fusion", serialized: "fusion", filterType: "weapons", isDivider: false},
        { title: "Casual", serialized: "casual", filterType: "weapons", isDivider: false},
        { title: "Flail", serialized: "flail", filterType: "weapons", isDivider: false},
        { title: "Arbiter Cycle", serialized: "arbcycle", filterType: "weapons", isDivider: false},

        { title: "--- Vanilla Maps ---", serialized: "", filterType: "", isDivider: true},
        { title: "Maraxus Prison", serialized: "maraxus", filterType: "map", isDivider: false},
        { title: "Catacrom Graveyard", serialized: "catacrom", filterType: "map", isDivider: false},
        { title: "Sarathos Swamp", serialized: "sarathos", filterType: "map", isDivider: false},
        { title: "Temple of Shaar", serialized: "shaar", filterType: "map", isDivider: false},
        { title: "Torval Ruins", serialized: "torval", filterType: "map", isDivider: false},
        { title: "Battledome Tower", serialized: "battledome", filterType: "map", isDivider: false},
        { title: "Valix Lighthouse", serialized: "valix", filterType: "map", isDivider: false},
        { title: "Tempus Station", serialized: "tempus", filterType: "map", isDivider: false},
        { title: "Dark Cathedral", serialized: "darkcathedral", filterType: "map", isDivider: false},
        { title: "Ghost Station", serialized: "ghoststation", filterType: "map", isDivider: false},
        { title: "Mining Facility", serialized: "miningfacility", filterType: "map", isDivider: false},

        { title: "--- Custom Maps ---", serialized: "", filterType: "", isDivider: true},
        { title: "Hoven Gorge", serialized: "hoven", filterType: "map", isDivider: false},
        { title: "Marcadia", serialized: "marcadia", filterType: "map", isDivider: false},
        { title: "Snivelak", serialized: "snivelak", filterType: "map", isDivider: false},
        { title: "Blackwater City", serialized: "blackwatercity", filterType: "map", isDivider: false},
        { title: "Canal City", serialized: "canalcity", filterType: "map", isDivider: false},
        { title: "Blackwater Docks", serialized: "blackwaterdocks", filterType: "map", isDivider: false},
        { title: "Metropolis MP", serialized: "metropolis", filterType: "map", isDivider: false},
        { title: "Containment Suite", serialized: "containmentsuite", filterType: "map", isDivider: false},
        { title: "Shaar SP", serialized: "shaarsp", filterType: "map", isDivider: false},
        { title: "Tyhrranosis", serialized: "tyhrranosis", filterType: "map", isDivider: false},
        { title: "Torval Lost Factory", serialized: "torvallostfactory", filterType: "map", isDivider: false},
        { title: "Desert Prison", serialized: "desertprison", filterType: "map", isDivider: false},
        { title: "Korgon Outpost", serialized: "korgon", filterType: "map", isDivider: false},
        { title: "Ace Hardlight's Suite", serialized: "acesuite", filterType: "map", isDivider: false},
        { title: "Shipment", serialized: "shipment", filterType: "map", isDivider: false},
        { title: "Ghost Ship", serialized: "ghostship", filterType: "map", isDivider: false},
        { title: "Bakisi Isles", serialized: "bakisi", filterType: "map", isDivider: false},
        { title: "Dark Cathedral Interior", serialized: "dcinterior", filterType: "map", isDivider: false},
        { title: "Annihilation Nation", serialized: "annihilationnation", filterType: "map", isDivider: false},
        { title: "Launch Site", serialized: "launchsite", filterType: "map", isDivider: false},
        { title: "Torval SP", serialized: "torvalsp", filterType: "map", isDivider: false},
        { title: "Battledome SP", serialized: "battledomesp", filterType: "map", isDivider: false},
        { title: "Mining Facility SP", serialized: "miningfacilitysp", filterType: "map", isDivider: false},
        { title: "Sarathos SP", serialized: "sarathossp", filterType: "map", isDivider: false},
    ]

    return <Page className={classes.dlBackground}>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 4}}>
            <Link underline="hover" color="inherit" href="/dl">
                Deadlocked
            </Link>
            <Typography color="text.primary">Game History</Typography>
        </Breadcrumbs>


        <Autocomplete
            multiple
            sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4, minWidth: "70vw"}}
            value={gameFilters}
            onChange={(event, filters) => {
                dispatch(setPage(0));
                dispatch(setFilters(filters));
            }}
            id="tags-outlined"
            options={filters}
            getOptionLabel={(option: FilterProps) => option.title}
            filterSelectedOptions
            getOptionDisabled={(option) => option.isDivider}
            renderInput={(params) => {
                return <TextField
                    {...params}
                    label="Game Filters"
                    placeholder="Filters"
                    fullWidth
                />;
            }}
        />

        <Box
            sx={{p: 4}}
        >
            { games.map((game: GameRemoteListProps) => {
                return <>
                    <GameCard 
                        id={game.id}
                        name={game.name}
                        mode={game.game_mode}
                        map={game.map}
                        playerCount={game.player_count}
                        startingPlayerCount={game.starting_player_count}
                        gameStartTime={game.start_time}
                        gameEndTime={game.end_time}
                        rules={game.rules}
                    />
                    <Box sx={{mb: 2 }}/>
                </>
            })}
        </Box>

        {/*<Paginator */}
        {/*    totalResults={totalGames} */}
        {/*    rowsPerPage={25} */}
        {/*    page={page} */}
        {/*    />*/}

    </Page>;
}

export default DeadlockedGames;
