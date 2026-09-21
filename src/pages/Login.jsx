//react
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//context
import { useMembers } from "../contexts/MembersContext"
import { useAuth } from "../contexts/AuthContext"
//component
import NotFound from "./NotFound";

import '../css/login.css'

// id===0이면 비로그인, id>0인 정수이면 로그인
export default function Login(){
    const navigate = useNavigate();

    const {members, setMembers} = useMembers(); // context 불러옴(members만 사용)
    const {loggedInMemberId: id, setLoggedInMemberId: setLoggedInId} = useAuth();
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");

    function SubmitHandler(e){
        e.preventDefault();
        //아이디 유효성 검사
        const matchedMember = members.members.find(m=>m.id === loginId);
        if(!matchedMember){ alert("아이디가 잘못 입력되었습니다."); return;}
        //비밀번호 유효성 검사
        const PwMatched = (matchedMember.pw === loginPw);
        if(!PwMatched){ alert("비밀번호가 잘못 입력되었습니다."); return;}

        //해당 member의 index추출
        const memberId = matchedMember.memberId;
        const memberIndex = Number(memberId.split("-")[1]);

        setLoginId("");
        setLoginPw("");

        setLoggedInId(memberIndex);
        navigate("/");
    }

    return (
        <>
            {(id===0) ? (
                <>
                    <main className="login container">
                        <section className="card">
                            <h2>로그인</h2>
                            <form onSubmit={SubmitHandler}>
                                <div className="form_group">
                                    <input className="input" type="text"
                                    value={loginId} onChange={(e)=>setLoginId(e.target.value)}
                                    placeholder="아이디" required/>
                                    <input className="input" type="password"
                                    value={loginPw} onChange={(e)=>setLoginPw(e.target.value)}
                                    placeholder="비밀번호" required/>
                                    <button type="submit" className="btn special">로그인</button>
                                    <div className="muted">계정이 없으신가요? <Link className="btn" to="/signup">회원가입</Link></div>
                                </div>
                            </form>
                        </section>
                    </main>
                </>
            ) 
            : (
                <NotFound />
            )}
        
        </>
    );
}