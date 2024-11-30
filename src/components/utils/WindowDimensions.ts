import {useState, useEffect} from "react";

const getWindowDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;
    return {width, height};
};

const getWindowContentDimensions = () => {
    const {innerWidth: width, innerHeight: height} = window;

    const deviceScale: ScreenSize = computeDeviceScale(width);

    const cwidth = deviceScale === ScreenSize.Mobile ? width : width - 241
    const cheight = height - 64

    return {cwidth, cheight};
};

export const useWindowContentDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowContentDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowContentDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};

export enum ScreenSize {
    Desktop,
    Tablet,
    Mobile
}

export function computeDeviceScale(width: number): ScreenSize {

    // Desktop view
    let size = ScreenSize.Desktop;

    // Tablet or Non-Fullscreen view
    if (width <= 855) {
        size = ScreenSize.Mobile;
    }
    // Mobile View
    else if (width <= 1500) {
        size = ScreenSize.Tablet;
    }

    return size;
}

export default useWindowDimensions;
