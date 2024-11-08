import {useQuery} from "@tanstack/react-query";
import {getDeadlockedPlayerDetails} from "../api/dao/deadlocked-stats";


export const useDeadlockedPlayerDetails = (playerId: number) => {
    return useQuery({
        queryKey: ["DEADLOCKED_PLAYER_DETAILS", playerId],
        queryFn: () => getDeadlockedPlayerDetails(playerId),
        refetchOnWindowFocus: false,
        select: ({ data }) => data,
    });
};