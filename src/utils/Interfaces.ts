import {AxiosError, AxiosResponse} from "axios";

export type Effect = () => void;
export type Setter<T> = (value: T) => void;
export type Mapping<T, V = any> = (value: T) => V;

export type ResponseSuccessHandler = (response: AxiosResponse<any, any>) => void;
export type ResponseErrorHandler = (response: AxiosError<any, any>) => void;

export interface Pagination<T> {
    count: number;
    results: T[];
}

export interface StatOffering {
    domain: string;
    stat: string;
    label: string;
    custom: boolean;
}

export interface LeaderboardEntry {
    horizon_id: number;
    score: number;
    rank: number;
    username: string;
}
