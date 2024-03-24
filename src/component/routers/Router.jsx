import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import SignIn from '../pages/signin/SignIn';
import SignUp from '../pages/signin/SignUp';
import Navbar from '../layout/navbar/Navbar';
import Footer from '../layout/footer/Footer';

const Router = () => {
    return (
        <div>
            
            <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/register" element={<SignUp />} />
                </Route>
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
            
        </div>
    );
};

export default Router;