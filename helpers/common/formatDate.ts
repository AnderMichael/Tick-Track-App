export const formatDate = (date: string) => {
    const objDate = new Date(date);
    const capitalize = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(objDate);

    const formattedDateWithCapitalizedMonth = formattedDate.replace(
        /\b[a-zñáéíóúü]+\b/gi, // Encuentra palabras (como el mes)
        match => capitalize(match), // Capitaliza cada una
    );

    return formattedDateWithCapitalizedMonth;
};