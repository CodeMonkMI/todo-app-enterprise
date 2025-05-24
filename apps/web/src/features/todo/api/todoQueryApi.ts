import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Todo } from "@todo/core/entities/todo.entities";
import { TodoID } from "@todo/core/repositories/todo.repository";

export const fetchTodosPath = "/todos";
type Pagination = {
  page: number;
  limit: number;
};
const fetchTodos = async (
  pagination?: Pagination
): Promise<Todo[] | undefined> => {
  const query = pagination
    ? Object.entries(pagination)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";
  const data: AxiosResponse = await axios.get(`${fetchTodosPath}?${query}`);
  return data.data;
};

export const useTodosQuery = (pagination?: Pagination) => {
  const queryKey = pagination
    ? [fetchTodosPath, pagination.limit, pagination.page]
    : [fetchTodosPath];
  return useQuery({
    queryKey,
    queryFn: () => fetchTodos(pagination),
  });
};

const fetchTodo = async (id: TodoID): Promise<Todo | undefined> => {
  const data: AxiosResponse = await axios.get(`${fetchTodosPath}/${id}`);
  return data.data;
};

export const useTodoQuery = (id: TodoID) =>
  useQuery<Todo, Error>({
    queryKey: [fetchTodosPath, id],
    queryFn: () => fetchTodo(id),
  });
