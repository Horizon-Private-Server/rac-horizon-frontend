import React from "react";
import AlphaModIcon from "../atoms/AlphaModIcon";
import { SurvivalIconItem } from "../types";
import * as I from "./icons";

// These values are identical on every survival map (vendor/prestige costs are baked per map but all maps use the defaults).

export const WEAPON_UPGRADES = [
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
];

export const PRESTIGE_TIERS = [
    {level: 0, cost: "Free", multiplier: "1x Damage"},
    {level: 1, cost: "100,000 Bolts", multiplier: "2x Damage"},
    {level: 2, cost: "200,000 Bolts", multiplier: "4x Damage"},
    {level: 3, cost: "400,000 Bolts", multiplier: "6x Damage"},
    {level: 4, cost: "700,000 Bolts", multiplier: "8x Damage"},
    {level: 5, cost: "1,000,000 Bolts", multiplier: "10x Damage"},
];

export const ALPHA_MOD_ITEMS: SurvivalIconItem[] = [
    {name: "Speed Mod", iconSrc: I.ICON_SPEED_MOD, cells: ["Increases the rate of fire of a given weapon.", "ALL"]},
    {name: "Ammo Mod", iconSrc: I.ICON_AMMO_MOD, cells: ["Increases the maximum ammo count of a given weapon by 5 shots (except for the Dual Vipers, which receive 50 extra shots).", "ALL"]},
    {name: "Impact Mod", iconSrc: I.ICON_IMPACT_MOD, cells: ["When equipped, it makes your weapon flinch enemies more effectively, applying the knockback effect that scales with the number of impact mods you have.", "ALL"]},
    {name: "Area Mod", iconSrc: I.ICON_AREA_MOD, cells: ["Increases the explosion radius on weapons that have an Area of Effect (AoE). On the Fusion Rifle, area mods make shots more forgiving to land.", "Dual Vipers, Magma Cannon, The Arbiter, Fusion Rifle, B6-Obliterator, Hunter Mine Launcher, Scorpion Flail"]},
    {name: "Jackpot Mod", iconSrc: I.ICON_JACKPOT_MOD, cells: ["Grants 50 extra bolts per Jackpot Mod for every enemy defeated with the weapon it is equipped on. The extra bolts are NOT shared with teammates.", "ALL"]},
    {name: "XP Mod", iconSrc: I.ICON_XP_MOD, cells: ["Grants 10 extra XP per XP Mod for every enemy defeated with the weapon it is equipped on. The extra XP is NOT shared with teammates.", "ALL"]},
];

export const wallPowerupItems = (maxDamage: string = "1,000"): SurvivalIconItem[] => [
    {name: "Increase Health", iconSrc: I.ICON_INCREASE_HEALTH, cells: ["Increases your maximum health by 5 units per-token. (Note: This does not restore health, so you will have to break a health crate to restore your health).", "1,000"]},
    {name: "Increase Damage", iconSrc: I.ICON_INCREASE_DAMAGE, cells: ["Increases your overall damage output (with every weapon) by 8% per-token.", maxDamage]},
    {name: "Increase Speed", iconSrc: "", iconAltText: "Movement Speed Upgrade", cells: ["Increases your base movement speed by 3% per-token.", "40 (120% Maximum)"]},
    {name: "Critical Damage", iconSrc: I.ICON_INCREASE_CRIT, cells: ["Increases the chance of applying a critical hit to an enemy by 1% per-token. Critical hits deal 300% damage. Critical hits stack with damage upgrades as well as modifiers such as Quad.", "100 (100% Maximum)"]},
];

