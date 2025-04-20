import * as yup from 'yup';

export const loginSchema = yup.object({
    upbCode: yup.string().required('El código UPB es requerido').min(3, 'El código UPB debe ser un número de al menos 3 dígitos').matches(/^[0-9]*$/, "Ingresa un número válido"),
    password: yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe ser de al menos 8 caracteres').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
    ),
});

export const confirmationSchema = yup.object({
    newPassword: yup.string().required('La contraseña es requerida').min(5, 'La contraseña debe ser de al menos 8 caracteres').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
    ),
    confirmPassword: yup.string().required('La confirmación de la contraseña es requerida').oneOf([yup.ref('newPassword')], 'Las contraseñas deben coincidir'),
});