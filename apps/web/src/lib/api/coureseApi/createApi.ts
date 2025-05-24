import { CourseSchema } from "@/features/course/schemas/course.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { axios } from "../../axios";
import { fetchTeacherPath } from "./fetchApi";
import { Course } from "./type";

type Create = z.infer<typeof CourseSchema.createDTO>;

const createCourse = async (
  data: Omit<Create, "id">
): Promise<{ data: Course } | undefined> => {
  return axios.post("/course", data);
};

export const useCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Course } | undefined, Error, Create>({
    mutationFn: createCourse,
    onSuccess: (res: { data: Course } | undefined) => {
      queryClient.invalidateQueries({ queryKey: [fetchTeacherPath] });
    },
  });
};
