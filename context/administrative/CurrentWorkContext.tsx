import { Work } from "@/interfaces/administrative";
import React from "react";

interface CurrentWorkContextType {
    work: Work | null;
    setWork: React.Dispatch<React.SetStateAction<Work | null>>;
}

const CurrentWorkContext = React.createContext<CurrentWorkContextType | null>(null);

interface CurrentWorkProviderProps {
    children: React.ReactNode;
}

const CurrentWorkProvider: React.FC<CurrentWorkProviderProps> = ({ children }) => {
    const [work, setWork] = React.useState<Work | null>(null);

    return (
        <CurrentWorkContext.Provider value={{ work, setWork }}>
            {children}
        </CurrentWorkContext.Provider>
    );
};

const useCurrentWork = () => {
    const context = React.useContext(CurrentWorkContext);
    if (!context) {
        throw new Error("useCurrentWork must be used within a CurrentWorkProvider");
    }
    return context;
};

export { CurrentWorkProvider, useCurrentWork };

