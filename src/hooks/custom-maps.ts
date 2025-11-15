import { useQueries, useQuery } from "@tanstack/react-query";
import { GameType } from "../constants/game";
import { getCustomMapMinimapImage, getCustomMapResourceInfo, getCustomMapRepos, getCustomMapRepoIndex, getCustomMapRepoVersionFile, getCustomMapRepoBackgroundImage } from "../api/dao/custom-maps";
import { read_u16, read_u32, read_u8, Sink } from "ts-binary";
import { generatePNG } from "../utils/png";
import { CustomGameModeDL, CustomGameModeUYA } from "../constants/game-mode";
import { readBlockAsString } from "../utils/binary";
import { PIF2 } from "../utils/pif2";

export type CustomMapRepoEntry = {
    name: string;
    slug: string;
    gamesMask: number;
    description: string;
};

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

export const useCustomMapRepos = (game: GameType) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_REPOS", game],
        queryFn: () => getCustomMapRepos(),
        // Since the index is returned as raw text, we have to parse it manually.
        select: ({ data }) => {
            let gameInfo = getCustomMapResourceInfo(game);
            let entries: CustomMapRepoEntry[] = data.split("\n").map((entry) => {
                const entryData = entry.split("|");
                return {
                    name: entryData[0],
                    slug: entryData[1],
                    gamesMask: Number(entryData[2]),
                    description: entryData[3]
                };
            });
            return entries.filter((entry) => entry.slug?.trim().length > 0 && (entry.gamesMask & gameInfo.gameMask) !== 0);
        },
    });
};

export const useCustomMapRepoIndex = (game: GameType, repo: CustomMapRepoEntry) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_REPO_INDEX", game, repo.slug],
        queryFn: () => getCustomMapRepoIndex(game, repo.slug),
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

export const useGetAllCustomMapRepoVersions = (game: GameType, repo: CustomMapRepoEntry, slugs: string[]) => {
    return useQueries({
        queries: slugs.map((slug) => ({
            queryKey: ["CUSTOM_MAP_REPO_VERSION_FILES", game, repo, slug],
            queryFn: () => getCustomMapRepoVersionFile(game, repo.slug, slug),
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

export const useCustomMapRepoBackgroundData = (game: GameType, repo: CustomMapRepoEntry, slug: string) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_REPO_BACKGROUND_IMAGES", game, repo, slug],
        queryFn: () => getCustomMapRepoBackgroundImage(game, repo.slug, slug),
        select: ({ data }) => data,
    });
};

export const useGetCustomMapMinimap = (game: GameType, slug: string) => {
    return useQuery({
        queryKey: ["CUSTOM_MAP_MINIMAP_IMAGES", game, slug],
        queryFn: () => getCustomMapMinimapImage(game, slug),
        select: ({ data }) => {
            const img = new PIF2(Sink(data));
            return img;
        },
    });
};
