import { Role } from "@/constants/common/roles";

export const roleDefinition = (role: string) => {
    if (Role.STUDENT == role) {
        return "Estudiante";
    }
    if (Role.SUPERVISOR == role) {
        return "Supervisor";
    }
    if (Role.SCHOLARSHIP_OFFICER == role) {
        return "Encargado de Becas";
    }
    if (Role.ADMIN == role) {
        return "Administrador";
    }
    return "Desconocido";
}