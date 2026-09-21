import { Link } from "react-router-dom";

import {useNotice} from '../contexts/NoticeContext'

//대시보드:
//[도서검색페이지로이동버튼, 도서검색페이지로이동(특정카테고리), 공지사항브리핑영역]
export default function Home({  }){
    const {notice, setNotice} = useNotice();


    return (
        <>
<main className="container">
       <section>
            <h2>도서검색</h2>
            <div className="cards">
                <div className="card">
                    <h3>바로 검색하기</h3>
                    <p>통합 검색창에서 원하는 도서를 찾아보세요.</p>
                    <Link className="btn special" to="/bookSearch">도서검색 페이지 이동</Link>
                </div>
                <div className="card">
                    <h3>카테고리</h3>
                    <div className="category-buttons">
                        <Link className="btn" to="/bookSearch?category=IT">IT</Link>
                        <Link className="btn" to="/bookSearch?category=문학">문학</Link>
                        <Link className="btn" to="/bookSearch?category=아동">아동</Link>
                        <Link className="btn" to="/bookSearch?category=잡지">잡지</Link>
                    </div>
                </div>
            </div>
       </section>
       <section>
            <h2>공지사항</h2>
            <div className="cards">

                {notice.map(n=>(
                    <div key={n.createdAt} className="card">
                        <h3 className="title">[{n.title}]</h3>
                        <p className="title">{n.contents}</p>
                    </div>
                ))}

            </div>
       </section>
    </main>
        
        </>
    );
}