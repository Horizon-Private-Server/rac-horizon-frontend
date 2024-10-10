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
import bakisiImg from '../../assets/uyalive/bakisi_isles.png';
import hovenImg from '../../assets/uyalive/hoven_gorge.png';

// Player Icons
// import playerIconBlue from '../../assets/uyalive/player_icon_blue.png';
// import playerIconRed from '../../assets/uyalive/player_icon_red.png';
// import playerIconGreen from '../../assets/uyalive/player_icon_green.png';
// import playerIconYellow from '../../assets/uyalive/player_icon_yellow.png';
// import playerIconPurple from '../../assets/uyalive/player_icon_purple.png';
// import playerIconPink from '../../assets/uyalive/player_icon_pink.png';
// import playerIconAqua from '../../assets/uyalive/player_icon_pink.png';
// import playerIconOrange from '../../assets/uyalive/player_icon_orange.png'; 

// // Player Dead Icons
// import playerIconDeadBlue from '../../assets/uyalive/player_icon_dead_blue.png';
// import playerIconDeadRed from '../../assets/uyalive/player_icon_dead_red.png';
// import playerIconDeadGreen from '../../assets/uyalive/player_icon_dead_green.png';
// import playerIconDeadYellow from '../../assets/uyalive/player_icon_dead_yellow.png';
// import playerIconDeadPurple from '../../assets/uyalive/player_icon_dead_purple.png';
// import playerIconDeadPink from '../../assets/uyalive/player_icon_dead_pink.png';
// import playerIconDeadAqua from '../../assets/uyalive/player_icon_dead_pink.png';
// import playerIconDeadOrange from '../../assets/uyalive/player_icon_dead_orange.png';

import playerIconBase from '../../assets/uyalive/player_icon_base.png'; // Base icon without any color

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


// Create a map of the gameSession.map strings to their corresponding images
const mapImages: Record<string, string> = {
  'Bakisi Isles': bakisiImg,
  'Hoven Gorge': hovenImg,
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
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [playerIcon, setPlayerIcon] = useState<HTMLImageElement | null>(null);
  const reconnectDelay = useRef<number>(1000);
  const [backgroundImages, setBackgroundImages] = useState<Record<number, HTMLImageElement | null>>({});

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

   // Function to darken team colors for dead icons (optional)
   const darkenColors = (colors: Record<string, string>) => {
    const darkenedColors: Record<string, string> = {};
    Object.keys(colors).forEach((team) => {
      darkenedColors[team] = shadeColor(colors[team], -30); // Darken by 30%
    });
    return darkenedColors;
  };

  // Helper function to shade a hex color
  const shadeColor = (color: string, percent: number) => {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, R + Math.floor((R * percent) / 100)));
    G = Math.min(255, Math.max(0, G + Math.floor((G * percent) / 100)));
    B = Math.min(255, Math.max(0, B + Math.floor((B * percent) / 100)));

    return `#${(R < 16 ? '0' : '') + R.toString(16)}${(G < 16 ? '0' : '') + G.toString(16)}${(B < 16 ? '0' : '') + B.toString(16)}`;
  };

  useEffect(() => {
    // Iterate over each game session and set the correct background image
    gameSessions.forEach((session) => {
      if (session.map && mapImages[session.map]) {
        const bgImage = new Image();
        bgImage.src = mapImages[session.map];  // Dynamically set the image source based on the map
        bgImage.onload = () => {
          setBackgroundImages((prevState) => ({
            ...prevState,
            [session.world_id]: bgImage,  // Store the background image for each session based on world_id
          }));
        };
      }
    });
  }, [gameSessions]);


  useEffect(() => {
    const loadIcons = (isDead: boolean) => {
      const baseImage = new Image();
      baseImage.src = playerIconBase; // Base image without any color

      baseImage.onload = () => {
        const coloredIcons: Record<string, HTMLImageElement> = {};
        const colorMap = isDead ? darkenColors(teamColors) : teamColors; // Darken for dead icons if needed

        Object.keys(colorMap).forEach((team) => {
          const icon = createColoredIcon(baseImage, colorMap[team]);
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
    loadIcons(true);  // Load dead player icons (if you want to darken the color or modify somehow)

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
          console.log(`Update took ${end - start} ms`);
        } catch (error) {
          setError("Failed to parse WebSocket message.");
        }
      };

      socket.onerror = () => {
        setError("WebSocket connection error.");
      };

      socket.onclose = () => {
        setError("WebSocket connection closed. Reconnecting...");
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
                    <Typography variant="h5">{gameSession?.map}</Typography>
                    <Typography>{gameSession?.game_mode}</Typography>

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
              offsetX={15}
              offsetY={15}
              width={30}
              height={30}
            />
          </React.Fragment>
        )
      );
    })}
  </Layer>
</Stage>



<Card component={Paper} sx={{mb: 2}}>
                    <CardContent>
                        <Typography variant="h5" sx={{mb: 3}}>Results</Typography>

                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableCell>
                                        <Typography>Player</Typography>
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
                    Players:
                  </Typography>
                  {gameSession.players.map((player) => (
                    <Box key={player.player_id} sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">{player.username}</Typography>
                      <Typography>Team: {player.team}</Typography>
                      <Typography>Coordinates: {player.coord.join(", ")}</Typography>
                      <Typography>Health: {player.health}</Typography>
                      <Typography>cam_x: {player.cam_x}</Typography>
                      <Typography>Total Kills: {player.total_kills}</Typography>
                      <Typography>Total Deaths: {player.total_deaths}</Typography>
                      <Typography>Total Suicides: {player.total_suicides}</Typography>
                      <Typography>Upgrades: {JSON.stringify(player.upgrades)}</Typography>
                    </Box>
                  ))}

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
