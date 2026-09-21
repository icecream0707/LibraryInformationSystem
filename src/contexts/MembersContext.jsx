import { createContext, useContext, useState, useEffect } from "react";

import MembersData from "../data/MembersData";


const MembersContext = createContext(null);

export function MembersProvider({ children }){
    const [members, setMembers] = useState(()=>{
        const saved = localStorage.getItem('LibraryInformationSystemMembersData');
        return saved ? JSON.parse(saved) : MembersData;
    });

    useEffect(()=>{
        localStorage.setItem('LibraryInformationSystemMembersData', JSON.stringify(members));
    }, [members]);

    return (
        <MembersContext.Provider value={{members, setMembers}}>
            {children}
        </MembersContext.Provider>
    );
}

export function useMembers(){
    const context = useContext(MembersContext);
    if(!context){
        throw new Error('useBooks는 MembersProvider 안에서만 사용 가능합니다');
    }
    return context;
}