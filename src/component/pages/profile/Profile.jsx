import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
const Profile = ({ data }) => {


    return (
        <div>
            <div className="h-full bg-gray-200 p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="absolute right-12 mt-4 rounded">
                        <button className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                        </button>
                        <div className="bg-white absolute right-0 w-52 py-2 mt-1 border border-gray-200 shadow-2xl" style={{ display: "none;" }}>
                            <div className="py-2 border-b">
                                <p className="text-gray-700 text-xs px-6 uppercase mb-1">Cài đặt</p>
                                <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                                    <KeyOutlinedIcon className='h-4 w-4 text-gray-400' />
                                    <span className="text-sm text-gray-700">Đổi mật khẩu</span>
                                </button>
                                <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                                    <FontAwesomeIcon className='h-4 w-6 text-gray-400' icon={faPenToSquare} />
                                    <span className="ml-4 text-sm text-gray-700">Đổi hình nền</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[250px]">
                        <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" />
                    </div>
                    <div className="flex flex-col items-center -mt-20">
                        <img src="avarta.jpg" className="w-40 border-4 border-white rounded-full" />
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl">Amanda Ross</p>
                            <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </span>
                        </div>
                        <p className="text-gray-700">Senior Software Engineer at Tailwind CSS</p>
                        <p className="text-sm text-gray-500">New York, USA</p>
                    </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-28">Full name:</span>
                                    <span className="text-gray-700">Amanda S. Ross</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Birthday:</span>
                                    <span className="text-gray-700">24 Jul, 1991</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Joined:</span>
                                    <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Mobile:</span>
                                    <span className="text-gray-700">(123) 123-1234</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Email:</span>
                                    <span className="text-gray-700">amandaross@example.com</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Location:</span>
                                    <span className="text-gray-700">New York, US</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Languages:</span>
                                    <span className="text-gray-700">English, Spanish</span>
                                </li>
                                <li className="flex items-center py-2 space-x-2 mt-4">
                                    <button className='bg-tblue text-white rounded-md px-6 h-10'>Edit</button>
                                    <button className='bg-green-600 text-white rounded-md px-6 h-10'>Save</button>
                                    <button className='bg-red-500 text-white rounded-md px-6 h-10'>Cancel</button>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-28">Ngày tham gia:</span>
                                    <span className="text-gray-700">10/10/2022 (2 năm trước)</span>
                                </li>
                                <li className="flex border-y py-2">
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
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        <div className="flex-1 bg-white rounded-lg p-8">
                            <h4 className="text-xl text-gray-900 font-bold">About</h4>
                            < div className='bg-gray-100 w-full'>
                                <Carousel interval={3000} navButtonsAlwaysVisible={true} >
                                    {data.map((i) => {
                                        return (
                                            <Paper key={i.id} >
                                                <div className={`w-full bg-center items-center justify-center bg-gray-100 cursor-pointer`} >
                                                    <div className='flex mt-5'>
                                                        <div className=' ml-20'>
                                                            <img className='h-80 object-cover w-52' src={i.img} alt="" />
                                                        </div>
                                                        <div className='ml-10'>
                                                            <h2 className='text-xl font-semibold'>{i.title}</h2>
                                                            <div className='mt-4'>
                                                                <FontAwesomeIcon icon={faUser} />
                                                                <span className='ml-2'>{i.author}</span>
                                                            </div>
                                                            <div className='mt-4'>
                                                                {i.description}
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