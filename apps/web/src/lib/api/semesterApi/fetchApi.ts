"use client";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axios } from "../../axios";
import { Semester } from "./type";

export const fetchSemestersPath = "/semester";

const fetchSemester = async (): Promise<Semester[] | undefined> => {
  const data: AxiosResponse = await axios.get(fetchSemestersPath);
  return data.data;
};

export const useSemesterQuery = () =>
  useQuery({
    queryKey: [fetchSemestersPath],
    queryFn: fetchSemester,
  });
