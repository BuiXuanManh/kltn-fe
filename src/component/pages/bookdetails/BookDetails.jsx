/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { useNavigate, useParams } from 'react-router-dom';
import { starSharp, starHalfSharp } from 'ionicons/icons';
import LinearProgress from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Reviews from './reviews/Reviews';
import Comment from './comments/Comment';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
const BookDetails = () => {
    const [activeMenu, setActiveMenu] = useState('giới thiệu');

    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
    };
    const { id } = useParams();
    const data = {
        id: id,
        title: 'Harry Potter và Hòn Đá Phù Thủy',
        img: 'book2.jpg',
        author: 'J.K. Rowling',
        genre: 'Fantasy',
        description: 'Cuốn sách đầu tiên trong loạt truyện Harry Potter.'
    }
    const genres = ["lịch sử", "quân sự", "mới", "tiểu thuyết"]
    const rates = {
        id: 1,
        page: 4,
        reader: "234k",
        saved: "21k",
        rate: 4,
        rater: 234,
        comments: 2345
    }
    const navigate = useNavigate();
    const handleReadBook = () => {
        navigate(`/details/read/1`);
    }
    return (
        <div className='w-full'>
            <div className="w-full h-[40rem] border items-center justify-center border-white rounded-lg bg-white shadow-md" style={{ backgroundImage: "url(bg-2.jpg)" }}>
                <div className=' md:mt-[21%] mx-48  p-5 bg-white rounded-md' >
                    <div className='flex'>
                        <div className='w-52 h-72'>
                            <img className='w-full h-full' src={data.img} alt="" />
                        </div>
                        <div className='mx-10'>
                            <h3 className='font-semibold text-2xl'>{data.title}</h3>
                            <div className='flex my-2'>
                                {genres.map((genre) => {
                                    return (
                                        <div key={genre} className='p-1 px-3 mx-2 border rounded-2xl border-tyellow text-orange-600 cursor-pointer'>{genre}</div>
                                    );
                                })}

                            </div>
                            <div>
                                <div className='flex'>
                                    <div className='mx-5'>
                                        <span className='font-extrabold ml-1'> {rates.page}</span>
                                        <br />
                                        <span>Trang</span>
                                    </div>
                                    <div className='mx-5 '>
                                        <span className='font-extrabold '>{rates.reader} </span>
                                        <br />
                                        <span className=''>Người đọc</span>
                                    </div>
                                    <div className='mx-5 '>
                                        <span className='font-extrabold'>{rates.saved} </span>
                                        <br />
                                        <span>Lưu trữ</span>
                                    </div>

                                </div>
                                <div className='flex items-center my-2'>
                                    <IonIcon className="text-yellow-500" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-500" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-500" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-500" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-500" icon={starHalfSharp}></IonIcon>
                                    <span className='ml-1'>{rates.rate}.5/5</span>
                                    <span className='ml-4'>({rates.rater} đánh giá)</span>
                                </div>
                                <div className='flex gap-6'>
                                    <button onClick={() => handleReadBook()} className='bg-tblue text-white p-2 rounded-xl'>Đọc sách</button>
                                    <button className='border p-2 border-black rounded-2xl'>Lưu trữ</button>
                                    <button className='bg-[#F7F5F0] px-6 border rounded-2xl border-tblue'>Đề cử</button>
                                </div>
                            </div>

                            <div>
                                <div className='flex items-center mt-2'>
                                    <FontAwesomeIcon icon={faFilePen} className='text-gray-600' />
                                    <p className='ml-2'>{data.author}</p>
                                </div>
                                <span className='mt-2'>{data.description}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='mx-52'>
                <div className="flex mt-8 gap-8 text-xl font-semibold">
                    <div className={activeMenu === 'giới thiệu' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('giới thiệu')}>Giới thiệu</div>
                    <div className={activeMenu === 'đánh giá' ? ' text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('đánh giá')}>Đánh giá <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{rates.rate}</span></div>
                    <div className={activeMenu === 'bình luận' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('bình luận')}>Bình luận <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{rates.comments}</span></div>
                </div>
                <div className='mb-10 min-h-96'>
                    {activeMenu === 'giới thiệu' && (
                        <div className='mt-5'>
                            {data.description}
                        </div>
                    )}

                    {activeMenu === 'đánh giá' && (
                        <Reviews />
                    )}

                    {activeMenu === 'bình luận' && (
                        <Comment />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;