import { createSlice } from "@reduxjs/toolkit";
import { todoApi } from "Services/Todo";

export interface ISwitchState {
  tab: TabStatus;
}

export type TabStatus = "all" | "completed";

const slice = createSlice({
  name: "switch",
  initialState: { tab: "all" } as ISwitchState,
  reducers: {
    setSwitch: (state: ISwitchState, { payload: { tab } }: SwitchPayload) => {
      if (tab) {
        state.tab = tab;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.setTodo.matchFulfilled,
      (state, action) => {
        state.tab = "all";
      }
    );
  },
});

export const { setSwitch } = slice.actions;

export default slice.reducer;

export type SwitchState = {
  tab: "all" | "completed";
};

type SwitchPayload = {
  payload: Partial<SwitchState>;
};
