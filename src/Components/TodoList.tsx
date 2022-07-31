import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";

import { todoState } from "Slices/TodoSlice";
import { SwitchTab, Todo } from "Components";

const TodoList = () => {
  const { data } = useSelector((state: todoState) => state.todos);
  const { tab } = useSelector((state: any) => state.Switch);

  return (
    <>
      <SwitchTab />
      {data.filter((todo) => !todo.complete).length === 0 &&
        tab !== "completed" && (
          <Paper variant="outlined" className="emptyContainer">
            There is no current task
          </Paper>
        )}
      {tab === "completed" &&
        data.filter((todo) => todo.complete).length === 0 && (
          <Paper variant="outlined" className="emptyContainer">
            There is no completed task
          </Paper>
        )}
      {data
        .filter((filterData) => {
          if (tab === "completed") return filterData.complete;
          return !filterData.complete;
        })
        .map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
    </>
  );
};

export default TodoList;
