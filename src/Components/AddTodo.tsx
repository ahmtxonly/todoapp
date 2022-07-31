import { useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useSetTodoMutation, useGetTodoQuery } from "Services/Todo";

const AddTodo = () => {
  const [setTodo, { isSuccess }] = useSetTodoMutation();
  const { refetch: refetchTodos } = useGetTodoQuery(null);

  const [todoText, setTodoText] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodo({ title: todoText });
  };

  useEffect(() => {
    refetchTodos();
    setTodoText("");
  }, [isSuccess, refetchTodos]);

  return (
    <div className="addTodoContainer">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={10}>
            <TextField
              id="outlined-basic"
              label="Add Todo"
              fullWidth
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sm={2}>
            <Button
              size="large"
              variant="outlined"
              className="submitButton"
              disabled={!todoText}
              type="submit"
            >
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTodo;
