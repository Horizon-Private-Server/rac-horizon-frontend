import {AxiosError, AxiosResponse} from "axios";

export type Effect = () => void;
export type Setter<T> = (value: T) => void;
export type Mapping<T, V = any> = (value: T) => V;

export type ResponseSuccessHandler = (response: AxiosResponse<any, any>) => void;
export type ResponseErrorHandler = (response: AxiosError<any, any>) => void;

export type Optional<T> = T | null;

export interface Path {
    route: string;
    text: string;
}

export interface Pagination<T> {
    count: number;
    results: T[];
}

export interface StatOffering {
    domain: string;
    stat: string;
    label: string;
    custom: boolean;
}

export interface LeaderboardEntry {
    id: number;
    score: number;
    rank: number;
    username: string;
}

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

export interface FilterProps {
    title: string;
    serialized: string;
    filterType: string;
    isDivider: boolean;
}

export interface DeadlockedStatsBase {
    rank: number;
    wins: number;
    losses: number;
    kills: number;
    deaths: number;
}

export interface DeadlockedOverallStats extends DeadlockedStatsBase {
    games_played: number;
    disconnects: number;
    squats: number;
}

export interface DeadlockedDeathmatchStats extends DeadlockedStatsBase {}

export interface DeadlockedConquestStats extends DeadlockedStatsBase {
    nodes_taken: number;
}

export interface DeadlockedCTFStats extends DeadlockedStatsBase {
    flags_captured: number;
}

export interface DeadlockedGameModeWithTime extends DeadlockedStatsBase {
    time: number;
}

export interface DeadlockedVehicleStats {
    roadkills: number;
    squats: number;
}

export interface DeadlockedWeaponStats {
    wrench_kills: number;
    wrench_deaths: number;
    dual_viper_kills: number;
    dual_viper_deaths: number;
    magma_cannon_kills: number;
    magma_cannon_deaths: number;
    arbiter_kills: number;
    arbiter_deaths: number;
    fusion_rifle_kills: number;
    fusion_rifle_deaths: number;
    hunter_mine_launcher_kills: number;
    hunter_mine_launcher_deaths: number;
    b6_obliterator_kills: number;
    b6_obliterator_deaths: number;
    scorpion_flail_kills: number;
    scorpion_flail_deaths: number;
    holoshield_launcher_kills: number;
    holoshield_launcher_deaths: number;
}

export interface DeadlockedHorizonStats {
    total_bolts: number;
    current_bolts: number;
}

export interface DeadlockedCustomGamemode {
    rank: number;
    wins: number;
    losses: number;
    games_played: number;
    time_played: number;
}

export interface DeadlockedSNDStats extends DeadlockedCustomGamemode {
    kills: number;
    deaths: number;
    plants: number;
    defuses: number;
    ninja_defuses: number;
    wins_attacking: number;
    wins_defending: number;
}

export interface DeadlockedPayloadStats extends DeadlockedCustomGamemode {
    kills: number;
    deaths: number;
    points: number;
    kills_while_hot: number;
    kills_on_hot: number;
}

export interface DeadlockedSpleefStats extends DeadlockedCustomGamemode {
    rounds_played: number;
    points: number;
    boxes_broken: number;
}

export interface DeadlockedInfectedStats extends DeadlockedCustomGamemode {
    kills: number;
    deaths: number;
    infections: number;
    times_infected: number;
    wins_as_survivor: number;
    wins_as_first_infected: number;
}

export interface DeadlockedGungameStats extends DeadlockedCustomGamemode {
    kills: number;
    deaths: number;
    promotions: number;
    demotions: number;
    times_demoted: number;
}

export interface DeadlockedInfiniteClimberStats extends DeadlockedCustomGamemode {
    high_score: number;
}

export interface DeadlockedSurvivalStats {
    rank: number;
    games_played: number;
    time_played: number;
    kills: number;
    deaths: number;
    revives: number;
    times_revived: number;
    mystery_box_rolls: number;
    demon_bells_activated: number;
    times_activated_power: number;
    tokens_used_on_gates: number;
    wrench_kills: number;
    dual_viper_kills: number;
    magma_cannon_kills: number;
    arbiter_kills: number;
    fusion_rifle_kills: number;
    hunter_mine_launcher_kills: number;
    b6_obliterator_kills: number;
    scorpion_flail_kills: number;
}

export interface DeadlockedSurvivalMapStats {
    solo_high_score: number;
    coop_high_score: number;
    xp: number;
    prestige: number;
}

export interface DeadlockedTrainingStats {
    rank: number;
    games_played: number;
    time_played: number;
    total_kills: number;
    fusion_best_points: number;
    fusion_best_time: number;
    fusion_kills: number;
    fusion_hits: number;
    fusion_misses: number;
    fusion_accuracy: number;
    fusion_best_combo: number;
    cycle_best_points: number;
    cycle_best_combo: number;
    cycle_kills: number;
    cycle_deaths: number;
    cycle_fusion_hits: number;
    cycle_fusion_misses: number;
    cycle_fusion_accuracy: number;
}

export interface DeadlockedPlayerDetails {
    horizon_id: number;
    username: string;

    overall_stats: DeadlockedOverallStats;
    deathmatch_stats: DeadlockedDeathmatchStats;
    conquest_stats: DeadlockedConquestStats;
    ctf_stats: DeadlockedCTFStats;
    koth_stats: DeadlockedGameModeWithTime;
    juggernaut_stats: DeadlockedGameModeWithTime;
    weapon_stats: DeadlockedWeaponStats;
    vehicle_stats: DeadlockedVehicleStats;

