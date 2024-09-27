import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    load: false,
    header: null,
    footer: null
  },
  reducers: {
    loadon: (state, { payload }) => {
      return {
        ...state,
        load: payload,
      };
    },
    loadoff: (state, { payload }) => {
      return {
        ...state,
        load: payload,
      };
    },
    setheader: (state, { payload }) => {
      return {
        ...state,
        header: payload,
      };
    },
    setfooter: (state, { payload }) => {
      return {
        ...state,
        footer: payload,
      };
    },
  },
});

export const { loadon, loadoff, setheader, setfooter } = loadingSlice.actions;

export default loadingSlice.reducer;
