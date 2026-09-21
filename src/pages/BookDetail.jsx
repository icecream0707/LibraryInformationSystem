import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {useBooks} from '../contexts/BooksContext'
import { useAuth } from "../contexts/AuthContext"
import { useInterestedBooks } from '../contexts/InterestedBooksContext'
import {useBorrowedBooks } from '../contexts/BorrowedBooksContext'

import NotFound from './NotFound';

import '../css/BookDetail.css'
// onClick={() => navigate(`/bookDetail/${book.bookId}`)} 
// useParams 를 써야겠군.


//BooksData에서 bookId 를 통해서 BookDetail을 표시할 도서(theBook)를 지정.
//InterestedBooksData에서 로그인된 아이디가 관심표시한 bookId를 순회하다가 발견하면, 제목옆에 "관심badge" 표시
//BorrowedBooksData에서 누가 빌렸든, 빌려져있으면 setIsBorrowed(true), "대출중 + 반납예정일자" 표기.
//"대출하기"버튼은 borrowed===false && isLoggedIn 이어야 함. isLoggedIn===false이면 버튼 옆에 "로그인해야함"을 표시
//BorrowedBooksData에서 빌린 아이디와, 로그인된 아이디가 같으면, "반납하기"버튼을 만들고, 눌리면 alert와 함께 데이터베이스 변경.

