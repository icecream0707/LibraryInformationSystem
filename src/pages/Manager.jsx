import {useBooks} from '../contexts/BooksContext'
import { useAuth } from "../contexts/AuthContext";
import { useInterestedBooks } from '../contexts/InterestedBooksContext'
import {useBorrowedBooks } from '../contexts/BorrowedBooksContext'
import {useNotice} from '../contexts/NoticeContext'
import {useMembers} from '../contexts/MembersContext'
import { useComplaint } from "../contexts/ComplaintContext";

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import '../css/Manager.css'
// const data = [
//     { name: '1월', 대출: 40 },
//     { name: '2월', 대출: 55 },
//     { name: '3월', 대출: 32 },
// ];

// const data = [
//   { name: '소설', value: 40 },
//   { name: '에세이', value: 25 },
//   { name: '자기계발', value: 20 },
//   { name: '기타', value: 15 },
// ];

export default function Manager({  }){
    const {loggedInMemberId, setLoggedInMemberId} = useAuth();
    const formattedMemberId = loggedInMemberId!==0 ? "m-" + loggedInMemberId : 0;

    const {books, setBooks} = useBooks();
    const {interestedBooks, setInterestedBooks} = useInterestedBooks();
    const {borrowedBooks, setBorrowedBooks} = useBorrowedBooks();
    const {notice, setNotice} = useNotice();
    const {members, setMembers} = useMembers();
    const {complaint, setComplaint} = useComplaint();

////////////// 도서 통계 /////////////////
    const BarChartData = useMemo(()=>{
        const categoryBooksNum = books.Books.reduce((acc, b)=>{
            acc[b.category] = (acc[b.category] ?? 0) + 1;
            return acc;
        }, { "문학": 0, "IT": 0, "아동": 0, "잡지": 0 });

        return [
            {name: "문학", value:categoryBooksNum["문학"] },
            {name: "IT", value:categoryBooksNum["IT"] },
            {name: "아동", value:categoryBooksNum["아동"] },
            {name: "잡지", value:categoryBooksNum["잡지"] },
        ];
    }, [books]);

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];


////////////// 질문 관리 //////////////
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [complaintAnswer, setComplaintAnswer] = useState("");
    useEffect(()=>{
        if(selectedComplaint === null){setComplaintAnswer(null); return;}

        setComplaintAnswer(complaint.Complaints[selectedComplaint].answer);
    }, [selectedComplaint]);

    function complaintAnswerHandler(e){
        e.preventDefault();

        setComplaint({
            ComplaintIdIndex: complaint.ComplaintIdIndex,
            Complaints:{
                ...complaint.Complaints,
                [selectedComplaint]:{
                    ...complaint.Complaints[selectedComplaint],
                    status: "답변완료",
                    answer:complaintAnswer,
                }
            }
        });
        alert("답변이 제출되었습니다");
        setSelectedComplaint(null);
    }


////////////// 공지사항 관리 //////////////
    const [noticeTitleInput, setNoticeTitleInput] = useState("");
    const [noticeContentsInput, setNoticeContentsInput] = useState("");
    function noticeInsertHandler(e){
        e.preventDefault();
        const newNotice = [...notice, {title:noticeTitleInput , contents:noticeContentsInput, createdAt:new Date().toISOString()}];

        setNotice(newNotice);

        alert("등록이 완료되었습니다.");
        setNoticeTitleInput(""); setNoticeContentsInput("");
    }
    function noticeDelete(createdAt){
        if(!window.confirm("공지를 삭제하시겠습니까?")) return;

        const newNotice = notice.filter(n=>n.createdAt!==createdAt);
        setNotice(newNotice);

        alert("공지사항 삭제가 완료되었습니다.");
    }


