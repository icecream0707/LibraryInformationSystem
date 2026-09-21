import { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [loggedInMemberId, setLoggedInMemberId] = useState(()=>{
        const previousId = localStorage.getItem('LibraryInformationSystemLoggedInData');
        return previousId ? Number(previousId) : 0;
    });

    useEffect(()=>{
        localStorage.setItem('LibraryInformationSystemLoggedInData', loggedInMemberId);
    }, [loggedInMemberId]);

    const value = useMemo(
        () => ({ loggedInMemberId, setLoggedInMemberId }),
        [loggedInMemberId]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth는 AuthProvider 안에서만 사용 가능합니다');
    }
    return context;
}
