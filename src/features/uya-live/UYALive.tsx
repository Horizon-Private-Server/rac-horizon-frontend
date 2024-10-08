import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Stage, FastLayer, Layer, Image as KonvaImage } from 'react-konva';
import { UYALiveGameSession } from "../../utils/Interfaces"; // Assuming this exists
import Konva from 'konva'; // Import Konva types
import bakisiImg from '../../assets/uyalive/bakisi.png';
import playerIconBlue from '../../assets/uyalive/player_icon_blue.png';
import playerIconRed from '../../assets/uyalive/player_icon_red.png';
import playerIconGreen from '../../assets/uyalive/player_icon_green.png';
import playerIconYellow from '../../assets/uyalive/player_icon_yellow.png';
import playerIconPurple from '../../assets/uyalive/player_icon_purple.png';
import playerIconPink from '../../assets/uyalive/player_icon_pink.png';
import playerIconTeal from '../../assets/uyalive/player_icon_teal.png';
import playerIconOrange from '../../assets/uyalive/player_icon_orange.png'; 


const UYAOnlineWebSocket: React.FC = () => {
  const [gameSessions, setGameSessions] = useState<UYALiveGameSession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [playerIcon, setPlayerIcon] = useState<HTMLImageElement | null>(null);
  const reconnectDelay = useRef<number>(1000);

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

  const scaleFactor = 5;

  // Load the background and player icon images
  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = bakisiImg; // Webpack will resolve this correctly
    bgImage.onload = () => {
      setBackgroundImage(bgImage);
    };

    // Load all player icons
    const icons: Record<string, HTMLImageElement> = {};
    
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

    loadIcon('blue', playerIconBlue);
    loadIcon('red', playerIconRed);
    loadIcon('green', playerIconGreen);
    loadIcon('yellow', playerIconYellow);
    loadIcon('purple', playerIconPurple);
    loadIcon('pink', playerIconPink);
    loadIcon('teal', playerIconTeal);
    loadIcon('orange', playerIconOrange);

    let socket: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      socket = new WebSocket('ws://172.16.1.7:8000/uya-live-ws');
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
                      {backgroundImage && (
                        <KonvaImage
                          image={backgroundImage}
                          x={0}
                          y={0}
                          width={100 * scaleFactor}
                          height={100 * scaleFactor}
                        />
                      )}
                    </Layer>

                    {/* Layer for player icons */}
                    <Layer>
                      {gameSession.players.map((player) => {
                        const teamIcon = playerIcons[player.team];
                        return (
                          teamIcon && (
                            <KonvaImage
                              key={player.player_id}
                              image={teamIcon}
                              x={player.coord[0] * scaleFactor}
                              y={player.coord[1] * scaleFactor}
                              rotation={cameraRotationTranslation(player.cam_x)}
                              offsetX={15}
                              offsetY={15}
                              width={30}
                              height={30}
                            />
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
