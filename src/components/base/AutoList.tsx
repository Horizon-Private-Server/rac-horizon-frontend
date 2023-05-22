import React from "react";

import { Typography } from "@mui/material";

export interface AutoListState {
    contents: string[];
    listType: "ordered" | "unordered";
}

const AutoList = (props: AutoListState) => {

    const {contents, listType} = props;

    if (listType === "ordered") {
        return <ol>
            {contents.map((elem) => {
                return <li key={elem}><Typography>{elem}</Typography></li>
            })}
        </ol>
    }
    else {
        return <ul>
            {contents.map((elem) => {
                return <li key={elem}><Typography>{elem}</Typography></li>
            })}
        </ul>
    }
}

export default AutoList;