import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface DetailsSelectedIdState {
  id: string;
}

const initialState: DetailsSelectedIdState = {
  id: "",
};

export const selectDetails = (state: RootState) => state.details.id;

export const detailsIdSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateDetailsId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },


  },
});

export const {updateDetailsId} = detailsIdSlice.actions;



export default detailsIdSlice.reducer;
