/* eslint-disable no-unused-vars */
import './App.css'
import Footer from './component/layout/footer/Footer'
import Navbar from './component/layout/navbar/Navbar'
import React from 'react'
import Home from './component/pages/home/Home'
import SignIn from './component/pages/signin/SignIn'
import SignUp from './component/pages/signin/SignUp'
import Router from './component/routers/Router'
function App() {

  return (
    <>
   <React.Fragment>
    <Navbar />
    <Router/>
    <Footer/>
  </React.Fragment>,
    
    </>
  )
}

export default App
