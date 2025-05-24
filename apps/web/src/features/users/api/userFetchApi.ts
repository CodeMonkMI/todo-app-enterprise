import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { User } from "@todo/core/entities/user.entities";
import { UserID } from "@todo/core/repositories/user.repository";

export const fetchUsersPath = "/users";

const fetchUsers = async (): Promise<User[] | undefined> => {
  const data: AxiosResponse = await axios.get(fetchUsersPath);
  return data.data;
};

export const useUsersQuery = () =>
  useQuery({
    queryKey: [fetchUsersPath],
    queryFn: fetchUsers,
  });

const fetchUser = async (id: UserID): Promise<User | undefined> => {
  const data: AxiosResponse = await axios.get(`${fetchUsersPath}/${id}`);
  return data.data;
};

export const useUserQuery = (id: UserID) =>
  useQuery<User, Error>({
    queryKey: [fetchUsersPath, id],
    queryFn: () => fetchUser(id),
  });
