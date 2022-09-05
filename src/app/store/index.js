import { configureStore } from "@reduxjs/toolkit";

/**
 * reducer
 */
import LoginReducer from "./reducer/login-reducer";
import ThemeReducer from "./reducer/theme-reducer";

export default configureStore({
  reducer: {
    rLogin: LoginReducer,
    rTheme: ThemeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
