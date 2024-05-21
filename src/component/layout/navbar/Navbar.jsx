/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faBars, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { moonSharp, sunnyOutline } from 'ionicons/icons'
import { IonIcon } from "@ionic/react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, Skeleton } from "@mui/material";
import { AppContext } from "../../../context/AppContext";
import BookService from "../../service/BookService";
export default function Navbar() {
  const { token, setToken, mssv, profile, setProfile, setInteractions } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [name, setName] = useState();
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
    setToken("");
    setName("");
    setProfile({});
    setShowSetting(false);
    setInteractions([])
    Cookies.remove("token");
    Cookies.remove("profile");
    Cookies.remove("mssv");
  }
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    // setFindBooks([])
    setIsInputFocused(false);
    setShowFind(false);
  };
  const [keyword, setKeyWord] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate("/1/search/new/" + keyword);
      setFindBooks([]);
      setShowFind(false)
    }
  }
  let bookService = new BookService();
  const [findBooks, setFindBooks] = useState([]);
  const [showFind, setShowFind] = useState(false);
  const findBook = useQuery({
    queryKey: ["findByKey", keyword],
    queryFn: () => bookService.findBook(keyword, 1, 12)
      .then((res) => {
        if (res.data) {
          setFindBooks(res.data.pageBook.content);
          // setShowFind(true);
          return res.data.pageBook.content;
        }
      })
      .catch((error) => {
        console.error(error);
      }),
    onError: () => {
      setFindBooks([]);
      setShowFind(false);
    }
  });
  const divBorderClassName = isInputFocused ? "tblue" : "gray-200";
  const handleDetails = (id) => {
    if (id !== null && id !== "") {
      navigate("/details/" + id);
      console.log("ok");
      console.log(id)
      setFindBooks([]);
      setShowFind(false)
      setKeyWord("");
    }
  }
  const handleBack = () => {
    navigate("/");
    setFindBooks([]);
    setShowFind(false);
    setKeyWord("");
  }
  useEffect(() => {
    const parts = location.pathname.split('/');
    const page = parts[1];
    const search = parts[2];
    if (search === 'search') {
      setFindBooks([]);
      setShowFind(false);
    } else if (keyword?.trim() === "" || !keyword) {
      // setFindBooks([]);
      setShowFind(false);
    } else {
      findBook.refetch();
      setShowFind(true);
    }
  }, [location.pathname, keyword, showFind]);
  useEffect(() => {
    if (keyword === "") {
      setShowFind(false);
    }
  }, [keyword])
  return (
    <>
      {
        < div className={`${location.pathname === "/admin" ? "ml-[17rem]" : ""} bg-white shadow-md !z-50 border`}>
          <div className="mx-auto py-4 flex justify-between items-center ml-10 font-semibold">
            <div className="flex ml-10 space-x-10">
              <div onClick={() => handleBack()}>
                <div className="flex items-center space-x-2 ml-20 cursor-pointer bg-black">
                  <span className=" w-15 h-10">
                    <img src="logo.png" className=" bg-white w-15 h-10" width={60} height={40} alt="" />
                  </span>
                  {/* <div className="text-3xl font-extrabold text-indigo-600">OKLIB</div> */}
                </div>
              </div>
              <div onClick={() => handleBack()} className="flex items-center space-x-2 cursor-pointer">
                <div className="text-3xl font-extrabold text-indigo-600">OKLIB</div>
              </div>
              {/* <div className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon icon={faBars} />
                <span className="">Thể loại</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <FontAwesomeIcon icon={faTrophy} />
                <span className="">Bảng xếp hạng</span>
              </div> */}
            </div>
            <div className="md:flex ml-10 space-x-15">
              <div className={`md:flex hidden md:items-center w-80 bg-white py-1 px-2 rounded-full border-2 border-${divBorderClassName}`}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 text-${divBorderClassName} cursor-pointer`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  value={keyword}
                  onChange={(e) => setKeyWord(e.target.value)}
                  className="h-7 bg-white focus:outline-none px-4 py-2 border-none rounded-full"
                  type="text"
                  placeholder="Tìm kiếm"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {showFind && location.pathname != "/search" && <div className="absolute mt-11 z-50 bg-white w-80 border border-gray-300 rounded-lg shadow-lg">
                {findBook?.data?.map((book, index) => (
                  <div onClick={() => handleDetails(book?.id)} key={index} className="cursor-pointer">
                    <div className="flex items-center hover:bg-gray-200 gap-2 ">
                      <img src={book.image} className="w-10 h-10" alt="" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{book.title}</span>
                        <div className="flex">
                          {book.authors.map((author, index) => (
                            <span key={index} className="text-gray-400 ml-1">{author.name}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
            </div>

            <div className="md:flex hidden space-x-10 ">
              <div className="md:flex items-center gap-x-10 ">
                {(token === "") || !token || profile?.firstName === "" || !profile?.lastName ? (<>
                  <Link to={"/login"}>
                    <div className="md:space-x-4 space-x-2 border h-7 border-tblue rounded-full cursor-pointer">
                      <span className="text-gray-800 p-3"><button>Sign in</button></span>
                    </div>
                  </Link>
                  <Link to={"/register"}>
                    <div className="md:space-x-4 space-x-2 border h-7 border-tblue rounded-full cursor-pointer">
                      <span className="text-gray-800 p-3"><button>Sign up</button></span>
                    </div>
                  </Link></>) : (<>
                    <div className="relative">
                      <a onClick={() => showSettingHandle()}>
                        <div className="flex h-10 cursor-pointer justify-center items-center space-x-2">
                          <Avatar sx={{ width: 35, height: 35 }} src={profile?.image} />
                          <span className="text-gray-800 ">{profile?.firstName} {profile?.lastName}</span>
                        </div>
                      </a>
                      {showSetting && (
                        <>
                          <div className="z-50 absolute left-0 w-48 py-2 mt-2 mr-10 bg-white rounded-lg shadow-xl">
                            {profile?.user?.role === "ADMIN" && <Link to={"/admin"} onClick={() => showSettingHandle()} className="block px-4 py-2 rounded-full text-gray-800 hover:bg-indigo-500 hover:text-white">
                              Admin
                            </Link>}
                            <Link onClick={() => showSettingHandle()} to={"/profile/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              Profile
                            </Link>
                            <Link onClick={() => showSettingHandle()} to={"/changPass/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              Đổi mật khẩu
                            </Link>
                            <Link onClick={() => showSettingHandle()} to={"/history/" + mssv} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              Lịch sử đọc
                            </Link>
                            <a onClick={(e) => handleLogout(e)} className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">
                              Đăng xuất
                            </a>
                          </div>

                        </>
                      )}
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
          {
            showMenu ? (
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
            ) : null
          }
        </div >
      }</>
  )
}