////////////// 도서 관리 //////////////
    const [bookInsertTitle, setBookInsertTitle] = useState("");
    const [bookInsertAuthor, setBookInsertAuthor] = useState("");
    const [bookInsertPublisher, setBookInsertPublisher] = useState("");
    const [bookInsertYear, setBookInsertYear] = useState("");
    const [bookInsertIsbn, setBookInsertIsbn] = useState("");
    const [bookInsertCategory, setBookInsertCategory] = useState("");

    function bookInsertReset(){
        setBookInsertTitle(""); setBookInsertAuthor(""); setBookInsertPublisher("");
        setBookInsertYear(""); setBookInsertIsbn(""); setBookInsertCategory("");
    }

    function bookInsertHandler(e){
        e.preventDefault();

        const newId = books.bookIdIndex;
        const newBook = { bookId:"b-"+newId,
            title:bookInsertTitle ,
            author:bookInsertAuthor ,
            year:bookInsertYear ,
            publisher:bookInsertPublisher ,
            category:bookInsertCategory ,
            isbn:bookInsertIsbn ,
            checkoutAvailable:true };
        setBooks({
            bookIdIndex: newId+1,
            Books: [
                ...books.Books , newBook
            ],
        });

        bookInsertReset();
        alert("도서가 등록되었습니다.");
    }

    const [editingBookId, setEditingBookId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingAuthor, setEditingAuthor] = useState("");
    const [editingCategory, setEditingCategory] = useState("");

    useEffect(()=>{
        setEditingTitle("");
        setEditingAuthor("");
        setEditingCategory("");
    }, [editingBookId]);

    function editingBookHandler(e){
        e.preventDefault();
        if(editingCategory===""){alert("수정할 카테고리를 선택하세요."); return;}

        //본격적인 book수정 로직.
        // setBooks를 올바르게 한다.
        // 그 전에 newBookInfo 객체를 만들어서 editingBookId(key)값에 대입해서 setBooks를 올바르게 한다.
        // Books는 객체가 아니라 배열이므로, 한번 filter로 기존의 editingBookId(key)값을 걸러내고 newBookInfo를 넣어야 한다.
        const prevBookInfo = books.Books.find(b=> b.bookId === editingBookId);

        const newBookInfo = {
            bookId:editingBookId,
            title:editingTitle,
            author:editingAuthor,
            year:prevBookInfo.year,
            publisher:prevBookInfo.publisher,
            category:editingCategory,
            isbn:prevBookInfo.isbn,
            checkoutAvailable:prevBookInfo.checkoutAvailable,
        };

        setBooks({
            bookIdIndex: books.bookIdIndex+1 ,
            Books:[...books.Books.filter(b=>b.bookId!==editingBookId) , newBookInfo]
        });

        alert("도서정보가 수정되었습니다.");
        setEditingBookId(null);
    }

    function deleteBookHandler(ParambookId){
        if(!books.Books.find(b=>b.bookId===ParambookId).checkoutAvailable){
            alert("대출중인 도서는 삭제할 수 없습니다."); return;
        }
        const isInterestedByAnyone = Object.values(interestedBooks).some(
            list => list.some(b=>b.bookId===ParambookId)
        );
        if(isInterestedByAnyone){
            alert("관심중인 도서는 삭제할 수 없습니다."); return;
        }
        if(!window.confirm("도서를 삭제하시겠습니까?")) return;

        setBooks(prev=>({
            bookIdIndex:prev.bookIdIndex,
            Books: prev.Books.filter(b=>b.bookId!==ParambookId)
        }));
        alert("도서 삭제가 완료되었습니다.");
    }

