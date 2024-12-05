import React, {useEffect, useState, useRef} from 'react';
import {
    Box,
    Card,
    CardContent, CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import useWebSocket, { ReadyState } from 'react-use-websocket';

import {Stage, Layer, Image as KonvaImage, Text, Rect} from 'react-konva';
import {Optional, UYALiveGameSession, UYALivePlayer} from "../../utils/Interfaces"; // Assuming this exists

import './live.css';


import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

// Maps
import unkMapImg from '../../assets/uyalive/maps/unknown.png';
import gameNotStartedImg from '../../assets/uyalive/maps/not_started.png';
import bakisiImg from '../../assets/uyalive/maps/bakisi_isles.png';
import hovenImg from '../../assets/uyalive/maps/hoven_gorge.png';
import korgonImg from '../../assets/uyalive/maps/korgon_outpost.png';
import metroImg from '../../assets/uyalive/maps/metro.png';
import bwcImg from '../../assets/uyalive/maps/bwc.png';
import x12Img from '../../assets/uyalive/maps/x12.png';
import sewersImg from '../../assets/uyalive/maps/aquatos_sewers.png';
import commandCenterImg from '../../assets/uyalive/maps/command_center.png';
import marcadiaPalaceImg from '../../assets/uyalive/maps/marcadia_palace.png';
import blackwaterDocksImg from '../../assets/uyalive/maps/blackwater_docks.png';
import todanoImg from '../../assets/uyalive/maps/todano.png';
import alpineImg from '../../assets/uyalive/maps/alpine_junction.png';
import aquadomeImg from '../../assets/uyalive/maps/aquatos_aquadome.png';
import shaarImg from '../../assets/uyalive/maps/temple_of_shaar.png';
import floodedImg from '../../assets/uyalive/maps/flooded_hoven.png';
import sarathosImg from '../../assets/uyalive/maps/sarathos_swamp.png';
import rustImg from '../../assets/uyalive/maps/rust.png';
import mountainPassImg from '../../assets/uyalive/maps/mountain_pass.png';
import maraxusImg from '../../assets/uyalive/maps/maraxus_prison.png';
import floranaImg from '../../assets/uyalive/maps/florana.png';
import floranaBasinImg from '../../assets/uyalive/maps/florana_basin.png';
import daxxImg from '../../assets/uyalive/maps/daxx.png';
import catacromImg from '../../assets/uyalive/maps/catacrom_graveyard.png';
import hallwayImg from '../../assets/uyalive/maps/hallway_nodes.png';
import hauntedImg from '../../assets/uyalive/maps/haunted_hallows.png';
import x6Img from '../../assets/uyalive/maps/x6.png';

// Player Icons
import playerIconBase from '../../assets/uyalive/player_icon_base.png'; // Base icon without any color
import playerIconDead from '../../assets/uyalive/player_icon_dead.png'; // Base icon without any color

// Weapons
import blitzBase from '../../assets/uyalive/weapons/blitz.png'; // Base icon without any color
import fluxBase from '../../assets/uyalive/weapons/flux.png'; // Base icon without any color
import gravBase from '../../assets/uyalive/weapons/grav.png';
import HorizonBreadcrumbs from "../../components/base/HorizonBreadcrumbs"; // Base icon without any color


// Create a map of the gameSession.map strings to their corresponding images
const mapImages: Record<string, string> = {
    'Bakisi Isles': bakisiImg,
    'Hoven Gorge': hovenImg,
    'Korgon Outpost': korgonImg,
    'Metropolis': metroImg,
    'Blackwater City': bwcImg,
    'Outpost x12': x12Img,
    'Aquatos Sewers': sewersImg,
    'Marcadia Palace': marcadiaPalaceImg,
    'Command Center': commandCenterImg,
    'Blackwater Dox': blackwaterDocksImg,
    'Alpine Junction': alpineImg,
    'Aquatos Aquadome': aquadomeImg,
    'Bakisi Isles - Midflag': bakisiImg,
    'Bakisi Isles V2': bakisiImg,
    'Blackwater City V2': bwcImg,
    'Blackwater Dox V2': blackwaterDocksImg,
    'Catacrom Graveyard': catacromImg,
    'Crisis at Korgon Outpost!': korgonImg,
    'Daxx': daxxImg,
    "Diglett's Outpost": korgonImg,
    'Flooded Hoven v1': floodedImg,
    'Florana': floranaImg,
    'Flat Marcadia': marcadiaPalaceImg,
    'Florana Basin': floranaBasinImg,
    'Hallway Nodes': hallwayImg,
    'Haunted Hallows': hauntedImg,
    'Hoven Gorge - Midflag': hovenImg,
    'Hoven Gorge V2': hovenImg,
    'Kerwan Skatepark': metroImg,
    'Korgon Outpost - Midflag': korgonImg,
    'Maraxus Prison': maraxusImg,
    'Marcadia Palace - Midflag': marcadiaPalaceImg,
    'Metropolis - Midflag': metroImg,
    'Metropolis V2': metroImg,
    'Mountain Pass': mountainPassImg,
    'Outpost X6': x6Img,
    'Outpost X6 - Midflag': x6Img,
    'Outpost x12 - Midflag': x12Img,
    'Rust': rustImg,
    'Sarathos Swamp': sarathosImg,
    'Temple of Shaar': shaarImg,
    'Todano': todanoImg,
};


// TODO: REMOVE THIS BECAUSE IT'S REDUNDANT TO THE live.css FILE
const teamColors: Record<string, string> = {
    'blue': '#2625c3',
    'red': '#c52523',
    'green': '#26c623',
    'orange': '#c58b23',
    'yellow': '#b7c523',
    'purple': '#8923c3',
    'aqua': '#4a7bb4',
    'pink': '#c53878',
};

// TODO: REMOVE THIS BECAUSE ITS REDUDNANT TO THE live.css FILE
const weaponColors: Record<string, string> = {
    'v1': '#FFFFFF', // White
    'v2': '#2625c3', // Blue
};


// Helper function to create a colored version of the base icon using the team color
const createColoredIcon = (baseImage: HTMLImageElement, color: string): HTMLImageElement | null => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Failed to get 2D context for the canvas');
        return null; // Handle this case gracefully
    }

    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    // Draw the base icon on the canvas
    ctx.drawImage(baseImage, 0, 0);

    // Apply color fill using the 'source-in' composite operation
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create a new image from the canvas
    const coloredIcon = new Image();
    coloredIcon.src = canvas.toDataURL(); // Convert the canvas to a data URL
    return coloredIcon;
};