export const BONUS_DROP_ITEMS: SurvivalIconItem[] = [
    {name: "Full Heal", iconSrc: I.ICON_FULL_HEAL, cells: ["Fully heals all players when picked up. If a player is downed (i.e., dead but still has a timer), this pickup will revive them."]},
    {name: "Max Ammo", iconSrc: I.ICON_MAX_AMMO, cells: ["Fills the ammo reserves for all weapons for all players when picked up."]},
    {name: "Nuke", iconSrc: I.ICON_NUKE, cells: ["Kills all enemies currently on the map. Every player receives the default amount of bolts for each enemy killed. Jackpot Mods and XP Mods do not apply to enemies killed by a nuke."]},
    {name: "Freeze", iconSrc: I.ICON_FREEZE, cells: ["Freezes all enemies on the map for 10 seconds and prevents any new enemies from spawning. Enemies that apply the freeze effect are immune."]},
    {name: "Double Bolts", iconSrc: I.ICON_DOUBLE_BOLTS, cells: ["Doubles all bolts received from enemies for 20 seconds (does not apply to round bonuses). Jackpot Mod bonuses are not doubled."]},
    {name: "Double XP", iconSrc: I.ICON_DOUBLE_XP, cells: ["Doubles all XP received from enemies for 20 seconds. XP Mod bonuses are not doubled."]},
];

// mystery box / store item descriptions
const MBOX_DESCRIPTIONS: {[name: string]: {iconSrc: string, iconFilter?: string, description: string}} = {
    "Alpha Mod": {iconSrc: "", description: "Once claimed, gives the player 1 random Alpha Mod."},
    "Dread Token": {iconSrc: I.ICON_DREAD_TOKEN, description: "Once claimed, gives the player 1 Dread Token."},
    "Upgrade Weapon": {iconSrc: I.ICON_UPGRADE_WEAPON, description: "Once claimed, gives the player 1 weapon upgrade on their currently equipped weapon. This upgrade applies at any level. Upgrading a weapon at V10 has no effect."},
    "Quad": {iconSrc: I.ICON_QUAD, description: "Once claimed, activates the Quad Damage effect (output damage is quadrupled) for all players for 60 seconds."},
    "Shield": {iconSrc: I.ICON_SHIELD, description: "Once claimed, activates the Allied Shield effect (incoming damage is quartered) for all players for 60 seconds."},
    "Infinite Ammo": {iconSrc: I.ICON_INFINITE_AMMO, iconFilter: I.ICON_FILTER_PURPLE, description: "Once claimed, grants all players infinite ammo for 30 seconds. Once the infinite ammo effect wears off, it fully replenishes all ammo for each player."},
    "Health Tornado": {iconSrc: I.ICON_HEALTH_TORNADO, description: "Once claimed, grants the player the Health Tornado. Health Tornado requires manual activation. Once activated, a healing tornado surrounds the player for 10 seconds, healing and reviving anyone nearby."},
    "Self-Revive": {iconSrc: I.ICON_SELF_REVIVE, description: "Once claimed, grants the player a Self-Revive Totem. Only 1 Self-Revive Totem may be held at a time."},
    "Invisibility Cloak": {iconSrc: I.ICON_INVISIBILITY_CLOAK, description: "Once claimed, grants the player an Invisibility Cloak. Only 1 Invisibility Cloak may be held at a time."},
    "Randomize Weapon Pickups": {iconSrc: I.ICON_RANDOMIZE_WEAPONS, description: "This Zonk shuffles the weapon pickups around the map as soon as it is rolled."},
    "Vox": {iconSrc: I.ICON_VOX, description: "This Zonk is equivalent to the \"Teddy Bear\" item in COD Zombies and is applied as soon as it is rolled. The Mystery Box disappears and moves to a new spot once the round is over. Every Vox increases the Mystery Box cost by 5,000 bolts for the rest of the game."},
    "Gate Reset": {iconSrc: I.ICON_GATE_RESET, iconFilter: I.ICON_FILTER_PURPLE, description: "This Zonk forcibly locks an open gate as soon as it is rolled. The gate must be re-purchased using Dread Tokens at its original price. A late-game Gate Reset can end a run."},
};

export const mysteryBoxItem = (name: string, chances: string[], descriptionOverride?: string): SurvivalIconItem => {
    const entry = MBOX_DESCRIPTIONS[name];
    return {
        name: name,
        iconSrc: entry.iconSrc,
        iconFilter: entry.iconFilter,
        iconElement: name === "Alpha Mod" ? <AlphaModIcon /> : undefined,
        cells: [descriptionOverride ?? entry.description, ...chances],
    };
};

