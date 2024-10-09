import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Stage, FastLayer, Layer, Image as KonvaImage, Text, Rect } from 'react-konva';
import { UYALiveGameSession } from "../../utils/Interfaces"; // Assuming this exists
import Konva from 'konva'; // Import Konva types


// Maps
import bakisiImg from '../../assets/uyalive/bakisi_isles.png';
import hovenImg from '../../assets/uyalive/hoven_gorge.png';

// Player Icons
import playerIconBlue from '../../assets/uyalive/player_icon_blue.png';
import playerIconRed from '../../assets/uyalive/player_icon_red.png';
import playerIconGreen from '../../assets/uyalive/player_icon_green.png';
import playerIconYellow from '../../assets/uyalive/player_icon_yellow.png';
import playerIconPurple from '../../assets/uyalive/player_icon_purple.png';
import playerIconPink from '../../assets/uyalive/player_icon_pink.png';
import playerIconTeal from '../../assets/uyalive/player_icon_teal.png';
import playerIconOrange from '../../assets/uyalive/player_icon_orange.png'; 

// Player Dead Icons
import playerIconDeadBlue from '../../assets/uyalive/player_icon_dead_blue.png';
import playerIconDeadRed from '../../assets/uyalive/player_icon_dead_red.png';
import playerIconDeadGreen from '../../assets/uyalive/player_icon_dead_green.png';
import playerIconDeadYellow from '../../assets/uyalive/player_icon_dead_yellow.png';
import playerIconDeadPurple from '../../assets/uyalive/player_icon_dead_purple.png';
import playerIconDeadPink from '../../assets/uyalive/player_icon_dead_pink.png';
import playerIconDeadTeal from '../../assets/uyalive/player_icon_dead_teal.png';
import playerIconDeadOrange from '../../assets/uyalive/player_icon_dead_orange.png';

// Create a map of the gameSession.map strings to their corresponding images
const mapImages: Record<string, string> = {
  'Bakisi Isles': bakisiImg,
  'Hoven Gorge': hovenImg,
};


const UYAOnlineWebSocket: React.FC = () => {
  // Make this higher to make live stage bigger. Lower = smaller
  const scaleFactor = 4;


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
    teal: null,
    orange: null,
  });


  const [playerIconsDead, setPlayerIconsDead] = useState<Record<string, HTMLImageElement | null>>({
    blue: null,
    red: null,
    green: null,
    yellow: null,
    purple: null,
    pink: null,
    teal: null,
    orange: null,
  });

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


  // Load the background and player icon images
  useEffect(() => {
    // Load all player icons
    const icons: Record<string, HTMLImageElement> = {};
    const iconsDead: Record<string, HTMLImageElement> = {};
    
    const loadIcon = (color: string, src: string) => {
      const icon = new Image();
      icon.src = src;
      icon.onload = () => {
        icons[color] = icon;
        if (Object.keys(icons).length === 4) {  // Adjust the number based on how many icons you have
          setPlayerIcons(icons); // Only set once all icons are loaded
        }
      };
    };

    const loadIconDead = (color: string, src: string) => {
      const icon = new Image();
      icon.src = src;
      icon.onload = () => {
        iconsDead[color] = icon;
        if (Object.keys(iconsDead).length === 4) {  // Adjust the number based on how many icons you have
          setPlayerIconsDead(iconsDead); // Only set once all icons are loaded
        }
      };
    };

    loadIcon('blue', playerIconBlue);
    loadIcon('red', playerIconRed);
    loadIcon('green', playerIconGreen);
    loadIcon('yellow', playerIconYellow);
    loadIcon('purple', playerIconPurple);
    loadIcon('pink', playerIconPink);
    loadIcon('teal', playerIconTeal);
    loadIcon('orange', playerIconOrange);

    loadIconDead('blue', playerIconDeadBlue);
    loadIconDead('red', playerIconDeadRed);
    loadIconDead('green', playerIconDeadGreen);
    loadIconDead('yellow', playerIconDeadYellow);
    loadIconDead('purple', playerIconDeadPurple);
    loadIconDead('pink', playerIconDeadPink);
    loadIconDead('teal', playerIconDeadTeal);
    loadIconDead('orange', playerIconDeadOrange);

    let socket: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      socket = new WebSocket('ws://172.16.1.7:8000/uya-live-ws');
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
                  <Typography variant="h6">Game Name: {gameSession.name}</Typography>
                  <Typography>Map: {gameSession.map}</Typography>
                  <Typography>Game Mode: {gameSession.game_mode}</Typography>
                  <Typography>World ID: {gameSession.world_id}</Typography>
                  <Typography>
                    Last Updated: {new Date(gameSession.world_latest_update).toLocaleString()}
                  </Typography>

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
              fill={player.team}     // Text color (can be customized)
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
              fill={player.team}  // Green if health > 50, otherwise red
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
