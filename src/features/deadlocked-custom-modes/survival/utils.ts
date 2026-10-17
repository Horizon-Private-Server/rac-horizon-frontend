// Rarity bands for the configured spawn probability of a mob.
// This is a stand-in until the spawn probability over time charts exist.
export const rarityFromProbability = (probability?: number, specialRoundOnly?: boolean): string => {
    if (specialRoundOnly || probability === undefined) {
        return "Special Rounds Only";
    }
    if (probability >= 0.5) {
        return "Very Common";
    }
    if (probability >= 0.1) {
        return "Common";
    }
    if (probability >= 0.05) {
        return "Uncommon";
    }
    if (probability >= 0.01) {
        return "Rare";
    }
    return "Very Rare";
};
