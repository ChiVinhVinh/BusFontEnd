import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface FilterState {
    time: string[];
    type: string[];
    seat: string[];
    flow: string[];
}

interface SelectedItemState {
    item: any | null;
    time: string;
}

interface FillterFormContextType {
    selectedFilters: FilterState;
    setSelectedFilter: React.Dispatch<React.SetStateAction<FilterState>>;
    selectedItem: SelectedItemState;
    setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItemState>>;
    dataTrip: any[];
    dataTripBack: any[];
    setDataTrip: React.Dispatch<React.SetStateAction<any[]>>;
    setDataTripBack: React.Dispatch<React.SetStateAction<any[]>>;
    isReturn: boolean;
    setIsReturn: React.Dispatch<React.SetStateAction<boolean>>;
    updateLichTrinhSeats: (lichTrinhId: string, updatedDsghe: any[],) => void;
}

export const FillterFormContext = createContext<FillterFormContextType | undefined>(undefined);

interface FillterFormProviderProps {
    children: ReactNode;
    dataTrip: any[];
    dataTripBack: any[];
}

export const FillterFormProvider: React.FC<FillterFormProviderProps> = ({
    children,
    dataTrip: initialDataTrip,
    dataTripBack: initialDataTripBack
}) => {
    const [selectedFilters, setSelectedFilter] = useState<FilterState>({
        time: [],
        type: [],
        seat: [],
        flow: [],
    });

    const [selectedItem, setSelectedItem] = useState<SelectedItemState>({
        item: null,
        time: ''
    });
    const [isReturn, setIsReturn] = useState(false);
    const [dataTrip, setDataTrip] = useState(initialDataTrip);
    const [dataTripBack, setDataTripBack] = useState(initialDataTripBack);
    console.log("Initial DataTrip:", initialDataTrip);
    console.log("Initial DataTripBack:", initialDataTripBack);

    useEffect(() => {
        setDataTrip(initialDataTrip);
        setDataTripBack(initialDataTripBack);
    }, [initialDataTrip, initialDataTripBack]);
    console.log("DataTrip state:", dataTrip);
    console.log("DataTripBack state:", dataTripBack);
    const updateLichTrinhSeats = (lichTrinhId: string, updatedDsghe: any[]) => {
        if (isReturn) {
            setDataTripBack(prevData => prevData.map(item =>
                item.idLichTrinh === lichTrinhId
                    ? { ...item, dsghe: updatedDsghe }
                    : item
            ));
        } else {
            setDataTrip(prevData => prevData.map(item =>
                item.idLichTrinh === lichTrinhId
                    ? { ...item, dsghe: updatedDsghe }
                    : item
            ));
        }
    };

    return (
        <FillterFormContext.Provider value={{
            selectedFilters,
            setSelectedFilter,
            selectedItem,
            setSelectedItem,
            dataTrip,
            dataTripBack,
            setDataTrip,
            setDataTripBack,
            isReturn,
            setIsReturn,
            updateLichTrinhSeats
        }}>
            {children}
        </FillterFormContext.Provider>
    );
};