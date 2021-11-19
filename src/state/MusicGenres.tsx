import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface GenresSelectedIdState {
  id: string;
}

const initialState: GenresSelectedIdState = {
  id: "KZFzniwnSyZfZ7v7nJ",
};

export const selectGenresId = (state: RootState) => state.genres.id;

export const genresIdSlice = createSlice({
  name: 'genres',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },


  },
});

export const {updateId} = genresIdSlice.actions;



export default genresIdSlice.reducer;
