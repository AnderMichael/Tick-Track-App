import React, { createContext, useContext } from 'react';

interface TransactionOperationFlowContextType {
    showDeleteModal: boolean;
    cancelDeleteModal: () => void;
    openDeleteModal: () => void;
    reload: boolean;
    activateReload: () => void;
    deactivateReload: () => void;
}

const TransactionOperationFlowContext = createContext<TransactionOperationFlowContextType | undefined>(undefined);

export const TransactionOperationFlowProvider: React.FC<{ children: React.ReactNode } & TransactionOperationFlowContextType> =
    ({ children, ...transactionStates }) => {
        return (
            <TransactionOperationFlowContext.Provider value={transactionStates}>
                {children}
            </TransactionOperationFlowContext.Provider>
        );
    };

export const useTransactionOperationFlow = (): TransactionOperationFlowContextType => {
    const context = useContext(TransactionOperationFlowContext);
    if (!context) {
        throw new Error('There is no TransactionOperationFlowContext created!');
    }
    return context;
};