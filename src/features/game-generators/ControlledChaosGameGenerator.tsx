import React, {useState} from "react";

import {
    Alert,
    Box,
    Breadcrumbs,
    Card,
    CardContent,
    Divider,
    Link,
    Snackbar,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";

import {ContentPasteGo, Help, Refresh} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import useWindowDimensions, {computeDeviceScale, ScreenSize} from "../../components/utils/WindowDimensions";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {chance, choice, cyrb128, generateRandomString, sfc32} from "../../components/utils/functions";

const Row = (props: {left: string, right: string, rightColor: string}) => {
    const {left, right, rightColor} = props;

    return <TableRow>
        <TableCell sx={{width: "40vw"}}>
            <Typography>{left}</Typography>
        </TableCell>
        <TableCell align="right" sx={{width: "40vw"}}>
            <Typography color={rightColor}><b>{right}</b></Typography>
        </TableCell>
    </TableRow>
}

const ControlledChaosGameGenertator = () => {

    const navigate: NavigateFunction = useNavigate();

    const [copySnackbarOpen, setCopySnackbarOpen] = useState<boolean>(false);

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    let { gameSeed } = useParams();

    if (!gameSeed) {
        gameSeed = "86bd6936-ffbd-4e9e-961d-273e5d05004c"
    }

    function isCustomMap(mapName: string, customMaps: string[]): boolean {
        return customMaps.includes(mapName);
    }

    function getObjectiveText(gameMode: string): string {
        switch (gameMode) {
            case "Deathmatch":
                return "Kills to Win";
            case "King of the Hill":
                return "Time in Hill";
            case "Capture the Flag":
                return "Caps to Win";
            default:
                return "Kills to Win";
        }
    }

    let vanillaMaps: string[] = [
        "Battledome Tower", "Catacrom Graveyard", "Sarathos Swamp", "Dark Cathedral", "Temple of Shaar",
        "Valix Lighthouse", "Mining Facility", "Torval Ruins", "Tempus Station", "Maraxus Prison", "Ghost Station"
    ]

    let customMaps: string[] = [
        "Ace Hardlight's Suite", "Alpine Junction", "Bakisi Isles", "Blackwater City", "Blackwater Docks", "Canal City",
        "Containment Suite", "Dark Cathedral Interior", "Ghost Hangar", "Ghost Ship", "Hoven Gorge", "Korgon Outpost",
        "Marcadia Palace", "Metropolis MP", "Mountain Pass", "Shaar SP", "Snivelak", "Tyhrranosis"
    ]

    const weaponIcons = {
        dualVipers: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_27.png",
        magmaCannon: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_31.png",
        theArbiter: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_30.png",
        fusionRifle: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_32.png",
        hunterMineLauncher: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_28.png",
        b6Obliterator: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_24.png",
        holoshieldLauncher: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_25.png",
        scorpionFlail: "https://rac-horizon-cdn.s3.amazonaws.com/icons/weapons/tex_26.png",
    }

    const vehicleIcons = {
        hoverbike: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_137.png",
        puma: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_138.png",
        hovership: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_139.png",
        landstalker: "https://rac-horizon-cdn.s3.amazonaws.com/icons/vehicles/tex_141.png",
    }

    var seed: number[] = cyrb128(gameSeed)
    var prng: () => number = sfc32(seed[0], seed[1], seed[2], seed[3]);

    let exterminatorIcon: string = choice([
        "https://rac-horizon-cdn.s3.amazonaws.com/icons/misc/tex_128.png",
        "https://rac-horizon-cdn.s3.amazonaws.com/icons/misc/tex_129.png",
        "https://rac-horizon-cdn.s3.amazonaws.com/icons/misc/tex_130.png",
        "https://rac-horizon-cdn.s3.amazonaws.com/icons/misc/tex_131.png",
        "https://rac-horizon-cdn.s3.amazonaws.com/icons/misc/tex_132.png"
    ], prng)

    let gameType: string = choice(["Deathmatch", "King of the Hill", "Capture the Flag"], prng);
    let map: string = choice([...vanillaMaps].concat([...customMaps]), prng);

    return <Box sx={{pt: 0, pl: 2, pr: 2}}>

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/deadlocked")} sx={{cursor: "pointer"}}>
                Deadlocked
            </Link>
            <Typography color="text.primary">Random Game Generator</Typography>
        </Breadcrumbs>

        <Snackbar
            open={copySnackbarOpen}
            autoHideDuration={2000}
            onClose={() => setCopySnackbarOpen(false)}
            message="Game link copied to clipboard!"
            anchorOrigin={{vertical: "top", horizontal: "right"}}
        />

        <Box sx={{mb: 3}} />

        <Card>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" justifyContent="flex-start">
                        <Box sx={{mr: 3}}>
                            <img
                                src={exterminatorIcon}
                                alt="Exterminator Icon"
                                width={56}
                                height={56}
                            />
                        </Box>
                        <Box>
                            <Typography variant="h5" sx={{mb: 1}}>
                                { screenSize === ScreenSize.Mobile ?
                                    "Random Game Gen" :
                                    "Random Game Generator"
                                }
                            </Typography>
                            <Typography variant="subtitle2" sx={{mb: 3}}>Game Seed: <b>{gameSeed}</b></Typography>
                        </Box>
                    </Stack>
                    <Stack direction="column" justifyContent="flex-start">
                        <Stack direction="row" justifyContent="flex-start">
                            <Tooltip title="Copy Seed Link to Clipboard">
                                <IconButton onClick={() => {
                                    navigator.clipboard.writeText(`https://rac-horizon.com/deadlocked/ccgg/${gameSeed}`)
                                    .then(() => {
                                        setCopySnackbarOpen(true);
                                    })
                                }}>
                                    <ContentPasteGo fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="New Seed">
                                <IconButton onClick={() => navigate(`/deadlocked/ccgg/${generateRandomString(20)}`)}>
                                    <Refresh fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Stack>

                <Divider sx={{mb: 2}}>
                    <Typography variant="h5">Create Game Settings</Typography>
                </Divider>

                <TableContainer>
                    <TableBody>
                        <Row left="Name" right="--" rightColor="text.main" />
                        <Row left="Game Type" right={gameType} rightColor="text.main" />
                        <TableRow>
                            <TableCell sx={{width: "40vw"}}>
                                <Typography>Map</Typography>
                            </TableCell>
                            <TableCell align="right" sx={{width: "40vw"}}>
                                <Stack direction="column" justifyContent="flex-start">
                                    <Typography
                                        color={isCustomMap(map, customMaps) ? "warning.main" : "text.main"}
                                    >
                                        <b>{map}</b>
                                    </Typography>
                                    <Typography
                                        color={isCustomMap(map, customMaps) ? "warning.main" : "text.main"}
                                        variant="caption"
                                    >
                                        {isCustomMap(map, customMaps) ? "(Custom Map)" : "(Vanilla Map)"}
                                    </Typography>
                                </Stack>
                            </TableCell>
                        </TableRow>
                        <Row left="Password" right="--" rightColor="text.main" />
                        <Row
                            left="Radar Blips"
                            right={choice(["On", "Short", "Off"], prng)}
                            rightColor="text.main"
                        />
                        <Row left="Vehicles" right="Off" rightColor="primary.main" />
                        {/* Add an additional "Off" to evenly weight special pickups on and off. */}
                        <Row
                            left="Special Pickups"
                            right={choice(["On", "Off", "Off", "Random"], prng)}
                            rightColor="text.main"
                        />
                        <Row left="Charge Boots" right="Always" rightColor="primary.main" />
                        <Row left="Autospawn Weapons" right="On" rightColor="primary.main" />
                        <Row left="Unlimited Ammo" right="On" rightColor="primary.main" />
                        <Row left="Time Limit" right="10" rightColor="primary.main" />
                        <Row left={getObjectiveText(gameType)} right="None" rightColor="primary.main" />
                        { gameType === "Capture the Flag" && (
                            <>
                                <Row
                                    left="Crazy Mode"
                                    right={choice(["On", "Off"], prng)}
                                    rightColor="text.main"
                                />
                                <Row
                                    left="Flag Return"
                                    right={choice(["On", "Off"], prng)}
                                    rightColor="text.main"
                                />
                                <Row left="Vehicle Carry" right="Off" rightColor="primary.main" />
                            </>
                        )}
                        { gameType === "King of the Hill" && (
                            <>
                                <Row
                                    left="Moving Hill Time"
                                    right={choice(["0" , "30", "60" , "90", "120" , "150", "180"], prng)}
                                    rightColor="text.main"
                                />
                                <Row left="Team Play" right="On" rightColor="primary.main" />
                                <Row
                                    left="Hill Sharing"
                                    right={choice(["Off", "On"], prng)}
                                    rightColor="text.main"
                                />
                                <Row
                                    left="Hill Armor"
                                    right={choice(["0" , "25", "50" , "75"], prng)}
                                    rightColor="text.main"
                                />
                            </>
                        )}
                        { gameType === "Deathmatch" && (
                            <>
                                <Row left="Survivor" right="Off" rightColor="primary.main" />
                                <Row left="Team Play" right="Off" rightColor="primary.main" />
                            </>
                        )}
                        <Row
                            left="Respawn Timer"
                            right={choice(["0", "1", "2", "3", "4", "5", "6"], prng)}
                            rightColor="text.main"
                        />
                    </TableBody>
                </TableContainer>

                <Box sx={{mb: 3}} />

                <Stack
                    direction={screenSize === ScreenSize.Mobile ? "column" : "row"}
                    justifyContent="flex-start"
                    sx={{ml: 0.5}}
                >
                    <Stack direction="column" justifyContent="flex-start" sx={{pt: 1}}>
                        <Typography variant="overline" textAlign="left">Weapons</Typography>
                        <Stack direction="row" justifyContent="flex-start">
                            <img src={weaponIcons.dualVipers} alt="Dual Vipers" style={{opacity: chance(0.50, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={weaponIcons.magmaCannon} alt="Magma Cannon" style={{opacity: chance(0.65, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={weaponIcons.theArbiter} alt="The Arbiter" style={{opacity: chance(0.50, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={weaponIcons.fusionRifle} alt="Fusion Rifle" style={{opacity: chance(0.65, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                        </Stack>
                        <Stack direction="row" justifyContent="flex-start">
                            <img src={weaponIcons.hunterMineLauncher} alt="Hunter Mine Launcher"
                                 style={{
                                     opacity: chance( 0.50, prng) ?
                                         gameType === "Deathmatch" ?
                                             1.0 : 0.0 :
                                         gameType === "Deathmatch" ?
                                             0.15 : 0.0,
                                     margin: 2}}
                                 width={64}
                                 height={64}
                            />
                            <img src={weaponIcons.b6Obliterator} alt="B6 Obliterator" style={{opacity: chance(0.65, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={weaponIcons.holoshieldLauncher} alt="Holoshield Launcher" style={{opacity: chance(0.50, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={weaponIcons.scorpionFlail} alt="Scorpion Flail" style={{opacity: chance(0.50, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                        </Stack>
                    </Stack>
                    <Box
                        sx={{
                            mr: screenSize === ScreenSize.Mobile ? 0 : 5.5,
                            mt: screenSize === ScreenSize.Mobile ? 3 : 0,
                        }}
                    />
                    <Stack direction="column" justifyContent="flex-start" sx={{pt: 1}}>
                        <Typography variant="overline" textAlign="left">Vehicles</Typography>
                        <Stack direction="row" justifyContent="flex-start">
                            <img src={vehicleIcons.hoverbike} alt="Hoverbike" style={{opacity: chance(0.0, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={vehicleIcons.puma} alt="Puma" style={{opacity: chance(0.0, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                        </Stack>
                        <Stack direction="row" justifyContent="flex-start">
                            <img src={vehicleIcons.hovership} alt="Hovership" style={{opacity: chance(0.0, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                            <img src={vehicleIcons.landstalker} alt="Landstalker" style={{opacity: chance(0.0, prng) ? 1.0 : 0.15, margin: 2}} width={64} height={64} />
                        </Stack>
                    </Stack>
                </Stack>

                <Divider sx={{mb: 2, mt: 5}}>
                    <Stack direction="row" justifyContent="center">
                    <Typography variant="h5" sx={{mr: 1}}>
                        Game Rules
                    </Typography>
                    <Tooltip title="Horizon-specific game rules can be accessed once a game is created by pressing START and navigating to the Game Settings Tab.">
                        <Help fontSize="small" sx={{mt: 0.75}} color="info" />
                    </Tooltip>
                    </Stack>
                </Divider>

                <TableContainer>
                    <TableBody>
                        { gameType === "Capture the Flag" && (
                            <>
                                <Row left="Better Flags" right="On" rightColor="primary.main" />
                                <Row left="CTF Halftime" right="On" rightColor="primary.main" />
                                <Row left="CTF Overtime" right="On" rightColor="primary.main" />
                            </>
                        )}
                        { gameType === "King of the Hill" && (
                            <>
                                <Row left="Better Hills" right="On" rightColor="primary.main" />
                            </>
                        )}
                        <Row left="Damage Cooldown" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Fix Wallsniping" right="On" rightColor="primary.main" />
                        <Row left="Healthbars" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Healthboxes" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Nametags" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="New Player Sync" right="On" rightColor="primary.main" />
                        <Row left="Quick Chat" right="On" rightColor="primary.main" />
                        <Row
                            left="V2s"
                            right={choice(["Off", "On", "Always"], prng)}
                            rightColor="text.main"
                        />
                        <Row
                            left="Vampire"
                            right={choice(["Off", "Quarter Heal", "Half Heal", "Full Heal"], prng)}
                            rightColor="text.main"
                        />
                        <Row
                            left="Weapon Packs"
                            right={choice(["Off", "On"], prng)}
                            rightColor="text.main"
                        />
                        <Row left="Weapon Pickups" right="On" rightColor="primary.main" />
                    </TableBody>
                </TableContainer>

                <Divider sx={{mb: 2, mt: 5}}>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h5" sx={{mr: 1}}>
                            Party Rules
                        </Typography>
                        <Tooltip title="Horizon-specific game party rules can be accessed once a game is created by pressing START and navigating to the Game Settings Tab and scrolling to the bottom of the tab.">
                            <Help fontSize="small" sx={{mt: 0.75}} color="info" />
                        </Tooltip>
                    </Stack>
                </Divider>

                <TableContainer>
                    <TableBody>
                        <Row left="Chargeboot Forever" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Headbutt" right={choice(["Off", "Low Damage", "Medium Damage", "High Damage"], prng)} rightColor="text.main" />
                        <Row left="Headbutt Friendly Fire" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Mirror World" right={choice(["Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Player Size" right="Normal" rightColor="primary.main" />
                        <Row left="Rotate Weapons" right={choice(["Off", "Off", "Off", "Off", "Off", "On"], prng)} rightColor="text.main" />
                        <Row left="Weather Override" right="None" rightColor="primary.main" />
                    </TableBody>
                </TableContainer>



                <Alert severity="info" sx={{mt: 4}}>
                    <Typography>
                        Settings in blue are not randomized.
                        There are invisible settings that are applied.
                        Mines are disabled for Capture the Flag and King of the Hill.
                        The maximum respawn time is capped at 6 seconds.
                        There is a 50% chance for Special Pickups to be "Off".
                        Rotate Weapons only has a 1/6 chance of being selected.
                        Cycle Weapons have a slightly higher chance of being enabled.
                    </Typography>
                </Alert>
            </CardContent>
        </Card>

        <Box sx={{mb: screenSize === ScreenSize.Mobile ? 22 : screenSize === ScreenSize.Tablet ? 20 : 16}} />

    </Box>
}

export default ControlledChaosGameGenertator;
