import check from "@/assets/icons/check.svg";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTodo } from "@/redux/todoList";
import { Todo } from "@/utils/types";
import { ChangeEvent, useState } from "react";
import { TodoItem } from "../todoItem/todoItem";
import { Button } from "../ui/button";

export const TodoCard = () => {
  const todos = useAppSelector((state) => state.todoList.todos);
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useAppDispatch();

  const addTodoItem = () => {
    dispatch(addTodo({ id: todos.length + 2, value: inputValue, isDone: false }));
    setIsAdding(false);
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputValue(text);
  };

  return (
    <div className="w-full max-h-5/6 flex justify-center">
      <Card className="w-2/5">
        <CardHeader>
          <CardTitle>Todo list</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {isAdding && (
              <div className="border rounded-md p-2 pl-4 flex">
                <input
                  onChange={handleInputChange}
                  className="w-full border-none outline-none outline-offset-none"
                />
                <Button
                  variant="outline"
                  onClick={addTodoItem}
                  disabled={inputValue.length > 0 ? false : true}
                  className="w-10 p-2"
                >
                  <img src={check} alt="Check" className="w-10" />
                </Button>
              </div>
            )}
            {todos.map((todo: Todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              setIsAdding((prev) => !prev);
            }}
            className="w-5/6"
          >
            {isAdding ? "Cancel" : "Add todo"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
