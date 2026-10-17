const CDN = "https://rac-horizon-cdn.s3.amazonaws.com";

// confirmed icons (already used by the wiki)
export const ICON_GATE_RESET = `${CDN}/icons/wall-pickups/tex_14.png`;
export const ICON_DREAD_TOKEN = `${CDN}/icons/wall-pickups/tex_35.png`;
export const ICON_UPGRADE_WEAPON = `${CDN}/icons/wall-pickups/tex_37.png`;
export const ICON_REACTOR = `${CDN}/icons/misc/tex_129.png`;
export const ICON_INFINITE_AMMO = `${CDN}/icons/wall-pickups/tex_93.png`;
export const ICON_SELF_REVIVE = `${CDN}/icons/wall-pickups/tex_80.png`;
export const ICON_INVISIBILITY_CLOAK = `${CDN}/icons-custom/sprite-item-invisibility-cloak.png`;
export const ICON_VOX = `${CDN}/icons/wall-pickups/tex_132.png`;
export const ICON_QUAD = `${CDN}/icons-custom/sprite-item-quad.png`;
export const ICON_SHIELD = `${CDN}/icons-custom/sprite-item-shield.png`;

export const ICON_FULL_HEAL = `${CDN}/icons/wall-pickups/tex_18.png`;
export const ICON_MAX_AMMO = `${CDN}/icons/wall-pickups/tex_93.png`;
export const ICON_NUKE = `${CDN}/icons/wall-pickups/tex_22.png`;
export const ICON_FREEZE = `${CDN}/icons/wall-pickups/tex_46.png`;
export const ICON_DOUBLE_BOLTS = `${CDN}/icons/wall-pickups/tex_49.png`;
export const ICON_DOUBLE_XP = `${CDN}/icons/wall-pickups/tex_44.png`;

export const ICON_INCREASE_HEALTH = `${CDN}/icons/wall-pickups/tex_18.png`;
export const ICON_INCREASE_DAMAGE = `${CDN}/icons/wall-pickups/tex_12.png`;
export const ICON_INCREASE_SPEED = `${CDN}/icons/wall-pickups/tex_55.png`;
export const ICON_INCREASE_CRIT = `${CDN}/icons-custom/wall-critical-hit-icon.png`;

export const ICON_SPEED_MOD = `${CDN}/icons/wall-pickups/tex_55.png`;
export const ICON_AMMO_MOD = `${CDN}/icons/wall-pickups/tex_41.png`;
export const ICON_IMPACT_MOD = `${CDN}/icons/wall-pickups/tex_47.png`;
export const ICON_AREA_MOD = `${CDN}/icons/wall-pickups/tex_42.png`;
export const ICON_JACKPOT_MOD = `${CDN}/icons/wall-pickups/tex_49.png`;
export const ICON_XP_MOD = `${CDN}/icons/wall-pickups/tex_44.png`;

export const ICON_BLESSING_BULL = `${CDN}/icons-custom/sprite-blessing-of-the-bull.png`;
export const ICON_BLESSING_CLOVER = `${CDN}/icons-custom/sprite-blessing-of-the-clover.png`;
export const ICON_BLESSING_HARE = `${CDN}/icons-custom/sprite-blessing-of-the-hare.png`;
export const ICON_BLESSING_HUNT = `${CDN}/icons-custom/sprite-blessing-of-the-hunt.png`;
export const ICON_BLESSING_ROSE = `${CDN}/icons-custom/sprite-blessing-of-the-rose.png`;
export const ICON_BLESSING_VITALITY = `${CDN}/icons-custom/sprite-blessing-of-vitality.png`;

// the purple filter used on the gate reset / infinite ammo / warning icons
export const ICON_FILTER_PURPLE = "brightness(50%) sepia(100%) saturate(10000%) invert(1) hue-rotate(239deg)";

// TODO: these icons have not been uploaded to the CDN yet. Upload them or swap the URLs.
export const ICON_HEALTH_TORNADO = `${CDN}/icons-custom/sprite-item-health-tornado.png`;
export const ICON_RANDOMIZE_WEAPONS = `${CDN}/icons-custom/sprite-item-randomize-weapon-pickups.png`;
export const ICON_PDA = `${CDN}/icons-custom/sprite-item-pda.png`;
export const ICON_PERK_BERSERKER = `${CDN}/icons-custom/sprite-perk-berserker.png`;
export const ICON_PERK_EXTRA_JUMP = `${CDN}/icons-custom/sprite-perk-extra-jump.png`;
export const ICON_PERK_DOUBLE_SHOT = `${CDN}/icons-custom/sprite-perk-double-shot.png`;
export const ICON_PERK_HOVERBOOTS = `${CDN}/icons-custom/sprite-perk-hoverboots.png`;
export const ICON_PERK_VAMPIRE = `${CDN}/icons-custom/sprite-perk-vampire.png`;
export const ICON_PERK_WILL_O_WISP = `${CDN}/icons-custom/sprite-perk-will-o-wisp.png`;
export const ICON_PERK_EARTHQUAKE = `${CDN}/icons-custom/sprite-perk-earthquake.png`;
export const ICON_PERK_FIRE_BOLT = `${CDN}/icons-custom/sprite-perk-fire-bolt.png`;

// TODO: card art and interactive map layers for the newer maps have not been uploaded to the CDN yet.
export const levelFrameUrl = (mapKey: string) => `${CDN}/level-frames/survival_${mapKey}.png`;
export const interactiveMapUrl = (mapKey: string, layer: string) => `${CDN}/interactive-maps/survival/${mapKey}/${layer}-2k.png`;
