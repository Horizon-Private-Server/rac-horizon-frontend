import axios from "axios";
import { GameType } from "../../constants/game";

type CustomMapResourceInfo = {
    indexFile: string;
    mapsPath: string;
    mapsRegion: string;
};

export const getCustomMapResourceInfo = (game: GameType): CustomMapResourceInfo => {
    switch (game) {
        case GameType.UYA_NTSC:
            return {
                indexFile: "index_uya_ntsc.txt",
                mapsPath: "uya",
                mapsRegion: "ntsc",
            };
        case GameType.UYA_PAL:
            return {
                indexFile: "index_uya_pal.txt",
                mapsPath: "uya",
                mapsRegion: "pal",
            };
        default:
        case GameType.DL_NTSC:
            return {
                indexFile: "index_dl_ntsc.txt",
                mapsPath: "dl",
                mapsRegion: "ntsc",
            };
    }
};

export const getCustomMapsIndex = (game: GameType) => {
    const { indexFile } = getCustomMapResourceInfo(game);

    return axios.get<string>(`${process.env.REACT_APP_HORIZON_CUSTOM_MAPS_DOMAIN}/${indexFile}`);
};

export const getCustomMapBackgroundImage = (game: GameType, slug: string) => {
    const { mapsPath } = getCustomMapResourceInfo(game);

    return axios.get<ArrayBuffer>(`${process.env.REACT_APP_HORIZON_CUSTOM_MAPS_DOMAIN}/${mapsPath}/${slug}.bg`, {
        responseType: "arraybuffer",
    });
};

export const getCustomMapVersionFile = (game: GameType, slug: string) => {
    const { mapsPath } = getCustomMapResourceInfo(game);

    return axios.get<ArrayBuffer>(`${process.env.REACT_APP_HORIZON_CUSTOM_MAPS_DOMAIN}/${mapsPath}/${slug}.version`, {
        responseType: "arraybuffer",
    });
};

export const getCustomMapMinimapImage = (game: GameType, slug: string) => {
    const { mapsPath } = getCustomMapResourceInfo(game);

    return axios.get<ArrayBuffer>(`${process.env.REACT_APP_HORIZON_CUSTOM_MAPS_DOMAIN}/${mapsPath}/${slug}.map`, {
        responseType: "arraybuffer",
    });
};
