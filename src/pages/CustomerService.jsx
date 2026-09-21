import { useAuth } from "../contexts/AuthContext";
import { useComplaint } from "../contexts/ComplaintContext";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function CustomerService({  }){
    const navigator = useNavigate();
    const {loggedInMemberId, setLoggedInMemberId} = useAuth();
    const {complaint, setComplaint} = useComplaint();

    const [openDetailFAQ, setOpenDetailFAQ] = useState(0);

    function openFAQ(key){
        if(openDetailFAQ===key){
            setOpenDetailFAQ(0);
            return;
        }
        setOpenDetailFAQ(key);
    }

    function gotoCustomerQnA(){
        navigator("/customerQnA");
    }

    return (
        <>
            <div className="container card justifySelfCenter">{/**이용안내 */}
                <h2>이용안내</h2>
                <ul>
                    <li>대출: 2주, 5권 이내</li>
                    <li>연장: 1회 가능(연체 시 불가)</li>
                    <li>운영시간: 평일 09:00 ~ 18:00</li>
                </ul>
            </div>

            <div className="container card justifySelfCenter">{/**FAQ */}
                <h2>FAQ</h2>
                <div key="1" className="card" style={{cursor:"pointer"}}>
                    <h3 onClick={()=>openFAQ(1)}>비밀번호를 잊어버렸어요. <span style={{float:"right"}}>{openDetailFAQ===1 ? "🔼" : "🔽"}</span></h3>
                    {(openDetailFAQ===1) && (
                        <p>
                            아직 비밀번호 찾기 기능이 구현되어 있지 않은 사이트입니다. 사이트 전화번호로 문의 남겨주세요.
                        </p>
                    )}
                </div>
                <div key="2" className="card" style={{cursor:"pointer"}}>
                    <h3 onClick={()=>openFAQ(2)}>도서 신청도 받나요? <span style={{float:"right"}}>{openDetailFAQ===2 ? "🔼" : "🔽"}</span></h3>
                    {(openDetailFAQ===2) && (
                        <p>
                            본인이 기증해주시면 될 것 같아요. 도서가 부족해서 죄송합니다.
                        </p>
                    )}
                </div>
                <div key="3" className="card" style={{cursor:"pointer"}}>
                    <h3 onClick={()=>openFAQ(3)}>고객센터 묻고 답하기 기능은 없나요? <span style={{float:"right"}}>{openDetailFAQ===3 ? "🔼" : "🔽"}</span></h3>
                    {(openDetailFAQ===3) && (
                        <p>
                            이거 끝나고 구현할거에요. 잠시만 기다려주세요.
                        </p>
                    )}
                </div>
            </div>

            <div className="container card justifySelfCenter" style={{cursor:"pointer"}} onClick={gotoCustomerQnA}>{/**질문 남기기 */}
                <h4 style={{justifySelf:"center"}}>직접 질문하려면, 묻고 답하기</h4>
            </div>
        
        </>
    );
}