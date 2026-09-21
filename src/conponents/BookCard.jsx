import { useNavigate } from 'react-router-dom';

//book = { bookId:"b-1", title:"원소 원정대", author:"아게도리도리", category:"문학", isbn:"9791155819326", checkoutAvailable: true, ad: false }
export default function BookCard({ book }){
    const navigate = useNavigate();
//card에 넣어야 할 book정보:V title, author, category,V checkoutAvailable

    return (
        <div className="card" onClick={() => navigate(`/bookDetail/${book.bookId}`)} style={{ cursor: 'pointer', lineHeight:'40px' }}>
            <div className={`badge ${book.checkoutAvailable ? 'ok' : ''}`}>
                {book.checkoutAvailable ? "대출가능" : "대출중"}
            </div>
            <h3>
                {book.title}
            </h3>
            <div>{book.author} . {book.category}</div>
        </div>
    );
}