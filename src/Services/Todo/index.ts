import { api } from "Store/api";

export interface Todo {
  title: string;
  _id?: string;
  complete?: boolean;
  createdAt?: string;
}

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    setTodo: build.mutation<Todo, Partial<TodoPayload>>({
      query: ({ title }) => ({
        url: "setTodo",
        method: "POST",
        body: { title },
      }),
    }),
    getTodo: build.query<GetTodoResponse, null>({
      query: () => "getTodo",
    }),
    deleteTodo: build.mutation<TodoResponse, Partial<RemoveTodoPayload>>({
      query: ({ id }) => ({
        url: "deleteTodo",
        method: "POST",
        body: { id },
      }),
    }),
    completeTodo: build.mutation<TodoResponse, Required<CompleteTodoPayload>>({
      query: ({ id, complate }) => ({
        url: "completeTodo",
        method: "POST",
        body: { id, complate },
      }),
    }),
    updateTodo: build.mutation<TodoResponse, Required<UpdateTodoPayload>>({
      query: ({ id, title }) => ({
        url: "updateTodo",
        method: "POST",
        body: { id, title },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSetTodoMutation,
  useGetTodoQuery,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;

export type GetTodoResponse = Todo[];

export type RemoveTodoPayload = {
  id: string;
};

export type CompleteTodoPayload = {
  id: string;
  complate: boolean;
};

export type UpdateTodoPayload = {
  id: string;
  title: string;
};

export type TodoResponse = {
  status: string;
};

export type TodoPayload = Todo;
