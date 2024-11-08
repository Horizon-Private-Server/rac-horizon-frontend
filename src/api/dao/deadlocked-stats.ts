import {buildGetRequest} from "../../utils/Requests";
import {DeadlockedPlayerDetails, LeaderboardEntry, Pagination, StatOffering} from "../../utils/Interfaces";


export const getDeadlockedPlayerDetails = (playerId: number) => {
    return buildGetRequest<DeadlockedPlayerDetails>(`/api/dl/stats/player/${playerId}`)
};

export const getDeadlockedStatOfferings = () => {
    return buildGetRequest<Pagination<StatOffering>>("/api/dl/stats/offerings")
};

export const getDeadlockedLeaderboard = (domain: string, stat: string, page: number) => {
    return buildGetRequest<Pagination<LeaderboardEntry>>(`/api/dl/stats/leaderboard/${domain}/${stat}?page=${page}`)
};
