import { useStateOperation } from '@/hooks';
import { createContext, useContext } from 'react';

interface WorkStateContextType {
    showDeleteModal: boolean;
    cancelDeleteModal: () => void;
    openDeleteModal: () => void;
    reload: boolean;
    activateReload: () => void;
    deactivateReload: () => void;
}

const WorkStateContext = createContext<WorkStateContextType | null>(null);

export const WorkStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const workStates = useStateOperation();
    return (
        <WorkStateContext.Provider value={workStates}>
            {children}
        </WorkStateContext.Provider>
    );
}

export const useWorkState = () => {
    const context = useContext(WorkStateContext);
    if (!context) {
        throw new Error("There is no WorkStateContext created!");
    }
    return context;
};