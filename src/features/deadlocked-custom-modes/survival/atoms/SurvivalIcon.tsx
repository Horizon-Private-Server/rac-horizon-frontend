import React from "react";
import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../../../../components/utils/WindowDimensions";

export const useSurvivalIconSize = (): number => {
    const {width} = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    if (screenSize === ScreenSize.Desktop) {
        return 64;
    }
    else if (screenSize === ScreenSize.Tablet) {
        return 56;
    }
    return 48;
};

export interface SurvivalIconProps {
    src: string;
    alt: string;
    filter?: string;
    size?: number;
}

export const SurvivalIcon = (props: SurvivalIconProps) => {

    const {src, alt, filter, size} = props;
    const defaultSize = useSurvivalIconSize();
    const s = size ?? defaultSize;

    return <img src={src} alt={alt} width={s} height={s} style={filter ? {filter: filter} : undefined} />;
};

export default SurvivalIcon;
