import { useState , useEffect } from "react";
import BookCard from "./BookCard";
import '../css/BooksCards.css'


//     Books: [
//         { bookId:"b-1", title:"원소 원정대", author:"아게도리도리", category:"문학", isbn:"9791155819326", checkoutAvailable: true, ad: false },
//         { bookId:"b-2", title:"싯다르타", author:"헤르만 헤세", category:"문학", isbn:"9788937460586", checkoutAvailable: true, ad: false },
//         { bookId:"b-3", title:"나의 첫 번째 부동산 교과서", author:"송희구", category:"잡지", isbn:"9791193904435", checkoutAvailable: true, ad: false },
//     ]

export default function BookCards({ filteredBooks }){
//{이전, 다음} 버튼의 hidden여부는 filteredBooks 의 개수가 4개초과일때 visible, 4개미만일때 hidden.
//filteredBooks의 개수와 페이지개수의 상관관계-> f:p~>5:2~8:2 , 9:3~12:3 === f-1:p~>4:2~7:2(4~7/4의 몫:1 페이지수:2) , 8:3~11:3(8~11/4의 몫:2 페이지수:3)

    const isMoreThanStandard= filteredBooks.length > 4;
    const pageNum = Math.floor((filteredBooks.length-1)/4)+1;
    const pageArr = Array.from({length: pageNum}, (_, i)=>i+1);

    const [currPage, setCurrPage] = useState(1);

    useEffect(()=>{
        setCurrPage(1);
    }, [filteredBooks])

    return (
        <>
            <div className="cardWrapper">
                {filteredBooks.slice((currPage-1)*4, (currPage-1)*4+4).map(b=>(
                    <BookCard key={b.bookId} book={b}/>
                ))}
            </div>
            {(isMoreThanStandard)&&(
                <div style={{justifySelf:"center"}}>
                    <button className="btn basic" onClick={()=>setCurrPage(p=>p-1)}
                            disabled={currPage===1}
                    >◀ 이전</button>
                        {pageArr.map(p=>(
                            <button className={`btn basic ${p===currPage ? 'active' : ''}`} key={p}
                                    onClick={()=>setCurrPage(p)}
                            >{p}</button>
                        ))}
                    <button className="btn basic" onClick={()=>setCurrPage(p=>p+1)}
                            disabled={currPage===pageNum}
                    >다음 ▶</button>
                </div>
            )}
        </>
    );
}