const UYAOnlineWebSocket: React.FC = () => {
    // Make this higher to make live stage bigger. Lower = smaller
    const scaleFactor = 4;

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);
    const mobile = screenSize === ScreenSize.Mobile;

    const [gameSessions, setGameSessions] = useState<UYALiveGameSession[]>([]);
    const [error, setError] = useState<string>("");
    const reconnectDelay = useRef<number>(1000);
    const [backgroundImages, setBackgroundImages] = useState<Record<number, Optional<HTMLImageElement>>>({});
    const [notStartedImg, setNotStartedImg] = useState<Optional<HTMLImageElement>>(null);

    // const { sendMessage, lastMessage, readyState } = useWebSocket(`${process.env.REACT_APP_WS_ENDPOINT}/ws/uya-live`);

    const [playerIcons, setPlayerIcons] = useState<Record<string, Optional<HTMLImageElement>>>({
        blue: null,
        red: null,
        green: null,
        yellow: null,
        purple: null,
        pink: null,
        aqua: null,
        orange: null,
    });


    const [playerIconsDead, setPlayerIconsDead] = useState<Record<string, HTMLImageElement | null>>({
        blue: null,
        red: null,
        green: null,
        yellow: null,
        purple: null,
        pink: null,
        aqua: null,
        orange: null,
    });


    const [weaponIcons, setWeaponIcons] = useState<Record<string, HTMLImageElement | null>>({
        blitz: null,
        flux: null,
        grav: null,
    });

    const [weaponIconsV2, setWeaponIconsV2] = useState<Record<string, HTMLImageElement | null>>({
        blitz: null,
        flux: null,
        grav: null,
    });

    // Load map not yet started img
    useEffect(() => {
        // Iterate over each game session and set the correct background image
        const bgImage = new Image();
        bgImage.src = gameNotStartedImg;  // Dynamically set the image source based on the map
        bgImage.onload = () => setNotStartedImg(bgImage)
    }, []);

    useEffect(() => {
        // Iterate over each game session and set the correct background image
        gameSessions.forEach((session) => {
            if (session.map) {
                const bgImage = new Image();
                const imageSrc = (
                    session.map && mapImages[session.map]
                ) ? mapImages[session.map] : unkMapImg;
                console.log("Using bgImage" + imageSrc)
                bgImage.src = imageSrc;  // Dynamically set the image source based on the map
                bgImage.onload = () => {
                    setBackgroundImages((prevState) => (
                        {
                            ...prevState,
                            [session.world_id]: bgImage,  // Store the background image for each session based on
                                                          // world_id
                        }
                    ));
                };
            }
        });
    }, [gameSessions]);


    // Set player icons
    useEffect(() => {
        const loadIcons = (isDead: boolean) => {
            const baseImage = new Image();
            baseImage.src = isDead ? playerIconDead : playerIconBase; // Base image without any color

            baseImage.onload = () => {
                const coloredIcons: Record<string, HTMLImageElement> = {};

                Object.keys(teamColors).forEach((team) => {
                    const icon = createColoredIcon(baseImage, teamColors[team]);
                    if (icon) {
                        coloredIcons[team] = icon; // Only assign if icon is not null
                    }
                });

                if (isDead) {
                    setPlayerIconsDead(coloredIcons);
                }
                else {
                    setPlayerIcons(coloredIcons);
                }
            };
        };

        loadIcons(false); // Load live player icons
        loadIcons(true);  // Load dead player icons

        // Cleanup
        return () => {
            setPlayerIcons({});
            setPlayerIconsDead({});
        };
    }, []);

    // Set Weapon icons
    useEffect(() => {
        const loadWeaponIcons = (weapon: string, imgBase: string) => {
            const baseImage = new Image();
            baseImage.src = imgBase; // Base image without any color

            baseImage.onload = () => {
                const icon = createColoredIcon(baseImage, weaponColors['v1']);
                if (icon) {
                    weaponIcons[weapon] = icon;
                }
                const iconv2 = createColoredIcon(baseImage, weaponColors['v2']);
                if (iconv2) {
                    weaponIconsV2[weapon] = iconv2;
                }
            };
        };

        loadWeaponIcons('blitz', blitzBase);
        loadWeaponIcons('flux', fluxBase);
        loadWeaponIcons('grav', gravBase);

        // Cleanup
        return () => {
            setPlayerIcons({});
            setPlayerIconsDead({});
        };
    }, []);

    const { sendMessage, lastMessage, readyState } = useWebSocket(`${process.env.REACT_APP_WS_ENDPOINT}/ws/uya-live`, {
        onOpen: () => {
            console.log("WebSocket connection established");
            setError("");
        },
        onClose: () => {
            console.log("WebSocket connection closed, attempting to reconnect...");
            reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000); // Backoff logic
        },
        onError: () => {
            console.error("WebSocket encountered an error");
            setError("WebSocket connection error.");
        },
        shouldReconnect: () => true, // Enables auto-reconnection
        reconnectInterval: reconnectDelay.current,
    });

    useEffect(() => {
        if (lastMessage) {
            try {
                const data: UYALiveGameSession[] = JSON.parse(lastMessage.data);
                setGameSessions(data);
                reconnectDelay.current = 1000; // Reset reconnect delay on successful message
            } catch (err) {
                setError("Failed to parse WebSocket message.");
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        if (readyState === 1) {
            reconnectDelay.current = 1000; // Reset reconnect delay on successful connection
        }
    }, [readyState]);

    return (
        <Box sx={{ml: 2, mr: 2, minHeight: "calc(100vh - 168px)"}}>
            <Box sx={{ml: -2}}>
                <HorizonBreadcrumbs
                    paths={[
                        {text: "UYA", route: "/uya"},
                        {text: "Live", route: "/uya/live"}
                    ]}
                />
            </Box>
            <Box>
                {error !== "" ? (
                    <Typography variant="subtitle2" color="error">
                        {error}
                    </Typography>
                ) : gameSessions.length > 0 ? (
                    <>
                        {/* Render a separate Stage for each game session */}
                        {gameSessions.map((gameSession) => (

                            <Card component={Paper} sx={{mb: 2}}>
                                <CardContent>
                                    <Box key={gameSession.world_id} sx={{mb: 4}}>

                                        <Stack direction="row" justifyContent="space-between" sx={{mb: 2}}>
                                            <Typography variant="h5">
                                                {gameSession?.name.replaceAll("[IG] ", "")}
                                            </Typography>
                                            <Typography variant="overline">
                                                {gameSession?.map} // {gameSession?.game_mode}
                                            </Typography>
                                        </Stack>

                                        {/* Separate Stage for each game session */}
                                        <Stage
                                            width={window.innerWidth / 2}
                                            height={window.innerHeight / 2}
                                            style={{border: '1px solid black', marginTop: '10px'}}
                                        >
                                            {/* Layer for background */}
                                            <Layer>
                                                {backgroundImages && (
                                                    <KonvaImage
                                                        // Ensure it's either HTMLImageElement or undefined
                                                        image={backgroundImages[gameSession.world_id] || undefined}
                                                        x={0}
                                                        y={0}
                                                        width={100 * scaleFactor}
                                                        height={100 * scaleFactor}
                                                    />
                                                )}
                                            </Layer>

                                            {/* Layer for player icons and usernames */}
                                            <Layer>
                                                {gameSession.players.map((player: UYALivePlayer, index: number) => {
                                                    const teamIcon = player.health <= 0 ? playerIconsDead[player.team] : playerIcons[player.team];
                                                    const iconX = player.coord[0] * scaleFactor;
                                                    const iconY = player.coord[1] * scaleFactor;
                                                    const healthBarWidth = 25; // Total width of the health bar
                                                    const healthBarHeight = 3; // Height of the health bar

                                                    return (
                                                        teamIcon && (
                                                            <React.Fragment key={index}>
                                                                {/* Player Username */}
                                                                <Text
                                                                    text={player.username}
                                                                    x={iconX}
                                                                    // Position the username higher to make space for
                                                                    // the health bar
                                                                    y={iconY - 35}
                                                                    fontSize={15}
                                                                    fontStyle="bold"
                                                                    // Text color(can be customized)
                                                                    fill={teamColors[player.team] || '#000000'}
                                                                    align="center"
                                                                    offsetX={0}
                                                                    ref={(node) => {
                                                                        if (node) {
                                                                            // Dynamically calculate and set offsetX
                                                                            // based on text width
                                                                            const textWidth = node.getTextWidth();
                                                                            node.offsetX(textWidth / 2);
                                                                        }
                                                                    }}
                                                                />

                                                                {/* Outer Black Rectangle for Health Bar */}
                                                                <Rect
                                                                    // Center the health bar above the icon
                                                                    x={iconX - healthBarWidth / 2}
                                                                    // Position between username and icon
                                                                    y={iconY - 15}
                                                                    // Full health bar width (100%)
                                                                    width={healthBarWidth}
                                                                    // Height of the health bar
                                                                    height={healthBarHeight}
                                                                    // Black border around the entire health bar area
                                                                    stroke="black"
                                                                    strokeWidth={1}
                                                                    // Background color of the health bar (empty area)
                                                                    fill="transparent"
                                                                />

                                                                {/* Actual Health Bar */}
                                                                <Rect
                                                                    // Center the health bar above the icon
                                                                    x={iconX - healthBarWidth / 2}
                                                                    // Position between username and icon
                                                                    y={iconY - 15}
                                                                    // Health bar width proportional to health
                                                                    width={(
                                                                        player.health / 100
                                                                    ) * healthBarWidth}
                                                                    // Height of the health bar
                                                                    height={healthBarHeight}
                                                                    // Green if health > 50, otherwise red
                                                                    fill={teamColors[player.team] || '#000000'}
                                                                />

                                                                {/* Player Icon */}
                                                                <KonvaImage
                                                                    image={teamIcon}
                                                                    x={iconX}
                                                                    y={iconY}
                                                                    rotation={player.health <= 0 ? 0 : cameraRotationTranslation(player.cam_x)}
                                                                    offsetX={10}
                                                                    offsetY={10}
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                            </React.Fragment>
                                                        )
                                                    );
                                                })}
                                            </Layer>
                                        </Stage>

                                        <TableContainer sx={{mt: 3}}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableCell>
                                                        <Typography>Player</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{mobile ? "W" : "Weapons"}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{mobile ? "F" : "Flag Captures"}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{mobile ? "K" : "Kills"}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{mobile ? "D" : "Deaths"}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>{mobile ? "S" : "Suicides"}</Typography>
                                                    </TableCell>
                                                </TableHead>
                                                <TableBody>
                                                    {gameSession.players.map((player: UYALivePlayer, index: number) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                <Typography
                                                                    className={`${player.team.toLowerCase()}-team`}
                                                                    variant="subtitle2">{player.username}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    gap: '8px'
                                                                }}>
                                                                    <Typography variant="subtitle2">
                                                                        {player.upgrades.blitz.upgrade === 'v1' ? (
                                                                            <img
                                                                                alt="V1 Blitz Gun Icon"
                                                                                src={weaponIcons['blitz']?.src}
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px'
                                                                                }}  // Adjust the size as needed
                                                                            />
                                                                        ) : player.upgrades.blitz.upgrade === 'v2' ? (
                                                                            <img
                                                                                src={weaponIconsV2['blitz']?.src}
                                                                                alt="V2 Blitz Gun Icon"
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px'
                                                                                }}  // Adjust the size as needed
                                                                            />
                                                                        ) : (
                                                                            'No upgrade'
                                                                        )}
                                                                    </Typography>

                                                                    <Typography variant="subtitle2">
                                                                        {player.upgrades.flux.upgrade === 'v1' ? (
                                                                            <img
                                                                                src={weaponIcons['flux']?.src}
                                                                                alt="V1 Flux Rifle Icon"
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px'
                                                                                }}  // Adjust the size as needed
                                                                            />
                                                                        ) : player.upgrades.flux.upgrade === 'v2' ? (
                                                                            <img
                                                                                src={weaponIconsV2['flux']?.src}
                                                                                alt="V2 Flux Rifle Icon"
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px'
                                                                                }}  // Adjust the size as needed
                                                                            />
                                                                        ) : (
                                                                            'No upgrade'
                                                                        )}
                                                                    </Typography>

                                                                    <Typography variant="subtitle2">
                                                                        {player.upgrades.grav.upgrade === 'v1' ? (
                                                                            <img
                                                                                src={weaponIcons['grav']?.src}
                                                                                alt="V1 Gravity Bomb Icon"
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px'
                                                                                }}  // Adjust the size as needed
                                                                            />
                                                                        ) : player.upgrades.grav.upgrade === 'v2' ? (
                                                                            <img
                                                                                src={weaponIconsV2['grav']?.src}
                                                                                alt="V2 Gravity Bomb Icon"
                                                                                style={{
                                                                                    width: '24px',
                                                                                    height: '24px'
                                                                                }}  // Adjust the size as needed
                                                                            />
                                                                        ) : (
                                                                            'No upgrade'
                                                                        )}
                                                                    </Typography>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell>
                                                                <Typography
                                                                    variant="subtitle2">{player.total_flags}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    variant="subtitle2">{player.total_kills}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    variant="subtitle2">{player.total_deaths}</Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    variant="subtitle2">{player.total_suicides}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>


                                        <Typography variant="h6" gutterBottom sx={{mt: 2}}>
                                            Events:
                                        </Typography>
                                        {gameSession.events.length > 0 ? (
                                            gameSession.events.map((event, index: number) => (
                                                <Typography key={index}>{JSON.stringify(event)}</Typography>
                                            ))
                                        ) : (
                                            <Typography>No events at this time</Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                ) : (
                    <Stack direction="row" justifyContent="center" sx={{mt: 4}}>
                        <CircularProgress size={20} />
                        <Typography sx={{ml: 3}}>
                            Waiting for game to start...
                        </Typography>
                    </Stack>
                )}

            </Box>
        </Box>
    )
}

function cameraRotationTranslation(value: number): number {
    value = 255 - value;
    // Ensure the value is within the 0-255 range
    if (value < 0) {
        value = 0;
    }
    if (value > 255) {
        value = 255;
    }

    // Map the value from 0-255 to 0-360
    return (
        value / 255
    ) * 360 - 90;
}


export default UYAOnlineWebSocket;
