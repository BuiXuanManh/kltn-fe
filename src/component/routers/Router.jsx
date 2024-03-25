import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import SignIn from '../pages/signin/SignIn';
import SignUp from '../pages/signin/SignUp';
import BookDetails from '../pages/bookdetails/BookDetails';
const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />} >
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<SignIn />} />
                        <Route path="/register" element={<SignUp />} />
                        <Route path="/details/:id" element={<BookDetails />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;