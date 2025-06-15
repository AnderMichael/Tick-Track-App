import * as yup from "yup";

export const createScholarshipSchema = yup.object({
  name: yup
    .string()
    .required("Scholarship name is required")
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),
  description: yup
    .string()
    .required("Scholarship description is required")
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(1000, "La descripción no puede superar los 1000 caracteres"),
});
