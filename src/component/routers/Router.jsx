/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from "react-router-dom"
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import SignIn from '../pages/signin/SignIn';
import SignUp from '../pages/signin/SignUp';
import BookDetails from '../pages/bookdetails/BookDetails';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';
import NotFound from '../pages/notFound/NotFound';
import ReadBook from '../pages/readbook/ReadBook';
import Profile from '../pages/profile/Profile';


const Router = () => {
    var data = [{
        id: 1,
        title: 'Harry Potter và Hòn Đá Phù Thủy',
        img: 'book1.jpg',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        description: 'Cuốn sách đầu tiên trong loạt truyện Harry Potter.'
    }, {
        id: 2,
        title: 'Narnia: Lữ Khách Thép',
        img: 'book2.jpg',
        author: 'C.S. Lewis',
        genre: 'Fantasy',
        description: 'Cuốn thứ hai trong loạt truyện Narnia.'
    }, {
        id: 3,
        title: 'Hobbit',
        img: 'book3.jpg',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        description: 'Một cuộc phiêu lưu của một người Hobbit tên là Bilbo Baggins.'
    }, {
        id: 4,
        title: 'Đi Tìm Lẽ Sống',
        img: 'book4.jpg',
        author: 'Viktor E. Frankl',
        genre: 'Tâm lý - Tự viện',
        description: 'Một quyển sách kinh điển về tâm lý học.'
    }, {
        id: 5,
        title: 'Đi Tìm Lẽ Sống',
        img: 'book4.jpg',
        author: 'Viktor E. Frankl',
        genre: 'Tâm lý - Tự viện',
        description: 'Một quyển sách kinh điển về tâm lý học.'
    },
    {
        id: 6,
        title: 'Đi Tìm Lẽ Sống',
        img: 'book4.jpg',
        author: 'Viktor E. Frankl',
        genre: 'Tâm lý - Tự viện',
        description: 'Một quyển sách kinh điển về tâm lý học.'
    }];
    return (
        <div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/details/:id" element={<BookDetails />} ></Route>
                <Route path="/details/read/:id" element={<ReadBook />} ></Route>
                <Route path="/profile/:id" element={<Profile data={data} />} ></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>

        </div>
    );
};

export default Router;