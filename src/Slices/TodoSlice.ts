import { createSlice } from "@reduxjs/toolkit";
import { Todo, todoApi } from "Services/Todo";

const initialState = {
  data: [] as Todo[],
};

export interface todoState {
  data: Todo[];
  todos: { data: Todo[] };
}

interface TodoPayload {
  title: string;
  id: string;
}

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    editTodo: (
      state: { data: Todo[] },
      { payload: { title, id } }: EditTodoPayload
    ) => {
      if (title && id) {
        state.data = state.data.map((todo) => {
          if (todo._id === id) {
            todo.title = title;
          }
          return todo;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      todoApi.endpoints.getTodo.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    );
  },
});

export const { editTodo } = slice.actions;

export default slice.reducer;

type EditTodoPayload = {
  payload: Partial<TodoPayload>;
};
