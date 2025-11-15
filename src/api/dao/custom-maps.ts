import axios from "axios";
import { GameType } from "../../constants/game";

type CustomMapResourceInfo = {
    indexFile: string;
    mapsZipFile: string;
    mapsPath: string;
    mapsRegion: string;
    gameMask: number;
};

export const getCustomMapResourceInfo = (game: GameType): CustomMapResourceInfo => {
    switch (game) {
        case GameType.UYA_NTSC:
            return {
                indexFile: "index_uya_ntsc.txt",
                mapsZipFile: "uya_custom_maps_ntsc.zip",
                mapsPath: "uya",
                mapsRegion: "ntsc",
                gameMask: 1 << 1,
            };
        case GameType.UYA_PAL:
            return {
                indexFile: "index_uya_pal.txt",
                mapsZipFile: "uya_custom_maps_pal.zip",
                mapsPath: "uya",
                mapsRegion: "pal",
                gameMask: 1 << 2,
            };
        default:
        case GameType.DL_NTSC:
            return {
                indexFile: "index_dl_ntsc.txt",
                mapsZipFile: "dl_custom_maps.zip",
                mapsPath: "dl",
                mapsRegion: "ntsc",
                gameMask: 1 << 0,
            };
    }
};

export const getCustomMapRepos = () => {
    return axios.get<string>(`${process.env.REACT_APP_HORIZON_CUSTOM_MAP_REPOS_URL}`);
};

export const getCustomMapRepoIndex = (game: GameType, slug: string) => {
    const { indexFile } = getCustomMapResourceInfo(game);

    return axios.get<string>(`https://${slug}/${indexFile}`);
};

export const getCustomMapRepoVersionFile = (game: GameType, repoSlug: string, slug: string) => {
    const { mapsPath } = getCustomMapResourceInfo(game);

    return axios.get<ArrayBuffer>(`https://${repoSlug}/${mapsPath}/${slug}.version`, {
        responseType: "arraybuffer",
    });
};

export const getCustomMapRepoBackgroundImage = (game: GameType, repoSlug: string, slug: string) => {
    const { mapsPath } = getCustomMapResourceInfo(game);

    return axios.get<ArrayBuffer>(`https://${repoSlug}/${mapsPath}/${slug}.bg`, {
        responseType: "arraybuffer",
    });
};

export const getCustomMapMinimapImage = (game: GameType, slug: string) => {
    const { mapsPath } = getCustomMapResourceInfo(game);

    return axios.get<ArrayBuffer>(`${process.env.REACT_APP_HORIZON_CUSTOM_MAPS_DOMAIN}/${mapsPath}/${slug}.map`, {
        responseType: "arraybuffer",
    });
};