export default function BookDetail({  }){
    const {bookId} = useParams();//경로파라미터가 바뀌면 bookId도 바뀜. bookId가 바뀔때마다 theBook 갱신
    
    const {loggedInMemberId, setLoggedInMemberId} = useAuth();
    const formattedMemberId = loggedInMemberId!==0 ? "m-" + loggedInMemberId : 0;

    const {books, setBooks} = useBooks();
    const {interestedBooks, setInterestedBooks} = useInterestedBooks();
    const {borrowedBooks, setBorrowedBooks} = useBorrowedBooks();

    const [theBook, setTheBook] = useState();
    const [isInterested, setIsInterested] = useState(()=>{
        return !!interestedBooks?.[formattedMemberId]?.find(b=>(b.bookId===bookId));
    });
    //borrowed[0] : id , borrowed[1] : 빌린 도서의 "borrowedBook 정보" 
    const [borrowed, setBorrowed] = useState(()=>{
        const entry = Object.entries(borrowedBooks).find(([mid, list])=>list.find(b=>b.bookId===bookId));
        return entry ? entry : false;
    });

    //InterestedBooksData에서 로그인된 아이디가 관심표시한 bookId를 순회하다가 발견하면, 제목옆에 "관심badge" 표시
    useEffect(()=>{
        //setInterestedBooks
        if(isInterested){//관심버튼 on -> 관심목록에 bookId 정보 추가
            setInterestedBooks(
                prev => ({ ...prev, [formattedMemberId]:[...(prev[formattedMemberId]||[]), {id:`like-${formattedMemberId}-${bookId}`, bookId, markedAt: new Date().toISOString()}]})
            );
        }
        else if(!isInterested){//관심버튼 off -> 관심목록에 bookId 정보 제거
            const newInterestedBooks = (interestedBooks[formattedMemberId]||[]).filter(m=>m.bookId !== bookId);
            setInterestedBooks(
                prev => ({ ...prev, [formattedMemberId]:newInterestedBooks })
            );
        }
    }, [isInterested]);

    //경로파라미터가 바뀌면 bookId도 바뀜. bookId가 바뀔때마다 theBook 갱신
    useEffect(()=>{
        setTheBook(books.Books.find(b=>b.bookId===bookId))
    }, [bookId]);

    //BorrowedBooksData에서 누가 빌렸든, 빌려져있으면 setBorrowedId(id), "대출중 + 반납예정일자" 표기.


// const BorrowedBooksData = {
//     //dueDate은 데이터를 추가할때 borrowedAt에서 7일을 더한 시간으로 계산한다.
//     //연체되었음은 member가 홈페이지에 마운트할때 useEffect로 검사해서, if문으로 alert받아가기.
//     //useEffect로, member의 BorrowedBooks.returnedAt을 순회하여 7일이 지났으면 데이터삭제.
//     //status는 {"대출중" | "반납완료" | "연체"}
//     "m-1":[
//         {id:"borrow-m-1-b-1", bookId:"b-1", borrowedAt:"2026-08-10T14:23:05.123Z", dueDate:"2026-08-17T14:23:05.123Z", returnedAt:null, status:"대출중"},
//     ],
//     "m-2":[],
//     "m-3":[],
// };

    function calculateDueDate(borrowedAt, loanDays = 7) {
    const due = new Date(borrowedAt);       // 문자열 → Date 객체로 파싱
    due.setDate(due.getDate() + loanDays);  // 7일 더함
    return due.toISOString();               // 다시 문자열로 변환해서 저장
    }
// const borrowedAt = "2026-08-10T14:23:05.123Z";
// const dueDate = calculateDueDate(borrowedAt, 7);

    function formatDate(dateStr){
        const d = new Date(dateStr);
        const mm = String(d.getMonth()+1).padStart(2,'0'); // getMonth()는 0부터 시작
        const dd = String(d.getDate()).padStart(2,'0');
        return `${mm}/${dd}`;
    }

    function interestedHandler(){
        if(loggedInMemberId===0){alert("로그인 하고 관심 기능을 사용하세요."); return;}
        setIsInterested(!isInterested);
    }

    function borrowClick(){
        if(loggedInMemberId === 0){alert("로그인 후 이용하세요."); return;}
        if(borrowed){alert("대출중입니다. 대출가능 상태일때 대출해주세요."); return;}

        //여기서부터 대출 로직. setBorrowed = [borrow한memberId, [멤버의 도서들borrow정보]]
        //그리고 데이터 저장.
        const borrowedAt = new Date().toISOString();
        const bookBorrowedData = { id:`borrow-${formattedMemberId}-${bookId}` , bookId , borrowedAt , dueDate: calculateDueDate(borrowedAt, 7) , returnAt:null , status:"대출중" };

        setBorrowed([formattedMemberId, [...borrowedBooks[formattedMemberId], bookBorrowedData] ]);
        setBorrowedBooks(prev=> ({...prev , [formattedMemberId]:[ ...prev[formattedMemberId] , bookBorrowedData ]}));
        setBooks(prev=>({
            bookIdIndex:prev.bookIdIndex,
            Books:[
                ...prev.Books.filter(b=>b.bookId!==bookId), {...prev.Books.find(b=>b.bookId===bookId), checkoutAvailable:false}
            ]
        }));
    }

    function returnClick(){
        // if 반납할 책이 로그인사용자의 borrow데이터에 존재하지 않는 책이면, -> 반납 접근이 잘못되었습니다 alert 후 return.
        // 본격적인 반납 로직. 1. 해당 데이터 삭제 수순 setBorrowed , setBorrowedBooks
        if(!borrowedBooks[formattedMemberId]?.find(b=>b.bookId===bookId)){alert("반납 접근이 잘못되었습니다."); return;}
        if(!window.confirm("반납하시겠습니까?")) return;

        setBorrowed(false);
        setBorrowedBooks(prev => ({...prev ,[formattedMemberId]:prev[formattedMemberId].filter(b=>b.bookId !== bookId)} ));
        setBooks(prev=>({
            bookIdIndex:prev.bookIdIndex,
            Books:[
                ...prev.Books.filter(b=>b.bookId!==bookId), {...prev.Books.find(b=>b.bookId===bookId), checkoutAvilable:true}
            ],
        }));
    }

    return (
        <>
            {(theBook) ? (
                <main className="container">
                    <section className="card">
                        <div className="detail_box">
                            {/** 도서 사진 넣는 곳⤵ */}
                            <div style={{width:"200px", height:"250px"}}>
                                <img src="./images/BookName.PNG" alt="표지" style={{width:"100%"}}/>
                            </div>
                            <div className="detail_right">
                                <p className={`badge`}>{borrowed[0] ? `대출중 ˙ 반납예정일자 : ${formatDate(borrowed[1].find(b=>b.bookId===bookId).dueDate)}` : "대출가능"}</p>
                                <h2 className="title" style={{marginBottom:"10px"}}>{theBook.title} <span style={{cursor:"pointer"}} onClick={interestedHandler}>{isInterested ? "💖" : "🤍"}</span></h2>
                                <p className="author muted" style={{margin:"0"}}>{theBook.author} ˙ {theBook.year}</p>
                                <p className="author muted" style={{margin:"0"}}>{theBook.publisher}</p>
                                <div className="category muted" style={{margin:"10px 0px"}}><span className="detail_sub">{theBook.category}</span></div>
                                <div style={{margin:"20px 0px"}}>
            {/**"대출하기"버튼은 borrowed===false && isLoggedIn 이어야 함. isLoggedIn===false이면 버튼 옆에 "로그인해야함"을 표시 */}
                                    <button className="btn" onClick={borrowClick}>대출하기</button>
                                    {(borrowed[0] === formattedMemberId)&&(<button className='btn' onClick={returnClick}>반납하기</button>)}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            ) : (
                <NotFound/>
            )}
        
        </>
    );
}

