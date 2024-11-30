import {buildGetRequest} from "../../utils/Requests";
import {DeadlockedPlayerDetails, LeaderboardEntry, Pagination, PlayerBase, StatOffering} from "../../utils/Interfaces";


export const getDeadlockedPlayerDetails = (playerId: number) => {
    return buildGetRequest<DeadlockedPlayerDetails>(`/api/dl/stats/player/${playerId}`)
};

export const getDeadlockedStatOfferings = () => {
    return buildGetRequest<Pagination<StatOffering>>("/api/dl/stats/offerings")
};

export const getDeadlockedLeaderboard = (domain: string, stat: string, page: number) => {
    return buildGetRequest<Pagination<LeaderboardEntry>>(`/api/dl/stats/leaderboard/${domain}/${stat}?page=${page}`)
};

export const listDeadlockedPlayersByNameSearch = (query: string, page: number) => {
    return buildGetRequest<Pagination<PlayerBase>>(`/api/dl/stats/search?q=${query}&page=${page}`)
};
