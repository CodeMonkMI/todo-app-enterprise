import { SemesterTypeEnum } from "@/features/semester/schemas/semester.schema";
import { useMutation } from "@tanstack/react-query";
import { axios } from "../../axios";

export const authApiPath = {
  login: "/auth/login",
};

type Create = {
  email: string;
  password: string;
};

type SemesterDataResponse = {
  id: string;
  name: string;
  type: SemesterTypeEnum;
  maxStudents: number;
  maxCourses: number;
};

const createSemester = async (
  data: Create
): Promise<{ data: SemesterDataResponse } | undefined> => {
  return axios.post(authApiPath.login, data);
};

export const useSemesterCreate = () =>
  useMutation<{ data: SemesterDataResponse } | undefined, Error, Create>({
    mutationFn: createSemester,
    onSuccess: (res: { data: SemesterDataResponse } | undefined) => {
      if (res?.data) {
      }
    },
  });
