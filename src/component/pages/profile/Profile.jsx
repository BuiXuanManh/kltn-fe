/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper } from '@mui/material';
import React, { useContext, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faUserTie, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Skeleton } from "@mui/material";
import { AppContext } from '../../../context/AppContext';
// import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
const Profile = ({ data }) => {
    const [showSetting, setShowSetting] = useState(false);
    const showSettingHandle = () => {
        setShowSetting(!showSetting);
    }
    const { token, user, profile } = useContext(AppContext);
    console.log(token)
    console.log(profile);
    return (
        <div>
            <div className="h-full bg-gray-200 p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="absolute right-12 mt-4 rounded">
                        <button onClick={() => showSettingHandle()} className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                        </button>
                        {showSetting && <div className="bg-white absolute right-0 w-52 py-2 mt-1 border border-gray-200 shadow-2xl" style={{ display: "none;" }}>
                            <div className="py-2 border-b">
                                <div className='flex justify-between'>
                                    <div className="text-gray-700 text-xs px-6 uppercase mb-1">Cài đặt</div>
                                    <div className='text-gray-700 text-xs px-6 uppercase mb-1 '>
                                        <button onClick={() => showSettingHandle()} >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>
                                </div>

                                <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                    <FontAwesomeIcon icon={faUserTie} className='h-4 w-6 text-gray-400' />
                                    <span className="text-sm text-gray-700">Đổi avatar</span>
                                </button>
                                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                    <FontAwesomeIcon className='h-4 w-6 text-gray-400' icon={faPenToSquare} />
                                    <span className="ml-4 text-sm text-gray-700">Đổi hình nền</span>
                                </button>
                            </div>
                        </div>}
                    </div>
                    <div className="w-full h-[250px]">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="flex flex-col items-center -mt-20">
                        {/* <img src="avatar.jpg" className="w-40 border-4 border-white rounded-full" /> */}
                        <Avatar src={profile?.image} sx={{ width: "10rem", height: "10rem" }} />
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl">{profile?.firstName} {profile?.lastName}</p>
                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p className="mt-1 text-gray-700">Trường Đại Học Công Nghiệp TP.HCM</p>
                        {/* <p className="text-sm text-gray-500">New York, USA</p> */}
                    </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Thông tin cá nhân</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-28">Họ tên:</span>
                                    <span className="text-gray-700">{user?.name}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Birthday:</span>
                                    <span className="text-gray-700">{profile?.birthday}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Ngày tạo:</span>
                                    <span className="text-gray-700">{profile?.createdAt}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Giới tính:</span>
                                    <span className="text-gray-700">{profile?.gender ? "Nam" : "Nữ"}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Email:</span>
                                    <span className="text-gray-700">{user?.email}</span>
                                </li>
                                <li className="flex items-center py-2 space-x-2 mt-4">
                                    <button className='bg-tblue text-white rounded-md px-6 h-10'>Edit</button>
                                    <button className='bg-green-600 text-white rounded-md px-6 h-10'>Save</button>
                                    <button className='bg-red-500 text-white rounded-md px-6 h-10'>Cancel</button>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">
                                Thông tin đọc sách
                            </h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2 mt-4">
                                    <span className="font-bold w-28">Đã đọc:</span>
                                    <span className="text-gray-700">120 quyển sách</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Bình luận:</span>
                                    <span className="text-gray-700">91</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Đề cử:</span>
                                    <span className="text-gray-700">5</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Thích:</span>
                                    <span className="text-gray-700">43</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Lưu trữ</span>
                                    <span className="text-gray-700">20</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col w-full shadow-xl">
                        <div className="flex-1 bg-white rounded-lg p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Đã đọc</h4>
                            < div className='bg-gray-100 w-full rounded-md mt-5 '>
                                <Carousel interval={3000}>
                                    {data?.map((i) => {
                                        return (
                                            <Paper key={i.id} >
                                                <div className=" border border-x-0 border-t-4 border-solid w-full bg-center items-center justify-center bg-gray-100 cursor-pointer p-2" >
                                                    <div className='flex mt-5'>
                                                        <div className='ml-20 mb-3'>
                                                            <img className='h-80 object-cover w-52' src={i.image} alt="" />
                                                        </div>
                                                        <div className='ml-10'>
                                                            <h2 className='text-xl font-semibold'>{i.title}</h2>
                                                            <div className='mt-4 flex items-center'>
                                                                <FontAwesomeIcon icon={faUser} />
                                                                <div>
                                                                    {i.authors?.map((author, index) => {
                                                                        return (
                                                                            <span key={index} className='ml-3'>{author}</span>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className='mt-4'>
                                                                {i.shortDescription}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Paper>
                                        )
                                    })
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </div >
    );
};

export default Profile;