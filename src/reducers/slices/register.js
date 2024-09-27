import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { snackon } from "./snackbar";
import { loadoff, loadon } from "./loading";
import { clearSession } from "../../helpers/cookies";

export const Register = createAsyncThunk(
  "register",
  async (params, { rejectWithValue, dispatch }) => {
    try {
      dispatch(loadon(true));
      const url = `${config.BASE_API}/register`;
      const response = await client.post(url, params);
      dispatch(snackon({ message: response?.message, color: response?.isSuccess ? 'success' : 'warning' }));
      return Promise.resolve(response);
    } catch (error) {
      dispatch(snackon({ message: error?.message, color: 'error' }));
      return rejectWithValue(error);
    } finally {
      dispatch(loadoff(false));
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, () => { })
      .addCase(Register.fulfilled, () => { })
      .addCase(Register.rejected, () => { });
  },
});

export default registerSlice.reducer;
