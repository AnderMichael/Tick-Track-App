export interface Percentage {
  id: number;
  scholarship_id: number;
  percentage: number;
  hours_per_semester: number;
  total_hours: number;
}


export type CreatePercentage = Omit<Percentage, "id" | "scholarship_id">;