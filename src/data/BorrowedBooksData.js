const BorrowedBooksData = {
    //dueDate은 데이터를 추가할때 borrowedAt에서 7일을 더한 시간으로 계산한다.
    //연체되었음은 member가 홈페이지에 마운트할때 useEffect로 검사해서, if문으로 alert받아가기.
    //useEffect로, member의 BorrowedBooks.returnedAt을 순회하여 7일이 지났으면 데이터삭제.
    //status는 {"대출중" | "반납완료" | "연체"}
    "m-1":[
        {id:"borrow-m-1-b-1", bookId:"b-1", borrowedAt:"2026-08-10T14:23:05.123Z", dueDate:"2026-08-17T14:23:05.123Z", returnedAt:null, status:"대출중"},
    ],
    "m-2":[],
    "m-3":[],
};
// function calculateDueDate(borrowedAt, loanDays = 7) {
//   const due = new Date(borrowedAt);       // 문자열 → Date 객체로 파싱
//   due.setDate(due.getDate() + loanDays);  // 7일 더함
//   return due.toISOString();               // 다시 문자열로 변환해서 저장
// }
// const borrowedAt = "2026-08-10T14:23:05.123Z";
// const dueDate = calculateDueDate(borrowedAt, 7);

// console.log(dueDate);
// // "2026-08-17T14:23:05.123Z"

export default BorrowedBooksData;