import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../axios";
import { fetchTeacherPath } from "./fetchApi";
import { Course } from "./type";

const removeSemester = async (
  id: string
): Promise<{ data: Course } | undefined> => {
  return axios.delete(`/course/${id}`);
};

export const useCourseRemoveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Course } | undefined, Error, string>({
    mutationFn: removeSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchTeacherPath] });
    },
  });
};
