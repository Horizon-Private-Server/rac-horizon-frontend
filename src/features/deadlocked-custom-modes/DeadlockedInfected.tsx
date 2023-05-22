import React from "react";

import { Box, Card, CardContent, Typography, TableCell, TableRow, TableHead, TableContainer, TableBody, Link, Breadcrumbs } from "@mui/material";
import { Backbar } from "../../components/base/Backbar";
import { TextHeading, TextList } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { ChangingImage } from "../../components/base/ChangingImage";
import { MobileFriendlyIconRow, MobileFriendlyTextRow } from "../../components/base/MobileFriendlyRow";

export const DeadlockedInfected = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, paddingBottom: 2}}>
            <Link underline="hover" color="inherit" href="/dl">
                Deadlocked
            </Link>
            <Link underline="hover" color="inherit" href="/dl/custom/modes">
                Custom Game Modes
            </Link>
            <Typography color="text.primary">Infected</Typography>
        </Breadcrumbs>

        <Card>
            <CardContent>

                <TextHeading heading="Infected" variant="h4" />

                <Typography marginBottom={3}>
                    Infected is an early game mode developed by Horizon for Deadlocked.
                    Infected is based on the custom game mode of a similar name from the <code>Halo</code> and <code>COD</code> franchises.
                </Typography>

                <TextHeading heading="Gameplay" variant="h5" />

                <Typography marginBottom={3}>
                    A game of Infected has 2 teams, the survivors and infected.
                    All players start out as survivors.
                    <code>10 seconds</code> after the game begins, a specified number of players, chosen at random, are transformed into infected.
                    The infected do not have access to weapons and have a very small health pool (approximately 1/4 of the health pool of survivors), but they move at <code>400% speed</code> and have a freshly polished Omni-Wrench 8000.
                    The goal of the infected is to hunt the survivors and the goal of the survivors is to run and fend off the infected.
                    If there is even 1 survivor left when the game time ends, the survivor team wins (including only the remaining survivors).
                    If all players are transformed into infected prior to the game time ending, the infected win (everybody wins).
                </Typography>

                <TextHeading heading="Recommended Settings" variant="h5" />

                <Typography marginBottom={3}>
                    After playtesting infected, the Horizon Team has a few settings recommendations to improve your experience.
                    Weapon and Map settings are not included in this table because those allow for more replayability of Infected.
                    These are not hard and fast rules, just recommendations.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>Setting</TableCell>
                            <TableCell>Setting Location</TableCell>
                            <TableCell>Recommendation</TableCell>
                            <TableCell>Rationale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Game Time</TableCell>
                            <TableCell>Game Creation Menu</TableCell>
                            <TableCell>Game Time</TableCell>
                            <TableCell>Game Time</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Hunter Mine Launcher</TableCell>
                            <TableCell>Game Creation Menu</TableCell>
                            <TableCell>Disabled</TableCell>
                            <TableCell>Mines are very broken in infected, as they have auto targeting capabilities and can kill infected in 1-hit.</TableCell>
                        </TableRow>
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Known Exploits (Gameplay Balance & Fairness)" variant="h5" />

                <Typography marginBottom={3}>
                    Because the infected do not have access to a weapon (meaning they cannot move in Lock-Strafe mode), there are glitch and other exploit locations that an infected player cannot reach.
                    A couple of examples, the top of the buildings on Sarathos Swamp or the top of the Stone Pillar near Red Base on Maraxus.
                    Depending on the group you play with, glitching may or may not be permitted.
                    This notice is just to help balance games and make it more fun for everyone.
                </Typography>

            </CardContent>
        </Card>
    </Box>;
}
