import React, { useEffect, useState, Dispatch} from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import {useAppDispatch} from "../../app/hooks";

import {AxiosResponse} from "axios";
import {getHandler} from "../../utils/Requests";

import {
    UYAOnlinePlayer,
    UYAOnlinePlayerResponse,
    UYAOnlineGame,
    UYAOnlineGameResponse,
} from "../../utils/Interfaces";
import {AnyAction} from "@reduxjs/toolkit";



const UYAOnline: React.FC = () => {
    const [players, setPlayers] = useState<UYAOnlinePlayer[]>([]);
    const [games, setGames] = useState<UYAOnlineGame[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null); // State to track last updated timestamp

    const dispatch: Dispatch<AnyAction> = useAppDispatch();


    useEffect(() => {
        const fetchUpdates = () => {
            getHandler<UYAOnlinePlayerResponse>(
                `/api/uya/online/players`,
                dispatch,
                (response: AxiosResponse<UYAOnlinePlayerResponse, any>) => {
                    console.log(response.data.results);
                    setPlayers(response.data.results);
                    setLastUpdated(new Date().toLocaleString());
                },
                () => {
                    setLastUpdated("Couldn't connect to server!");
                },
                setLoading
            );
            getHandler<UYAOnlineGameResponse>(
                `/api/uya/online/games`,
                dispatch,
                (response: AxiosResponse<UYAOnlineGameResponse, any>) => {
                    console.log(response.data.results);
                    setGames(response.data.results);
                    setLastUpdated(new Date().toLocaleString());
                },
                () => {
                    setLastUpdated("Couldn't connect to server!");
                },
                setLoading
            );
        };
    
        fetchUpdates(); // Fetch the data on the first render
    
        const interval = setInterval(() => {
            fetchUpdates(); // Fetch the data every minute (60000 milliseconds)
        }, 60000);
    
        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [dispatch]);
    
      if (loading) {
        return <CircularProgress />;
      }
    
      return (
        <Container>
          <Grid container spacing={3}>
            {/* Players Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Online Players</Typography>
                  {players.length > 0 ? (
                    players.map((player) => (
                      <Typography key={player.username}>{player.username}</Typography>
                    ))
                  ) : (
                    <Typography>No players online</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
    
            {/* Games Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Active Games</Typography>
                  {games.length > 0 ? (
                    games.map((game) => (
                      <div key={game.name}>
                        <Typography variant="h6">{game.name}</Typography>
                        <Typography>Status: {game.game_status}</Typography>
                        <Typography>Started: {new Date(game.time_started).toLocaleString()}</Typography>
                        <Typography>Map: {game.map}</Typography>
                        <Typography>Game Mode: {game.game_mode}</Typography>
                        <Typography>Time Limit: {game.time_limit}</Typography>
                        <Typography>Players:</Typography>
                        <ul>
                          {game.players.map((player) => (
                            <li key={player.username}>{player.username}</li>
                          ))}
                        </ul>
                        <Typography>Last Updated: {new Date(game.last_updated).toLocaleString()}</Typography>
                      </div>
                    ))
                  ) : (
                    <Typography>No active games</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Last Updated Section */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Last updated at: {lastUpdated ? lastUpdated : "No updates yet"}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

          </Grid>
        </Container>
      );
    };
export default UYAOnline;
