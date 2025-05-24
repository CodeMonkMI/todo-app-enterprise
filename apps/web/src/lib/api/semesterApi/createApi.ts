import { SemesterSchema } from "@/features/semester/schemas/semester.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axios } from "../../axios";
import { fetchSemestersPath } from "./fetchApi";
import { Semester } from "./type";

type Create = z.infer<typeof SemesterSchema.createDTO>;

const createSemester = async (
  data: Create
): Promise<{ data: Semester } | undefined> => {
  return axios.post("/semester", data);
};

export const useCreate = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Semester } | undefined, Error, Create>({
    mutationFn: createSemester,
    onSuccess: (res: { data: Semester } | undefined) => {
      queryClient.invalidateQueries({ queryKey: [fetchSemestersPath] });
    },
  });
};
