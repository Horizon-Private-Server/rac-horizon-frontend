import React from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
    Alert
} from "@mui/material";
import { TextHeading, TextList } from "../../components/base/TextComponents";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../components/utils/WindowDimensions";
import SpoilerGuard from "../../components/base/SpoilerGuard";
import SurvivalBreadcrumbs from "./survival/molecules/SurvivalBreadcrumbs";
import IconCallout from "./survival/molecules/IconCallout";
import FormulaSpoiler from "./survival/molecules/FormulaSpoiler";
import EnemyTable from "./survival/organisms/EnemyTable";
import GambitTable from "./survival/organisms/GambitTable";
import IconItemTable from "./survival/organisms/IconItemTable";
import { PrestigeTable, WeaponUpgradeTable } from "./survival/organisms/WeaponCostTables";
import {
    ALPHA_MOD_ITEMS,
    BONUS_DROP_ITEMS,
    defaultPerkItems,
    mysteryBoxItem,
    SELF_REVIVE_STORE_COST,
    wallPowerupItems
} from "./survival/constants/data";
import {
    ICON_SELF_REVIVE
} from "./survival/constants/icons";

export const SurvivalTorval = () => {

    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const mysteryBoxItems = [
        mysteryBoxItem("Alpha Mod", ["41.7%"]),
        mysteryBoxItem("Dread Token", ["20.8%"]),
        mysteryBoxItem("Vox", ["10.4%"]),
        mysteryBoxItem("Upgrade Weapon", ["6.2%"]),
        mysteryBoxItem("Quad", ["3.5%"]),
        mysteryBoxItem("Shield", ["3.5%"]),
        mysteryBoxItem("Infinite Ammo", ["3.5%"]),
        mysteryBoxItem("Health Tornado", ["3.5%"]),
        mysteryBoxItem("Invisibility Cloak", ["3.5%"]),
        mysteryBoxItem("Randomize Weapon Pickups", ["3.5%"]),
    ];

    return <Box
        marginLeft={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginRight={screenSize === ScreenSize.Desktop ? 10 : 0}
        marginBottom={4}
    >

        <SurvivalBreadcrumbs mapName="Torval Ruins" />

        <Alert
            severity="info"
            sx={{mb: 2, mt: 2}}
        >
            SPOILER WARNING: The following guide contains spoilers to Survival and Torval Ruins.
        </Alert>

        <Card>
            <CardContent>


                <TextHeading heading="Torval Ruins" variant="h4" />

                <Typography marginBottom={3}>
                    Torval Ruins has a difficulty of <code>2</code>, double the baseline set by Mountain Pass.
                    Enemies spawn closer to you, and rare minibosses can appear during normal rounds.
                    There are no dedicated boss rounds.
                </Typography>
                <TextHeading heading="How Survival Works" variant="h4" />

                <Typography marginBottom={3}>
                    As you defeat enemies in each wave, you will earn both bolts and XP (visible as a bar above your health).
                    Bolts and XP are shared between all players that are still alive.
                    Every time your XP bar fills up, you will receive a Dread Token (visible below your bolt count).
                    Bolts are used to upgrade weapons, roll the mystery box, buy from the store and prestige your weapons.
                    Dread Tokens are used to open doors and purchase wall power-ups.
                    Spend your bolts and Dread Tokens wisely to make yourself more powerful so you can fight off the horde!
                </Typography>
                <Typography marginBottom={1}>
                    The more enemies that spawn, the more they evolve.
                    Enemy evolution is not tied to the round number, it's based on how many enemies have spawned!
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
                    <b>Reaction Time</b> - The amount of time it takes an enemy to swing at the player when it gets in range. Between rounds 50 and 100 this drops to a quarter of its starting value.
                </Typography>

                <Typography marginBottom={3}>
                    Each wave has <code>10 + (10 x round number)</code> enemies and up to 50 can be alive at once.
                    After the end of each wave there is a 45-second intermission period.
                    Use this time to buy weapon upgrades, configure alpha mods, perform map-specific actions, roll the Mystery Box and pick up ammo.
                    Players can vote to skip the intermission by pressing Up on the D-Pad.
                    Once everyone has voted, the next round starts.
                    If the host has already voted, they can press Up again to start the round without waiting for everyone else.
                    Every 25 rounds, there is no timer and every player must vote to start the next round (or the host can skip the vote).
                    When playing solo, opening the start menu pauses the game.
                </Typography>
                <Typography marginBottom={3}>
                    Completing a wave awards a round bonus to every player that is still alive.
                    The bonus grows with the round number and the number of players, up to <code>10,000 Bolts</code>.
                    Special rounds award 5 times the bonus.
                </Typography>

                <Typography marginBottom={3}>
                    Survival also features damage numbers.
                    Damage numbers pop up briefly for each hit on an enemy.
                    Normal damage numbers appear yellow and critical hits appear as red.
                </Typography>
                <TextHeading heading="Shared Mechanics" variant="h4" />

                <TextHeading heading="Weapons and Alpha Mods" variant="h5" />

                <Typography marginBottom={3}>
                    Weapons can be picked up all around the map.
                    Weapons that are picked up always start out at a base level of V1.
                    Picking up a weapon you already have will refill your ammo for that weapon.
                    Some weapons are locked behind token doors and won't be available at the start of the game.
                    Weapon pickups are shuffled around the map at the start of every game and respawn faster than on Mountain Pass.
                    Bolts are used to upgrade weapons at the weapon vendor.
                    Weapons can be upgraded all the way to V10.
                    Every time you upgrade your weapon, you will also receive a <b>random</b> Alpha Mod.
                    These mods improve the performance of your weapon (e.g., ammo mod gives you more ammo, area mod increases the explosion radius of your weapon, impact mod stuns enemies more effectively, etc.).
                </Typography>
                <IconCallout>IMPORTANT: ALPHA MODS ARE NOT AUTOMATICALLY APPLIED TO YOUR WEAPON WHEN YOU UPGRADE IT!!!</IconCallout>

                <Typography marginBottom={3}>
                    In order to apply an Alpha Mod, you need to visit Big Al.
                    Unlike in single player, alpha mod slots aren't locked based on weapon level (i.e., you can equip 10 alpha mods on a V1 weapon if you have enough alpha mods).
                    You can also put any alpha mod on any weapon.
                </Typography>
                <TextHeading heading="Alpha Mod List" variant="h6" />

                <IconItemTable nameLabel="Alpha Mod" columns={["Effect", "Applicable Weapons"]} items={ALPHA_MOD_ITEMS} />

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

                <Typography marginBottom={3}>
                    Each player can only have 4 holoshields out at once, placing a 5th removes the oldest one.
                    Spinning the Scorpion Flail costs 1 ammo per second and stops once you run out.
                </Typography>
                <Typography marginBottom={2}>
                    As you purchase weapon upgrades at the vendor, the price will increase greatly from version to version.
                    The total cost to get to a V10 weapon is <code>950,000 Bolts</code>.
                    The following table defines the base cost per weapon level.
                </Typography>
                <WeaponUpgradeTable />

                <TextHeading heading="Weapon Prestige" variant="h6" />

                <Typography marginBottom={2}>
                    Once you upgrade your weapon to a V10, you will gain the ability to prestige your weapon.
                    Prestiging a weapon reverts it back to a V1, but adds a damage multiplier to the base damage that stacks with weapon upgrades and wall pickups.
                    Prestiging a weapon requires a large quantity of bolts up-front and can be dangerous if you aren't prepared.
                    A V1 weapon of a higher prestige typically has lower damage output than the V10 it came from.
                    Hold the weapon you want to prestige and press Circle at the prestige vendor.
                    On Torval Ruins, the prestige vendor only shows up during the intermission after every 25th round, so plan ahead.
                </Typography>
                <PrestigeTable />

                <TextHeading heading="Dread Tokens, Wall Powerups and Map Unlocks" variant="h5" />

                <Typography marginBottom={2}>
                    Dread Tokens are used to purchase wall power-ups as well as unlock the map.
                    Doors are paid for one token at a time, so any player can chip in.
                    Wall power-ups increase the overall stats and effectiveness of your character as opposed to the stats of a specific weapon.
                    Wall power-ups do not stay in the same place and will move after 15 purchases.
                    The remaining uses of a wall power-up are displayed in the pop-up text near the pickup.
                    As a wall power-up is purchased from a single location, it will gradually become more transparent until it disappears altogether.
                    Wall power-up locations are defined per-map and do not change, but the power-up at a specific location will always be random.
                    The following table includes all wall power-ups available.
                </Typography>
                <IconItemTable nameLabel="Wall Powerup" columns={["Effect", "Maximum Use"]} items={wallPowerupItems("1,000")} />

                <Typography marginBottom={2} marginTop={3} >
                    Dread Tokens are more easily earned in early rounds, but become more scarce in later rounds.
                    The XP needed for each Dread Token grows by 5% with every token earned, then becomes flat after 50 total tokens have been earned.
                </Typography>


                <TextHeading heading="Enemy Bonus Drops" variant="h5" />

                <Typography marginBottom={3}>
                    Whenever an enemy is defeated, there is a small chance that it will drop one of 6 possible bonus drops.
                    After a drop spawns, no other drops can spawn for 10 to 60 seconds.
                    Bonus drops disappear after 30 seconds, so grab them quickly.
                    Bonus drops can be a game changer and can even save a run if used properly.
                    The following table describes each bonus drop.
                </Typography>
                <IconItemTable nameLabel="Bonus Drop" columns={["Effect"]} items={BONUS_DROP_ITEMS} />

                <TextHeading heading="Death and Totems" variant="h5" />

                <TextHeading heading="Totems" variant="h6" />

                <Typography marginBottom={3}>
                    There are 3 totems available for use in survival: <b>Self-Revive</b>, <b>Health Tornado</b> and <b>Invisibility Cloak</b>.
                    If a player has a totem, its icon will appear at the bottom of the screen.
                    Totems that require manual activation appear in the bottom-left corner of the screen.
                    Press Down on the D-Pad to use the selected totem and Right on the D-Pad to cycle between them.
                </Typography>
                <Typography marginBottom={3}>
                    <b>Self-Revive</b> operates just as its name suggests.
                    If a player is downed, they are able to revive with all of their weapons, mods and bolts without needing to be revived.
                    Additionally, the self-revive creates a knockback explosion around the player so they aren't immediately trapped when they revive.
                    On Torval Ruins, Self-Revives are bought from the store.
                </Typography>
                <Typography marginBottom={3}>
                    The <b>Health Tornado</b> replaces the Health Gun.
                    Once activated, a healing tornado surrounds the player for 10 seconds.
                    The tornado heals anyone within its radius and revives downed players instead of them needing to be revived.
                </Typography>
                <Typography marginBottom={3}>
                    The <b>Invisibility Cloak</b> is a player-activated totem that turns the player invisible to most enemies for a period of 30 seconds.
                    Most enemies will stop tracking the player and the player is free to damage them for the duration of the 30 seconds.
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
                    Once that totem is consumed, you will have to buy a new one from the store.
                    Once you fall with no totem in-hand, your run is over.
                </Typography>
                <Typography marginBottom={3}>
                    Multiplayer is a bit different and allows for more variety.
                    If a player falls in multiplayer, they are not "dead", but instead in a "downed" or "bleeding-out" state.
                    Once downed, there will be a 60 second timer that begins to count over their body.
                    Any other player can revive the downed player if they can reach them in time.
                </Typography>
                <Typography marginBottom={3}>
                    To revive a downed player, stand right next to their body.
                    There's no button to press and reviving is free.
                    A 5-second revive timer will start to tick down and the reviving player must stay close to the body for the full revive timer to revive a player.
                    Once the revive timer reaches 0, the downed player will be revived and a large, green explosion will apply knockback to all nearby enemies (like if a Self-Revive Totem is used).
                    Revived players are invincible for 3 seconds.
                    It is strongly recommended to have backup when reviving players and use holoshields to delay enemies.
                    So long as you start reviving a downed player before their bleed-out timer ends, they can still be revived.
                    If a player is downed more than once in a single wave, 10 seconds will be shaved off of their bleed-out timer for each additional time they are downed (down to a minimum of 10 seconds).
                    This bleed-out timer penalty is reset to 60 seconds for all players at the start of each new round.
                </Typography>
                <Typography marginBottom={3}>
                    If a player is downed and is not revived within 60 seconds, they are considered dead.
                    That player will only be able to spectate for the remainder of the round and will only be able to respawn at the end of the round.
                    Additionally, the player will no longer receive shared bolts (including the round bonus) once downed or fully dead.
                    When a player fully dies, every weapon they own loses 1 level (down to V1).
                    If a player is still downed when the wave ends, they are revived for free with no penalty.
                    If every player is down at the same time, the game is over.
                </Typography>
                <Typography marginBottom={3}>
                    Falling off the map, sliding down a steep slope or drowning no longer kills you.
                    Instead, you are sent back to spawn with half of your health.
                </Typography>
                <TextHeading heading="The Mystery Box" variant="h5" />

                <Typography marginBottom={3}>
                    The Mystery Box is a slot machine that you can gamble at to gain valuable perks.
                    There are perks exclusive to the Mystery Box that can greatly improve your ability to survive.
                    Each roll of the Mystery Box costs <code>10,000 Bolts</code>, plus <code>5,000 Bolts</code> for every Vox you've rolled.
                    Positive items must be picked up by the player who rolled them. Unclaimed items are forfeited.
                    There are also Zonks that you can roll at the Mystery Box which can hinder your gameplay, so roll with caution!
                    Zonks are applied as soon as they are rolled.
                </Typography>
                <Typography marginBottom={3}>
                    The following table describes the contents of the Mystery Box.
                    There are no gates on Torval Ruins, so you can't roll a Gate Reset.
                </Typography>
                <IconItemTable
                    nameLabel="Mystery Box Item"
                    columns={["Description"]}
                    items={mysteryBoxItems.map((item) => ({...item, cells: item.cells.slice(0, 1)}))}
                />

                <TextHeading heading="The Store" variant="h5" />

                <Typography marginBottom={3}>
                    The store lets players buy perks, power-ups and totems at great expense.
                    Most of these can also be found in the Mystery Box for a potentially lower cost if you're willing to gamble.
                    The store is not to be confused with Big Al, who is where you configure your alpha mods.
                    The store is only open during the intermission period.
                    Press Triangle at the store to open it, then use Up and Down on the D-Pad to pick an item and X to buy it. Use L1 and R1 to change pages.
                </Typography>
                <TextHeading heading="Items" variant="h6" />

                <IconItemTable
                    nameLabel="Item"
                    columns={["Description", "Cost", "Maximum Held"]}
                    items={[{name: "Self-Revive", iconSrc: ICON_SELF_REVIVE, cells: ["Revives you automatically when you go down.", SELF_REVIVE_STORE_COST, "1"]}]}
                />

                <TextHeading heading="Perks" variant="h6" />

                <Typography marginBottom={2}>
                    Perks are passive upgrades that stay with you for the rest of the run. Most perks can be stacked, and every purchase costs more than the last.
                </Typography>
                <IconItemTable
                    nameLabel="Perk"
                    columns={["Description", "Cost", "Maximum Held"]}
                    items={defaultPerkItems(false)}
                />

                <Typography marginBottom={2}>
                    The Berserker perk scales off of how much health you are missing.
                </Typography>

                <TextHeading heading="Demon Bells" variant="h5" />

                <Typography marginBottom={3}>
                    The Demon Bells are an accessibility and quality of life feature added to survival.
                    Based on the synonymously named mechanic appearing in <code>Sekiro: Shadows Die Twice</code>, these bells are designed to optionally increase the challenge of survival.
                    Because there is only 1 difficulty for survival, the earlier waves may be too easy and slow for more experienced players.
                    The Demon Bells forcibly increase the spawn rate of enemies.
                    To ring a bell, quickly damage it until it activates.
                    There are 3 Demon Bells in total, each proportionally increasing the spawn rate of enemies.
                    After every 10 waves, one of the Demon Bells is forcibly turned on to ramp up the difficulty.
                    Starting at wave 30, all Demon Bells are active without player intervention.
                    The Demon Bells do <b>NOT</b> make enemies more difficult to defeat, they only increase the spawn rate of enemies and proximity of enemy spawns.
                    Completing a wave with an activated Demon Bell grants a slightly larger round bonus based on the number of active Demon Bells.
                    The Demon Bells are a one-time activation and stay on for the duration of the run.
                </Typography>
                <TextHeading heading="Multiple Teams" variant="h5" />

                <Typography marginBottom={3}>
                    Unlike previous versions, the current version of survival allows players to be on any team.
                    There is no friendly fire between teams, nor do other players activate an auto-target for your character.
                    Additionally, holoshields from players on different teams do not block shots.
                    When multiple teams are used, team colors are used in parts of the game (e.g., the hue of Bonus Pickup Drops from enemies).
                    There are also other cool easter eggs when using multiple team colors, you can find those out for yourself!
                </Typography>
                <TextHeading heading="Gambits" variant="h5" />

                <Typography marginBottom={3}>
                    Gambits are challenges played in addition to normal gameplay.
                    A gambit can be picked from the Survival settings in the lobby before the game starts.
                    Complete the gambit's goal to earn an achievement.
                </Typography>
                <GambitTable
                    gambits={[
                        {name: "Easy Mode", completeOn: "Round 100", description: "Complete 100 rounds with reduced difficulty scaling and increased bolt/xp rates."},
                        {name: "Impossible Mode", completeOn: "Round 50", description: "Complete 50 rounds with increased difficulty scaling and reduced bolt/xp rates. Revives are disabled."},
                        {name: "Flail Only", completeOn: "Round 50", description: "Complete 50 rounds with only the Scorpion Flail."},
                        {name: "Fusion Only", completeOn: "Round 50", description: "Complete 50 rounds with only the Fusion Rifle."},
                        {name: "B6 Only", completeOn: "Round 50", description: "Complete 50 rounds with only the B6 Obliterator."},
                        {name: "Weapon Life", completeOn: "Round 50", description: "Complete 50 rounds. Every time you take damage, your held weapon loses 1 level. If you are hit while holding a V1 weapon, you die."},
                        {name: "Big Mobs Only", completeOn: "Round 50", description: "Complete 50 rounds fighting only Reapers, Executioners, Leviathans, and the Minibosses."},
                        {name: "Vampire", completeOn: "Round 50", description: "Complete 50 rounds with only 10 vampire perks. All other perks are disabled. Revives are disabled."},
                    ]}
                />
                <TextHeading heading="Map Mechanics" variant="h4" />


                <TextHeading heading="Enemies" variant="h5" />

                <Typography marginBottom={2}>
                    As you progress, new and more dangerous types of enemies will start to appear.
                    Torval Ruins has no special rounds, but rare minibosses can show up during normal rounds.
                </Typography>
                <EnemyTable
                    enemies={[
                        {name: "Swarmer", description: "An ankle-biter pest! Swarmers are great distractions, but have very little health and do very little damage. Swarmers have the ability to dodge projectile weapons (i.e., Dual Vipers, B6-Obliterator, The Arbiter and Hunter Mine Launcher).", firstAppears: "Round 1", probability: 1},
                        {name: "Robot Zombie", description: "A standard robot zombie from Catacrom IV. These are balanced enemies which have a moderate movement speed, damage output and health pool.", firstAppears: "Round 2", probability: 0.5},
                        {name: "Reaper", description: "Reapers are slow-moving enemies that hold a grudge. Reapers have the highest base damage outside of bosses. Shooting a Reaper enrages it, causing it to chase the player with tunnel vision and ignore everyone else. It settles down after injuring or killing its target. An enraged Reaper can see through an Invisibility Cloak.", firstAppears: "Round 5", probability: 0.04},
                        {name: "Executioner", description: "Executioners are giant robot zombies with massive health pools. These Executioners keep their distance and fire explosive projectiles at the player. Executioners show up as a large dot on the minimap.", firstAppears: "Round 7", probability: 0.01},
                        {name: "Leviathan", description: "Leviathans are large, armored beasts that attack with their tail up close. They have big health pools and are quick on their feet.", firstAppears: "Round 11", probability: 0.025},
                    ]}
                />

                <TextHeading heading="Secrets and Bosses" variant="h4" />

                <SpoilerGuard weight={5}>
                    <TextHeading heading="Rare Minibosses" variant="h5" />

                    <EnemyTable
                        enemies={[
                            {name: "Reactor", description: "Reactor shows up as a rare miniboss on Torval Ruins. He is much weaker than the Reactor boss on Mountain Pass, but still worth a lot of bolts and XP.", firstAppears: "Round 16", probability: 0.0005},
                            {name: "King Leviathan", description: "An armored Leviathan twice the size of a normal one that attacks with its tail and a laser. On Torval Ruins it shows up as a rare miniboss and is worth a lot of bolts and XP.", firstAppears: "Round 21", probability: 0.0005},
                        ]}
                    />
                </SpoilerGuard>

                <TextHeading heading="Technical Details" variant="h4" />

                <TextHeading heading="Bonus Drop Odds" variant="h5" />

                <SpoilerGuard weight={5}>
                    <Typography marginBottom={3}>
                        Each defeated enemy has a <code>1%</code> chance to drop a bonus pickup.
                    </Typography>
                </SpoilerGuard>

                <TextHeading heading="Mystery Box Odds" variant="h5" />

                <SpoilerGuard weight={5}>
                    <IconItemTable
                        nameLabel="Mystery Box Item"
                        columns={["Roll Chance"]}
                        items={mysteryBoxItems.map((item) => ({...item, cells: item.cells.slice(1)}))}
                    />
                </SpoilerGuard>

                <TextHeading heading="Enemy Scaling" variant="h5" />

                <FormulaSpoiler
                    formulas={[
                        "difficulty = floor(enemiesSpawned / 100) * (0.6 + 0.4 * 1.5^floor((roundNumber - 1) / 25)) * mapDifficulty",
                        "damage = baseDamage * (1 + 0.03 * damageScale * difficulty)",
                        "speed = baseSpeed * (1 + 0.05 * speedScale * difficulty)",
                        "health = baseHealth * (1 + 0.05 * healthScale * difficulty)^2",
                    ]}
                    notes="Every enemy type has its own damage, speed and health scale. The 1.5^floor((roundNumber - 1) / 25) term is the mutation that happens every 25 waves. Torval Ruins has a map difficulty of 2."
                />

                <TextHeading heading="Round Bonus" variant="h5" />

                <FormulaSpoiler
                    formulas={[
                        "bonus = (roundNumber - 1) * 100 * playerCount",
                        "if bonus > 10,000 then bonus = 10,000 (Demon Bells do not add to a capped bonus)",
                        "otherwise bonus = bonus * (1 + demonBellsActive / totalDemonBells)",
                        "special rounds multiply the bonus by 5",
                    ]}
                    notes="Gambits that change the bolt rate also apply to the round bonus."
                />

                <TextHeading heading="Dread Token XP" variant="h5" />

                <FormulaSpoiler
                    formulas={[
                        "xpForNextToken = 250 * 1.05^tokensEarned",
                        "after 50 tokens, xpForNextToken = 250 * 1.05^50 (about 2,867 XP)",
                    ]}
                />

                <TextHeading heading="Berserker Damage" variant="h5" />

                <FormulaSpoiler
                    formulas={[
                        "damage = damage * (1 + 0.75 * berserkerPerks * (1 - sqrt(health / maxHealth)))",
                    ]}
                />

            </CardContent>
        </Card>

        <Box sx={{mb: screenSize === ScreenSize.Mobile ? 22 : screenSize === ScreenSize.Tablet ? 20 : 16}} />

    </Box>;
}
