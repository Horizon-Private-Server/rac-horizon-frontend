import axios, {AxiosResponse} from "axios";
import {ResponseErrorHandler, ResponseSuccessHandler, Setter} from "./Interfaces";


export function buildGetRequest<ResponseType>(route: string, timeout: number = 5000): Promise<AxiosResponse<ResponseType, any>> {
    return axios.get(`${import.meta.env.VITE_API_ENDPOINT}${route}`, {timeout: timeout})
}


export function getHandler<ResponseType>(
    route: string,
    onSuccess: ResponseSuccessHandler,
    onError?: ResponseErrorHandler,
    setLoading?: Setter<boolean>
) {

    if (setLoading) { setLoading(true); }

    axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}${route}`,
        {timeout: 5000}
    ).then((response: AxiosResponse<ResponseType>): void => {
        if (onSuccess) { onSuccess(response); }
        if (setLoading) { setLoading(false); }
    }).catch((error): void => {
        if (onError) { onError(error); }
        if (setLoading) { setLoading(false); }
    });
}

// TODO Determine if this is needed for anything.
// TODO The RAC Horizon site should essentially be read-only.
export function postHandler<RequestType, ResponseType>(
    route: string,
    payload: RequestType,
    onSuccess?: ResponseSuccessHandler,
    onError?: ResponseErrorHandler,
    setLoading?: Setter<boolean>
) {

    if (setLoading) { setLoading(true); }

    console.log(`${import.meta.env.VITE_API_ENDPOINT}${route}`);

    axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}${route}`,
        payload as RequestType,
        {timeout: 5000}
    ).then((response: AxiosResponse<ResponseType, any>): void => {
        if (onSuccess) { onSuccess(response); }
        if (setLoading) { setLoading(false); }
    }).catch((error): void => {
        if (onError) { onError(error); }
        if (setLoading) { setLoading(false); }
    });
}
