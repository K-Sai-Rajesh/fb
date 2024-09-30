import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    load: false,
    header: null,
    footer: null,
    dashboardheader: null
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
    setdashboardheader: (state, { payload }) => {
      return {
        ...state,
        dashboardheader: payload,
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

export const { loadon, loadoff, setheader, setfooter, setdashboardheader } = loadingSlice.actions;

export default loadingSlice.reducer;
