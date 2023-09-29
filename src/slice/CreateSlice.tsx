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
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk(
  "/user/update",
  async (userData: any) => {
    try {
      const response = await API.put(
        `/user/update/${userData.UserId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const disableUser = createAsyncThunk(
  "user/disable",
  async (userId: any) => {
    try {
      const response = await API.patch(`user/disable/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const enableUser = createAsyncThunk(
  "user/enable",
  async (userId: any) => {
    try {
      const response = await API.patch(`user/enable/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    add:[],
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
      })


      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.add = action.payload;
      })
      .addCase(addUser.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateUser.fulfilled, (state: any, action: any) => {
        state.loading = false;

        state.joinedUserData.data = state.joinedUserData.map((user: any) =>
          user.UserId === action.payload.UserId
            ? { ...user, ...action.payload }
            : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
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
