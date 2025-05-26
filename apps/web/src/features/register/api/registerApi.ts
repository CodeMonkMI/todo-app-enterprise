import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { RegisterFormInputs, RegisterResponse } from "../schema";

export const authApiPath = {
  login: "/auth/register",
};

export const register = async (
  data: RegisterFormInputs
): Promise<{ data: RegisterResponse } | undefined> => {
  return axios.post(authApiPath.login, data);
};

export const useRegistration = () =>
  useMutation<
    { data: RegisterResponse } | undefined,
    Error,
    RegisterFormInputs
  >({
    mutationFn: register,
  });
