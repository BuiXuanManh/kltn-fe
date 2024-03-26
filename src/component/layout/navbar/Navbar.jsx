/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faBars, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { moonSharp, sunnyOutline } from 'ionicons/icons'
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  function changeMode() {
    setDarkMode(!darkMode);
  }
  function showMenuMobile() {
    setShowMenu(!showMenu);
  }
  // function Login() {
  //   navigate("/login");
  // }
  // function signup() {
  //   navigate("/register");
  // }
  return (
    <div className="bg-white shadow-md border w-full">
      <div className="mx-auto py-4 flex justify-between items-center ml-10 font-semibold">
        <div className="flex ml-10 space-x-10">
          <Link to="/">
            <div className="flex items-center space-x-2 ml-20 cursor-pointer bg-black">

              <span className=" w-15 h-10">
                <img src="logo.png" className=" bg-white w-15 h-10" width={60} height={40} alt="" />
              </span>

            </div>
          </Link>
          <div className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faBars} />
            <span className="">The loai</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faTrophy} />
            <span className="">Bang xep hang</span>
          </div>
        </div>


        <div className="md:flex space-x-15">
          <div className="md:flex hidden md:items-center w-80 border border-gray-600 bg-white py-1 px-2 rounded-full">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input className="h-7 bg-white" type="text" placeholder="Search" />
          </div>
        </div>
        <div className="md:flex hidden space-x-10 ">
          <div className="md:flex items-center gap-x-10 ">
            <Link to={"/login"}>
              <div className="md:space-x-4 space-x-2 border h-7 border-tblue rounded-full cursor-pointer">

                <span className="text-gray-600 p-3"><button>Sign in</button></span>

              </div>
            </Link>
            <Link to={"/register"}>
              <div className="md:space-x-4 space-x-2 border h-7 border-tblue rounded-full cursor-pointer">
                <span className="text-gray-600 p-3"><button>Sign up</button></span>
              </div>
            </Link>
          </div>
        </div>
        <div className="md:hiden w-10">
          <button onClick={() => showMenuMobile()} className="md:hidden mr-10">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {showMenu ? (
        <div className="md:flex justify-center md:hidden md:space-x-10 sm-w-full">
          <div className="md:flex items-center md:space-x-10 sm-w-full">
            <Link to={"/login"}>
              <div className="flex justify-center md:space-x-2 sm:w-full h-7 bg-tblue border border-white cursor-pointer">
                <span className="text-white">Sign in</span>
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="flex justify-center md:space-x-2 sm:w-full h-7 bg-tblue border border-white cursor-pointer">
                <span className="text-white">Sign up</span>
              </div>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}