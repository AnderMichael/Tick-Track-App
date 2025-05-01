export interface User {
    upbCode: number;
    email: string;
    fullName: string;
    role: string;
    department: string;
    isConfirmed: boolean;
    phone: string;
    student?: {
        semester: number;
        commitment?: any;
        accountKey: string;
        inscriptions: any[];
    };
    administrative?: {
        upbRole: string;
    };
}