import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../axios";
import { fetchTeacherPath } from "./fetchApi";
import { Teacher } from "./type";

const removeSemester = async (
  id: string
): Promise<{ data: Teacher } | undefined> => {
  return axios.delete(`/teacher/${id}`);
};

export const useTeacherRemoveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Teacher } | undefined, Error, string>({
    mutationFn: removeSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchTeacherPath] });
    },
  });
};
