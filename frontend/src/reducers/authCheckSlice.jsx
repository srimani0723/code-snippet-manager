import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyUser } from "../auth/verifyUser";

export const checkUser = createAsyncThunk("authCheck/checkUser", async () => {
  const data = await verifyUser();
  return data;
});

const authCheckSlice = createSlice({
  name: "authCheck",
  initialState: {
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;
      state.error = null;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.authorised) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        } else {
          ((state.isAuthenticated = false), (state.user = null));
        }
      })
      .addCase(checkUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      });
  },
});

export const { setAuth, clearAuth } = authCheckSlice.actions;
export default authCheckSlice.reducer;
