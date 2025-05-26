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

export type TodosDataResponse = {
  pagination: {
    limit: number;
    page: number;
    totalPages: number;
  };
  data: Todo[];
};

type Options = {
  pagination?: Pagination;
  filter?: { completed?: boolean };
};

const fetchTodos = async (
  options?: Options
): Promise<TodosDataResponse | undefined> => {
  let query = "";
  if (options!) {
    const { pagination = null, filter = null } = options;

    const query1 = pagination
      ? Object.entries(pagination)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    const query2 = filter
      ? Object.entries(filter)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    query = [query1, query2].filter(Boolean).join("&");
  }

  const data: AxiosResponse = await axios.get(`${fetchTodosPath}?${query}`);
  return data.data;
};

export const useTodosQuery = (options?: Options) => {
  const queryKey: any[] = [fetchTodosPath];
  if (options?.pagination) {
    const { limit, page } = options.pagination;
    queryKey.push(limit);
    queryKey.push(page);
  }
  if (options?.filter) {
    queryKey.push(options.filter.completed);
  }
  return useQuery({
    queryKey,
    queryFn: () => fetchTodos(options),
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
