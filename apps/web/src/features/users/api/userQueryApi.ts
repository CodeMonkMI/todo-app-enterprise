import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { User } from "@todo/core/entities/user.entities";
import { UserID } from "@todo/core/repositories/user.repository";

export const fetchUsersPath = "/users";

type Pagination = {
  page: number;
  limit: number;
};

const fetchUsers = async (
  pagination?: Pagination
): Promise<User[] | undefined> => {
  const query = pagination
    ? Object.entries(pagination)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";

  const data: AxiosResponse = await axios.get(`${fetchUsersPath}?${query}`);
  return data.data;
};

export const useUsersQuery = (pagination?: Pagination) => {
  const queryKey = pagination
    ? [fetchUsersPath, pagination.limit, pagination.page]
    : [fetchUsersPath];

  return useQuery({
    queryKey,
    queryFn: () => fetchUsers(pagination),
  });
};

const fetchUser = async (id: UserID): Promise<User | undefined> => {
  const data: AxiosResponse = await axios.get(`${fetchUsersPath}/${id}`);
  return data.data;
};

export const useUserQuery = (id: UserID) =>
  useQuery<User, Error>({
    queryKey: [fetchUsersPath, id],
    queryFn: () => fetchUser(id),
  });
