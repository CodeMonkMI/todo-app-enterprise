import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Todo } from "@todo/core/entities/todo.entities";
import { TodoID } from "@todo/core/repositories/todo.repository";

export const fetchTodosPath = "/todos";

const fetchTodos = async (): Promise<Todo[] | undefined> => {
  const data: AxiosResponse = await axios.get(fetchTodosPath);
  return data.data;
};

export const useTodosQuery = () =>
  useQuery({
    queryKey: [fetchTodosPath],
    queryFn: fetchTodos,
  });

const fetchTodo = async (id: TodoID): Promise<Todo | undefined> => {
  const data: AxiosResponse = await axios.get(`${fetchTodosPath}/${id}`);
  return data.data;
};

export const useTodoQuery = (id: TodoID) =>
  useQuery<Todo, Error>({
    queryKey: [fetchTodosPath, id],
    queryFn: () => fetchTodo(id),
  });
