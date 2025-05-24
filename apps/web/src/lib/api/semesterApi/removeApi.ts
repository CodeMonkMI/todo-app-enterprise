import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../axios";
import { fetchSemestersPath } from "./fetchApi";
import { Semester } from "./type";

const removeSemester = async (
  id: string
): Promise<{ data: Semester } | undefined> => {
  return axios.delete(`/semester/${id}`);
};

export const useRemoveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<{ data: Semester } | undefined, Error, string>({
    mutationFn: removeSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchSemestersPath] });
    },
  });
};
