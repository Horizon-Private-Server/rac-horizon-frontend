import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {getDeadlockedLeaderboard, getDeadlockedPlayerDetails, getDeadlockedStatOfferings} from "../api/dao/deadlocked-stats";


export const useDeadlockedPlayerDetails = (playerId: number) => {
    return useQuery({
        queryKey: ["DEADLOCKED_PLAYER_DETAILS", playerId],
        queryFn: () => getDeadlockedPlayerDetails(playerId),
        refetchOnWindowFocus: false,
        // Data becomes stale after 1 Hour.
        staleTime: 3600000,
        select: ({ data }) => data,
    });
};

export const useDeadlockedStatOfferings = () => {
    return useQuery({
        queryKey: ["DEADLOCKED_STAT_OFFERINGS"],
        queryFn: () => getDeadlockedStatOfferings(),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        select: ({ data }) => data,
    });
};

export const useDeadlockedLeaderboard = (domain: string, stat: string, page: number) => {
    return useQuery({
        queryKey: ["DEADLOCKED_LEADERBOARD", domain, stat, page],
        queryFn: () => getDeadlockedLeaderboard(domain, stat, page),
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        select: ({ data }) => data,
        placeholderData: keepPreviousData
    });
};
