import { Work } from "@/interfaces/administrative";
import React from "react";

interface WorkContextType {
    work: Work | null;
    setWork: React.Dispatch<React.SetStateAction<Work | null>>;
}

const WorkContext = React.createContext<WorkContextType | null>(null);

interface WorkProviderProps {
    children: React.ReactNode;
}

const WorkProvider: React.FC<WorkProviderProps> = ({ children }) => {
    const [work, setWork] = React.useState<Work | null>(null);

    return (
        <WorkContext.Provider value={{ work, setWork }}>
            {children}
        </WorkContext.Provider>
    );
}

const useWork = () => {
    const context = React.useContext(WorkContext);
    if (!context) {
        throw new Error("There is no WorkContext created!");
    }
    return context;
};

export { WorkProvider, useWork };
