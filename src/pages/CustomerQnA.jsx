import { useComplaint } from "../contexts/ComplaintContext";

import { useState , useEffect } from "react";

//complaint의 title이랑 status 만 표시해두고, 클릭하면 모달로 뜨는 로직.
export default function CustomerQnA({}){
    const {complaint, setComplaint} = useComplaint();

    const [modalId, setModalId] = useState(null);
    const selectedComplaint = modalId ? complaint.Complaints[modalId] : null;


    const [makeTitleQ, setMakeTitleQ] = useState("");
    const [makeContentsQ, setMakeContentsQ] = useState("");

    function complaintRegHandler(e){
        e.preventDefault();

        setComplaint({
            ComplaintIdIndex: complaint.ComplaintIdIndex+1,
            Complaints:{
                ...complaint.Complaints, ["c-"+complaint.ComplaintIdIndex]:{
                    title:makeTitleQ,
                    contents: makeContentsQ,
                    status:"대기중",
                    answer:null,
                }
            },
        });
        alert("질문이 등록되었습니다.");
    }

    return (
        <>
        {(modalId) && (
            <>
                <div className="modal-overlay" onClick={()=> setModalId(null)}>
                    <div className="modal-box" onClick={(e)=>e.stopPropagation()}>
                        <h3>질문 제목: {selectedComplaint.title}</h3>
                        <p>질문 내용: {selectedComplaint.contents}</p>
                        <p>상태: {selectedComplaint.status}</p>
                        {selectedComplaint.answer && <p>답변: {selectedComplaint.answer}</p>}
                        <button className="btn" onClick={() => setModalId(null)} style={{float:"right"}}>닫기</button>
                    </div>
                </div>
            </>
        )}

        <div className="container justifySelfCenter card">{/** 질문 목록 (클릭하면 모달 뜸) */}
            <h2>질문 목록</h2>
            {
            Object.entries(complaint.Complaints).map(([k,v])=>(
                <div key={k} className="justifySelfCenter card" style={{width:"1200px"}}
                    onClick={()=>setModalId(k)}
                >
                    <h3>{v.title}</h3>
                    <p>{v.status}</p>
                </div>
            ))
            }
        </div>
    
        <div className="container card justifySelfCenter">{/**질문 남기기 */}
            <form onSubmit={complaintRegHandler}>
                <h3>질문 남기기</h3> <button type="submit" className="btn special" style={{float:"right"}}>등록하기</button>
                <input className="input"
                    value={makeTitleQ}
                    onChange={(e)=>setMakeTitleQ(e.target.value)}
                    placeholder="질문 제목을 입력하세요.."
                required/>
                <br/><br/>
                <textarea
                    className="notice-textarea"
                    value={makeContentsQ}
                    onChange={(e)=>setMakeContentsQ(e.target.value)}
                    placeholder="질문 내용을 입력하세요.."
                    rows={6}
                required/>
            </form>
        </div>
        </>
    );
}