import * as yup from "yup";

export const createPercentageSchema = yup.object({
  percentage: yup
    .number()
    .typeError("El porcentaje debe ser un número")
    .integer("El porcentaje debe ser un número entero")
    .min(0, "Debe ser al menos 0%")
    .max(100, "No puede exceder 100%")
    .required("El porcentaje es obligatorio"),

  hours_per_semester: yup
    .number()
    .typeError("Las horas por semestre deben ser un número")
    .integer("Las horas por semestre deben ser un número entero")
    .min(1, "Debe ser al menos 1 hora")
    .required("Las horas por semestre son obligatorias"),

  total_hours: yup
    .number()
    .typeError("Las horas totales deben ser un número")
    .required("Las horas totales son obligatorias"),
});
