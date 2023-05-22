export interface OverallStats extends BaseStats {
    disconnects: number;
    games_played: number;
    squats: number;
}

export interface WeaponStats {
    kills: number;
    deaths: number;
}

export interface AllWeaponStats {
    wrench: WeaponStats;
    dual_vipers: WeaponStats;
    magma_cannon: WeaponStats;
    the_arbiter: WeaponStats;
    fusion_rifle: WeaponStats;
    hunter_mine_launcher: WeaponStats;
    b6_obliterator: WeaponStats;
    scorpion_flail: WeaponStats;
    holoshield_launcher: WeaponStats;
}

export interface VehicleStats {
    kills: number;
    squats: number;
}

export interface KotHJuggStats extends BaseStats {
    time: number;
}

export interface CTFStats extends BaseStats {
    flags: number;
}

export interface CustomGameStats {
    games_played: number;
    time_played: number;
}

export interface SNDStats extends BaseStats, CustomGameStats {
    plants: number;
    defuses: number;
    ninja_defuses: number;
    wins_attacking: number;
    wins_defending: number;
}

export interface PayloadStats extends BaseStats, CustomGameStats {
    points: number;
    kills_while_hot: number;
    kills_on_hot: number;
}

export interface SpleefStats extends CustomGameStats {
    rank: number;
    wins: number;
    losses: number;
    rounds_played: number;
    points: number;
    boxes_broken: number;
}

export interface InfectedStats extends BaseStats, CustomGameStats {
    infections: number;
    times_infected: number;
    wins_as_survivor: number;
    wins_as_first_infected: number;
}

export interface GunGameStats extends BaseStats, CustomGameStats {
    demotions: number;
    times_demoted: number;
    times_promoted: number;
}

export interface InfiniteClimberStats extends CustomGameStats {
    rank: number;
    wins: number;
    losses: number;
    high_score: number;
}

export interface SurvivalHighScores {
    couch_potato: number;
    contestant: number;
    gladiator: number;
    hero: number;
    exterminator: number;
}

export interface SurvivalWeaponKills {
    wrench: number;
    dual_vipers: number;
    magma_cannon: number;
    the_arbiter: number;
    fusion_rifle: number;
    hunter_mine_launcher: number;
    b6_obliterator: number;
    scorpion_flail: number;
}

export interface SurvivalStats extends CustomGameStats {
    rank: number;
    kills: number;
    deaths: number;
    revives: number;
    times_revived: number;
    high_scores: SurvivalHighScores;
    weapon_kills: SurvivalWeaponKills;
    xp: number;
}

export interface BaseTrainingStats {
    best_points: number;
    best_combo: number;
    kills: number;
}

export interface FusionTrainingStats extends BaseTrainingStats {
    best_time: number;
    hits: number;
    misses: number;
    accuracy: number;
}

export interface CycleTrainingStats extends BaseTrainingStats {
    deaths: number;
    fusion_hits: number;
    fusion_misses: number;
    fusion_accuracy: number;
}

export interface TrainingStats extends CustomGameStats {
    rank: number;
    total_kills: number;
    fusion: FusionTrainingStats;
    cycle: CycleTrainingStats;
}

export interface ConquestStats extends BaseStats {
    nodes: number;
}

export interface BaseStats {
    rank: number;
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
}

export interface PlayerDetailStatsProps {
    overall: OverallStats;
    deathmatch: BaseStats;
    koth: KotHJuggStats;
    ctf: CTFStats;
    juggernaut: KotHJuggStats;
    conquest: ConquestStats;
    weapon: AllWeaponStats;
    vehicle: VehicleStats;

    snd: SNDStats;
    payload: PayloadStats;
    spleef: SpleefStats;
    infected: InfectedStats;
    gungame: GunGameStats;
    climber: InfiniteClimberStats;
    survival: SurvivalStats;
    training: TrainingStats;
}

export interface PlayerDetailProps {
    id: number;
    name: string;
    friend_count: number;
    stats: PlayerDetailStatsProps;
}

export interface GameRulesWeaponProps {
    dual_vipers: boolean;
    magma_cannon: boolean;
    the_arbiter: boolean;
    fusion_rifle: boolean;
    hunter_mine_launcher: boolean;
    b6_obliterator: boolean;
    holoshield_launcher: boolean;
    scorpion_flail: boolean;
}

export interface GameRulesVehicleProps {
    hoverbike: boolean;
    puma: boolean;
    hovership: boolean;
    landstalker: boolean;
}

export interface GameRulesProps {
    weapons: GameRulesWeaponProps;
    vehicles: GameRulesVehicleProps;
    chargeboots: boolean;
}

export interface GameRemoteListProps {
    id: number;
    name: string;
    game_mode: string;
    map: string;
    player_count: number;
    starting_player_count: number;
    start_time: string;
    end_time: string;
    rules: GameRulesProps;
}

export interface PostGamePlayerDataProps {
    id: number;
    name: string;
    game_stats: PlayerDetailStatsProps;
}

export interface GameDetailTeamsProps {
    [key: string]: PostGamePlayerDataProps[];
}

export interface GameDetailProps {
    version: number;
    id: number;
    name: string;
    skill_level: number;
    starting_players: string[];
    rules: GameRulesProps;
    map: string;
    game_mode: string;
    start_time: string;
    end_time: string;
    teams: GameDetailTeamsProps;
}

export type NumberSetState = (value: number) => void;

export interface FilterProps {
    title: string;
    serialized: string;
    filterType: string;
    isDivider: boolean;
}
