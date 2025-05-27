import { createContext, useContext } from "react";

interface TransactionStateContextType {
    showDeleteModal: boolean,
    cancelDeleteModal: () => void,
    openDeleteModal: () => void,
    reload: boolean,
    activateReload: () => void,
    deactivateReload: () => void,
}

export const TransactionStateContext = createContext<TransactionStateContextType | null>(null);

export const TransactionStateProvider: React.FC<{ children: React.ReactNode } & TransactionStateContextType> = ({ children, ...transactionState }) => {
    return (
        <TransactionStateContext.Provider value={transactionState}>
            {children}
        </TransactionStateContext.Provider>
    );
};

export const useTransactionState = () => {
    const context = useContext(TransactionStateContext);
    if (!context) {
        throw new Error("There is no TransactionStateContext created!");
    }
    return context;
};