import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

// configue store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
