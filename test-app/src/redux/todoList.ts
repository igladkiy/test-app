import { todosInfo } from "@/utils/mock";
import { Todo, TodoList } from "@/utils/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoList = todosInfo;

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload);
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = [action.payload, ...state.todos];
    },
    selectTodo: (state, action: PayloadAction<Todo>) => {
      const filteredTodos = state.todos.map((todo: Todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo;
        }
      });
      state.todos = filteredTodos.sort((a, b) => {
        if (a.isDone === b.isDone) {
          return 0;
        } else if (a.isDone) {
          return 1;
        } else {
          return -1;
        }
      });
    },
  },
});

export const { setTodoList, deleteTodo, selectTodo, addTodo } = todoListSlice.actions;

export default todoListSlice.reducer;
