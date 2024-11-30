import { useQuery, keepPreviousData, useQueries } from "@tanstack/react-query";
import {
    getDeadlockedLeaderboard,
    getDeadlockedPlayerDetails,
    getDeadlockedStatOfferings,
    listDeadlockedPlayersByNameSearch,
} from "../api/dao/deadlocked-stats";

export const useDeadlockedPlayerDetails = (playerId: number) => {
    return useQuery({
        queryKey: ["DEADLOCKED_PLAYER_DETAILS", playerId],
        queryFn: () => getDeadlockedPlayerDetails(playerId),
        select: ({ data }) => data,
    });
};

export const useDeadlockedStatOfferings = () => {
    return useQuery({
        queryKey: ["DEADLOCKED_STAT_OFFERINGS"],
        queryFn: () => getDeadlockedStatOfferings(),
        staleTime: Infinity,
        select: ({ data }) => data,
    });
};

export const useDeadlockedLeaderboard = (domain: string, stat: string, page: number) => {
    return useQuery({
        queryKey: ["DEADLOCKED_LEADERBOARD", domain, stat, page],
        queryFn: () => getDeadlockedLeaderboard(domain, stat, page),
        placeholderData: keepPreviousData,
        select: ({ data }) => data,
    });
};

export const useDeadlockedPlayerSearch = (query: string, page: number) => {
    return useQuery({
        queryKey: ["DEADLOCKED_LEADERBOARD", query, page],
        queryFn: () => listDeadlockedPlayersByNameSearch(query, page),
        staleTime: Infinity,
        placeholderData: keepPreviousData,
        select: ({ data }) => data,
    });
};

export const useAggregatedDeadlockedPlayerDetails = (playerIds: number[]) => {
    return useQueries({
        queries: playerIds.map((playerId: number) => {
            return {
                queryKey: ["DEADLOCKED_PLAYER_DETAILS", playerId],
                queryFn: () => getDeadlockedPlayerDetails(playerId),
            };
        }),
        combine: (results) => {
            return {
                data: results.map((result) => result.data?.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });
};
