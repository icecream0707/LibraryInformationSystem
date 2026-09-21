const MembersData = {
    memberIdIndex : 4,

    members: [
        {memberId:"m-1", name:"Alex",  id:"alex0707", pw:"test1", email:"aleX0707@naver.com"},
        {memberId:"m-2", name:"박상현", id:"vacation", pw:"test2", email:"vaCation@gmail.com"},
        {memberId:"m-3", name:"최두호", id:"superboy", pw:"test3", email:"superBoy@UFC.com"},
    ],
};


export default MembersData;

//const {members, setMembers} = useMembers();
//const {borrowedBooks, setBorrowedBooks} = useBorrowedBooks();
//const {interestedBooks, setInterestedBooks} = useInterestedBooks();

{/*<tbody>
    {books.Books.map(b=>(
        <tr key={b.bookId} style={{position:"relative"}}>
            <td>{b.bookId}</td>
            <td>{b.title}</td>
            <td>{b.author}</td>
            <td>{b.category}</td>
            <td>{b.checkoutAvailable ? "대출가능" : "대출중"}</td>
            <td className="status" style={{paddingTop:"5px"}}>
                <Link className="btn bookManageBtn" to={`bookDetail/:${b.bookId}`}>상세</Link>
                <button className="btn bookManageBtn" type="button" onClick={()=>setEditingBookId(b.bookId)}>수정</button>
                <button className="btn bookManageBtn" type="button" onClick={()=>deleteBookHandler(b.bookId)}>삭제</button>

                <div className={`editingArea ${(editingBookId!==b.bookId) ? "hidden" : "active"}`}>
                    <form className='flex' onSubmit={editingBookHandler}>
                        <div style={{width:"130px"}}></div>
                        <input className='input' style={{width:"200px"}}
                            value={editingTitle}
                            onChange={(e)=>setEditingTitle(e.target.value)}
                            placeholder='수정할 제목..'
                        required/>
                        <div style={{width:"70px"}}></div>
                        <input className='input' style={{width:"140px"}}
                            value={editingAuthor}
                            onChange={(e)=>setEditingAuthor(e.target.value)}
                            placeholder='수정할 저자..'
                        required/>
                        <div style={{width:"40px"}}></div>
                        <select value={editingCategory}
                                onChange={(e)=>setEditingCategory(e.target.value)}>
                            <option value="">수정할 카테고리..</option>
                            <option value="문학">문학</option>
                            <option value="IT">IT</option>
                            <option value="아동">아동</option>
                            <option value="잡지">잡지</option>
                        </select>
                        <div style={{width:"287px"}}></div>
                        <div>
                            <button className='btn' type='button' onClick={()=>setEditingBookId(null)}>수정 취소</button>
                            <button className='btn' type='submit'>확인</button>
                        </div>
                    </form>
                </div>
            </td>
        </tr>
    ))}
</tbody> */}