import { SemesterSchema } from "@/features/semester/schemas/semester.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axios } from "../../axios";
import { fetchTeacherPath } from "./fetchApi";
import { Teacher } from "./type";

type Create = z.infer<typeof SemesterSchema.createDTO>;

const createTeacher = async (
  data: Create
): Promise<{ data: Teacher } | undefined> => {
  return axios.post("/teacher", data);
};

export const useTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Teacher } | undefined, Error, Create>({
    mutationFn: createTeacher,
    onSuccess: (res: { data: Teacher } | undefined) => {
      queryClient.invalidateQueries({ queryKey: [fetchTeacherPath] });
    },
  });
};
