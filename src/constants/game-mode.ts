// Ref: https://github.com/Horizon-Private-Server/horizon-deadlocked-patch/blob/develop/common/config.h
export enum CustomGameMode {
    CUSTOM_MODE_NONE = 0,
    CUSTOM_MODE_1000_KILLS,
    CUSTOM_MODE_GUN_GAME,
    CUSTOM_MODE_INFECTED,
    // CUSTOM_MODE_INFINITE_CLIMBER,
    CUSTOM_MODE_PAYLOAD,
    CUSTOM_MODE_SEARCH_AND_DESTROY,
    CUSTOM_MODE_SURVIVAL,
    CUSTOM_MODE_TEAM_DEFENDER,
    CUSTOM_MODE_TRAINING,
    //CUSTOM_MODE_BENCHMARK,
    CUSTOM_MODE_HNS,
    CUSTOM_MODE_GRIDIRON,
    CUSTOM_MODE_TAG,
    CUSTOM_MODE_RAIDS,
}

export const CustomGameModeNames = {
    [CustomGameMode.CUSTOM_MODE_NONE]: "None",
    [CustomGameMode.CUSTOM_MODE_1000_KILLS]: "1000 Kills",
    [CustomGameMode.CUSTOM_MODE_GUN_GAME]: "Gun Game",
    [CustomGameMode.CUSTOM_MODE_INFECTED]: "Infected",
    // [CustomGameMode.CUSTOM_MODE_INFINITE_CLIMBER]: "Infinite Climber",
    [CustomGameMode.CUSTOM_MODE_PAYLOAD]: "Payload",
    [CustomGameMode.CUSTOM_MODE_SEARCH_AND_DESTROY]: "Search and Destroy",
    [CustomGameMode.CUSTOM_MODE_SURVIVAL]: "Survival",
    [CustomGameMode.CUSTOM_MODE_TEAM_DEFENDER]: "Team Defender",
    [CustomGameMode.CUSTOM_MODE_TRAINING]: "Training",
    // [CustomGameMode.CUSTOM_MODE_BENCHMARK]: "Benchmark",
    [CustomGameMode.CUSTOM_MODE_HNS]: "Hide and Seek",
    [CustomGameMode.CUSTOM_MODE_GRIDIRON]: "Gridiron",
    [CustomGameMode.CUSTOM_MODE_TAG]: "Tag",
    [CustomGameMode.CUSTOM_MODE_RAIDS]: "Raids", // Placeholder, might change
};
