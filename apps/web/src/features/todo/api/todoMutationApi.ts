import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { Todo } from "@todo/core/entities/todo.entities";
import {
  CreateTodoDTO,
  TodoID,
  UpdateTodoDTO,
} from "@todo/core/repositories/todo.repository";
import { fetchTodosPath } from "./userQueryApi";

type Create = CreateTodoDTO;

const createTodo = async (
  data: Create
): Promise<{ data: Todo } | undefined> => {
  return axios.post("/todos", data);
};

export const useTodoCreateMutations = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Todo } | undefined, Error, Create>({
    mutationFn: createTodo,
    onSuccess: (res: { data: Todo } | undefined) => {
      queryClient.invalidateQueries({ queryKey: [fetchTodosPath] });
    },
  });
};

type UpdateTodoParam = {
  id: TodoID;
  data: UpdateTodoDTO;
};
const updateTodo = async (
  values: UpdateTodoParam
): Promise<{ data: Todo } | undefined> => {
  return axios.put(`/todos/${values.id}`, values.data);
};

export const useTodoUpdateMutations = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: Todo } | undefined, Error, UpdateTodoParam>({
    mutationFn: updateTodo,
    onSuccess: (res: { data: Todo } | undefined) => {
      queryClient.invalidateQueries({ queryKey: [fetchTodosPath] });
    },
  });
};

const deleteTodo = async (id: TodoID): Promise<{ data: void } | undefined> => {
  return axios.delete(`/todos/${id}`);
};

export const useTodoDeleteMutations = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: void } | undefined, Error, TodoID>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchTodosPath] });
    },
  });
};
