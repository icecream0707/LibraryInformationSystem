import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
// import {useBooks} from '../contexts/BooksContext' 이거 대신, 아래 라인 import
import {getBooks} from '../api'; // 이거 import !
import BookCards from '../conponents/BookCards';


export default function BookSearch({  }){
    const [searchParams, setSearchParams] = useSearchParams(); // useNavigate() 가 내장되어 있어서, 쿼리파라미터를 바꾼 경로로 이동(요청)
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const [books, setBooks] = useState([]); // 기본으로 일단 남겨두고, 아래 useEffect 에서 fetch해올 것임.
    useEffect(()=>{                         // 여기 import.
        async function fetchBooks(){
            try {
                const res = await getBooks();
                setBooks(res.data);
            } catch (err) {
                console.error('도서 목록을 불러오는데 실패했습니다:', err);
            }
        }
        fetchBooks();
    }, []);

    const [filteredBooks, setFilteredBooks] = useState([]);

    //search, category, books 가 바뀔때마다 setFilteredBooks 한다.
    useEffect(()=>{
        let result = books;
        if(search){
            const searchApply = search.toLowerCase();
            result = result.filter(b=>b.title.toLowerCase().includes(searchApply));
        }
        if(category){
            result = result.filter(b=>b.category===category);
        }

        setFilteredBooks([...result].sort((a,b)=>a.title.localeCompare(b.title, 'ko')));
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

    //search, category 조건에 맞게 필터링된 결과를 "가나다"순으로 정렬하여 display.
    //(광고 도서 우선노출 기능은 DB에 해당 필드가 없어 제거함)
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
                                <option value="프로그래밍">프로그래밍</option>
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