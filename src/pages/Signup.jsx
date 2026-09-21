import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//context
import {useMembers} from '../contexts/MembersContext'
import {useAuth} from '../contexts/AuthContext'
import { useInterestedBooks } from '../contexts/InterestedBooksContext'
import {useBorrowedBooks } from '../contexts/BorrowedBooksContext'
//conponent
import NotFound from './NotFound';
//css
import '../css/signup.css'

// id===0이면 비로그인, id>0인 정수이면 로그인
export default function Signup(){
    const navigate = useNavigate();

    const {members, setMembers} = useMembers();
    const {loggedInMemberId: id} = useAuth();
    const {interestedBooks, setInterestedBooks} = useInterestedBooks();
    const {borrowedBooks, setBorrowedBooks} = useBorrowedBooks();

    const [nameIn,setNameIn] = useState("");
    const [idIn,setIdIn] = useState("");
    const [pwIn,setPwIn] = useState("");
    const [emailIn,setEmailIn] = useState("");

// const MembersData = {
//     memberIdIndex : 4,

//     members: [
//         {memberId:"m-1", name:"Alex",  id:"alex0707", pw:"test1", email:"aleX0707@naver.com"},
//         {memberId:"m-2", name:"박상현", id:"vacation", pw:"test2", email:"vaCation@gmail.com"},
//         {memberId:"m-3", name:"최두호", id:"superboy", pw:"test3", email:"superBoy@UFC.com"},
//     ],
// };

    function submitHandler(e){
        e.preventDefault();

        //아이디,이메일은 중복 불허.
        const idInputFixed = idIn; const emailInputFixed = emailIn; const nameInputFixed = nameIn; const pwInputFixed = pwIn;
        setNameIn(""); setIdIn(""); setPwIn(""); setEmailIn(""); 

        const isUsedId = members.members.find(m=>m.id===idInputFixed);
        if(isUsedId){alert("id사용불가능(중복)"); return;}
        const isUsedEmail = members.members.find(m=>m.email===emailInputFixed);
        if(isUsedEmail){alert("email사용불가능(중복)"); return;}
        //유효성검사 완료. 회원가입정보를 데이터베이스에 삽입하고, 로그인페이지로 이동.
        const newMemberId = "m-"+String(members.memberIdIndex);
        const newMembers = {memberIdIndex: members.memberIdIndex + 1 ,
                            members: [...members.members ,
                                {memberId:newMemberId, name:nameInputFixed, id:idInputFixed, pw:pwInputFixed, email:emailInputFixed}]
        };
        setMembers(newMembers);
        setInterestedBooks(prev => ({...prev, [newMemberId]:[] }));
        setBorrowedBooks(prev => ({...prev, [newMemberId]:[] }));
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
    }

    return (
        <>
            {(id===0) ? (
                <>
                    <main className="signup container">
                        <section className="card">
                            <h2>회원가입</h2>
                            <form onSubmit={submitHandler}>
                                <div className="form_group">
                                    <input className="input" type="text"
                                        onChange={(e)=>setNameIn(e.target.value)} value={nameIn}
                                        placeholder="이름" required/>
                                    <input className="input" type="text"
                                        onChange={(e)=>setIdIn(e.target.value)} value={idIn}
                                        placeholder="아이디" required/>
                                    <input className="input" type="password"
                                        onChange={(e)=>setPwIn(e.target.value)} value={pwIn}
                                        placeholder="비밀번호" required/>
                                    <input className="input" type="email"
                                        onChange={(e)=>setEmailIn(e.target.value)} value={emailIn}
                                        placeholder="이메일" required/>
                                    <button type="submit" className="btn">가입하기</button>                    
                                </div>
                            </form>
                        </section>
                    </main>
                </>
            ) : (
                <NotFound/>
            )}
        
        </>
    );
}