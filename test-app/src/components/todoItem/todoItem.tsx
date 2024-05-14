import deleteIcon from "@/assets/icons/delete.svg";
import { useAppDispatch } from "@/redux/hooks";
import { deleteTodo, selectTodo } from "@/redux/todoList";
import { Todo } from "@/utils/types";
import { FC } from "react";
import { Checkbox } from "../ui/checkbox";

interface IProps {
  todo: Todo;
}

export const TodoItem: FC<IProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`flex border rounded-md p-2 items-center justify-between relative ${
        todo.isDone && "opacity-50"
      }`}
    >
      {todo.isDone && <div className="absolute w-full bg-black h-1 opacity-85" />}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={todo.isDone}
          onClick={() => {
            dispatch(selectTodo(todo));
          }}
        />
        <div>{todo.value}</div>
      </div>
      <div
        className="w-8 cursor-pointer"
        onClick={() => {
          dispatch(deleteTodo(todo.id));
        }}
      >
        <img src={deleteIcon} alt="Delete" />
      </div>
    </div>
  );
};
