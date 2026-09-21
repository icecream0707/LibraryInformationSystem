import { createContext, useContext, useState, useEffect, useMemo } from "react";

import BorrowedBooksData from '../data/BorrowedBooksData'


const BorrowedBooksContext = createContext(null);

export function BorrowedBooksProvider({children}){
    const [borrowedBooks, setBorrowedBooks] = useState(()=>{
        const saved = localStorage.getItem('LibraryInformationSystemBorrowedBooksData');
        return saved ? JSON.parse(saved) : BorrowedBooksData;
    });

    useEffect(()=>{
        localStorage.setItem('LibraryInformationSystemBorrowedBooksData', JSON.stringify(borrowedBooks));
    }, [borrowedBooks]);

    const value = useMemo(
        () => ({ borrowedBooks, setBorrowedBooks }),
        [borrowedBooks]
    );

    return (
        <BorrowedBooksContext.Provider value={value}>
            {children}
        </BorrowedBooksContext.Provider>
    );
}

export function useBorrowedBooks(){
    const context = useContext(BorrowedBooksContext);
    if(!context){
        throw new Error('useBorrowedBooks는 BorrowedBooksProvider 안에서만 사용 가능합니다')
    }
    return context;
}