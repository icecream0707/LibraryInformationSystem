import { createContext, useContext, useState, useEffect, useMemo } from "react";











import { createContext, useContext, useState, useEffect, useMemo } from "react";

import InterestedBooksData from '../data/InterestedBooksData';


const InterestedBooksContext = createContext(null);

export function InterestedBooksProvider({children}){
    const [interestedBooks, setInterestedBooks] = useState(()=>{
        const saved = localStorage.getItem('LibraryInformationSystemInterestedBooksData');
        return saved ? JSON.parse(saved) : InterestedBooksData;
    });

    useEffect(()=>{
        localStorage.setItem('LibraryInformationSystemInterestedBooksData', JSON.stringify(interestedBooks));
    }, [interestedBooks]);

    const value = useMemo(
        () => ({ interestedBooks, setInterestedBooks }),
        [interestedBooks]
    );

    return (
        <InterestedBooksContext.Provider value={value}>
            {children}
        </InterestedBooksContext.Provider>
    );
}


export function useInterestedBooks(){
    const context = useContext(InterestedBooksContext);

    if(!context){
        throw new Error('useInterestedBooks는 InterestedBooksProvider 안에서만 사용 가능합니다');
    }
    return context;
}