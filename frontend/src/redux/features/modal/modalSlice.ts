import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type initialSatate = {
  isModalOpen: boolean;
}

const initialState: initialSatate = {
  isModalOpen: false
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpen: (state, action:PayloadAction<boolean>) => {
      // state.id = action.payload;
      state.isModalOpen = action.payload;
    },
    setIsModalClose: (state, action:PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsModalOpen, setIsModalClose } = modalSlice.actions;

export default modalSlice.reducer;
