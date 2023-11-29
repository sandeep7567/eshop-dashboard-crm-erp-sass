import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type initialSatate = {
  isModalOpen: boolean;
}

const initialState: initialSatate = {
  isModalOpen: localStorage.getItem("isModalOpen")
    ? JSON.parse(localStorage.getItem("isModalOpen") || "")
    : false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsModalOpen: (state) => {
      // state.id = action.payload;
      state.isModalOpen = true;
    },
    setIsModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsModalOpen, setIsModalClose } = modalSlice.actions;

export default modalSlice.reducer;
