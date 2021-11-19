import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import genresReducer from '../state/MusicGenres';
import detailsIdSlice from '../state/MusicDetails';
import searchDataSlice from '../state/SearchData';

export const store = configureStore({
  reducer: {
    genres: genresReducer,
    details: detailsIdSlice,
    searchData:searchDataSlice,
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
