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
import { useQueries, useQuery } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import IconGlobal from '../../../icon/IconGlobal';
const BookDetails = () => {
    const [activeMenu, setActiveMenu] = useState('giới thiệu');

    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
    };
    const [book, setBook] = useState();
    const { id } = useParams();
    // const data = {
    //     id: id,
    //     title: 'Harry Potter và Hòn Đá Phù Thủy',
    //     img: 'book2.jpg',
    //     author: 'J.K. Rowling',
    //     genre: 'Fantasy',
    //     description: 'Cuốn sách đầu tiên trong loạt truyện Harry Potter.'
    // }
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
        navigate(`/details/read/${id}/1`);
    }
    let service = new BookService();
    const { data, isLoading } = useQuery({
        queryKey: ['book', id],
        queryFn: service.getBookById(id).then((res) => {
            setBook(res.data);
        }).catch((err) => {
            console.error(err.message);
        }),
        enabled: !!book,
    });
    let icon = new IconGlobal();
    return (
        <div className='w-full'>
            <div className="w-full relative h-[40rem] z-0 border items-center justify-center border-white rounded-lg bg-white shadow-md" >
                <img src={book?.bgImage} className='h-[40rem] w-full' alt="" />
            </div>
            <div className='mx-52 -mt-5 relative z-50 p-5 bg-white rounded-md' >
                <div className='flex'>
                    <div className='w-52 h-72 min-w-52'>
                        <img className='w-full h-full' src={book?.image} alt="" />
                    </div>
                    <div className='mx-10'>
                        <h3 className='font-semibold text-2xl'>{book?.title}</h3>
                        <div className='flex my-2'>
                            {book?.genres?.map((genre, index) => {
                                return (
                                    <div key={index} className='p-1 px-3 mx-2 border rounded-2xl border-tyellow text-orange-600 cursor-pointer'>{genre?.name}</div>
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
                        <div className='flex items-center mt-3'>
                            <img src={icon?.icon?.author} className='w-5 h-5' alt="" />
                            {book?.authors?.map((i, index) =>
                                <div className='flex ml-2' key={index}>
                                    <p className=''>{i?.name}</p>
                                    {(index !== book?.authors?.length - 1) ? <span className="mr-2">, </span>
                                        : <span> </span>}
                                </div>)}
                        </div>
                        <div className='mt-10'>
                            <div className='mt-5' style={{ whiteSpace: 'pre-line' }}>
                                {book?.shortDescription}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-8 gap-8 text-xl font-semibold">
                    <div className={activeMenu === 'giới thiệu' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('giới thiệu')}>Giới thiệu</div>
                    <div className={activeMenu === 'đánh giá' ? ' text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('đánh giá')}>Đánh giá <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{rates.rate}</span></div>
                    <div className={activeMenu === 'bình luận' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('bình luận')}>Bình luận <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{rates.comments}</span></div>
                </div>
                <div className='mb-10 min-h-96'>
                    {activeMenu === 'giới thiệu' && (
                        <div className='mt-5' style={{ whiteSpace: 'pre-line' }}>
                            {book?.longDescription}
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