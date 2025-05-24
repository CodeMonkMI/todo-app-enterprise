import { SemesterTypeEnum } from "@/features/semester/schemas/semester.schema";

export type Semester = {
  id: string;
  name: string;
  type: SemesterTypeEnum;
  maxStudents: number;
  maxCourses: number;
};