    horizon_stats: DeadlockedHorizonStats;

    snd_stats: DeadlockedSNDStats;
    payload_stats: DeadlockedPayloadStats;
    spleef_stats: DeadlockedSpleefStats;
    infected_stats: DeadlockedInfectedStats;
    gungame_stats: DeadlockedGungameStats;
    infinite_climber_stats: DeadlockedInfiniteClimberStats;
    survival_stats: DeadlockedSurvivalStats;
    survival_orxon_stats: DeadlockedSurvivalMapStats;
    survival_mountain_pass_stats: DeadlockedSurvivalMapStats;
    survival_veldin_stats: DeadlockedSurvivalMapStats;

    training_stats: DeadlockedTrainingStats;

}

export interface UyaStatsBase {
    rank: number;
    wins: number;
    losses: number;
    wl_ratio: number;
    kills: number;
    deaths: number;
    suicides: number;
    kd_ratio: number;
    avg_kills: number;
    avg_deaths: number;
    avg_suicides: number;
    games_played: number;
}

export interface UyaSiegeStatsSchema extends UyaStatsBase {
    base_dmg: number;
    nodes: number;
    avg_nodes: number;
    avg_base_dmg: number;
}

export interface UyaDeathmatchStatsSchema extends UyaStatsBase {}

export interface UyaOverallStatsSchema extends UyaStatsBase {
    base_dmg: number;
    nodes: number;
    avg_nodes: number;
    avg_base_dmg: number;
    squats: number;
    avg_squats: number;
    sq_ratio: number;
    total_times_squatted: number;
    avg_squatted_on: number;
    sd_ratio: number;
    total_team_squats: number;
    avg_team_squats: number;
}

export interface UyaCTFStatsSchema extends UyaStatsBase {
    base_dmg: number;
    nodes: number;
    flag_captures: number;
    flag_saves: number;
    avg_nodes: number;
    avg_base_dmg: number;
    avg_flag_captures: number;
    avg_flag_saves: number;
}

export interface UYAPlayerDetails {
    horizon_id: number;
    username: string;

    overall_stats: UyaOverallStatsSchema;
    deathmatch_stats: UyaDeathmatchStatsSchema;
    siege_stats: UyaSiegeStatsSchema;
    ctf_stats: UyaCTFStatsSchema;
}


// Type definitions for players and games data
export interface UYAOnlinePlayer {
    username: string;
};

export interface UYAOnlinePlayerResponse {
    count: number;
    results: UYAOnlinePlayer[];
}

export interface UYAOnlineGame {
    name: string;
    game_status: "WorldInactive" | "WorldStaging" | "WorldActive" | "WorldClosed" | "WorldPendingCreation" | "WorldPendingConnectToGame"; 
    time_started: string;
    map: string;
    time_limit: string;
    game_mode: string;
    game_type: string;
    players: UYAOnlinePlayer[];
    last_updated: string; // This should exist in the API
};

export interface UYAOnlineGameResponse {
    count: number;
    results: UYAOnlineGame[];
} 

export interface UYAGameHistoryEntry {
    id: number;
    status: string;
    game_map: string;
    game_name: string;
    game_mode: string;
    game_submode: string;
    time_limit: number;
    n60_enabled: boolean;
    lava_gun_enabled: boolean;
    gravity_bomb_enabled: boolean;
    flux_rifle_enabled: boolean;
    mine_glove_enabled: boolean;
    morph_enabled: boolean;
    blitz_enabled: boolean;
    rocket_enabled: boolean;
    player_count: number;
    game_create_time: string;
    game_start_time: string;
    game_end_time: string;
    game_duration: number;
}

export interface UYAGameHistoryPlayer {
    game_id: number;
    player_id: number;
    username: string;

    win: boolean;
    kills: number;
    deaths: number;
    base_dmg: number;
    flag_captures: number;
    flag_saves: number;
    suicides: number;
    nodes: number;
    n60_deaths: number;
    n60_kills: number;
    lava_gun_deaths: number;
    lava_gun_kills: number;
    gravity_bomb_deaths: number;
    gravity_bomb_kills: number;
    flux_rifle_deaths: number;
    flux_rifle_kills: number;
    mine_glove_deaths: number;
    mine_glove_kills: number;
    morph_deaths: number;
    morph_kills: number;
    blitz_deaths: number;
    blitz_kills: number;
    rocket_deaths: number;
    rocket_kills: number;
    wrench_deaths: number;
    wrench_kills: number;
}

export interface UYAGameHistoryDetails {
    game: UYAGameHistoryEntry
    players: UYAGameHistoryPlayer[];
}


export interface UYALivePlayerUpgrade {
    upgrade: string;
    kills: number;
}

export interface UYALivePlayerUpgrades {
    flux: UYALivePlayerUpgrade;
    blitz: UYALivePlayerUpgrade;
    grav: UYALivePlayerUpgrade;
}

export interface UYALivePlayer {
    player_id: number;
    account_id: number;
    team: string;
    username: string;
    coord: [number, number, number];
    cam_x: number;
    weapon: string | null;
    upgrades: UYALivePlayerUpgrades;
    flag: string | null;
    health: number;
    total_kills: number;
    total_deaths: number;
    total_suicides: number;
    total_flags: number;
}

export interface UYALiveGameEvent {
    // Define the structure of any events that might appear in the game
    // Placeholder for now as the events array in the provided JSON is empty
}

export interface UYALiveGameSession {
    world_id: number;
    world_latest_update: string;
    players: UYALivePlayer[];
    events: UYALiveGameEvent[];
    map: string;
    name: string;
    game_mode: string;
}
