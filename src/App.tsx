import React, { useState, useEffect } from "react";
import "./App.less";
import { Form, Input, Button, Checkbox, Typography } from "antd";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  todo: string;
  todoEditing: number;
  editingText: string;
}

const initialState: TodoState = {
  todos: [],
  todo: "",
  todoEditing: 0,
  editingText: "",
};
const App = () => {
  const [state, setState] = useState<TodoState>(initialState);

  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json as string);
    if (loadedTodos) {
      setState({ ...state, todos: loadedTodos });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const json = JSON.stringify(state.todos);
    localStorage.setItem("todos", json);
  }, [state.todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: new Date().getTime(),
      text: state.todo,
      completed: false,
    };
    setState({ ...state, todos: [...state.todos, newTodo], todo: "" });
  };

  const deleteTodo = (id: number) => {
    let updatedTodos = [...state.todos].filter((todo) => todo.id !== id);

    setState({ ...state, todos: updatedTodos });
  };

  const toggleComplete = (id: number) => {
    let updatedTodos = [...state.todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setState({ ...state, todos: updatedTodos });
  };

  const submitEdits = (id: number) => {
    const updatedTodos = [...state.todos].map((todo) => {
      if (todo.id === id) {
        todo.text = state.editingText;
      }
      return todo;
    });

    setState({ ...state, todos: updatedTodos });

    setState({ ...state, todoEditing: 0 });
  };

  return (
    <div id="todo-list">
      <Typography.Title>Todo List</Typography.Title>
      <form onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="text"
            onChange={(e) => setState({ ...state, todo: e.target.value })}
            value={state.todo}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Todo
        </Button>
      </form>
      {state.todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <Checkbox
              id="completed"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              style={{ marginRight: 5 }}
            />
            {todo.id === state.todoEditing ? (
              <Input
                type="text"
                onChange={(e) =>
                  setState({ ...state, editingText: e.target.value })
                }
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === state.todoEditing ? (
              <Button type="primary" onClick={() => submitEdits(todo.id)}>
                Submit Edits
              </Button>
            ) : (
              <Button
                onClick={() => setState({ ...state, todoEditing: todo.id })}
              >
                Edit
              </Button>
            )}

            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;
