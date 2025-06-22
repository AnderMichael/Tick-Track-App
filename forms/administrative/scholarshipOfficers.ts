import * as yup from "yup";

export const scholarshipOfficerSchema = yup.object({
  upbCode: yup
    .number()
    .typeError("Debe ser un número")
    .required("Código UPB requerido")
    .positive("Debe ser positivo"),

  firstName: yup
    .string()
    .required("Nombre requerido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),

  secondName: yup
    .string()
    .required("Segundo nombre requerido")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),

  fatherLastName: yup
    .string()
    .required("Apellido paterno requerido")
    .min(2)
    .max(50),

  motherLastName: yup
    .string()
    .required("Apellido materno requerido")
    .min(2)
    .max(50),

  email: yup
    .string()
    .email("Correo inválido")
    .required("Correo requerido"),

  phone: yup
    .string()
    .matches(/^[0-9]{7,15}$/, "Teléfono inválido")
    .required("Teléfono requerido"),

  department_id: yup
    .number()
    .typeError("Departamento requerido")
    .required()
    .positive(),

  role_id: yup
    .number()
    .typeError("Rol requerido")
    .required()
    .positive(),

  upbRole: yup
    .string()
    .required("Rol UPB requerido"),
});
