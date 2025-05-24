"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axios } from "../../axios";
import { Teacher } from "./type";

export const fetchTeacherPath = "/teacher";

const fetchTeacher = async (): Promise<Teacher[] | undefined> => {
  const data: AxiosResponse = await axios.get(fetchTeacherPath);
  return data.data;
};

export const useTeacherQuery = () =>
  useQuery({
    queryKey: [fetchTeacherPath],
    queryFn: fetchTeacher,
  });