////////////// 회원 관리 //////////////
    function banMemberHandler(paramMemberId){
        if(!window.confirm(`{회원ID : ${paramMemberId}} 회원을 정말 탈퇴시킬까요?`)) return;
        if(borrowedBooks[paramMemberId] === null){alert("탈퇴시킬 회원의 정보가 없습니다."); return;}
        else if(borrowedBooks[paramMemberId].length !== 0){alert("도서 대출중인 회원은 탈퇴시킬 수 없습니다."); return;}

        //본격적인 회원정보 제거 로직: members, borrowedBooks, interestedBooks 에서 제거.
        setMembers(prev=>({
            ...prev,
            members: prev.members.filter(m=>m.memberId !== paramMemberId)
        }));
        setBorrowedBooks(prev=>{
            const next = {...prev};
            delete next[paramMemberId];
            return next;
        });
        setInterestedBooks(prev=>{
            const next = {...prev};
            delete next[paramMemberId];
            return next;
        });
    }

    return (
        <>
        <div className='container card justifySelfCenter'>
            <h2>도서 통계</h2>
            <div className='container flex justifySelfCenter'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={BarChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="카테고리별 도서수" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={BarChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                            >
                            {BarChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className='container card justifySelfCenter'>
            <h2>질문 관리</h2>
            {Object.entries(complaint.Complaints).map(([k,v])=>(
                <div key={k} className='card' >
                    <div onClick={()=>setSelectedComplaint(k)} style={{cursor:"pointer"}}>
                        <h3>{v.title}<span style={{float:"right"}}>상태: {v.status}</span></h3>
                    </div>
                    {(selectedComplaint === k) && (
                        <>
                            <p>질문 내용: {v.contents}</p>
                            <form onSubmit={complaintAnswerHandler}>
                                <a>답변 내용</a> <button className='btn' type='submit' style={{float:"right"}}>답변 완료</button>
                                <textarea className='notice-textarea'
                                    value={complaintAnswer}
                                    onChange={(e)=>setComplaintAnswer(e.target.value)}
                                    placeholder='답변할 내용을 입력하세요'
                                />
                            </form>
                        </>
                    )}
                </div>
            ))}
        </div>
        
        <div className="container card justifySelfCenter">
            <h2>공지사항 관리</h2>
            <div>
                <h3>공지사항 등록</h3>
                <form onSubmit={noticeInsertHandler}>
                    <input className='input'
                                        value={noticeTitleInput}
                                        onChange={(e)=>setNoticeTitleInput(e.target.value)}
                                        placeholder='공지 제목을 입력하세요..'/>
                                        <button className='btn' type='submit' style={{float:'right'}}>등록</button>
                    <br/><br/>
                    <textarea 
                        className="notice-textarea"
                        value={noticeContentsInput}
                        onChange={(e) => setNoticeContentsInput(e.target.value)}
                        placeholder='공지 내용을 입력하세요..'
                        rows={6}
                    />
                </form>
            </div>
            <div>
                <h3>공지사항 목록</h3>
                    {notice.map(n=>(
                        <div key={n.createdAt} className='card'>
                            <div className='flex spaceBetween'>
                                <h4>{n.title}</h4>
                                <button className='btn' style={{height:"40px", alignSelf:"center"}}
                                        onClick={()=>noticeDelete(n.createdAt)}>삭제</button>
                            </div>
                            <div>{n.contents}</div>
                        </div>
                        ))}
            </div>
        </div>

        <div className='container card justifySelfCenter'>
            <h2>도서 관리</h2>
            <section>
                <h3>도서 등록</h3>
                <form onSubmit={bookInsertHandler}>
                    <div className="book-form">
                        <input className="input" type="text" name="title" value={bookInsertTitle} onChange={(e)=> setBookInsertTitle(e.target.value)} placeholder="도서 제목" required/>
                        <input className="input" type="text" name="author" value={bookInsertAuthor} onChange={(e)=> setBookInsertAuthor(e.target.value)} placeholder="저자" required/>
                        <input className="input" type="text" name="publisher" value={bookInsertPublisher} onChange={(e)=> setBookInsertPublisher(e.target.value)} placeholder="출판사" required/>
                        <input className="input" type="number" name="year" value={bookInsertYear} onChange={(e)=> setBookInsertYear(e.target.value)} placeholder="발행년도" required min="0" max="2026"/>
                        <input className="input" type="text" name="isbn" value={bookInsertIsbn} onChange={(e)=> setBookInsertIsbn(e.target.value)} placeholder="ISBN" required/>
                        <input className="input" type="text" name="category" value={bookInsertCategory} onChange={(e)=> setBookInsertCategory(e.target.value)} placeholder="카테고리 (문학 / IT / 아동 / 잡지)" required/>
                    </div>
                    <div className="book-btn">
                        <button className="btn special" type="submit">등록</button>
                        <button className="btn basic" type="button" onClick={bookInsertReset}>초기화</button>
                    </div>
                </form>
            </section>

            <section className="book-section"> 
                <h2>도서목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>도서id</th>
                            <th>제목</th>
                            <th>저자</th>
                            <th>카테고리</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.Books.map(b=>(
                            <tr key={b.bookId} style={{position:"relative"}}>
                                <td>{b.bookId}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.category}</td>
                                <td>{b.checkoutAvailable ? "대출가능" : "대출중"}</td>
                                <td className="status" style={{paddingTop:"5px"}}>
                                    <Link className="btn bookManageBtn" to={`bookDetail/:${b.bookId}`}>상세</Link>
                                    <button className="btn bookManageBtn" type="button" onClick={()=>setEditingBookId(b.bookId)}>수정</button>
                                    <button className="btn bookManageBtn" type="button" onClick={()=>deleteBookHandler(b.bookId)}>삭제</button>

                                    <div className={`editingArea ${(editingBookId!==b.bookId) ? "hidden" : "active"}`}>
                                        <form className='flex' onSubmit={editingBookHandler}>
                                            <div style={{width:"130px"}}></div>
                                            <input className='input' style={{width:"200px"}}
                                                value={editingTitle}
                                                onChange={(e)=>setEditingTitle(e.target.value)}
                                                placeholder='수정할 제목..'
                                            required/>
                                            <div style={{width:"70px"}}></div>
                                            <input className='input' style={{width:"140px"}}
                                                value={editingAuthor}
                                                onChange={(e)=>setEditingAuthor(e.target.value)}
                                                placeholder='수정할 저자..'
                                            required/>
                                            <div style={{width:"40px"}}></div>
                                            <select value={editingCategory}
                                                    onChange={(e)=>setEditingCategory(e.target.value)}>
                                                <option value="">수정할 카테고리..</option>
                                                <option value="문학">문학</option>
                                                <option value="IT">IT</option>
                                                <option value="아동">아동</option>
                                                <option value="잡지">잡지</option>
                                            </select>
                                            <div style={{width:"287px"}}></div>
                                            <div>
                                                <button className='btn' type='button' onClick={()=>setEditingBookId(null)}>수정 취소</button>
                                                <button className='btn' type='submit'>확인</button>
                                            </div>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>

        <div className='container card justifySelfCenter'>
            <h2>회원 관리</h2>
            <section className="book-section"> 
                <h2>도서목록</h2>
                <table>
                    <thead>
                        <tr>
                            <th>회원id</th>
                            <th>이름</th>
                            <th>id</th>
                            <th>password</th>
                            <th>e-mail</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.members.map(m=>(
                            <tr key={m.memberId}>
                                <td>{m.memberId}</td>
                                <td>{m.name}</td>
                                <td>{m.id}</td>
                                <td>{m.pw}</td>
                                <td>{m.email}</td>
                                <td><button onClick={()=>banMemberHandler(m.memberId)}>강제 탈퇴</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>

        <div style={{height:"300px"}}>

        </div>
        </>
    );
}