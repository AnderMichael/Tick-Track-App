import { createContext, useContext } from 'react';

interface WorkOperationFlowContextType {
    showDeleteModal: boolean;
    cancelDeleteModal: () => void;
    openDeleteModal: () => void;
    reload: boolean;
    activateReload: () => void;
    deactivateReload: () => void;
    reloadList: boolean;
    activateReloadList: () => void;
    deactivateReloadList: () => void;
}

const WorkOperationFlowContext = createContext<WorkOperationFlowContextType | null>(null);

export const WorkOperationFlowProvider: React.FC<{ children: React.ReactNode } & WorkOperationFlowContextType> =
    ({ children, ...workStates }) => {
        return (
            <WorkOperationFlowContext.Provider value={workStates}>
                {children}
            </WorkOperationFlowContext.Provider>
        );
    }

export const useWorkOperationFlow = () => {
    const context = useContext(WorkOperationFlowContext);
    if (!context) {
        throw new Error("There is no WorkOperationFlowContext created!");
    }
    return context;
};