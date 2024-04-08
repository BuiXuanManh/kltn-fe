/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faBars, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { moonSharp, sunnyOutline } from 'ionicons/icons'
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, Skeleton } from "@mui/material";
import useLoginData from "../../../hook/useLoginData";
export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [login, isLogin] = useState(false);
  
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [mssv,setMssv]=useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const showMenuMobile = () => {
    setShowMenu(!showMenu);
  }
  const [showSetting, setShowSetting] = useState(false);
  const showSettingHandle = () => {
    setShowSetting(!showSetting);
  }
  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("profile");
    Cookies.remove("refreshToken");
    isLogin(false);
    setToken("");
    setName("");
    setMssv("")
    setProfile(null);
    setShowSetting(false);
    queryClient.removeQueries(["token"]);
    queryClient.removeQueries(["profile"]);
  }
  useLoginData({ token, setToken, setProfile, setName, setMssv});
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Hàm xử lý khi input được focus
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  // Hàm xử lý khi input mất focus
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  // Xác định lớp CSS cho div bao quanh input dựa trên trạng thái focus
  const divBorderClassName = isInputFocused ? "tblue" : "gray-400";
  return (
    <div className={`${location === '/register' || location === '/login' ? 'hiden' : null}bg-white shadow-md border w-full`}>
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
          <div className={`md:flex hidden md:items-center w-80 bg-white py-1 px-2 rounded-full border-2 border-${divBorderClassName}`}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 text-${divBorderClassName} cursor-pointer`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              className="h-7 bg-white focus:outline-none px-4 py-2 border-none rounded-full"
              type="text"
              placeholder="Tìm kiếm"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
        <div className="md:flex hidden space-x-10 ">
          <div className="md:flex items-center gap-x-10 ">
            {(!token) && (!login) ? (<>
              <Link to={"/login"}>
                <div className="md:space-x-4 space-x-2 border h-7 border-tblue rounded-full cursor-pointer">

                  <span className="text-gray-600 p-3"><button>Sign in</button></span>

                </div>
              </Link>
              <Link to={"/register"}>
                <div className="md:space-x-4 space-x-2 border h-7 border-tblue rounded-full cursor-pointer">
                  <span className="text-gray-600 p-3"><button>Sign up</button></span>
                </div>
              </Link></>) : (<>
                <div className="relative">
                  <a onClick={() => showSettingHandle()}>
                    <div className="flex h-10 cursor-pointer justify-center items-center space-x-2">
                      <Avatar sx={{ width: 35, height: 35 }} src={profile?.image} />
                      {/* <img src="avatar.jpg" className="w-15 h-10 border-4 border-white rounded-full" /> */}
                      <span className="text-gray-600 ">{name}</span>
                    </div>
                  </a>
                  {showSetting ? (
                    <>
                      <div className="z-50 absolute left-0 w-48 py-2 mt-2 mr-10 bg-white rounded-lg shadow-xl">
                        <a href={"/profile/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                          Profile
                        </a>
                        <a href={"/profile/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                          Đổi mật khẩu
                        </a>
                        <a href={"/profile/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                          Lịch sử đọc
                        </a>
                        <a href={"/profile/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                          Lưu trữ
                        </a>
                        <a onClick={(e) => handleLogout(e)} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                          Logout
                        </a>
                      </div>

                    </>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="md:hiden w-10">
          <button onClick={() => showMenuMobile()} className="md:hidden mr-10">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {showMenu ? (
        <div className="flex justify-center md:hidden md:space-x-10 sm-w-full">
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