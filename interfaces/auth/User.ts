export interface User {
    upbCode: number;
    email: string;
    fullName: string;
    role: string;
    department: string;
    isConfirmed: boolean;
    student?: {
        semester: number;
        commitment?: any;
        inscriptions: any[];
    };
    administrative?: {
        upbRole: string;
    };
}