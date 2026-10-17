import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import useWindowDimensions, { computeDeviceScale, ScreenSize } from "../utils/WindowDimensions";

export interface SlideshowImageBackingProps {
    backgroundUrls: string[];
    children: JSX.Element | JSX.Element[];
    interval?: number;
    fadeDuration?: number;
}

const SlideshowImageBacking = ({
    backgroundUrls,
    children,
    interval = 10000,
    fadeDuration = 1000,
}: SlideshowImageBackingProps) => {
    const { width } = useWindowDimensions();
    const screenSize = computeDeviceScale(width);

    const [currentIndex, setCurrentIndex] = useState(0);
    const firstBackgroundUrl = backgroundUrls[0] ?? "";
    const [layerBackgroundUrls, setLayerBackgroundUrls] = useState<[string, string]>([firstBackgroundUrl, ""]);
    const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
    const activeLayerRef = useRef<0 | 1>(0);

    useEffect(() => {
        if (backgroundUrls.length < 2) {
            return;
        }

        let cancelled = false;
        let displayTimer: number | undefined;
        let fadeTimer: number | undefined;
        let preloader: HTMLImageElement | undefined;
        const slideStartedAt = Date.now();

        const preloadCandidate = (offset: number) => {
            if (offset >= backgroundUrls.length) {
                return;
            }

            const candidateIndex = (currentIndex + offset) % backgroundUrls.length;
            const candidateUrl = backgroundUrls[candidateIndex];
            const image = new Image();
            preloader = image;

            image.onload = async () => {
                try {
                    await image.decode();
                }
                catch {
                    // The completed image can still be displayed when decoding is unavailable.
                }

                if (cancelled) {
                    return;
                }

                const incomingLayer = activeLayerRef.current === 0 ? 1 : 0;
                setLayerBackgroundUrls((current): [string, string] => (
                    incomingLayer === 0
                        ? [candidateUrl, current[1]]
                        : [current[0], candidateUrl]
                ));

                const elapsed = Date.now() - slideStartedAt;
                const remaining = Math.max(0, interval - elapsed);

                displayTimer = window.setTimeout(() => {
                    if (cancelled) {
                        return;
                    }

                    activeLayerRef.current = incomingLayer;
                    setActiveLayer(incomingLayer);
                    fadeTimer = window.setTimeout(() => {
                        if (cancelled) {
                            return;
                        }

                        setCurrentIndex(candidateIndex);
                    }, fadeDuration);
                }, remaining);
            };

            image.onerror = () => {
                if (!cancelled) {
                    preloadCandidate(offset + 1);
                }
            };

            image.src = candidateUrl;
        };

        preloadCandidate(1);

        return () => {
            cancelled = true;

            if (displayTimer !== undefined) {
                window.clearTimeout(displayTimer);
            }
            if (fadeTimer !== undefined) {
                window.clearTimeout(fadeTimer);
            }
            if (preloader) {
                preloader.onload = null;
                preloader.onerror = null;
            }
        };
    }, [backgroundUrls, currentIndex, fadeDuration, interval]);

    const backgroundWidth = screenSize === ScreenSize.Mobile ? "100vw" : "calc(100vw - 241px)";
    const backgroundPositionX = screenSize === ScreenSize.Mobile ? 0 : 241;

    const backgroundLayerStyles = {
        backgroundSize: "cover",
        backgroundPositionX,
        position: "absolute",
        top: 0,
        left: 0,
        overflowX: "hidden",
        zIndex: -1,
        height: "100%",
        width: backgroundWidth,
        content: '""',
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        transition: `opacity ${fadeDuration}ms ease-in-out`,
        willChange: "opacity",
    } as const;

    return (
        <Box
            sx={{
                "&": {
                    background: "rgba(0, 0, 0, 0.0)",
                    position: "relative",
                    overflowX: "hidden",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    opacity: 1.0,
                    zIndex: 0,
                },
                "&:before": {
                    ...backgroundLayerStyles,
                    backgroundImage: layerBackgroundUrls[0] ? `url(${layerBackgroundUrls[0]})` : "none",
                    opacity: activeLayer === 0 ? 0.35 : 0,
                },
                "&:after": {
                    ...backgroundLayerStyles,
                    backgroundImage: layerBackgroundUrls[1] ? `url(${layerBackgroundUrls[1]})` : "none",
                    opacity: activeLayer === 1 ? 0.35 : 0,
                },
            }}
        >
            {children}
        </Box>
    );
};

export default SlideshowImageBacking;
