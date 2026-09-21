//Auth 받아오고, 
import {useBooks} from '../contexts/BooksContext'
import { useAuth } from "../contexts/AuthContext";
import { useInterestedBooks } from '../contexts/InterestedBooksContext'
import {useBorrowedBooks } from '../contexts/BorrowedBooksContext'

import NotFound from "./NotFound";


export default function MyLib({  }){
    const {loggedInMemberId, setLoggedInMemberId} = useAuth();
    const formattedMemberId = loggedInMemberId!==0 ? "m-" + loggedInMemberId : 0;

    const {books, setBooks} = useBooks();
    const {interestedBooks, setInterestedBooks} = useInterestedBooks();
    const {borrowedBooks, setBorrowedBooks} = useBorrowedBooks();

    //사용자의 관심도서 추출
    const userInterestBooks = (formattedMemberId!==0) ? books.Books.filter(Book=>( interestedBooks[formattedMemberId].map(b=>b.bookId) ).includes(Book.bookId)) : (false);

    //사용자의 대출도서 추출
    const userBorrowedBooks = (formattedMemberId!==0) ? books.Books.filter(Book=>( borrowedBooks[formattedMemberId].map(b=>b.bookId) ).includes(Book.bookId) ) : (false);

    function unlikeHandler(e){
        if(!window.confirm("관심 도서에서 해제하시겠습니까?")) return;
        const bookId = e.target.dataset.bookId;
        setInterestedBooks(prev => ({
            ...prev,
            [formattedMemberId]: (prev[formattedMemberId]||[]).filter(b=>b.bookId !== bookId)
        }));
    }

    function returnHandler(e){
        if(!window.confirm("반납하시겠습니까?")) return;
        const bookId = e.target.dataset.bookId;
        setBorrowedBooks(prev => ({
            ...prev,
            [formattedMemberId]: (prev[formattedMemberId]||[]).filter(b=>b.bookId !== bookId)
        }));
    }

    return (<>
        {(formattedMemberId!==0) ? (
            <>
            <main className="container">
            <section>
                    <div className="cards">
                        <div className="card">
                            <h3>내 관심도서</h3>
                            <p key={userInterestBooks.length} className="muted">현재 관심도서 {userInterestBooks.length}권</p>
                            {(userInterestBooks.length!==0)&&(<table className='table mylib'>
                                <thead><tr><th>제목</th><th>작가</th><th>isbn</th><th>관심해제</th></tr></thead>
                                <tbody>{userInterestBooks.map(b=>(<tr key={b.bookId}><td>{b.title}</td><td>{b.author}</td><td>{b.isbn}</td><td><button data-book-id={b.bookId} onClick={unlikeHandler}>해제</button></td></tr>))}</tbody>
                            </table>)}
                        </div>
                        <div className="card">
                            <h3>대출중인 도서</h3>
                            <p key={userBorrowedBooks.length} className="muted">현재 대출도서 {userBorrowedBooks.length}권</p>
                            {(userBorrowedBooks.length!==0)&&(<table className='table mylib'>
                                <thead><tr><th>제목</th><th>작가</th><th>isbn</th><th>반납하기</th></tr></thead>
                                <tbody>{userBorrowedBooks.map(b=>(<tr key={b.bookId}><td>{b.title}</td><td>{b.author}</td><td>{b.isbn}</td><td><button data-book-id={b.bookId} onClick={returnHandler}>반납</button></td></tr>))}</tbody>
                            </table>)}
                        </div>
                    </div>
                    
            </section>
            </main>
            </>
        ) : (
            <NotFound/>
        )}
        </>
    );
}