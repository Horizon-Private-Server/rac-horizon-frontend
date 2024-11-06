import { useQuery } from "@tanstack/react-query";
import { GameType } from "../constants/game";
import { getCustomMapBackgroundImage, getCustomMapsIndex } from "../api/dao/custom-maps";
import { read_u32, Sink } from "ts-binary";
import { generatePNG } from "../utils/png";

export type CustomMapIndexEntry = {
    slug: string;
    name: string;
    version: number;
};

export const useCustomMapsIndex = (game: GameType) => {
    return useQuery({
        queryKey: ["CUSTOM_MAPS_INDEX", game],
        queryFn: () => getCustomMapsIndex(game),
        refetchOnWindowFocus: false,
        // Since the index is returned as raw text, we have to parse it manually.
        select: ({ data }) => {
            let entries: CustomMapIndexEntry[] = data.split("\n").map((entry) => {
                const entryData = entry.split("|");
                return {
                    slug: entryData[0],
                    name: entryData[1],
                    version: Number(entryData[2]),
                };
            });
            return entries.filter((entry) => entry.slug?.trim().length > 0);
        },
    });
};

export const useCustomMapBackgroundImage = (game: GameType, slug: string) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_BACKGROUND_IMAGES", game, slug],
        queryFn: () => getCustomMapBackgroundImage(game, slug),
        refetchOnWindowFocus: false,
        retry: false,
        select: ({ data }) => {
            const sink = Sink(data);
            const height = read_u32(sink);
            const width = read_u32(sink);
            const colors = new Uint8ClampedArray(data, 0x10, data.byteLength - 0x10);
            const img = generatePNG(width, height, colors, false);

            return img;
        },
    });
};
