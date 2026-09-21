import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import {useBooks} from '../contexts/BooksContext'
import BookCards from '../conponents/BookCards';


export default function BookSearch({  }){
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const {books, setBooks} = useBooks();

    const [filteredBooks, setFilteredBooks] = useState([]);

    //search, category, books 가 바뀔때마다 setFilteredBooks 한다.
    useEffect(()=>{
        let result = books.Books;
        if(search){
            const searchApply = search.toLowerCase();
            result = result.filter(b=>b.title.toLowerCase().includes(searchApply));
        }
        if(category){
            result = result.filter(b=>b.category===category);
        }

        if(!search && !category){
            const sorted = [...result].sort((a,b)=>a.title.localeCompare(b.title, 'ko'));
            const adBook = sorted.find(b=>b.ad);
            const rest = sorted.filter(b=>!b.ad);
            setFilteredBooks(adBook ? [adBook, ...rest] : rest);
        } else {
            setFilteredBooks([...result].sort((a,b)=>a.title.localeCompare(b.title, 'ko')));
        }
    }, [search, category, books]);

    const [searchInput, setSearchInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");



// const BooksData = {
//     bookIdIndex : 4,
//     Books: [
//         { bookId:"b-1", title:"원소 원정대", author:"아게도리도리", category:"문학", isbn:"9791155819326", checkoutAvailable: true, ad: false },
//         { bookId:"b-2", title:"싯다르타", author:"헤르만 헤세", category:"문학", isbn:"9788937460586", checkoutAvailable: true, ad: false },
//         { bookId:"b-3", title:"나의 첫 번째 부동산 교과서", author:"송희구", category:"잡지", isbn:"9791193904435", checkoutAvailable: true, ad: false },
//     ],
// };

    //search, category 둘다 쿼리스트링에 들어오지 않았을때는 "가나다"순으로 도서 정렬 display.
    //단, 광고중인 도서 1권을 가장 상단에 띄우기. 광고는 한권밖에 안된다??????

    //나머지는 정렬하여서 광고없이 display
    function submitHandler(e){
        e.preventDefault();

        const params = {};
        if(searchInput) params.search = searchInput;
        if(categoryInput && categoryInput !== "전체") params.category = categoryInput;

        setSearchParams(params);
    }

    return (
        <>
            <div className='container'>
                <section className="card" style={{justifyItems:'center'}}>
                    <form onSubmit={submitHandler} >
                            <input className="input"
                                value={searchInput}
                                onChange={(e)=>setSearchInput(e.target.value)}
                                placeholder='도서 제목으로 검색...'
                            />
                            <select className="select" value={categoryInput} onChange={(e)=>setCategoryInput(e.target.value)}>
                                <option value="전체">전체</option>
                                <option value="IT">IT</option>
                                <option value="문학">문학</option>
                                <option value="아동">아동</option>
                                <option value="잡지">잡지</option>
                            </select>
                            <button type="submit" className="btn">검색</button>
                    </form>
                </section>

                <div>{/**도서display되는 영역 */}
                    <BookCards filteredBooks={filteredBooks}/>
                </div>
            </div>
        
        </>
    );
}