import { useEffect, useRef, useState } from "react";
import { PIF2 } from "../../utils/pif2";
import { Sink } from "ts-binary";
import { GameType } from "../../constants/game";
import { useGetCustomMapMinimap } from "../../hooks/custom-maps";

export type MinimapProps = {
    game: GameType;
    slug: string;
    displayWidth?: number;
    displayHeight?: number;
};

export const Minimap = ({ game, slug, displayWidth = 256, displayHeight = 256 }: MinimapProps) => {
    const { data: minimap } = useGetCustomMapMinimap(game, slug);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<any>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (ctx && canvas && minimap) {
            const width = minimap.width;
            const height = minimap.height;

            // Create an ImageData object
            const imageData = ctx.createImageData(width, height);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const idx = (width * y + x) << 2; // Calculate the pixel index
                    const paletteIndex = minimap.pixels[idx / 4];
                    const color = minimap.getColor(paletteIndex);
                    // Set the pixel color (RGBA)
                    imageData.data[idx] = color.R;
                    imageData.data[idx + 1] = color.G;
                    imageData.data[idx + 2] = color.B;
                    imageData.data[idx + 3] = color.A;
                }
            }

            // Put the ImageData onto the canvas
            ctx.putImageData(imageData, 0, 0);

            // Export the canvas as a PNG
            const pngDataUrl = canvas.toDataURL("image/png");

            // Set the src of the image to the PNG data URL
            if (imgRef.current) imgRef.current.src = pngDataUrl;
        }
    }, [minimap]);

    return (
        <>
            <canvas
                ref={canvasRef}
                width={256} // TODO: Add support for 512 (For DL), UYA is always 256
                height={256} // TODO: Add support for 512 (For DL), UYA is always 256
                style={{ display: "none" }}
            />
            <img ref={imgRef} alt="PNG Output" style={{ marginTop: "20px" }} height={displayHeight} width={displayWidth} />
        </>
    );
};
