import React from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    TableCell,
    TableRow,
    TableHead,
    TableContainer,
    TableBody,
    Link,
    Breadcrumbs,
    Stack, Alert
} from "@mui/material";
import { TextHeading, TextList } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { ChangingImage } from "../../components/base/ChangingImage";
import { MobileFriendlyIconRow, MobileFriendlyTextRow } from "../../components/base/MobileFriendlyRow";
import SpoilerGuard from "../../components/base/SpoilerGuard";
import {NavigateFunction, useNavigate} from "react-router-dom";
import InteractiveMap from "../../components/InteractiveMap";

export const SurvivalMountainPass = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate: NavigateFunction = useNavigate();

    const MYSTERY_BOX_COST = "10,000";

    const cs = () => {

        if (screenSize === ScreenSize.Desktop) {
            return 64;
        }
        else if (screenSize === ScreenSize.Tablet) {
            return 56;
        }
        else {
            return 48;
        }
    };

    const WARNING_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_14.png"
        alt="Gate Reset Icon"
        width={20}
        height={20}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;

    const GATE_RESET_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_14.png"
        alt="Gate Reset Icon"
        width={cs()}
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;

    const ALL_ALPHA_MODS_ICON = <ChangingImage
        srcList={[
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_41.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_40.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_47.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_42.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png",
            "https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png",
        ]}
        altList={[
            "Speed Mod Icon",
            "Ammo Mod Icon",
            "Aiming Mod Icon",
            "Impact Mod Icon",
            "Area Mod Icon",
            "Jackpot Mod Icon",
            "XP Mod Icon"
        ]}
        interval={1000}
        width={cs()}
        height={cs()}
        variant="sequential"
    />;

    const DREAD_TOKEN_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_35.png" alt="Dread Token Icon" width={cs()} height={cs()} />;
    const UPGRADE_WEAPON_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_37.png" alt="Upgrade Weapon Icon" width={cs()} height={cs()} />;

    const REACTOR_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/misc/tex_129.png" alt="Dread Token Icon" width={cs()} height={cs()} />;

    const INFINITE_AMMO_ICON = <img
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_93.png"
        alt="Infinite Ammo Icon"
        width={cs()}
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;

    const SELF_REVIVE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_80.png" alt="Self-Revive Icon" width={cs()} height={cs()} />;
    const INVISIBILITY_CLOAK_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-item-invisibility-cloak.png" alt="Invisibility Cloak Icon" width={cs()} height={cs()} />;
    const HEALTH_GUN_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-item-health-gun.png" alt="Invisibility Cloak Icon" width={cs()} height={cs()} />;
    const VOX_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_132.png" alt="Vox Icon" width={cs()} height={cs()} />;
    const QUAD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-item-quad.png" alt="Invisibility Cloak Icon" width={cs()} height={cs()} />;
    const SHIELD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-item-shield.png" alt="Invisibility Cloak Icon" width={cs()} height={cs()} />;

    const INSTANT_HEALTH_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_18.png" alt="Instant Health Icon" width={cs()} height={cs()} />;
    const MAX_AMMO_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_93.png" alt="Max Ammo Icon" width={cs()} height={cs()} />;
    const NUKE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_22.png" alt="Nuke Icon" width={cs()} height={cs()} />;
    const FREEZE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_46.png" alt="Freeze Icon" width={cs()} height={cs()} />;
    const DOUBLE_POINTS_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Double Points Icon" width={cs()} height={cs()} />;
    const DOUBLE_XP_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png" alt="Double XP Icon" width={cs()} height={cs()} />;

    const INCREASE_HEALTH_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_18.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const INCREASE_DAMAGE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_12.png" alt="Increase Damage Icon" width={cs()} height={cs()} />;
    const INCREASE_SPEED_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png" alt="Increase Speed Icon" width={cs()} height={cs()} />;
    const INCREASE_CRIT_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/wall-critical-hit-icon.png" alt="Increase Speed Icon" width={cs()} height={cs()} />;

    const SPEED_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png" alt="Speed Mod Icon" width={cs()} height={cs()} />
    const AMMO_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_41.png" alt="Ammo Mod Icon" width={cs()} height={cs()} />
    const AIMING_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_40.png" alt="Aiming Mod Icon" width={cs()} height={cs()} />
    const IMPACT_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_47.png" alt="Impact Mod Icon" width={cs()} height={cs()} />
    const AREA_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_42.png" alt="Area Mod Icon" width={cs()} height={cs()} />
    const JACKPOT_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Jackpot Mod Icon" width={cs()} height={cs()} />
    const XP_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png" alt="XP Mod Icon" width={cs()} height={cs()} />

    const BLESSING_BULL_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-blessing-of-the-bull.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const BLESSING_CLOVER_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-blessing-of-the-clover.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const BLESSING_HARE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-blessing-of-the-hare.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const BLESSING_HUNT_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-blessing-of-the-hunt.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const BLESSING_ROSE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-blessing-of-the-rose.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const BLESSING_VITALITY_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons-custom/sprite-blessing-of-vitality.png" alt="Increase Health Icon" width={cs()} height={cs()} />;

    const WEAPON_UPGRADES = [
        {level: "V1", price: "Free"},
        {level: "V2", price: "8,000 Bolts"},
        {level: "V3", price: "12,000 Bolts"},
        {level: "V4", price: "20,000 Bolts"},
        {level: "V5", price: "40,000 Bolts"},
        {level: "V6", price: "60,000 Bolts"},
        {level: "V7", price: "90,000 Bolts"},
        {level: "V8", price: "150,000 Bolts"},
        {level: "V9", price: "220,000 Bolts"},
        {level: "V10", price: "350,000 Bolts"},

    ]

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <Breadcrumbs aria-label="breadcrumb" sx={{paddingTop: 2, ml: 2}}>
            <Link underline="hover" color="inherit" onClick={() => navigate("/")} sx={{cursor: "pointer"}}>
                Horizon
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/deadlocked")} sx={{cursor: "pointer"}}>
                Deadlocked
            </Link>
            <Link underline="hover" color="inherit" onClick={() => navigate("/survival")} sx={{cursor: "pointer"}}>
                Survival
            </Link>
            <Typography color="text.primary">Mountain Pass</Typography>
        </Breadcrumbs>

        <Alert
            severity="info"
            sx={{mb: 2, mt: 2}}
        >
            SPOILER WARNING: The following guide contains spoilers to Survival and Mountain Pass.
        </Alert>

        <Card>
            <CardContent>

                <TextHeading heading="Survival (Mountain Pass)" variant="h4" />

                <Typography marginBottom={3}>
                    Survival on Mountain Pass represents the third iteration of the Survival mode.
                    Survival is the most ambitious custom game mode developed for Deadlocked on Horizon.
                    Survival takes inspiration from the Deadlocked single-player arena combat, survival games such as COD Zombies, as well as elements from more modern rogue-like games, such as Risk of Rain.
                    Survival pits you against wave after wave of lethal enemies with the goal of surviving as long as possible.
                    The maximum round you've completed is what counts as your high score (e.g., if you die on round 10, you will have a score of 9 rounds).
                </Typography>

                <Typography marginBottom={3}>
                    Survival introduces many new custom stats that are tracked (e.g., the amount of XP you earn and individual weapon kills).
                    Survival is a ranked game mode, however, it is different from all other ranked modes on Deadlocked.
                    Survival rank is earned cumulatively and rank will never be removed as a consequence of poor performance in-game.
                    There are leaderboards for each survival map.
                    Once you max out your rank, you will receive a pop-up in lobby which will optionally let you prestige your survival rank (i.e., returning your rank back to a 1) in exchange for a colored name that appears in lobby and in-game.
                    Survival rank is earned by the number of bolts that are collected, modifiers like Jackpot Mod and Double Bolts will accelerate your ranking.
                </Typography>

                <TextHeading heading="Mountain Pass Speedrunning" variant="h5" />

                <Typography marginBottom={3}>
                    Mountain Pass supports a built-in, ranked speedrun timer.
                    The speedrun timer starts when you first gain control of your character and automatically stops upon completion of round 50.
                    The elapsed time (ET) is recorded as your score.
                    Your best score will be posted on the Horizon leaderboards.
                    Solo and Co-Op ranked leaderboards are tracked independently.
                    Co-Op leaderboards award the same ET for every member of the party.
                </Typography>

                <TextHeading heading="Gameplay" variant="h5" />

                <Typography marginBottom={3}>
                    As you defeat enemies in each wave, you will earn both bolts and XP (visible as a bar above your health).
                    Bolts and XP is shared between all players.
                    Every time your XP bar fills up, you will receive a Dread Token (visible below your bolt count).
                    Bolts are used to upgrade weapons, roll the mystery box and prestige your weapons.
                    Dread Tokens are used to open doors and purchase wall power-ups.
                    Spend your bolts and Dread Tokens wisely to make yourself more powerful so you can fight off the horde!
                </Typography>

                <Typography marginBottom={1}>
                    The more enemies you defeat, the more they evolve.
                    Enemy evolution is not tied to the round number, it's solely based on how many enemies have been killed!
                    Additionally, after every 25 waves, all enemies are mutated, greatly furthering their evolution!
                    Enemy mutations can be categorized into the following stats:
                </Typography>

                <Typography>
                    <b>Health</b> - The total amount of damage required to kill the enemy. This stat scales without bound.
                </Typography>

                <Typography>
                    <b>Damage Output</b> - The total amount of damage an enemy deals to the player. This stat also scales without bound.
                </Typography>

                <Typography>
                    <b>Movement Speed</b> - The speed at which enemies will charge the player. This stat is capped near the player's maximum speed.
                </Typography>

                <Typography marginBottom={3}>
                    <b>Reaction Time</b> - The amount of time it takes an enemy to swing at the player when it gets in range. This stat decreases to 0.0s (instantaneous attacks) as the enemy evolves.
                </Typography>

                <Typography marginBottom={3}>
                    After the end of each wave there is a 45-second intermission period.
                    Use this time to buy weapon upgrades, configure alpha mods, perform map-specific actions, roll the Mystery Box and pickup ammo.
                    This intermission period can be optionally skipped by the host of the game.
                </Typography>

                <Typography marginBottom={3}>
                    Mountain Pass is the first survival map to feature a full Exterminator Boss Battle.
                    Every 25 rounds you will face off against stronger and stronger iterations of <b>Reactor</b> and his minions.
                    After defeating the boss, there will be no timer to count down towards the next round.
                    The host of the game must manually start the next round.
                    This time may be used to take a break and better equip your character for the onslaught to come!
                </Typography>

                <Typography marginBottom={3}>
                    Mountain Pass also features damage numbers as a new mechanic.
                    Damage numbers pop up briefly for each hit on an enemy.
                    Normal damage numbers appear yellow and critical hits appear as red.
                </Typography>

                <TextHeading heading="Weapons and Alpha Mods" variant="h5" />

                <Typography marginBottom={3}>
                    Weapons can be picked up all around the map.
                    Weapons that are picked up always start out at a base level of V1.
                    Picking up a weapon you already have will refill your ammo for that weapon.
                    Some weapons are locked behind token doors and won't be available at the start of the game.
                    Bolts are used to upgrade weapons at the weapon vendor.
                    Weapons can be upgraded all the way to V10.
                    Every time you upgrade your weapon, you will also receive a <b>random</b> Alpha Mod.
                    These mods improve the performance of your weapon (e.g., ammo mod gives you more ammo, area mod increases the explosion radius of your weapon, impact mod stuns enemies more effectively, etc.).
                </Typography>

                <Stack direction="row" justifyContent="flex-start" sx={{mb: 1}}>
                    {WARNING_ICON}
                    <Typography sx={{ml: 1}}>
                        <b>IMPORTANT: ALPHA MODS ARE NOT AUTOMATICALLY APPLIED TO YOUR WEAPON WHEN YOU UPGRADE IT!!!</b>
                    </Typography>
                </Stack>

                <Typography marginBottom={3}>
                    In order to apply an Alpha Mod, you need to visit Big Al's station elsewhere on the map.
                    Unlike in single player, alpha mod slots aren't locked based on weapon level (i.e., you can equip 10 alpha mods on a V1 weapon if you have enough alpha mods).
                    You can also put any alpha mod on any weapon.
                </Typography>

                <TextHeading heading="Alpha Mod List" variant="h6" />

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Alpha Mod</Typography></TableCell>
                            { screenSize !== ScreenSize.Mobile && ( <TableCell><Typography fontWeight="bold">Icon</Typography></TableCell> )}
                            <TableCell><Typography fontWeight="bold">Effect</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Applicable Weapons</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow
                            firstCellText="Speed Mod"
                            icon={SPEED_MOD_ICON}
                            remainingCells={["Increases the rate of fire of a given weapon.", "ALL"]}
                        />
                        <MobileFriendlyIconRow
                            firstCellText="Ammo Mod" icon={AMMO_MOD_ICON}
                            remainingCells={["Increases the maximum ammo count of a given weapon by 5 shots (except for the Dual Vipers, which receive 50 extra shots).", "ALL"]}
                        />
                        <MobileFriendlyIconRow
                            firstCellText="Aiming Mod" icon={AIMING_MOD_ICON}
                            remainingCells={["Increases the auto targeting ability of a given weapon.", "Dual Vipers, The Arbiter, B6-Obliterator"]}
                        />
                        <MobileFriendlyIconRow
                            firstCellText="Impact Mod" icon={IMPACT_MOD_ICON}
                            remainingCells={[`When equipped, it makes your weapon flinch enemies more effectively, applying the knockback effect that scales with the number of impact mods you have.`, "ALL"]}
                        />
                        <MobileFriendlyIconRow
                            firstCellText="Area Mod" icon={AREA_MOD_ICON}
                            remainingCells={[`Increases the explosion radius on weapons that have an Area of Effect (AoE).`, "Dual Vipers, Magma Cannon, The Arbiter, B6-Obliterator, Hunter Mine Launcher, Scorpion Flail"]}
                        />
                        <MobileFriendlyIconRow
                            firstCellText="Jackpot Mod" icon={JACKPOT_MOD_ICON}
                            remainingCells={[`Increases the amount of bolts earned from defeating enemies with the weapon it is equipped on. The increased number of bolts is NOT shared with teammates.`, "ALL"]}
                        />
                        <MobileFriendlyIconRow
                            firstCellText="XP Mod" icon={XP_MOD_ICON}
                            remainingCells={[`Increases the amount of XP earned from defeating enemies with the weapon it is equipped on. Since XP is not shared, this mod does not affect teammates.`, "ALL"]}
                        />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Upgrading Weapons" variant="h6" />

                <Typography marginBottom={3}>
                    Weapons can be upgraded at the weapon vendor.
                    When you upgrade a weapon, its current level will be displayed as part of the weapon name in the top left of the screen.
                    Additionally, the weapon's progress bar will start to fill up.
                    V2-V9 weapons offer only damage upgrades.
                    Upon upgrading to V10, your weapon will get a large boost in performance (both in terms of damage and effectiveness).
                </Typography>

                <TextList
                    items={[
                        <Typography>The <b>Dual Vipers</b> become the <b>Dual Raptors</b> and all bullets ricochet off of enemies and walls for extra damage.</Typography>,
                        <Typography>The <b>Magma Cannon</b> becomes the <b>Vulcan Cannon</b> and has a much larger AoE. Area Mods now reduce damage falloff for shots.</Typography>,
                        <Typography><b>The Arbiter</b> becomes <b>The Silencer</b> and fires 3 rockets instead of 1.</Typography>,
                        <Typography>The <b>B-6 Obliterator</b> becomes the <b>B-11 Vaporizer</b> and it's explosion radius grows greatly.</Typography>,
                        <Typography>The <b>Hunter Mine Launcher</b> becomes <b>the Stalker Mine Launcher</b> and all mines that explode spawn an extra mine. (Note: The Stalker Mine Launcher only spawns 1 extra mine as opposed to single player, this is for performance reasons and to prevent game crashes).</Typography>,
                        <Typography>The <b>Fusion Rifle</b> becomes the <b>Anti-Matter Rifle</b> the color of the shot changes and damage is increased greatly</Typography>,
                        <Typography>The <b>Holoshield Launcher</b> becomes the <b>Omnishield Launcher</b> and the duration of each shield increases as well as damages received for coming in contact with the shield.</Typography>,
                        <Typography>The <b>Scorpion Flail</b> becomes the <b>Leviathan Flail</b> and a damage trail is added when the flail hits the ground. This trail extends forwards and backwards across the map and allows for long-range fighting with the flail.</Typography>
                    ]}
                    ordered={false}
                />

                <Box sx={{mb: 3}} />

                <Typography marginBottom={2}>
                    As you purchase weapon upgrades at the vendor, the price will increase greatly from version to version.
                    The total cost to get to a V10 weapon is <code>950,000 Bolts</code>.
                    The following table defines the base cost per weapon level.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Weapon Level</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Cost</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {WEAPON_UPGRADES.map((weapon) => {
                            return <TableRow key={weapon.level}>
                                <TableCell><Typography>{weapon.level}</Typography></TableCell>
                                <TableCell><Typography>{weapon.price}</Typography></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Weapon Prestige" variant="h6" />

                <Typography marginBottom={2}>
                    Once you upgrade your weapon to a V10, you will gain the ability to prestige your weapon.
                    Prestiging a weapon reverts it back to a V1, but adds a damage multiplier to the base damage that stacks with weapon upgrades and wall pickups.
                    Prestiging a weapon requires a large quantity of bolts up-front and can be dangerous if you aren't prepared.
                    A V1 weapon of a higher prestige typically has lower damage output than the V10 it came from.
                    Weapons can be prestiged at the prestige vendor in the back right of the map.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Prestige</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Cost</Typography></TableCell>
                            { screenSize !== ScreenSize.Mobile && (<TableCell><Typography fontWeight="bold">Damage Multiplier</Typography></TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <MobileFriendlyTextRow
                            firstCellText={<Typography fontWeight="bold">Base Weapon</Typography>}
                            descriptionText={<Typography fontWeight="bold">Free</Typography>}
                            remainingCells={[<Typography fontWeight="bold">1x Damage</Typography>]}
                        />

                        <MobileFriendlyTextRow
                            firstCellText={<Typography fontWeight="bold" color="lightblue">Prestige 1</Typography>}
                            descriptionText={<Typography fontWeight="bold">100,000 Bolts</Typography>}
                            remainingCells={[<Typography fontWeight="bold">2x Damage</Typography>]}
                        />

                        <MobileFriendlyTextRow
                            firstCellText={<Typography fontWeight="bold" color="green">Prestige 2</Typography>}
                            descriptionText={<Typography fontWeight="bold">200,000 Bolts</Typography>}
                            remainingCells={[<Typography fontWeight="bold">4x Damage</Typography>]}
                        />

                        <MobileFriendlyTextRow
                            firstCellText={<Typography fontWeight="bold" color="purple">Prestige 3</Typography>}
                            descriptionText={<Typography fontWeight="bold">400,000 Bolts</Typography>}
                            remainingCells={[<Typography fontWeight="bold">6x Damage</Typography>]}
                        />

                        <MobileFriendlyTextRow
                            firstCellText={<Typography fontWeight="bold" color="red">Prestige 4</Typography>}
                            descriptionText={<Typography fontWeight="bold">700,000 Bolts</Typography>}
                            remainingCells={[<Typography fontWeight="bold">8x Damage</Typography>]}
                        />

                        <MobileFriendlyTextRow
                            firstCellText={<Box sx={{filter: "drop-shadow(0px 0px 12px #dfdfdf)"}}><Typography fontWeight="bold" color="black">Prestige 5</Typography></Box>}
                            descriptionText={<Typography fontWeight="bold">1,000,000 Bolts</Typography>}
                            remainingCells={[<Typography fontWeight="bold">10x Damage</Typography>]}
                        />

                    </TableBody>
                </TableContainer>

                <TextHeading heading="Dread Tokens, Wall Powerups and Map Unlocks" variant="h5" />

                <Typography marginBottom={2}>
                    Dread Tokens are used to purchase wall power-ups as well as unlock the map.
                    Wall power-ups increase the overall stats and effectiveness of your character as opposed to the stats of a specific weapon.
                    Wall power-ups do not stay in the same place and will move after 15 purchases.
                    The remaining uses of a wall power-up are displayed in the pop-up text near the pickup.
                    As a wall power-up is purchased from a single location, it will gradually become more transparent until it disappears altogether.
                    Wall power-up locations are defined per-map and do not change, but the power-up at a specific location will always be random.
                    Some power-up locations are locked behind doors and require investing tokens to reach.
                    The following table includes all wall power-ups available.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Wall Powerup</Typography></TableCell>
                            {screenSize !== ScreenSize.Mobile && ( <TableCell><Typography fontWeight="bold">Icon</Typography></TableCell> )}
                            <TableCell><Typography fontWeight="bold">Effect</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow firstCellText="Increase Health" icon={INCREASE_HEALTH_ICON} remainingCells={[
                            "Increases your maximum health by 5 units per-token. (Note: This does not restore health, so you will have to break a health crate to restore your health).",
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Increase Damage" icon={INCREASE_DAMAGE_ICON} remainingCells={[
                            "Increases your overall damage output (with every weapon) by 8% per-token.",
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Increase Speed" icon={INCREASE_SPEED_ICON} remainingCells={[
                            "Increases your base movement speed by 2.5% per-token.",
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Critical Damage" icon={INCREASE_CRIT_ICON} remainingCells={[
                            "Increases the chance of applying a critical hit to an enemy by 1% per-token (100% maximum). Critical hits deal 300% damage. Critical hits stack with damage upgrades as well as modifiers such as Quad.",
                        ]} />
                    </TableBody>
                </TableContainer>

                <Typography marginBottom={2} marginTop={3} >
                    Dread Tokens are more easily earned in early rounds, but become more scarce in later rounds.
                    The XP curve for earning Dread Tokens grows linearly at first, then becomes flat after 50 total tokens have been earned.
                </Typography>

                <TextHeading heading="Optimal Damage Strategy" variant="h6" />

                <SpoilerGuard weight={5}>
                    <Typography marginBottom={3}>
                        With the introduction of critical damage in addition to weapon damage, there are better and worse strategies for optimizing damage.
                        The calculations performed here optimize the maximum amount of damage based on the total aggregate damage done over <i>n</i> shots where <i>n</i> is large enough to prevent statistical anomalies.
                        The opimal strategy is to collect <code>38</code> damage upgrades before collecting the first critical damage upgrade.
                        Once 38 damage upgrades are obtained, alternate between damage and critical hit chance (one-to-one) until critical hit chance is 100%.
                        Once critical hit chance is at 100% keep collecting damage exclusively.
                    </Typography>
                </SpoilerGuard>

                <TextHeading heading="Enemies" variant="h5" />

                <Typography marginBottom={2}>
                    As you progress, new and more dangerous types of enemies will start to appear.
                    Mountain Pass does not feature special rounds, only the Boss Round every 25 rounds.
                </Typography>


                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Enemy</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
                            { screenSize !== ScreenSize.Mobile && (
                                <TableCell><Typography fontWeight="bold">First Appears On</Typography></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyTextRow
                            firstCellText="Swarmer"
                            descriptionText={
                                <Typography>
                                    An ankle-biter pest!
                                    Swarmers are great distractions, but have very little heath and do very little damage.
                                    Swarmers have the ability to dodge projectile weapons (i.e., Dual Vipers, B6-Obliterator, The Arbiter and Hunter Mine Launcher).
                                </Typography>
                            }
                            remainingCells={[
                                "Round 1",
                            ]}
                        />
                        <MobileFriendlyTextRow
                            firstCellText="Robot Zombie"
                            descriptionText={
                                <Typography>
                                    A standard robot zombie from Catacrom IV.
                                    These are balanced enemies which have a moderate movement speed, damage output and health pool.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 1",
                            ]}
                        />
                        <MobileFriendlyTextRow
                            firstCellText="Tremor"
                            descriptionText={
                                <Typography>
                                    The little cousins of The Eviscerator.
                                    Tremors have the highest initial movement speed out of any enemy but a smaller damage output and lower health pool.
                                    Unlike in single player, the survival tremors do not have a long-range ground attack.
                                    Tremors can be deadly in large groups as their rapid hits can prevent chargebooting away.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 6",
                            ]}
                        />
                        <MobileFriendlyTextRow
                            firstCellText="Reaper"
                            descriptionText={
                                <Typography>
                                    Reapers are lumbering, slow moving pain machines that hold a grudge.
                                    Reapers have the highest base damage outside of bosses.
                                    If a player shoots a Reaper, it will become enraged and chase down the player with tunnel vision.
                                    Enraged Reapers will completely ignore all other players but except for their target.
                                    If a Reaper manages to injure or kill their target they will settle down.
                                    An Enraged Reaper can see through an invisibility cloak.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 15",
                            ]}
                        />
                        <MobileFriendlyTextRow
                            firstCellText="Radioactive Robot Zombie"
                            descriptionText={
                                <Typography>
                                    Radioactive robot zombies serve as Reactor's minions.
                                    These robot zombie variants feature slightly higher base damage and health then their ordinary counterparts.
                                    Additionally, being hit by these enemies will result in the acid effect being applied to your character.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 25 (Only Spawned by Reactor or Proto-swarmers)",
                            ]}
                        />
                        <MobileFriendlyTextRow
                            firstCellText="Proto-Swarmer"
                            descriptionText={
                                <Typography>
                                    Proto-swarmers (also affectionately called A**-Seeking Missiles), are a late-game mutation of regular swarmers.
                                    The have massive health pools and have the ability to lunge great distances at players.
                                    Just like their smaller cousins, they will attempt to dodge all incoming projectiles.
                                    The only difference is that due to their size, their dodges are quite a bit more effective!
                                    On death, a Proto-Swarmer will spawn additional enemies completely at random (including brand new Proto-swarmers)!
                                </Typography>
                            }
                            remainingCells={[
                                "Round 40",
                            ]}
                        />
                    </TableBody>
                </TableContainer>

                <TextHeading
                    heading={
                        <Stack direction="row" justifyContent="flex-start">
                            {REACTOR_ICON}
                            <Stack direction="column" justifyContent="flex-end" sx={{ml: 2}}>
                                <Typography variant="h5">Reactor Boss Battle</Typography>
                            </Stack>
                        </Stack>
                    }
                    variant="h5"
                />

                <Typography marginBottom={3}>
                    Every 25 rounds will be a boss round where you and your allies must fight Reactor and his minions.
                    Reactor has 4 attack patterns: A melee swipe whenver he is in range, A high-damage charge attack telegraphed by Reactor rubbing his left foot on the ground, A fire trail attack telegraphed by Reactor putitng his hands together and finally a ground pound telegraphed by reactor jumping in the air.
                    At the start of the fight, Reactor will only run at a target and attempt to swipe at them.
                    After 20% of his health is gone, Reactor will start his charge attack.
                    If Reactor hits a wall during his charge attack, he may be stunned for a few seconds (indicated by dialog in-game).
                    While Reactor is stunned, he takes double damage.
                    After 40% of his health is gone, Reactor will start alternative between his charge attack and fire trail.
                    The fire trails will persist until Reactor makes new fire trails or Reactor is killed.
                    Active fire trails are a map hazard for players.
                    After 60% of his health is gone, Reactor will start using his ground pound attack.
                    Reactor's ground pound attack has a large area of effect and also spawns in his radioactive minions.
                </Typography>

                <TextHeading heading="Reactor Tips & Tricks" variant="h6" />

                <SpoilerGuard weight={5}>
                    <Typography marginBottom={3}>
                        On higher rounds some of the techniques you could get away with will no longer work due to Reactor's high damage output and speed.
                        For example, you won't be able to jump to avoid Reactor's charge attack or chargeboot away.
                        You will be forced to hide behind a wall of sufficient size.
                        It is advised to allow him to charge into a wall to take advantage of the double damage.
                        If you have invested in Blessing of the Clover, you should take advantage of the Mystery Box to arm yourself with totems and power-ups to defeat Reactor.
                        When playing in a group, it may be worthwhile to have a person dedicated to rolling the Mystery Box.
                    </Typography>

                    <Typography marginBottom={3}>
                        It is recommended to use the inside of the cave as your arena due to the support pillars.
                        It much easier to quickly find cover.
                        It is strongly recommended to avoid using the Scorpion Flail against Reactor.
                        Dual Vipers also have greatly reduced efficiency due to their potential DPS.
                        The best weapons to use are The Arbiter, B6-Obliterator, Hunter Mine Launcher, Fusion Rifle and (V10) Magma Cannon.
                        Holoshields are also very useful for slowing Reactor's movement, especially if you need to put distance between you and him.
                    </Typography>

                </SpoilerGuard>

                <TextHeading heading="Enemy Bonus Drops" variant="h5" />

                <Typography marginBottom={3}>
                    Whenever an enemy is defeated, there is a very small chance that it will drop one of 6 possible bonus drops.
                    Bonus drops can be a game changer and can even save a run if used properly.
                    The following table describes each bonus drop.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Bonus Drop</Typography></TableCell>
                            {screenSize !== ScreenSize.Mobile && ( <TableCell><Typography fontWeight="bold">Icon</Typography></TableCell> )}
                            <TableCell><Typography fontWeight="bold">Effect</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow
                            firstCellText="Instant Health" icon={INSTANT_HEALTH_ICON}
                            remainingCells={[
                                "Fully heals all players when picked up. If a player is downed (i.e., dead but still has a timer), this pickup will revive them at no cost (but their death tally will increase and they will be more expensive if downed again)."
                            ]}
                        />
                        <MobileFriendlyIconRow firstCellText="Max Ammo" icon={MAX_AMMO_ICON} remainingCells={["Fills the ammo reserves for all weapons for all players when picked up."]} />
                        <MobileFriendlyIconRow firstCellText="Nuke" icon={NUKE_ICON} remainingCells={[
                            `Kills all enemies currently on the map.
                            All players will receive bolts for each enemy killed.
                            The player who picks up the nuke pickup will receive all of the XP and kill count for all enemies killed.
                            No bolt modifications (Jackpot Mod) or XP modifications (XP Mod) will be applied for enemies killed by a nuke.
                            If Double Points or Double XP is active, the bolts and XP will be doubled as if the enemies were killed normally (with no Jackpot or XP Mods).`
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Freeze" icon={FREEZE_ICON} remainingCells={[
                            `Freezes all enemies on the screen for 10 seconds.
                            Prevents any new enemies from spawning.`
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Double Bolts" icon={DOUBLE_POINTS_ICON} remainingCells={[
                            `Double Points acts a global Jackpot Mod which doubles all bolts received from enemies (does not apply to round bonuses).
                            Double Points stacks with Jackpot Mods on weapons and is applied after Jackpot Mods double the total number of bolts from enemies.`
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Double XP" icon={DOUBLE_XP_ICON} remainingCells={[
                            `Double XP acts a global XP Mod which doubles all XP received.
                            Double XP stacks with XP Mods on weapons and is applied after XP Mods to double the total amount of XP earned.`
                        ]} />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Death and Totems" variant="h5" />

                <TextHeading heading="Totems" variant="h6" />

                <Typography marginBottom={3}>
                    There are 3 totems available for use in survival: <b>Self-Revive</b>, <b>Health Gun</b> and <b>Invisibility Cloak</b>.
                    If a player has a totem, its icon will appear at the bottom-left corner of the screen as well as the button to activate it if it requires manual activation.
                </Typography>

                <Typography marginBottom={3}>
                    <b>Self-Revive</b> operates just as its name suggests.
                    If a player is downed, they are able to revive with all of their weapons, mods and bolts without needing to be revived.
                    Additionally, the self-revive creates a knockback explosion around the player so they aren't immediately trapped when they revive.
                    If the player dies in water or in an area they aren't supposed to be in, they will respawn at the start of the map.
                </Typography>

                <Typography marginBottom={3}>
                    The <b>Health Gun</b> is a single-use grenade launcher that fires a healing orb.
                    This healing orb can be used to full heal anyone within it's detonation radius.
                    The healing ord can also be used to revive dead players instead of spending bolts to revive them (Note: Their death tally still increases and they become more expensive on the next death).
                </Typography>

                <Typography marginBottom={3}>
                    The <b>Invisibility Cloak</b> is a player-activated totem that turns the player completely invisible to ALL enemies for a period of 30 seconds.
                    All enemies will stop tracking the player and the player is free to damage them for the duration of the 30 seconds.
                    It is recommended to use this strategically or as a last resort if the player is about to die.
                    The invisibility cloak does not protect against incidental or accidental damage (i.e., if the player has the acid debuff applied, it will still continue to drain their health even with the invisibility cloak active, also, if an enemy is after another player and manages to hit the invisible player, damage will still be taken).
                    While active, the invisibility cloak will impart the ghost effect to the player using it.
                </Typography>

                <TextHeading heading="Death, Revival and Consequences" variant="h6" />

                <Typography marginBottom={3}>
                    Due to the nature of survival, death is inevitable.
                    That being said, with the right preparation, death doesn't have to "stick".
                    There are ways to cheat death and use teamwork to survive.
                </Typography>

                <Typography marginBottom={3}>
                    When playing solo, death means the end of your run.
                    In order to make the solo experience more fun (since there is no one else to revive you), you will always start out with a single Self-Revive totem.
                    Once that totem is consumed, you will have to get a new one from the mystery box like normal.
                    Once you fall with no totem in-hand, your run is over.
                </Typography>

                <Typography marginBottom={3}>
                    Multiplayer is a bit different and allows for more variety.
                    If a player falls in multiplayer, they are not "dead", but instead in a "downed" or "bleeding-out" state.
                    Once downed, there will be a 60 second timer that begins to count over their body.
                    Any other player can revive the downed player if they can reach them in time.
                    Players are revived using the Down directional button on the D-Pad.
                </Typography>

                <Typography marginBottom={3}>
                    Once a downed player is reached, the reviving player will need to press the down button on their D-Pad while staying very close to the downed player's body.
                    A 5-second revive timer will start to tick down and the reviving player must keep the revive button held down, without interruption, for the full revive timer to revive a player.
                    Once the revive timer reaches 0, the downed player will be revived and a large, green explosion will apply knockback to all nearby enemies (like if a Self-Revive Totem is used).
                    While reviving a downed player, it is still possible to shoot weapons at or near the ground and perform a single-jump to evade enemies.
                    It is strongly recommended to have backup when reviving players and use holoshields to delay enemies.
                    So long as you start reviving a downed player before their bleed-out timer ends, they can still be revived.
                    If you see the revive timer, you can still revive them.
                    Don't give up if you reach a downed player and catch them with 1 or 2 seconds left.
                    If a player is downed more than once in a single wave, 10 seconds will be shaved off of their bleed-out timer for each additional time they are downed (down to a minimum of 10 seconds).
                    This bleed-out timer penalty is reset to 60 seconds for all players at the start of each new round.
                </Typography>

                <Typography marginBottom={3}>
                    If a player is downed and is not revived within 60 seconds, they are considered dead.
                    That player will only be able to spectate for the remainder of the round and will only be able to respawn at the end of the round.
                    Additionally, the player will no longer receive shared bolts (including the round bonus) once downed or fully dead.
                    The player will also lose all of their weapon upgrades and equipped weapon mods if they fully die.
                    Weapons that are prestiged will return to V1 of their current prestige.
                </Typography>

                <Typography marginBottom={3}>
                    If a player fully dies, it could spell disaster for your run since they will not have the firepower to help in the next round.
                    <b> NOTE</b>: If a player is downed and the wave ends, it will count as if they fully died, and their weapons will be reset.
                    Be very wary towards the end of a wave if a player is downed, accidentally picking up a Nuke Bonus Pickup could seal their fate.
                </Typography>

                <TextHeading heading="The Mystery Box" variant="h5" />

                <Typography marginBottom={3}>
                    The Mystery Box is a slot machine that you can gamble at to gain valuable perks.
                    There are perks exclusive to the Mystery Box that can greatly improve your ability to survive.
                    Each roll of the Mystery Box costs <code>{MYSTERY_BOX_COST} Bolts</code>.
                    All positive items need to be claimed by the player, if a player fails to pick up the item, it will be forfeited!
                    There are also Zonks that you can roll at the Mystery Box which can hinder your gameplay, so roll with caution!
                </Typography>

                <Typography marginBottom={3}>
                    The following table describes the contents of the Mystery Box and the likelihood of rolling a certain item.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Mystery Box Item</Typography></TableCell>
                            {screenSize !== ScreenSize.Mobile && ( <TableCell><Typography fontWeight="bold">Icon</Typography></TableCell> )}
                            <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Roll Chance</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Clover Roll Chance</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow firstCellText="Alpha Mod" icon={ALL_ALPHA_MODS_ICON} remainingCells={["Gives the player 1 random Alpha Mod.", "29%", "16.5%"]} />
                        <MobileFriendlyIconRow firstCellText="Dread Token" icon={DREAD_TOKEN_ICON} remainingCells={["Gives the player 1 Dread Token.", "15%", "8.5%"]} />

                        <MobileFriendlyIconRow
                            firstCellText="Upgrade Weapon" icon={UPGRADE_WEAPON_ICON}
                            remainingCells={["Gives the player 1 weapon upgrade on their currently equipped weapon. This upgrade applies at any level. Upgrading a weapon at V10 has no effect.", "8%", "15%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Quad" icon={QUAD_ICON}
                            remainingCells={["Once claimed, activates the Quad Damage effect (output damage is quadrupled) for all players for 60 seconds.", "5%", "7%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Shield" icon={SHIELD_ICON}
                            remainingCells={["Once claimed, activates the Allied Shield effect (incoming damage is quartered) for all players for 60 seconds.", "5%", "7%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Infinite Ammo" icon={INFINITE_AMMO_ICON}
                            remainingCells={["Once claimed, grants all players infinite ammo for 60 seconds. Once the infinite ammo effect wears off, it fully replenishes all ammo for each player.", "5%", "12%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Health Gun" icon={HEALTH_GUN_ICON}
                            remainingCells={["Once claimed, grants the player the Health Gun Totem. Heath Gun requires manual activation. Once activated, the player pulls out the Heath Gun (EMP Launcher) and has a single shot which can full heal or revive players.", "5%", "10%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Self-Revive" icon={SELF_REVIVE_ICON}
                            remainingCells={["Once claimed, grants the player a Self-Revive Totem. Only 1 Self-Revive Totem may be held at a time. Once picked up, this will replace an Invisibility Cloak Totem, if held.", "5%", "10%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Invisibility Cloak" icon={INVISIBILITY_CLOAK_ICON}
                            remainingCells={["Once claimed, grants the player an Invisibility Cloak Totem. Only 1 Invisibility Cloak Totem may be held at a time. Once picked up, this will replace a Self-Revive Totem, if held.", "5%", "10%"]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Vox" icon={VOX_ICON}
                            remainingCells={[
                                `Rolling a Vox or "Getting Voxxed" is equivalent to the "Teddy Bear" item in COD Zombies.
                                 Upon rolling a Vox, the Mystery Box will disappear for the remainder of the round and appear in a new spot at the start of the next round.
                                 A new round starts when the last enemy of a round is defeated.
                                 If a player rolls Vox during the intermission period, the mystery box will not appear again until the following round is complete.`,
                                "15%", "3%"
                            ]}
                        />

                        <MobileFriendlyIconRow
                            firstCellText="Gate Reset"
                            icon={GATE_RESET_ICON}
                            remainingCells={["Rolling a Gate Reset forcibly locks an open gate. This gate will need to be re-purchased using Dread Tokens at its original price. Rolling a Gate Reset late-game could be a run-killer.", "3%", "1%"]}
                        />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Demon Bells" variant="h5" />

                <Typography marginBottom={3}>
                    The Demon Bells are an accessibility and quality of life feature added to survival.
                    Based on the synonymously named mechanic appearing in <code>Sekiro: Shadows Die Twice</code>, these bells are designed to optionally increase the challenge of survival.
                    Because there is only 1 difficulty for survival, the earlier waves may be too easy and slow for more experienced players.
                    The Demon Bells forcibly increase the spawn rate of enemies.
                    There are 3 Demon Bells in total, each proportionally increasing the spawn rate of enemies.
                    After every 10 waves, one of the Demon Bells is forcibly turned on to ramp up the difficulty.
                    Starting at wave 30, all Demon Bells are active without player intervention.
                    The Demon Bells do <b>NOT</b> make enemies more difficult to defeat, they only increase the spawn rate of enemies and proximity of enemy spawns.
                    Completing a wave in which a Demon Bell was activate results in a slightly larger round bonus (proportional to the number of Demon Bell activated).
                    This bonus is increased if multiple Demon Bells are activated.
                    The Demon Bells are a one-time activation and stay on for the duration of the run.
                </Typography>

                <TextHeading heading="Multiple Teams" variant="h5" />

                <Typography marginBottom={3}>
                    Unlike previous versions, the current version of survival allows players to be on any team.
                    There is no friendly fire between teams, nor do other players activate an auto-target for your character.
                    Additionally, holoshields from players on different teams do not block shots.
                    When multiple teams are used, team colors are used in parts of the game (e.g., the color of the Power node on Orxon and the hue of Bonus Pickup Drops from enemies).
                    There are also other cool easter eggs when using multiple team colors, you can find those out for yourself!
                </Typography>

                <TextHeading heading="Blessings of the Gods" variant="h5" />

                <SpoilerGuard weight={10}>

                    <Typography marginBottom={3}>
                        Mountain Pass features a somewhat hidden mechanic available on each boss round.
                        There are 3 towers, indicated as stars, on the minimap during the boss round.
                        Each of these statues can be activated by Reactor using his charge attack or fire trail attack on them.
                        Once a statue is activated, the star will disappear and an arc of lightning will extend from it to the center of the map.
                        Once all statues are activated, you can defeat Reactor normally.
                        Once Reactor is defeated and all statues are activated, a teleporter will appear in the center of the map.
                    </Typography>

                    <Typography marginBottom={3}>
                        This teleporter will take you to the <b>Hall of Blessings</b> where you can activate 1 of 6 possible blessings.
                        Once you leave the Hall of Blessings, you will not be able to return until after you activate the towers again.
                        Up to 3 blessings can be stacked if the towers are activated 3 times in a single run.
                        If the towers are activated a fourth time, you can exchange the third blessing for different blessing you don't already have (the first 2 blessings will be permanently locked).
                    </Typography>

                    <TextHeading heading="Blessings" variant="h6" />

                    <TableContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography fontWeight="bold">Blessing</Typography></TableCell>
                                {screenSize !== ScreenSize.Mobile && ( <TableCell><Typography fontWeight="bold">Icon</Typography></TableCell> )}
                                <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <MobileFriendlyIconRow
                                firstCellText="Blessing of the Bull"
                                icon={BLESSING_BULL_ICON}
                                remainingCells={["Grants infinite chargebooting to the player. Additionally, walls will no longer stop the player from chargebooting (no bonking) and the player will slightly damage enemies and perform knockback when chargebooting."]}
                            />

                            <MobileFriendlyIconRow
                                firstCellText="Blessing of the Clover"
                                icon={BLESSING_CLOVER_ICON}
                                remainingCells={["Provides the player with increased luck. This applies to the Mystery Box, reducing the odds of zonks and improving the odds of rare items (see Mystery Box table). This also increases the odds of random pickups dropped by enemies."]}
                            />

                            <MobileFriendlyIconRow
                                firstCellText="Blessing of the Hare"
                                icon={BLESSING_HARE_ICON}
                                remainingCells={[
                                    <Box>
                                        <Typography sx={{mb: 1}}>Grants multiple, consecutive jumps to a player. This blessing is intended to allow players to jump over all token walls and improve mobility.</Typography>
                                        <Stack direction="row" justifyContent="flex-start">
                                            {WARNING_ICON}
                                            <Typography sx={{ml: 2}}>WARNING: THIS BLESSING MAKES IT VERY EASY TO GET OUT OF BOUNDS ON THE MAP, IT IS VERY, VERY EASY TO DIE OUTSIDE OF THE MAP!! YOU HAVE BEEN WARNED!</Typography>
                                        </Stack>
                                    </Box>
                                ]}
                            />

                            <MobileFriendlyIconRow
                                firstCellText="Blessing of the Hunt"
                                icon={BLESSING_HUNT_ICON}
                                remainingCells={["While moving (walking, chargebooting and jumping), the player will slowly regenerate ammo for the weapon they have equipped. Equipped ammo mods increase the amount of ammo regenerated."]}
                            />

                            <MobileFriendlyIconRow
                                firstCellText="Blessing of the Rose"
                                icon={BLESSING_ROSE_ICON}
                                remainingCells={["Provides thorns armor to the player. Whenever you take damage from an enemy, 20% of the incoming damage is absorbed and reflected back at the enemy that damaged you."]}
                            />

                            <MobileFriendlyIconRow
                                firstCellText="Blessing of Vitality"
                                icon={BLESSING_VITALITY_ICON}
                                remainingCells={["Provides health regeneration over time. Whenever a player is hit a cooldown timer of 10 seconds starts, after the 10 seconds the player's health will rapidly regenerate."]}
                            />

                        </TableBody>
                    </TableContainer>

                </SpoilerGuard>

                <Box sx={{mb: 4}} />

                <TextHeading heading="Interactive Map - Mountain Pass" variant="h5" />

                <Box sx={{mb: 4}} />

                <InteractiveMap
                    backgroundUrl="https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/minimap-2k.png"
                    layers={[
                        {layerLabel: "Weapons", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/weapons-2k.png"},
                        {layerLabel: "Nanotech", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/nanotech-2k.png"},
                        {layerLabel: "Wall Pickups", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/wall-pickups-2k.png"},
                        {layerLabel: "Mystery Box", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/mystery-box-2k.png"},
                        {layerLabel: "Vendor", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/vendor-2k.png"},
                        {layerLabel: "Pack-A-Punch", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/pack-a-punch-2k.png"},
                        {layerLabel: "Obelisks", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/obelisks-2k.png"},
                        {layerLabel: "Barriers", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/barriers-2k.png"},
                        {layerLabel: "Bank", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/bank-2k.png"},
                        {layerLabel: "Demon Bells", layerUrl: "https://rac-horizon-resources.s3.amazonaws.com/interactive-maps/survival/mountain-pass/demon-bells-2k.png"},
                    ]}
                />

            </CardContent>
        </Card>

        <Box sx={{mb: screenSize === ScreenSize.Mobile ? 22 : screenSize === ScreenSize.Tablet ? 20 : 16}} />

    </Box>;
}
