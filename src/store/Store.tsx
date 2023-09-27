import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import  {userReducer,roleReducer}  from "../slice/CreateSlice";


const Store = configureStore({
  reducer: {
    userProfile: userReducer,
    roleMaster:roleReducer
  },
});

export default Store;
