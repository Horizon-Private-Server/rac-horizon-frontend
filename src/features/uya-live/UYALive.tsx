import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Stage, FastLayer, Layer, Image as KonvaImage } from 'react-konva';
import { UYALiveGameSession } from "../../utils/Interfaces"; // Assuming this exists
import Konva from 'konva'; // Import Konva types
import bakisiImg from '../../assets/uyalive/bakisi.png';
import playerIconImg from '../../assets/uyalive/player_icon.svg';

const UYAOnlineWebSocket: React.FC = () => {
  const [gameSessions, setGameSessions] = useState<UYALiveGameSession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [playerIcon, setPlayerIcon] = useState<HTMLImageElement | null>(null);
  const layerRef = useRef<Konva.Layer>(null); // Explicitly type the ref to Konva.Layer
  
  const reconnectDelay = useRef<number>(1000);

  const scaleFactor = 5;
    // Inside the useEffect or update logic
    useEffect(() => {
        if (layerRef.current) {
        layerRef.current.batchDraw();  // This will batch draw all elements on the layer at once
        }
    }, [gameSessions]);  // Only call batchDraw when gameSessions change
    
  // Load the background and player icon images
  useEffect(() => {
    const bgImage = new Image();
    bgImage.src = bakisiImg;  // Webpack will resolve this correctly
    bgImage.onload = () => {
      setBackgroundImage(bgImage);
    };

    const pIcon = new Image();
    pIcon.src = playerIconImg;  // Webpack will resolve this correctly
    pIcon.onload = () => {
      setPlayerIcon(pIcon);
    };

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
              {/* Stage for the map and player icons */}
              <Stage width={window.innerWidth} height={window.innerHeight}>
                <FastLayer ref={layerRef}>
                  {/* Background image */}
                  {backgroundImage && (
                    <KonvaImage
                      image={backgroundImage}
                      x={0}  // Set the position for the background image
                      y={0}
                      width={100 * scaleFactor}  // Adjust width as needed
                      height={100 * scaleFactor}  // Adjust height as needed
                    />
                  )}
                </FastLayer>
                <Layer>
                  {/* Players' icons based on coordinates */}
                  {playerIcon &&
                    gameSessions.map((gameSession) =>
                      gameSession.players.map((player) => (
                        <KonvaImage
                          key={player.player_id}
                          image={playerIcon}
                          x={player.coord[0] * scaleFactor}  // Use player's X coordinate
                          y={player.coord[1] * scaleFactor}  // Use player's Y coordinate
                          width={30}  // Adjust size of player icon as needed
                          height={30}
                        />
                      ))
                    )}
                </Layer>
              </Stage>

              {/* Game session data */}
              {gameSessions.map((gameSession) => (
                <Box key={gameSession.world_id} sx={{ mb: 2 }}>
                  <Typography variant="h6">Game Name: {gameSession.name}</Typography>
                  <Typography>Map: {gameSession.map}</Typography>
                  <Typography>Game Mode: {gameSession.game_mode}</Typography>
                  <Typography>World ID: {gameSession.world_id}</Typography>
                  <Typography>
                    Last Updated: {new Date(gameSession.world_latest_update).toLocaleString()}
                  </Typography>

                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Players:
                  </Typography>
                  {gameSession.players.map((player) => (
                    <Box key={player.player_id} sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">{player.username}</Typography>
                      <Typography>Team: {player.team}</Typography>
                      <Typography>Coordinates: {player.coord.join(", ")}</Typography>
                      <Typography>Health: {player.health}</Typography>
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

export default UYAOnlineWebSocket;
