import { useState, useEffect } from "react";

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
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

export function computeDeviceScale(width: number) : ScreenSize { 

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
