import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import cx from "classnames";

import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

import { editTodo } from "Slices/TodoSlice";
import {
  Todo as TodoProp,
  useCompleteTodoMutation,
  useGetTodoQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "Services/Todo";

interface TodoProps {
  todo: TodoProp;
}

const Todo = (props: TodoProps) => {
  const dispatch = useDispatch();
  const { todo } = props;

  const [completeTodo, { isSuccess }] = useCompleteTodoMutation();
  const [deleteTodo, { isSuccess: isDeleteSuccess }] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const { refetch: refetchTodos } = useGetTodoQuery(null);

  const [editMode, setEditMode] = useState<boolean>(false);

  const complateTodoHandler = () => {
    if (todo._id) {
      completeTodo({ id: todo._id, complate: !todo.complete });
    }
  };

  const deleteTodoHandler = () => {
    if (todo._id) {
      deleteTodo({ id: todo._id });
    }
  };

  const editHandler = () => {
    setEditMode(true);
  };

  const updateHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);
    if (todo._id) {
      updateTodo({
        id: todo._id,
        title: todo.title,
      });
    }
  };

  useEffect(() => {
    refetchTodos();
  }, [isSuccess, refetchTodos, isDeleteSuccess]);

  if (editMode) {
    return (
      <form className={"todoContainer"} onSubmit={(e) => updateHandler(e)}>
        <TextField
          rows={4}
          fullWidth
          value={todo.title}
          onChange={(e) =>
            dispatch(editTodo({ id: todo._id, title: e.target.value }))
          }
        />
        <Tooltip placement="top-start" title="Save">
          <IconButton type="submit">
            <CheckIcon />
          </IconButton>
        </Tooltip>
      </form>
    );
  }

  return (
    <div className={cx(["todoContainer", { completed: todo.complete }])}>
      <div className="todoDetail">
        <FormControlLabel
          control={
            <Checkbox checked={todo.complete} onClick={complateTodoHandler} />
          }
          label={todo.title}
          className={cx(["label", { active: todo.complete }])}
        />
        <span className="date">{moment(todo.createdAt).fromNow()}</span>
      </div>
      <div>
        <Tooltip placement="top-start" title="Delete">
          <IconButton onClick={deleteTodoHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        {!todo.complete && (
          <Tooltip placement="top-start" title="Edit">
            <IconButton onClick={editHandler}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Todo;
