import { axios } from "@/lib/axios";
import { authToken } from "@/lib/token/AuthToken";
import { useMutation } from "@tanstack/react-query";
import { LoginFormInputs } from "../schema";

export const authApiPath = {
  login: "/auth/login",
};

type LoginResponse = {
  token: string;
};

export const login = async (
  data: LoginFormInputs
): Promise<{ data: LoginResponse } | undefined> => {
  return axios.post(authApiPath.login, data);
};

export const useLogin = () =>
  useMutation<{ data: LoginResponse } | undefined, Error, LoginFormInputs>({
    mutationFn: login,
    onSuccess: (res: { data: LoginResponse } | undefined) => {
      if (res?.data) authToken.set(res.data.token);
    },
  });
