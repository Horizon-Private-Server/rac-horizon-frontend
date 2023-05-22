import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FilterProps } from '../../components/base/Interfaces';


export interface GameFilterState {
    filters: FilterProps[];
    page: number;
}

export interface DLGameFilterState {
  dlGames: GameFilterState;
}

const initialState: GameFilterState = {
    filters: [],
    page: 0,
};


export const dlGameSlice = createSlice({
  name: 'dlGames',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Array<FilterProps>>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = [];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setFilters, clearFilters, setPage } = dlGameSlice.actions;

export const selectGameFilters = (state: DLGameFilterState) => state.dlGames.filters;
export const selectPage = (state: DLGameFilterState) => state.dlGames.page

export default dlGameSlice.reducer;
