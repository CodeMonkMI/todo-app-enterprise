import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@todo/core/entities/user.entities";
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserID,
} from "@todo/core/repositories/user.repository";
import { fetchUsersPath } from "./userQueryApi";

type Create = CreateUserDTO;

const createUser = async (
  data: Create
): Promise<{ data: User } | undefined> => {
  return axios.post("/users", data);
};

export const useUserCreateMutations = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: User } | undefined, Error, Create>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchUsersPath] });
    },
  });
};

type UpdateUserParam = {
  id: UserID;
  data: UpdateUserDTO;
};
const updateUser = async (
  values: UpdateUserParam
): Promise<{ data: User } | undefined> => {
  return axios.put(`/users/${values.id}`, values.data);
};

export const useUserUpdateMutations = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: User } | undefined, Error, UpdateUserParam>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchUsersPath] });
    },
  });
};

const deleteUser = async (id: UserID): Promise<{ data: void } | undefined> => {
  return axios.delete(`/users/${id}`);
};

export const useUserDeleteMutations = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: void } | undefined, Error, UserID>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchUsersPath] });
    },
  });
};
