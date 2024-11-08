import {buildGetRequest} from "../../utils/Requests";
import {DeadlockedPlayerDetails} from "../../utils/Interfaces";


export const getDeadlockedPlayerDetails = (playerId: number) => {
    return buildGetRequest<DeadlockedPlayerDetails>(`/api/dl/stats/player/${playerId}`)
};

