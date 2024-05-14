export type Todo = {
  id: number;
  value: string;
  isDone: boolean;
};

export type TodoList = {
  todos: Todo[];
};
