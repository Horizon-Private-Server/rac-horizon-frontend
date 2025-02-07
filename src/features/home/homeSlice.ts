import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface HomeState {
    latestVideos: string[];
    loadingLatestVideos: boolean;
    tutorialVideos: string[];
    loadingTutorialVideos: boolean;
}

const initialState: HomeState = {
    latestVideos: [],
    loadingLatestVideos: false,
    tutorialVideos: [],
    loadingTutorialVideos: false,
};

type VideoKey = {
  id: {
    videoId: string
  }
}

export const homeSlice = createSlice({
    name: 'HomeSlice',
    initialState,
    reducers: {
        setHomeLatestVideos: (state, action: PayloadAction<VideoKey[]>) => {
            const latestVideos: string[] = [];
            action.payload.map(elem => latestVideos.push(elem.id.videoId))
            state.latestVideos = latestVideos;
            state.loadingLatestVideos = false
        },
        setHomeTutorialVideos: (state, action: PayloadAction<VideoKey[]>) => {
            const tutorialVideos: string[] = [];
            action.payload.map(elem => tutorialVideos.push(elem.id.videoId))
            state.tutorialVideos = tutorialVideos;
            state.loadingTutorialVideos = false
        },
    },
});

// ACTIONS
export const { setHomeLatestVideos, setHomeTutorialVideos } = homeSlice.actions;

// SELECTORS
export const selectLatestVideos = (state: RootState) => state.home.latestVideos;
export const selectTutorialVideos = (state: RootState) => state.home.tutorialVideos;

export default homeSlice.reducer;
