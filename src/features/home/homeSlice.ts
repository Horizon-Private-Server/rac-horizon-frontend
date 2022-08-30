import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export interface HomeState {
    latestVideos: string[];
    loadingLatestVideos: boolean;
}

const initialState: HomeState = {
    latestVideos: [],
    loadingLatestVideos: false
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
        },
        setHomeLoadingLatestVideos: (state) => {
            state.loadingLatestVideos = true;
        },
        setHomeLoadingLatestVideosComplete: (state) => {
            state.loadingLatestVideos = false;
        }
    },
});

// ACTIONS
export const { setHomeLatestVideos } = homeSlice.actions;

// SELECTORS
export const selectLatestVideos = (state: RootState) => state.home.latestVideos;

export default homeSlice.reducer;
