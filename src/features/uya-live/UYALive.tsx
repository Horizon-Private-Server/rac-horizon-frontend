import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, Link, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from "@mui/material";

import { Stage, FastLayer, Layer, Image as KonvaImage, Text, Rect } from 'react-konva';
import { UYALiveGameSession, UYALivePlayer } from "../../utils/Interfaces"; // Assuming this exists
import Konva from 'konva'; // Import Konva types
import {styled} from "@mui/material/styles";
import {Stack} from "@mui/system";
import {AccessTime, CheckCircleOutlined, DateRange, OpenInFull} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import './live.css'; 

import {tableCellClasses} from '@mui/material/TableCell';

import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";

import {
  Table,
  Tooltip,
} from "@mui/material";

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

// Player Icons
import playerIconBase from '../../assets/uyalive/player_icon_base.png'; // Base icon without any color
import playerIconDead from '../../assets/uyalive/player_icon_dead.png'; // Base icon without any color

// Weapons
import blitzBase from '../../assets/uyalive/weapons/blitz.png'; // Base icon without any color
import fluxBase from '../../assets/uyalive/weapons/flux.png'; // Base icon without any color
import gravBase from '../../assets/uyalive/weapons/grav.png'; // Base icon without any color

// TODO: REMOVE THIS BECAUSE ITS REDUDNANT TO THE live.css FILE
const teamColors : Record<string, string> = {
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
const weaponColors : Record<string, string> = {
  'v1': '#FFFFFF', // White
  'v2': '#2625c3', // Blue 
};

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




const UYAOnlineWebSocket: React.FC = () => {
  // Make this higher to make live stage bigger. Lower = smaller
  const scaleFactor = 4;

  const {width} = useWindowDimensions();
  const screenSize = computeDeviceScale(width);
  const mobile = screenSize === ScreenSize.Mobile;

  const [gameSessions, setGameSessions] = useState<UYALiveGameSession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const reconnectDelay = useRef<number>(1000);
  const [backgroundImages, setBackgroundImages] = useState<Record<number, HTMLImageElement | null>>({});
  const [notStartedImg, setNotStartedImg] = useState<HTMLImageElement | null>(null);

  const [playerIcons, setPlayerIcons] = useState<Record<string, HTMLImageElement | null>>({
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
    bgImage.onload = () => {
      setNotStartedImg(bgImage);
    }
  }, []);

  useEffect(() => {
    // Iterate over each game session and set the correct background image
    gameSessions.forEach((session) => {
      if (session.map) {
        const bgImage = new Image();
        const imageSrc = (session.map && mapImages[session.map]) ? mapImages[session.map] : unkMapImg;
        console.log("Using bgImage" + imageSrc)
        bgImage.src = imageSrc;  // Dynamically set the image source based on the map
        bgImage.onload = () => {
          setBackgroundImages((prevState) => ({
            ...prevState,
            [session.world_id]: bgImage,  // Store the background image for each session based on world_id
          }));
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
        } else {
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
    const loadWeaponIcons = (weapon:string, imgBase: string) => {
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

  // Setup socket
  useEffect(() => {
    let socket: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      socket = new WebSocket(process.env.TRACKER_BACKEND_UYA_LIVE_TRACKER_WEBSOCKET_IP || 'ws://localhost:8000/uya-live-ws');
      socket.onmessage = (event) => {
        const start = performance.now();
        try {
          const data: UYALiveGameSession[] = JSON.parse(event.data);
          setGameSessions(data);
          reconnectDelay.current = 1000;
          setError(null);
          const end = performance.now();
          //console.log(`Update took ${end - start} ms`);
        } catch (error) {
          setError("Failed to parse WebSocket message.");
        }
      };

      socket.onerror = () => {
        setError("WebSocket connection error.");
      };

      socket.onclose = () => {
        setError("WebSocket connection closed. Contact an admin if this page stays here! Attempting to reconnect to the backend...");
        reconnectTimeout = setTimeout(connectWebSocket, reconnectDelay.current);
        reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000);
      };
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimeout);
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <Box sx={{ width: "100%", m: 4, height: "calc(100vh - 345px)" }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Real-Time Game Sessions Data
          </Typography>

          {error ? (
            <Typography variant="subtitle2" color="error">
              {error}
            </Typography>
          ) : gameSessions.length > 0 ? (
            <>
              {/* Render a separate Stage for each game session */}
              {gameSessions.map((gameSession) => (

                <Box key={gameSession.world_id} sx={{ mb: 4 }}>
                <Card component={Paper} sx={{mb: 2}}>
                <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h5">{gameSession?.name.replaceAll("[IG] ", "")}</Typography>
                    </Stack>
                    <Typography variant="h5">{gameSession?.map} // {gameSession?.game_mode}</Typography>
                </CardContent>
                </Card>

{/* Separate Stage for each game session */}
<Stage
  width={window.innerWidth / 2}
  height={window.innerHeight / 2}
  style={{ border: '1px solid black', marginTop: '10px' }}
>
  {/* Layer for background */}
  <Layer>
    {backgroundImages && (
      <KonvaImage
        image={backgroundImages[gameSession.world_id] || undefined} // Ensure it's either HTMLImageElement or undefined
        x={0}
        y={0}
        width={100 * scaleFactor}
        height={100 * scaleFactor}
      />
    )}
  </Layer>

  {/* Layer for player icons and usernames */}
  <Layer>
    {gameSession.players.map((player) => {
      const teamIcon = player.health <= 0 ? playerIconsDead[player.team] : playerIcons[player.team];
      const iconX = player.coord[0] * scaleFactor;
      const iconY = player.coord[1] * scaleFactor;
      const healthBarWidth = 25; // Total width of the health bar
      const healthBarHeight = 3; // Height of the health bar

      return (
        teamIcon && (
          <React.Fragment key={player.player_id}>
            {/* Player Username */}
            <Text
              text={player.username}
              x={iconX}
              y={iconY - 35}  // Position the username higher to make space for the health bar
              fontSize={15}    // Adjust font size as needed
              fontStyle="bold" // You can style it as needed
              fill={teamColors[player.team] || '#000000'}     // Text color (can be customized)
              align="center"   // Align text center
              offsetX={0} // Set offsetX dynamically using a ref
              ref={(node) => {
                if (node) {
                  // Dynamically calculate and set offsetX based on text width
                  const textWidth = node.getTextWidth();
                  node.offsetX(textWidth / 2); // Center the text based on its width
                }
              }}
            />

            {/* Outer Black Rectangle for Health Bar */}
            <Rect
              x={iconX - healthBarWidth / 2}  // Center the health bar above the icon
              y={iconY - 15}      // Position between username and icon
              width={healthBarWidth}  // Full health bar width (100%)
              height={healthBarHeight}  // Height of the health bar
              stroke="black"      // Black border around the entire health bar area
              strokeWidth={1}
              fill="transparent"         // Background color of the health bar (empty area)
            />

            {/* Actual Health Bar */}
            <Rect
              x={iconX - healthBarWidth / 2}  // Center the health bar above the icon
              y={iconY - 15}      // Position between username and icon
              width={(player.health / 100) * healthBarWidth} // Health bar width proportional to health
              height={healthBarHeight}          // Height of the health bar
              fill={teamColors[player.team] || '#000000'}  // Green if health > 50, otherwise red
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

<Card component={Paper} sx={{mb: 2}}>
                    <CardContent>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableCell>
                                        <Typography>Player</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{mobile ? "W" : "Upgrades"}</Typography>
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
                                {gameSession.players.map((player: UYALivePlayer) => (
                                        <TableRow>
                                            <TableCell>
                                                <Typography className={`${player.team.toLowerCase()}-team`} variant="subtitle2">{player.username}</Typography>
                                            </TableCell>
                                            <TableCell>
                                              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                                <Typography variant="subtitle2">
                                                  {player.upgrades.blitz.upgrade === 'v1' ? (
                                                    <img
                                                      src={weaponIcons['blitz']?.src}  // Ensure .src is correctly accessed
                                                      alt="Blitz V1"
                                                      style={{ width: '24px', height: '24px' }}  // Adjust the size as needed
                                                    />
                                                  ) : player.upgrades.blitz.upgrade === 'v2' ? (
                                                    <img
                                                      src={weaponIconsV2['blitz']?.src}  // Ensure .src is correctly accessed
                                                      alt="Blitz V2"
                                                      style={{ width: '24px', height: '24px' }}  // Adjust the size as needed
                                                    />
                                                  ) : (
                                                    'No upgrade'
                                                  )}
                                                </Typography>

                                                <Typography variant="subtitle2">
                                                  {player.upgrades.flux.upgrade === 'v1' ? (
                                                    <img
                                                      src={weaponIcons['flux']?.src}  // Ensure .src is correctly accessed
                                                      alt="Flux V1"
                                                      style={{ width: '24px', height: '24px' }}  // Adjust the size as needed
                                                    />
                                                  ) : player.upgrades.flux.upgrade === 'v2' ? (
                                                    <img
                                                      src={weaponIconsV2['flux']?.src}  // Ensure .src is correctly accessed
                                                      alt="Flux V2"
                                                      style={{ width: '24px', height: '24px' }}  // Adjust the size as needed
                                                    />
                                                  ) : (
                                                    'No upgrade'
                                                  )}
                                                </Typography>

                                                <Typography variant="subtitle2">
                                                  {player.upgrades.grav.upgrade === 'v1' ? (
                                                    <img
                                                      src={weaponIcons['grav']?.src}  // Ensure .src is correctly accessed
                                                      alt="Grav V1"
                                                      style={{ width: '24px', height: '24px' }}  // Adjust the size as needed
                                                    />
                                                  ) : player.upgrades.grav.upgrade === 'v2' ? (
                                                    <img
                                                      src={weaponIconsV2['grav']?.src}  // Ensure .src is correctly accessed
                                                      alt="Grav V2"
                                                      style={{ width: '24px', height: '24px' }}  // Adjust the size as needed
                                                    />
                                                  ) : (
                                                    'No upgrade'
                                                  )}
                                                </Typography>
                                              </div>
                                            </TableCell>

                                            <TableCell>
                                                <Typography variant="subtitle2">{player.total_flags}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">{player.total_kills}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">{player.total_deaths}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">{player.total_suicides}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </CardContent>
                        </Card>


                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Events:
                  </Typography>
                  {gameSession.events.length > 0 ? (
                    gameSession.events.map((event, index) => (
                      <Typography key={index}>{JSON.stringify(event)}</Typography>
                    ))
                  ) : (
                    <Typography>No events at this time</Typography>
                  )}
                </Box>
              ))}
            </>
          ) : (
            <Typography>Loading game sessions data...</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

function cameraRotationTranslation(value: number): number {
  value = 255 - value;
  // Ensure the value is within the 0-255 range
  if (value < 0) value = 0;
  if (value > 255) value = 255;
  
  // Map the value from 0-255 to 0-360
  return (value / 255) * 360 - 90;
}



export default UYAOnlineWebSocket;
