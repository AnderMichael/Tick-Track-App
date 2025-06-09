import * as yup from 'yup';

export const semesterCreationSchema = yup.object({
  title: yup
    .string()
    .required('El título del trabajo es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede superar los 100 caracteres'),
    
  workDates: yup
    .object({
      startDate: yup
        .date()
        .typeError('La fecha de inicio no es válida')
        .required('La fecha de inicio es obligatoria'),
      endDate: yup
        .date()
        .typeError('La fecha de fin no es válida')
        .required('La fecha de fin es obligatoria')
        .min(
          yup.ref('startDate'),
          'La fecha de fin no puede ser anterior a la fecha de inicio'
        ),
    })
    .required('Debe seleccionar un rango de fechas'),
});
