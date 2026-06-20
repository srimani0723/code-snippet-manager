import { configureStore } from "@reduxjs/toolkit";
import authCheckSlice from "./authCheckSlice";
import publicSnippetsSlice from "./publicSnippetsSlice";

const store = configureStore({
  reducer: {
    authCheck: authCheckSlice,
    publicSnippets: publicSnippetsSlice,
  },
});

export default store;
