import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './contexts/AppProviders';
//pages
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyLib from './pages/MyLib';
import Notice from './pages/Notice';
import CustomerService from './pages/CustomerService';
import CustomerQnA from './pages/CustomerQnA';
import BookSearch from './pages/BookSearch';
import BookDetail from './pages/BookDetail';
import Manager from './pages/Manager';
import NotFound from './pages/NotFound';

//css
import './App.css'
import './css/button.css'

function App() {
  return(
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="myLib" element={<MyLib/>}/>
            <Route path="notice" element={<Notice/>}/>
            <Route path="customerService" element={<CustomerService/>}/>
            <Route path="customerQnA" element={<CustomerQnA/>}/>
            <Route path="bookSearch" element={<BookSearch/>}/>
            <Route path="bookDetail/:bookId" element={<BookDetail/>}/>
            <Route path="manager" element={<Manager/>}/>
          </Route>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App
