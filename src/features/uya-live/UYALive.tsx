import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { UYALiveGameSession } from "../../utils/Interfaces"; // Import your UYAGameSession interface

const WebSocketURL = "ws://172.16.1.7:8888"; // The WebSocket server address

const UYAOnlineWebSocket: React.FC = () => {
    const [gameSessions, setGameSessions] = useState<UYALiveGameSession[]>([]);
    const [error, setError] = useState<string | null>(null);

    const reconnectDelay = useRef<number>(1000); // Use ref for delay to avoid re-renders

    useEffect(() => {
        let socket: WebSocket;
        let reconnectTimeout: NodeJS.Timeout;

        const connectWebSocket = () => {
            // Open WebSocket connection
            socket = new WebSocket(WebSocketURL);

            // Handle WebSocket messages
            socket.onmessage = (event) => {
                try {
                    // Parse the incoming JSON message, assuming it's a list of UYAGameSession
                    const data: UYALiveGameSession[] = JSON.parse(event.data);
                    setGameSessions(data); // Update the state with the new data
                    reconnectDelay.current = 1000; // Reset reconnect delay after successful connection
                    setError(null); // Clear any error on successful connection
                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                    setError("Failed to parse WebSocket message.");
                }
            };

            // Handle WebSocket errors
            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
                setError("WebSocket connection error.");
            };

            // Handle WebSocket closure and attempt to reconnect
            socket.onclose = () => {
                console.log(`WebSocket connection closed. Reconnecting in ${reconnectDelay.current / 1000} seconds...`);
                setError("WebSocket connection closed. Reconnecting...");
                reconnectTimeout = setTimeout(connectWebSocket, reconnectDelay.current);
                reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000); // Exponential backoff with max delay of 30 seconds
            };
        };

        connectWebSocket(); // Initial connection attempt

        // Clean up WebSocket connection and timeouts on unmount
        return () => {
            clearTimeout(reconnectTimeout);
            if (socket) {
                socket.close();
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount




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
                        gameSessions.map((gameSession) => (
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
                        ))
                    ) : (
                        <Typography>Loading game sessions data...</Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UYAOnlineWebSocket;
