/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from '../pages/home/Home';
import SignIn from '../pages/signin/SignIn';
import SignUp from '../pages/signin/SignUp';
import BookDetails from '../pages/bookdetails/BookDetails';
import NotFound from '../pages/notFound/NotFound';
import ReadBook from '../pages/readbook/ReadBook';
import Profile from '../pages/profile/Profile';
import SearchDetail from '../pages/search/SearchDetail';
import BookService from '../service/BookService';
import HistoryBook from '../pages/historyBook/HistoryBook';
import Dashboard from '../pages/admin/DashBoard';


const Router = () => {
    const [data, setData] = useState([]);
    let bookService = new BookService();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await bookService.getBooks(1, 12);
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Home data={data?.pageBook?.content} />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/details/:id" element={<BookDetails />} ></Route>
            <Route path="/details/read/:id/:pageNo" element={<ReadBook />} ></Route>
            <Route path="/profile/:mssv" element={<Profile data={data?.pageBook?.content} />} ></Route>
            <Route path=":page/search/:keyword" element={<SearchDetail />} ></Route>
            <Route path=":page/search/*" element={<SearchDetail />} />
            <Route path="/history/:mssv" element={<HistoryBook data={data} />} />
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
};

export default Router;