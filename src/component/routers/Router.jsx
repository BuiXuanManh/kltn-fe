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

const Router = () => {
    return (
        <div>
            <Navbar />
            <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/details/:id" element={<BookDetails />} ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                
            </Routes>
            <Footer />
        </div>
    );
};

export default Router;