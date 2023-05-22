import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";


export interface ChaningImageProps {
    interval: number;
    width: number;
    height: number;
    srcList: string[];
    altList: string[];
    variant: "sequential" | "random"
}

export const ChangingImage = (props: ChaningImageProps) => {

    const {interval, width, height, srcList, altList, variant} = props;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const waitAndUpdateIndex = async () => {
            await new Promise(r => setTimeout(r, interval));
            if (variant === "sequential") {
                if (index === srcList.length - 1) {
                    setIndex(0);
                }
                else {
                    setIndex(index + 1);
                }
                
            }
            else if (variant === "random") {
                setIndex(Math.floor(Math.random() * (srcList.length)))
            }
        }
        waitAndUpdateIndex();
    }, [index, srcList, altList, width, height, variant, interval])

    if (srcList.length === 0 || srcList.length !== altList.length) {
        return <Box />
    }

    return <img src={srcList[index]} alt={altList[index]} width={width} height={height} />

}