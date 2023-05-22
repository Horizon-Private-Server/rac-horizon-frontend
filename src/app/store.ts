import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeReducer from '../features/home/homeSlice';
import dlGameReducer from '../features/deadlocked-games/deadlockedGamesSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    home: homeReducer,
    dlGames: dlGameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
