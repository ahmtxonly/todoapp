import { Container } from "@mui/material";
import { TodoList, AddTodo } from "Components";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <AddTodo />
        <TodoList />
      </Container>
    </>
  );
}

export default App;
