import * as yup from 'yup';

export const transactionSchema = yup.object({
    hours: yup
        .number()
        .required('El número de horas es requerido')
        .min(1, 'El número de horas debe ser mayor a 0')
        .max(24, 'El número de horas no puede ser mayor a 24'),
    qualification: yup
        .number()
        .required('La calificación es requerida')
        .default(0)
        .oneOf([1,2,3,4], 'Debes seleccionar obligatoriamente una calificación'),
    comment: yup.string().default(''),
});