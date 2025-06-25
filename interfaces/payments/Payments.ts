export interface StudentPaymentInfo {
    upbCode: number,
    firstName: string,
    fatherLastName: string,
    commitment_id: number
}

export interface Payment {
    date: string;
    hours: number;
    // comment_student: string;
    comment_administrative?: string;
    work_id: number;
    commitment_id: number;
    qualification_id: number;
    author_id: number;
}