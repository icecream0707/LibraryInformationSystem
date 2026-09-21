import { createContext, useContext, useState, useEffect } from 'react'

import BooksData from '../data/BooksData'


const BooksContext = createContext(null);

export function BooksProvider({children}){
    const [books, setBooks] = useState(()=>{
        const saved = localStorage.getItem('LibraryInformationSystemBooksData');
        return saved ? JSON.parse(saved) : BooksData;
    });

    useEffect(()=>{
        localStorage.setItem('LibraryInformationSystemBooksData', JSON.stringify(books));
    }, [books]);

    return(
        <BooksContext.Provider value={{books, setBooks}}>
            {children}
        </BooksContext.Provider>
    );
}

export function useBooks(){
    const context = useContext(BooksContext);
    if(!context){
        throw new Error('useBooks는 BooksProvider 안에서만 사용 가능합니다');
    }
    return context;
}