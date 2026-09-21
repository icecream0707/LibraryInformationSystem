import axios from  'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
})


//도서 조회
export function getBooks(){
    return api.get("/books");
}

//도서 검색
export const getBook = (id) => api.get(`/books/${id}`);


//도서 등록
export const addBook = (book) => api.post("/books", book);


//도서 수정
export const updateBook = (id, book) => api.put();


//도서 삭제
export const deleteBook = (id) => api.delete(`/books/${id}`);


//관심도서X 예약도서O
//export const 