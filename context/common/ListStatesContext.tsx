import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ListStatesContextProps {
    pages: number;
    limit: number;
    total: number;
    showed: number;
    setPages: (pages: number) => void;
    setTotal: (total: number) => void;
    setShowed: (showed: number) => void;
    setLimit: (limit: number) => void;
}

const ListStatesContext = createContext<ListStatesContextProps | undefined>(undefined);

export const ListStatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [showed, setShowed] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    return (
        <ListStatesContext.Provider value={{ pages, limit, total, showed, setPages, setTotal, setShowed, setLimit }}>
            {children}
        </ListStatesContext.Provider>
    );
};

export const useListStates = (): ListStatesContextProps => {
    const context = useContext(ListStatesContext);
    if (!context) {
        throw new Error('useListStates must be used within a ListStatesProvider');
    }
    return context;
};