import { createContext , useContext , useEffect, useState } from "react"

import NoticeData from "../data/NoticeData";


const NoticeContext = createContext(null);


export function NoticeProvider({children}){
    const [notice, setNotice] = useState(()=>{
        const saved = localStorage.getItem("LibraryInformationSystemNoticeData");
        return saved ? JSON.parse(saved) : NoticeData;
    });

    useEffect(()=>{
        localStorage.setItem("LibraryInformationSystemNoticeData", JSON.stringify(notice));
    }, [notice]);

    return (<NoticeContext.Provider value={{notice, setNotice}}>
        {children}
    </NoticeContext.Provider>);
}


export function useNotice(){
    const context = useContext(NoticeContext);
    if(!context){
        throw new Error('useNotice는 NoticeProvider 안에서만 사용 가능합니다');
    }
    return context;
}