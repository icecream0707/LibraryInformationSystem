import { createContext, useContext, useState, useEffect } from "react";
import ComplaintData from "../data/ComplaintData";


const ComplaintContext = createContext(null);

export function ComplaintProvider({children}){
    const [complaint, setComplaint] = useState(()=>{
        const saved = localStorage.getItem("LibraryInformationSystemComplaintData");
        if(!saved) return ComplaintData;
        try{
            return JSON.parse(saved);
        }catch(e){
            console.warn("저장된 민원 데이터가 손상되어 초기값으로 대체합니다.", e);
            localStorage.removeItem("LibraryInformationSystemComplaintData");
            return ComplaintData;
        }
    });

    useEffect(()=>{
        localStorage.setItem("LibraryInformationSystemComplaintData", JSON.stringify(complaint));
    }  ,[complaint]);

    return (
        <ComplaintContext.Provider value={{complaint, setComplaint}}>
            {children}
        </ComplaintContext.Provider>
    );
}

export function useComplaint(){
    const context = useContext(ComplaintContext);

    if(!context){
        throw new Error('useComplaint는 ComplaintProvider 안에서만 사용 가능합니다');
    }
    return context;
}