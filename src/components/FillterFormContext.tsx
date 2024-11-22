import React, { createContext, useState, ReactNode } from 'react';

interface FilterState {
    time: string[];
    type: string[];
    seat: string[];
    flow: string[];
}

type FilterKeys = keyof FilterState;

interface FillterFormContextType {
    selectedFilters: FilterState;
    setSelectedFilter: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const FillterFormContext = createContext<FillterFormContextType | undefined>(undefined);

interface FillterFormProviderProps {
    children: ReactNode;
}

export const FillterFormProvider: React.FC<FillterFormProviderProps> = ({ children }) => {
    const [selectedFilters, setSelectedFilter] = useState<FilterState>({
        time: [],
        type: [],
        seat: [],
        flow: [],
    });

    return (
        <FillterFormContext.Provider value={{ selectedFilters, setSelectedFilter }}>
            {children}
        </FillterFormContext.Provider>
    );
};
