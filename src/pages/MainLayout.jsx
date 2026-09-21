import { useNavigate , Link, Outlet } from "react-router-dom"
import '../css/MainLayout.css'
import {useMembers} from '../contexts/MembersContext'
import {useAuth} from '../contexts/AuthContext'

// id===0이면 비로그인, id>0인 정수이면 로그인
export default function MainLayout(){
    const navigate = useNavigate();

    const {members, setMembers} = useMembers();
    const {loggedInMemberId: id, setLoggedInMemberId: setLoggedInId} = useAuth();
    const idFormatted = "m-" + String(id);

    function logout(){
        const isConfirmed = window.confirm("정말 로그아웃 하시겠습니까?");
        if(!isConfirmed) return;

        setLoggedInId(0);
        navigate("/");
    }


    //로그인,회원가입}은 id===0일때 출력, {나의도서관}은 id>0일때 출력.
    return (
        <>
            <header className="header">
                <div className="container">
                    <nav className="nav">
                        <Link to="/" className="btn brand">📚 Library</Link> 
                        <nav className="menu">
                            {(id===0)&&(
                                <>
                                <Link className="btn basic" to="/login">로그인</Link>
                                <Link className="btn basic" to="/signup">회원가입</Link>
                                </>
                            )}
                            {(id>0)&&
                                <>
                                <Link className="btn" to="/myLib">{members.members.find(m=>m.memberId===idFormatted).id}님의 도서관</Link>
                                <Link className="btn" onClick={logout} to="/">로그아웃</Link>
                                </>
                            }
                            <Link className="btn" to="/notice">공지사항</Link>
                            <Link className="btn" to="/customerService">고객센터</Link>
                            <Link className="btn special" to="/manager" >관리자모드</Link>
                        </nav>
                    </nav>
                </div>
            </header>

            <Outlet />
        </>
    );
}