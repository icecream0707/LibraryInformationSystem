import {useNotice} from '../contexts/NoticeContext'


export default function Notice({  }){
    const {notice, setNotice} = useNotice();

    return (
        <div className='container'>
            <h2>공지사항</h2>
            <div className="cards">

                {notice.map(n=>(
                    <div key={n.createdAt} className="card">
                        <h3 className="title">[{n.title}]</h3>
                        <p className="title">{n.contents}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}