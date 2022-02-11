//initiating store using redux toolkit

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export default configureStore({
  reducer: {
    user: userReducer, //adding color reducer propety
  }, // each state have reducer function we include each into this reducer
});
