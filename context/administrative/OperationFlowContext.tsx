import { createContext, useContext } from "react";

interface OperationFlowContextType {
    showDeleteModal: boolean;
    cancelDeleteModal: () => void;
    openDeleteModal: () => void;
    reload: boolean;
    activateReload: () => void;
    deactivateReload: () => void;
}

export const OperationFlowContext = createContext<OperationFlowContextType | null>(null);

export const OperationFlowProvider: React.FC<{
    children: React.ReactNode;
} & OperationFlowContextType> = ({ children, ...operationState }) => {
    return (
        <OperationFlowContext.Provider value={operationState}>
            {children}
        </OperationFlowContext.Provider>
    );
};

export const useOperationFlow = () => {
    const context = useContext(OperationFlowContext);
    if (!context) {
        throw new Error("OperationFlowContext is not available!");
    }
    return context;
};
