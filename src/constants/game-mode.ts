// Ref: https://github.com/Horizon-Private-Server/horizon-deadlocked-patch/blob/develop/common/config.h
export enum CustomGameModeDL {
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

export enum CustomGameModeUYA {
    CUSTOM_MODE_NONE = 0,
    CUSTOM_MODE_INFECTED,
    CUSTOM_MODE_JUGGERNAUT,
}

export const CustomGameModeNamesDL = {
    [CustomGameModeDL.CUSTOM_MODE_NONE]: "General",
    [CustomGameModeDL.CUSTOM_MODE_1000_KILLS]: "1000 Kills",
    [CustomGameModeDL.CUSTOM_MODE_GUN_GAME]: "Gun Game",
    [CustomGameModeDL.CUSTOM_MODE_INFECTED]: "Infected",
    // [CustomGameMode.CUSTOM_MODE_INFINITE_CLIMBER]: "Infinite Climber",
    [CustomGameModeDL.CUSTOM_MODE_PAYLOAD]: "Payload",
    [CustomGameModeDL.CUSTOM_MODE_SEARCH_AND_DESTROY]: "Search and Destroy",
    [CustomGameModeDL.CUSTOM_MODE_SURVIVAL]: "Zombie Survival",
    [CustomGameModeDL.CUSTOM_MODE_TEAM_DEFENDER]: "Team Defender",
    [CustomGameModeDL.CUSTOM_MODE_TRAINING]: "Training",
    // [CustomGameMode.CUSTOM_MODE_BENCHMARK]: "Benchmark",
    [CustomGameModeDL.CUSTOM_MODE_HNS]: "Hide and Seek",
    [CustomGameModeDL.CUSTOM_MODE_GRIDIRON]: "Gridiron",
    [CustomGameModeDL.CUSTOM_MODE_TAG]: "Tag",
    [CustomGameModeDL.CUSTOM_MODE_RAIDS]: "Raids", // Placeholder name, might change
};

export const CustomGameModeNamesUYA = {
    [CustomGameModeUYA.CUSTOM_MODE_NONE]: "General",
    [CustomGameModeUYA.CUSTOM_MODE_INFECTED]: "Infected",
    [CustomGameModeUYA.CUSTOM_MODE_JUGGERNAUT]: "Juggernaut",
};
