import { combineReducers } from "@reduxjs/toolkit";

import { api } from "Store/api";

import Switch from "Slices/SwitchSlice";
import todos from "Slices/TodoSlice";

export default combineReducers({
  [api.reducerPath]: api.reducer,
  Switch,
  todos,
});
