import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface SearchDataState {
  data: string;
}

const initialState: SearchDataState = {
  data: "",
};

export const selectData = (state: RootState) => state.searchData.data;

export const searchDataSlice = createSlice({
  name: 'searchData',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const {updateData} = searchDataSlice.actions;



export default searchDataSlice.reducer;