const PERK_DESCRIPTIONS: {[name: string]: {iconSrc: string, description: string}} = {
    "Berserker": {iconSrc: I.ICON_PERK_BERSERKER, description: "Deals more damage the lower your health is. Each perk adds up to 75% bonus damage when you're close to death."},
    "Extra Jump": {iconSrc: I.ICON_PERK_EXTRA_JUMP, description: "Gives you 1 extra jump per perk."},
    "Double Shot": {iconSrc: I.ICON_PERK_DOUBLE_SHOT, description: "Each perk multiplies your damage output and ammo usage (2x with 1 perk, 3x with 2 perks and so on). The in-game description says it fires an extra shot, but to keep the game running smoothly on lower end hardware and PS2s, it multiplies damage instead."},
    "Hoverboots": {iconSrc: I.ICON_PERK_HOVERBOOTS, description: "Replaces your chargeboots with hoverboots. You can hover for 2 seconds after leaving the ground and gain 10% movement speed per perk."},
    "Speed Mod Perk": {iconSrc: I.ICON_SPEED_MOD, description: "Adds 1 Speed Mod to every weapon per perk."},
    "Impact Mod Perk": {iconSrc: I.ICON_IMPACT_MOD, description: "Adds 1 Impact Mod to every weapon per perk."},
    "Area Mod Perk": {iconSrc: I.ICON_AREA_MOD, description: "Adds 1 Area Mod to every weapon per perk."},
    "Ammo Mod Perk": {iconSrc: I.ICON_AMMO_MOD, description: "Adds 1 Ammo Mod to every weapon per perk."},
    "Vampire": {iconSrc: I.ICON_PERK_VAMPIRE, description: "Heals you 3 health per kill per perk. Health pickups are disabled while you have this perk."},
    "Will o' the Wisp": {iconSrc: I.ICON_PERK_WILL_O_WISP, description: "Enemies you kill explode, dealing +20 damage per perk to nearby enemies. (Note: The in-game description says +10, it is out of date)."},
    "Earthquake": {iconSrc: I.ICON_PERK_EARTHQUAKE, description: "Landing from a jump slams the ground, dealing 5 damage per perk and knocking back nearby enemies. Has a 1 second cooldown."},
    "Fire Bolt": {iconSrc: I.ICON_PERK_FIRE_BOLT, description: "Killing a Leviathan fires a bolt of fire where you're aiming. Its base damage is 250 * (stacks + 1), scales with damage upgrades and can critically hit."},
};

export const perkItem = (name: string, cost: string, max: string = "Unlimited"): SurvivalIconItem => {
    const entry = PERK_DESCRIPTIONS[name];
    return {name: name, iconSrc: entry.iconSrc, cells: [entry.description, cost, max]};
};

export const DEFAULT_PERK_COST = "250,000 Bolts (+250,000 each)";
export const DEFAULT_MOD_PERK_COST = "120,000 Bolts (+60,000 each)";

export const defaultPerkItems = (includeEarthquake: boolean): SurvivalIconItem[] => [
    perkItem("Berserker", DEFAULT_PERK_COST),
    perkItem("Extra Jump", DEFAULT_PERK_COST),
    perkItem("Double Shot", DEFAULT_PERK_COST),
    perkItem("Hoverboots", DEFAULT_PERK_COST),
    perkItem("Speed Mod Perk", DEFAULT_MOD_PERK_COST, "5"),
    perkItem("Impact Mod Perk", DEFAULT_MOD_PERK_COST, "10"),
    perkItem("Area Mod Perk", DEFAULT_MOD_PERK_COST, "10"),
    perkItem("Ammo Mod Perk", DEFAULT_MOD_PERK_COST),
    perkItem("Vampire", DEFAULT_PERK_COST),
    perkItem("Will o' the Wisp", DEFAULT_PERK_COST),
    ...(includeEarthquake ? [perkItem("Earthquake", DEFAULT_PERK_COST, "10")] : []),
];

export const SELF_REVIVE_STORE_COST = "500,000 Bolts (doubles each purchase)";
