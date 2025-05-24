"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axios } from "../../axios";
import { Course } from "./type";

export const fetchTeacherPath = "/course";

const fetchTeacher = async (): Promise<Course[] | undefined> => {
  const data: AxiosResponse = await axios.get(fetchTeacherPath);
  return data.data;
};

export const useCourseQuery = () =>
  useQuery({
    queryKey: [fetchTeacherPath],
    queryFn: fetchTeacher,
  });
