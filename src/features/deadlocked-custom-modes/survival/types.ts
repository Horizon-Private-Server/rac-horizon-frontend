export interface SurvivalEnemy {
    name: string;
    description: string | JSX.Element;
    firstAppears: string;
    // configured spawn probability from the map data, omit for special round / boss only enemies
    probability?: number;
    specialRoundOnly?: boolean;
}

export interface SurvivalGambit {
    name: string;
    completeOn: string;
    description: string | JSX.Element;
}

export interface SurvivalIconItem {
    name: string;
    iconSrc: string;
    iconFilter?: string;
    iconAltText?: string;
    // overrides iconSrc (e.g., a ChangingImage)
    iconElement?: JSX.Element;
    cells: (string | JSX.Element)[];
}

export interface SurvivalSpecialRound {
    name: string;
    firstRound: number;
    repeat: string;
    enemies: string;
    notes?: string;
}
