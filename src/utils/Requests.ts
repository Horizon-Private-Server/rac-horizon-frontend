import {Dispatch} from "react";
import {AnyAction} from "@reduxjs/toolkit";

import axios, {AxiosResponse} from "axios";
import {ResponseErrorHandler, ResponseSuccessHandler, Setter} from "./Interfaces";


export function getHandler<ResponseType>(
    route: string,
    dispatch: Dispatch<AnyAction>,
    onSuccess: ResponseSuccessHandler,
    onError?: ResponseErrorHandler,
    setLoading?: Setter<boolean>
) {

    if (setLoading) { setLoading(true); }

    axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}${route}`,
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
    dispatch: Dispatch<AnyAction>,
    onSuccess?: ResponseSuccessHandler,
    onError?: ResponseErrorHandler,
    setLoading?: Setter<boolean>
) {

    if (setLoading) { setLoading(true); }

    console.log(`${process.env.REACT_APP_API_ENDPOINT}${route}`);

    axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}${route}`,
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
