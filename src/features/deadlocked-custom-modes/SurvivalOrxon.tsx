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
    Alert
} from "@mui/material";
import { TextHeading, TextList } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import { ChangingImage } from "../../components/base/ChangingImage";
import { MobileFriendlyIconRow, MobileFriendlyTextRow } from "../../components/base/MobileFriendlyRow";
import {NavigateFunction, useNavigate} from "react-router-dom";

export const SurvivalOrxon = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {width, height} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const navigate: NavigateFunction = useNavigate();

    const PLAYER_REVIVE_DELTA = "8,000";
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
    
    const SUPERCHARGE_POWER_ICON = <img 
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_54.png" 
        alt="Power Supercharge Icon" 
        width={cs()} 
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(45deg)"}} 
    />;
    
    const INFINITE_AMMO_ICON = <img 
        src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_93.png" 
        alt="Infinite Ammo Icon" 
        width={cs()} 
        height={cs()}
        style={{filter: "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)"}}
    />;
    
    const SELF_REVIVE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_80.png" alt="Self-Revive Icon" width={cs()} height={cs()} />;
    const INVISIBILITY_CLOAK_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_19.png" alt="Invisibility Cloak Icon" width={cs()} height={cs()} />;
    const VOX_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_132.png" alt="Vox Icon" width={cs()} height={cs()} />;
    
    const INSTANT_HEALTH_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_18.png" alt="Instant Health Icon" width={cs()} height={cs()} />;
    const MAX_AMMO_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_93.png" alt="Max Ammo Icon" width={cs()} height={cs()} />;
    const NUKE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_22.png" alt="Nuke Icon" width={cs()} height={cs()} />;
    const FREEZE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_46.png" alt="Freeze Icon" width={cs()} height={cs()} />;
    const DOUBLE_POINTS_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Double Points Icon" width={cs()} height={cs()} />;
    const DOUBLE_XP_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png" alt="Double XP Icon" width={cs()} height={cs()} />;
    
    const INCREASE_HEALTH_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_18.png" alt="Increase Health Icon" width={cs()} height={cs()} />;
    const INCREASE_DAMAGE_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_12.png" alt="Increase Damage Icon" width={cs()} height={cs()} />;
    const INCREASE_SPEED_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png" alt="Increase Speed Icon" width={cs()} height={cs()} />;
    const VENDOR_DISCOUNT_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Vendor Discount Icon" width={cs()} height={cs()} />;
    const REVIVE_DISCOUNT_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_42.png" alt="Revive Discount Icon" width={cs()} height={cs()} />;
    const POWERPUP_EXTENSION_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_5.png" alt="Powerup Extension Icon" width={cs()} height={cs()} />;
    
    const SPEED_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_55.png" alt="Speed Mod Icon" width={cs()} height={cs()} />
    const AMMO_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_41.png" alt="Ammo Mod Icon" width={cs()} height={cs()} />
    const AIMING_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_40.png" alt="Aiming Mod Icon" width={cs()} height={cs()} />
    const IMPACT_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_47.png" alt="Impact Mod Icon" width={cs()} height={cs()} />
    const AREA_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_42.png" alt="Area Mod Icon" width={cs()} height={cs()} />
    const JACKPOT_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_49.png" alt="Jackpot Mod Icon" width={cs()} height={cs()} />
    const XP_MOD_ICON = <img src="https://rac-horizon-resources.s3.amazonaws.com/icons/wall-pickups/tex_44.png" alt="XP Mod Icon" width={cs()} height={cs()} />

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
            <Typography color="text.primary">Orxon</Typography>
        </Breadcrumbs>

        <Alert
            severity="warning"
            sx={{mb: 2, mt: 2}}
        >
            The following page was written for Survival 2.0 and does not include features backported to Orxon as part of the Survival 3.0 update.
            We're working on updating this guide.
            For a more up-to-date reference please refer to the Survival Guide for Mountain Pass.
        </Alert>

        <Card>
            <CardContent>

                <TextHeading heading="Survival (Orxon)" variant="h4" />

                <Typography marginBottom={3}>
                    Survival is the most ambitious custom game mode developed for Deadlocked on Horizon.
                    Survival takes inspiration from classic wave survival games, such as COD zombies, as well as elements from more modern rogue-like games, such as Risk of Rain.
                    Survival pits you against wave after wave of lethal enemies with the goal of surviving as long as possible.
                    The maximum round you've completed is what counts as your high score (e.g., if you die on round 10, you will have a score of 9 rounds).
                </Typography>

                <Typography marginBottom={3}>
                    Survival introduces many new custom stats that are tracked (e.g., the amount of XP you earn and individual weapon kills).
                    Survival is a ranked gamemode, however, it is different from all other ranked modes on Deadlocked.
                    Survival rank is earned cumulatively and rank will never be removed as a consequence of poor performance in-game.
                </Typography>

                <TextHeading heading="Gameplay" variant="h5" />

                <Typography marginBottom={3}>
                    As you defeat zombies in each wave, you will earn both bolts and XP (visible as a bar above your health).
                    Bolts are shared between all players, but XP is earned individually.
                    Every time your XP bar fills up, you will receive a Dread Token (visible below your bolt count).
                    Bolts are used to upgrade weapons and roll the mystery box.
                    Dread Tokens are used to open doors and purchase wall powerups.
                    Spend your bolts and Dread Tokens wisely to make yourself more powerful so you can fight off the horde!
                </Typography>

                <Typography marginBottom={3}>
                    The more zombies you defeat, the stronger they become (Note: The level of a zombie is not tied to the wave you're on, even as a wave progresses, zombies become stronger).
                    A zombie's health pool, movement speed and damage output all become greater as the zombie gets stronger.
                    Zombies are not all the same, some zombies will receive a greater buff in a certain stat than others (e.g., One zombie might deal more damage, but have lower health and speed than another zombie that receives a larger health pool or another zombie that is really fast).
                </Typography>

                <Typography marginBottom={3}>
                    After the end of each wave there is a 45-second intermission period.
                    Use this time to buy weapon upgrades, configure alpha mods, perform map-specific actions (e.g., Turning on power), roll the Mystery Box and pickup ammo.
                    This intermission period can be optionally skipped by the host of the game.
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
                    These mods improve the performance of your weapon (e.g., ammo mod gives you more ammo, area mod increases the explosion radius of your weapon, impact mod stuns zombies more effectively, etc.).
                </Typography>

                <Typography marginBottom={3}>
                    <b>IMPORTANT: Alpha Mods are not automatically applied to your weapon when you upgrade it! </b>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow firstCellText="Speed Mod" icon={SPEED_MOD_ICON} 
                            remainingCells={["Increases the rate of fire of a given weapon (Does not apply to the Scorpion Flail)."]}
                        />
                        <MobileFriendlyIconRow firstCellText="Ammo Mod" icon={AMMO_MOD_ICON}
                            remainingCells={["Increases the maximum ammo count of a given weapon by 5 shots (except for the Dual Vipers, which receive 50 extra shots)."]}
                        />
                        <MobileFriendlyIconRow firstCellText="Aiming Mod" icon={AIMING_MOD_ICON}
                            remainingCells={["Increases the auto targeting ability of a given weapon (This mod only applies to the Dual Vipers, The Arbiter and the B-6 Obliterator)."]}
                        />
                        <MobileFriendlyIconRow firstCellText="Impact Mod" icon={IMPACT_MOD_ICON}
                            remainingCells={[
                                `When equipped, it makes it easier to stun (flinch) zombies (i.e., it takes less damage to stun a zombie).
                                Impact also knocks enemies back, this effect is amplicfied with more knockback mods.`
                            ]}
                        />
                        <MobileFriendlyIconRow firstCellText="Area Mod" icon={AREA_MOD_ICON}
                            remainingCells={[
                                `Increases the explosion radius on weapons that have an Area of Effect (AoE). 
                                This mod only applies to the Dual Vipers, The Arbiter, the B-6 Obliterator, the Hunter Mine Launcher and the Scorpion Flail.`
                            ]}
                        />
                        <MobileFriendlyIconRow firstCellText="Jackpot Mod" icon={JACKPOT_MOD_ICON}
                            remainingCells={[
                                `Increases the amount of bolts earned from defeating zombies with the weapon it is equipped on. 
                                The increased number of bolts is NOT shared with teammates.`
                            ]}
                        />
                        <MobileFriendlyIconRow firstCellText="XP Mod" icon={XP_MOD_ICON}
                            remainingCells={[
                                `Increases the amount of XP earned from defeating zombies with the weapon it is equipped on.
                                Since XP is not shared, this mod does not affect teammates.`
                            ]}
                        />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Upgrading Weapons" variant="h6" />

                <Typography marginBottom={3}>
                    Weapons can be upgraded at the weapon vendor.
                    When you upgrade a weapon, its current level will be displayed as part of the weapon name in the top left of the screen.
                    Additionally, the weapon's progress bar will start to fill up.
                    V2-V9 weapons offer only damage upgrades (except for the Holoshield Launcher, which allows holoshields to remain for longer periods of time).
                    Upon upgrading to V10, your weapon will get a large boost in performance (both in terms of damage and effectiveness).
                </Typography>

                <TextList 
                    items={[
                        <Typography>The <b>Dual Vipers</b> become the <b>Dual Raptors</b> and all bullets ricochet off of enemies and walls for extra damage.</Typography>,
                        <Typography>The <b>Magma Cannon</b> becomes the <b>Vulcan Cannon</b> and has a much larger AoE.</Typography>,
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
                    The total cost to get to a V10 weapon (without vendor discounts) is <code>950,000 Bolts</code>.
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

                <TextHeading heading="Dread Tokens, Wall Powerups and Map Unlocks" variant="h5" />

                <Typography marginBottom={2}>
                    Dread Tokens are used to purchase wall powerups as well as unlock the map (e.g., On the Orxon survival map, tokens are used to unlock doors).
                    Wall powerups increase the overall stats and effectiveness of your character as opposed to the stats of a specific weapon.
                    Wall powerups do not stay in the same place and will move after 5 purchases.
                    As a wall powerup is purchased from a single location, it will gradually become more transparent until it disappears altogether.
                    Wall powerup locations are defined per-map and do not change, but the powerup at a specific location will always be random.
                    Some powerup locations are locked behind doors and require investing tokens to reach.
                    The following table includes all wall powerups available.
                </Typography>

                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Wall Powerup</Typography></TableCell>
                            {screenSize !== ScreenSize.Mobile && ( <TableCell><Typography fontWeight="bold">Icon</Typography></TableCell> )}
                            <TableCell><Typography fontWeight="bold">Effect</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Maximum Use</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow firstCellText="Increase Health" icon={INCREASE_HEALTH_ICON} remainingCells={[
                            "Increases your maximum health by 5 units per-token. (Note: This does not restore health, so you will have to break a health crate to restore your health).",
                            "Unlimited"
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Increase Damage" icon={INCREASE_DAMAGE_ICON} remainingCells={[
                            "Increases your overall damage output (with every weapon) by 8% per-token.",
                            "Unlimited"
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Increase Speed" icon={INCREASE_SPEED_ICON} remainingCells={[
                            "Increases your base movement speed by 2.5% per-token.",
                            "28 Tokens (70% Maximum)"
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Vendor Discount" icon={VENDOR_DISCOUNT_ICON} remainingCells={[
                            "Applies a 2.5% discount per-token when buying weapon upgrades from the weapon vendor.",
                            "16 Tokens (40% Maximum Discount)"
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Revive Discount (Medic)" icon={REVIVE_DISCOUNT_ICON} remainingCells={[
                            "Applies an 8% discount per-token when reviving a teammate. This wall powerup only appears in multiplayer or splitscreen.",
                            "10 Tokens (80% Maximum Discount)"
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Powerup Extension" icon={POWERPUP_EXTENSION_ICON} remainingCells={[
                            "Increases the duration of quad by 0.75s and shield by 1s per-token.",
                            "Unlimited"
                        ]} />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Enemies" variant="h5" />

                <Typography marginBottom={2}>
                    As you progress, new and more dangerous types of enemies will start to appear.
                    Every 5 waves is also a special wave with a particular enemy theme.
                    The special waves are predetermined and always the same.
                    There are 5 different special waves that cycle every 25 rounds.
                    They are: <b>The Ghost Tremor Round</b>, <b>The Elemental Round</b>, <b>The Freeze Ghost Round</b>, <b>The Freeze Round</b> and <b>The Executioner Round</b>.
                </Typography>

                
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography fontWeight="bold">Enemy</Typography></TableCell>
                            <TableCell><Typography fontWeight="bold">Description</Typography></TableCell>
                            { screenSize !== ScreenSize.Mobile && (
                                <TableCell><Typography fontWeight="bold">First Appears On</Typography></TableCell>
                            )}
                            { screenSize !== ScreenSize.Mobile && (
                                <TableCell><Typography fontWeight="bold">Spawn Chance</Typography></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyTextRow 
                            firstCellText="Robot Zombie"
                            descriptionText={
                                <Typography>
                                    A standard robot zombie from Catacrom IV.
                                    These are balanced zombies which have a moderate movement speed, damage output and health pool.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 1",
                                "Very Common"
                            ]}
                        />
                        <MobileFriendlyTextRow 
                            firstCellText="Tremor"
                            descriptionText={
                                <Typography>
                                    The little cousins of The Eviscerator. 
                                    Tremors have the highest movement speed out of every enemy but the lowest damage output and lowest health pool. 
                                    Unlike in single player, the survival tremors do not have long-range ground attack. 
                                    Tremors can be deadly in large groups as their rapid hits can prevent chargebooting away.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 1",
                                "Very Common"
                            ]}
                        />
                        <MobileFriendlyTextRow 
                            firstCellText="Ghost Zombie"
                            descriptionText={
                                <Typography>
                                    A robot zombie that has the ghost effect applied to it. 
                                    While cloaked, these zombies are very hard to see and are invisible on the minimap. 
                                    Weapons that have autotargeting are also ineffective against these zombies when they are cloaked. 
                                    These zombies' cloak will be disabled when they attack the player or when they are hit.
                                    Ghost zombies have similar base stats as the normal robot zombies.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 5",
                                "Rare"
                            ]}
                        />
                        <MobileFriendlyTextRow 
                            firstCellText="Exploding Zombie"
                            descriptionText={
                                <Typography>
                                    A variant of the normal robot zombie that acts as a suicide bomber. 
                                    These zombies are easy to distinguish due to their bright red coloring. 
                                    When an exploding zombie gets close enough to a player, it will curl up into a ball and begin a self-destruct sequence.
                                    Exploding zombies have the highest damage potential out of all zombies if a player is directly hit by an explosion.
                                    Exploding zombies also have a larger health pool than normal robot zombies, but tend to move slower.
                                    Once an expoding zombie curls up it is too late to stop it from detonating.
                                    A player's best bet is to avoid it and attack with ranged weapons.
                                    Exploding zombies do not know friend or foe, only destruction, meaning that if you lure one into a group of normal zombies, it's explosion can thin the ranks for you (although you won't receive bolts or XP).
                                </Typography>
                            }
                            remainingCells={[
                                "Round 7",
                                "Uncommon"
                            ]}
                        />
                        <MobileFriendlyTextRow 
                            firstCellText="Freeze Zombie"
                            descriptionText={
                                <Typography>
                                    Freeze zombies are variants of the normal robot zombie which can apply the freeze effect to the player when they deal damage.
                                    The freeze effect can be devastating to a player because it halves your movement speed and chanrgeboot speed (and negates speed powerups) for a short period of time.
                                    Freeze zombies deal more damage and have higher health pools than normal robot zombies, but move slower.
                                    Freeze zombies can be easily identified by their blue coloring.
                                    The real danger with freeze zombies isn't their initial hit (which can still hurt), but follow-up hits from the inevitable horde while your movement is slowed.
                                    The freeze effect also makes it harder to successfully use jump pads (which can quickly become death traps).
                                    Freeze zombies also have an immunity to the Freeze Bonus Drop.
                                    So while you have a <code>10 second</code> reprieve from the other zombies, the freeze zombies on the map will still be hunting you down.
                                    Freeze zombies have a low spawn chance.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 10",
                                "Uncommon"
                            ]}
                        />
                        <MobileFriendlyTextRow 
                            firstCellText="Acid Zombie"
                            descriptionText={
                                <Typography>
                                    Acid zombies are variants of the normal robot zombie which can apply the acid effect to the player when they deal damage.
                                    The acid effect slowly drains away <code>15 points</code> over a short period of time.
                                    Acid zombies can be easily identified by their green coloring as well as their different head design.
                                    Be wary, if an acid zombie is damaged, it may become decapitated and lost its green coloring.
                                    If this happens it will be indistinguishable from a damaged normal robot zombie, but will, nonetheless, still apply the acid effect if it hits you.
                                    The acid effect does not stack, additional acid hits only resets the acid debuff cooldown timer.
                                    Acid zombies have a similar health pool to freeze zombies and tend to move more slowly than normal robot zombies.
                                    Additionally, the base damage of an acid zombie tends to be lower than freeze zombies and normal robot zombies.
                                    The real danger is in dealing with an acid zombie is the combined initial damage and acid damage over time.
                                    Acid zombies have a very low spawn chance.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 10",
                                "Uncommon"
                            ]}
                        />
                        <MobileFriendlyTextRow 
                            firstCellText="Executioner"
                            descriptionText={
                                <Typography>
                                    Executioners are by-far the most dangerous enemy type in survival.
                                    Executioners have MASSIVE health pools compared to other enemies and deal a guaranteed <code>50 points</code> of damage per-hit.
                                    Executioners are slower than other enemies and attack slower as well (but their attacks and speed become very fast as waves progress).
                                    Executioners have an uncanny way of sneaking up on the player, so don't ignore them just because they're big.
                                    Their size can also be a challenge, especially if the player leads them into a confined space with no other means of escape.
                                    Executioners can be identified very easily by both their appearance as GIANT robot zombies wielding a wrench and as a large dot on the minimap.
                                    Executioners have the lowest spawn rate of all enemies in survival.
                                </Typography>
                            }
                            remainingCells={[
                                "Round 11",
                                "Very Rare"
                            ]}
                        />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Enemy Bonus Drops" variant="h5" />

                <Typography marginBottom={3}>
                    Whenever a zombies is defeated, there is a very small chance that it will drop one of 6 possible bonus drops.
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
                        <MobileFriendlyIconRow firstCellText="Instant Health" icon={INSTANT_HEALTH_ICON} 
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
                            Prevents any new enemies from spawning.
                            This pickup does not affect freeze zombies, but no new freeze zombies can spawn.`
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Double Points" icon={DOUBLE_POINTS_ICON} remainingCells={[
                            `Double Points acts a global Jackpot Mod which doubles all bolts received.
                            Double Points stacks with Jackpot Mods on weapons and is applied after Jackpot Mods boost the number of bolts.`
                        ]} />
                        <MobileFriendlyIconRow firstCellText="Double XP" icon={DOUBLE_XP_ICON} remainingCells={[
                            `Double XP acts a global XP Mod which doubles all XP received.
                            Double XP stacks with XP Mods on weapons and is applied after XP Mods boost the amount of XP earned.`
                        ]} />
                    </TableBody>
                </TableContainer>

                <TextHeading heading="Death and Totems" variant="h5" />

                <TextHeading heading="Totems" variant="h6" />

                <Typography marginBottom={3}>
                    There are 2 totems available for use in survival: <b>Self-Revive</b> and <b>Invisibility Cloak</b>.
                    If a player has a totem, its icon will appear at the bottom-left corner of the screen as well as the button to activate it if it requires manual activiation.   
                </Typography>

                <Typography marginBottom={3}>
                    Self-Revive operates just as its name suggests.
                    If a player is downed, they are able to revive with all of their weapons, mods and bolts without needing to be revived.
                    Additionally, the self-revive creates a knockback explosion around the player so they aren't immediately trapped when they revive.
                    If the player dies in water or in an area they aren't supposed to be in, they will respawn at the start of the map.
                </Typography>

                <Typography marginBottom={3}>
                    The invisibility cloak is a player-activated totem that turns the player completely invisible to ALL enemies for a period of 30 seconds.
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
                    Any other player can revive the downed player if they can reach them in time, and if they have enough to revive that player.
                    Players are revived using the L3 button.
                    The base cost of a player is <code>{PLAYER_REVIVE_DELTA} bolts</code>.
                    Every time a player dies, they become more expensive to revive (<code>{PLAYER_REVIVE_DELTA} additional bolts per revive</code>).
                    The Revive Discount wall powerup can be used to greatly reduce the burden of reviving other players.
                    If a player is downed and an enemy drops an Instant Health Bonus Pickup, when a teammate picks up the Instant Health, it will instantly revive the downed player.
                    However, the player will still require an additional <code>{PLAYER_REVIVE_DELTA} bolts</code> the next time they are downed.
                </Typography>

                <Typography marginBottom={3}>
                    If a player is downed and is not revived within 60 seconds, they are considered dead.
                    That player will only be able to spectate for the remainder of the round and will only be able to respawn at the end of the round.
                    Additionally, the player will no longer receive shared bolts (including the round bonus) once downed or fully dead.
                    The player will also lose all of their weapons if they fully die.
                    This includes any alpha mods that were equipped to a weapon (unequipped alpha mods will still be available), all weapon upgrades (i.e., all weapons will revert back to V1).
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
                    Each roll of the Mystery Box costs <code>{MYSTERY_BOX_COST} bolts</code>.
                    The price of the Mystery Box is not affected by the Vendor Discound Wall Pickup.
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <MobileFriendlyIconRow firstCellText="Alpha Mod" icon={ALL_ALPHA_MODS_ICON} remainingCells={["Gives the player 1 random Alpha Mod.", "34%"]} />
                        <MobileFriendlyIconRow firstCellText="Dread Token" icon={DREAD_TOKEN_ICON} remainingCells={["Gives the player 1 Dread Token.", "20%"]} />
                        <MobileFriendlyIconRow firstCellText="Upgrade Weapon" icon={UPGRADE_WEAPON_ICON} 
                            remainingCells={["Gives the player 1 weapon upgrade on their currently equipped weapon. This upgrade applies at any level. Upgrading a weapon at V10 has no effect.", "10.5%"]} 
                        />
                        <MobileFriendlyIconRow firstCellText="Supercharge Power" icon={SUPERCHARGE_POWER_ICON} 
                            remainingCells={["Once claimed, instantly turns on the power. The power will stay on for 5 minutes.", "10.5%"]}
                        />
                        <MobileFriendlyIconRow firstCellText="Infinite Ammo" icon={INFINITE_AMMO_ICON} 
                            remainingCells={["Once claimed, grants all players infinite ammo for 60 seconds. Once the infinite ammo effect wears off, it fully replenishes all ammo for each player.", "6%"]}
                        />
                        <MobileFriendlyIconRow firstCellText="Self-Revive" icon={SELF_REVIVE_ICON} 
                            remainingCells={["Once claimed, grants the player a Self-Revive Totem. Only 1 Self-Revive Totem may be held at a time. Once picked up, this will replace an Invisibility Cloak Totem, if held.", "6%"]}
                        />
                        <MobileFriendlyIconRow firstCellText="Invisibility Cloak" icon={INVISIBILITY_CLOAK_ICON} 
                            remainingCells={["Once claimed, grants the player an Invisibility Cloak Totem. Only 1 Invisibility Cloak Totem may be held at a time. Once picked up, this will replace a Self-Revive Totem, if held.", "6%"]}
                        />
                        <MobileFriendlyIconRow firstCellText="Vox" icon={VOX_ICON} 
                            remainingCells={[
                                `
                                    Rolling a Vox or "Getting Voxxed" is equivalent to the "Teddy Bear" item in COD Zombies.
                                    Upon rolling a Vox, the Mystery Box will disappear for the remainder of the round and appear in a new spot at the start of the next round.
                                    A new round starts when the last enemy of a round is defeated.
                                    If a player rolls Vox during the intermission period, the mystery box will not appear again until the following round is complete.
                                `,
                                "4%"
                            ]}
                        />
                        <MobileFriendlyIconRow firstCellText="Gate Reset" icon={GATE_RESET_ICON} 
                            remainingCells={["Rolling a Gate Reset forcibly locks an open gate. This gate will need to be re-purchased using Dread Tokens at its original price. Rolling a Gate Reset late-game could be a run-killer.", "3%"]}
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
                    After every 10 waves, one of the Demon Bells is forcibly turned on to ramp up the diffculty.
                    Starting at wave 30, all Demon Bells are active.
                    The Demon Bells do NOT make enemies more difficult to defeat, they only increase the spawn rate of enemies.
                    Completing a wave in which a Demon Bell was activate results in a larger round bonus.
                    This bonus is increased if multiple Demon Bells are activated.
                    Demon Bells can be activated during the intermission period between waves.
                </Typography>

                <TextHeading heading="Multiple Teams" variant="h5" />

                <Typography marginBottom={3}>
                    Unlike previous versions, the current version of survival allows players to be on any team.
                    There is no friendly fire between teams, nor do other players activate an auto-target for your character.
                    When multiple teams are used, team colors are used in parts of the game (e.g., the color of the Power node on Orxon and the hue of Bonus Pickup Drops from enemies).
                    There are also other cool easter eggs when using multiple team colors, you can find those out for yourself!
                </Typography>

                <TextHeading heading="Orxon" variant="h4" />

                <Typography marginBottom={3}>
                    Orxon is the first survival map developed and has a lot of unique, map-specific features.
                </Typography>

                <Typography marginBottom={3}>
                    Orxon can be separated into 2 distinct parts, the front and back.
                    You will be spending the majority of the time in the front of the facility.
                </Typography>

            </CardContent>
        </Card>

        <Box sx={{mb: screenSize === ScreenSize.Mobile ? 22 : screenSize === ScreenSize.Tablet ? 20 : 16}} />

    </Box>;
}
