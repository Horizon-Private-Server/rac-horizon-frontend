import { useQueries, useQuery } from "@tanstack/react-query";
import { GameType } from "../constants/game";
import { getCustomMapBackgroundImage, getCustomMapMinimapImage, getCustomMapsIndex, getCustomMapVersionFile } from "../api/dao/custom-maps";
import { read_u16, read_u32, read_u8, Sink } from "ts-binary";
import { generatePNG } from "../utils/png";
import { CustomGameModeDL, CustomGameModeUYA } from "../constants/game-mode";
import { readBlockAsString } from "../utils/binary";
import { PIF2 } from "../utils/pif2";

export type CustomMapIndexEntry = {
    slug: string;
    name: string;
    version: number;
};

export type CustomMapVersionFileDL = {
    version: number;
    baseMapId: number;
    forcedCustomMode: CustomGameModeDL;
    hideFromMapList: boolean;
    padding: number;
    extraDataCount: number;
    shrubMinRenderDistance: number;
    mapName: string;
};

export type CustomMapVersionFileUYA = {
    version: number;
    baseMapId: number;
    forcedCustomMode: CustomGameModeUYA;
    mapName: string;
};

const readVersionFile = (game: GameType, data: ArrayBuffer) => {
    const sink = Sink(data);
    let versionInfo;

    switch (game) {
        case GameType.DL_NTSC:
            const versionInfoDL: CustomMapVersionFileDL = {
                version: read_u32(sink),
                baseMapId: read_u32(sink),
                forcedCustomMode: read_u16(sink),
                hideFromMapList: read_u8(sink) > 0 ? true : false,
                padding: read_u8(sink),
                extraDataCount: read_u16(sink),
                shrubMinRenderDistance: read_u16(sink),
                mapName: readBlockAsString(data, 0x10, 0x30),
            };
            versionInfo = versionInfoDL;
            break;
        case GameType.UYA_NTSC:
        case GameType.UYA_PAL:
            const versionInfoUYA: CustomMapVersionFileUYA = {
                version: read_u32(sink),
                baseMapId: read_u32(sink),
                forcedCustomMode: read_u32(sink),
                mapName: readBlockAsString(data, 0x10, 0x30),
            };
            versionInfo = versionInfoUYA;
            break;
    }

    // Some maps have old configs where the forced ID is negative to do specific things, such as spleef.
    // We don't care about this for the sake of downloading, so forcing it to 0 for None/General
    if (versionInfo.forcedCustomMode > 32767) versionInfo.forcedCustomMode = 0;

    return versionInfo;
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

export const useGetCustomMapVersion = (game: GameType, slug: string) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_VERSION_FILES", game, slug],
        queryFn: () => getCustomMapVersionFile(game, slug),
        refetchOnWindowFocus: false,
        retry: false,
        select: ({ data }) => {
            return readVersionFile(game, data);
        },
    });
};

export const useGetCustomMapMinimap = (game: GameType, slug: string) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_MINIMAP_IMAGES", game, slug],
        queryFn: () => getCustomMapMinimapImage(game, slug),
        refetchOnWindowFocus: false,
        retry: false,
        select: ({ data }) => {
            const img = new PIF2(Sink(data));
            return img;
        },
    });
};

export const useGetAllCustomMapVersions = (game: GameType, slugs: string[]) => {
    return useQueries({
        queries: slugs.map((slug) => ({
            queryKey: ["CUSTOM_MAP_VERSION_FILES", game, slug],
            queryFn: () => getCustomMapVersionFile(game, slug),
            refetchOnWindowFocus: false,
            retry: false,
            select: ({ data }: { data: ArrayBuffer }) => {
                const versionInfo = readVersionFile(game, data);

                return {
                    versionInfo,
                    slug,
                };
            },
        })),
        combine: (results) => ({
            data: results,
        }),
    });
};
