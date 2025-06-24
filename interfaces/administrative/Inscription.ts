import { Semester } from "./Semester";

export interface Inscription {
  id: number;
  semester: Semester;
  scholarship: string;
  percentage: number;
  commitmentId: number;
  createdAt: string;
}
