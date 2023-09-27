// CreateSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../axios/AxiosInstance";

export const getJoinedData = createAsyncThunk(
  "user/getJoinedData",
  async () => {
    try {
      const response = await API.get("/user/getJoinedData");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getRoleData = createAsyncThunk("/role/get", async () => {
  try {
    const response = await API.get("/role/get");
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addUser = createAsyncThunk("/user/add", async (userData: any) => {
  try {
    const response = await API.post("/user/add", userData, {
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    joinedUserData: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJoinedData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getJoinedData.fulfilled, (state, action) => {
        state.loading = false;
        state.joinedUserData = action.payload;
      })
      .addCase(getJoinedData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const userProfileActions = userProfileSlice.actions;
export const userReducer = userProfileSlice.reducer;

const roleMasterSlice = createSlice({
  name: "roleMaster",
  initialState: {
    roleData: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoleData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getRoleData.fulfilled, (state, action) => {
        state.loading = false;
        state.roleData = action.payload;
      })
      .addCase(getRoleData.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const roleMasterActions = roleMasterSlice.actions;
export const roleReducer = roleMasterSlice.reducer;
