import React, { ReactNode, useContext, useState } from "react";

export type SemesterItem = {
    label: string
    value: number
};

export type Inscription = {
    id: number
    semester_id: number
    name: string
    start_date: string
    end_date: string
    commitment_id: number
    is_complete: boolean
}

interface SemesterContextType {
    semester: SemesterItem | null;
    setSemester: React.Dispatch<React.SetStateAction<SemesterItem | null>>;
    inscription: Inscription | null;
    setInscription: React.Dispatch<React.SetStateAction<Inscription | null>>;
}

const SemesterContext = React.createContext<SemesterContextType | null>(null);

interface SemesterProviderProps {
    children: ReactNode;
    initialSemesters?: SemesterItem[];
}

const SemesterProvider: React.FC<SemesterProviderProps> = ({
    children,
    initialSemesters = [],
}) => {
    const [semester, setSemester] = useState<SemesterItem | null>(
        initialSemesters[0] ?? null
    );
    const [inscription, setInscription] = useState<Inscription | null>(null);

    return (
        <SemesterContext.Provider value={{ semester, setSemester, inscription, setInscription }}>
            {children}
        </SemesterContext.Provider>
    );
};

const useSemester = () => {
    const context = useContext(SemesterContext);
    if (!context) {
        throw new Error("There is no SemesterContext created!");
    }
    return context;
};

export { SemesterProvider, useSemester };

