import { useMutation } from "@tanstack/react-query";
import { axios } from "../axios";
import { authToken } from "../token/AuthToken";

export const authApiPath = {
  login: "/auth/login",
};

type Login = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const login = async (
  data: Login
): Promise<{ data: LoginResponse } | undefined> => {
  return axios.post(authApiPath.login, data);
};

export const useLogin = () =>
  useMutation<{ data: LoginResponse } | undefined, Error, Login>({
    mutationFn: login,
    onSuccess: (res: { data: LoginResponse } | undefined) => {
      if (res?.data) authToken.setItem(res.data.token);
    },
  });
