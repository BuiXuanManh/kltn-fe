/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { starSharp, starHalfSharp } from 'ionicons/icons';
import LinearProgress from '@mui/material/LinearProgress';
const BookDetails = () => {
    const [activeMenu, setActiveMenu] = useState('giới thiệu');
    const [usefulness, setUsefulness] = useState(0); // Giá trị tiện ích
    const [content, setContent] = useState(0); // Giá trị nội dung sách
    const [understandability, setUnderstandability] = useState(0);

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
    return (
        <div>
            <div className="w-full h-[40rem] border items-center justify-center border-white rounded-lg bg-white shadow-md" style={{ backgroundImage: "url(bg-2.jpg)" }}>
                <div className=' mt-[20%] mx-48  p-5 bg-white rounded-md' >
                    <div className='flex'>
                        <div className='w-52 h-72'>
                            <img className='w-full h-full' src={data.img} alt="" />
                        </div>
                        <div className='mx-10'>
                            <h3 className='font-semibold text-2xl'>{data.title}</h3>
                            <div className='flex my-2'>
                                {genres.map((genre) => {
                                    return (
                                        <div key={genre} className='p-1 mx-2 border rounded-2xl border-yellow-400 text-orange-600 cursor-pointer'>{genre}</div>
                                    );
                                })}

                            </div>
                            <div>
                                <div className='flex'>
                                    <div className='mx-5'>
                                        <span className='font-semibold'>{rates.page}</span>
                                        <br />
                                        <span>Trang</span>
                                    </div>
                                    <div className='mx-5 font-semibold'>
                                        <span className=' '>{rates.reader} </span>
                                        <br />
                                        <span className=''>Người đọc</span>
                                    </div>
                                    <div className='mx-5 font-semibold'>
                                        <span className=''>{rates.saved} </span>
                                        <br />
                                        <span>Lưu trữ</span>
                                    </div>

                                </div>
                                <div className='flex items-center my-2'>
                                    <IonIcon className="text-yellow-400" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-400" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-400" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-400" icon={starSharp}></IonIcon>
                                    <IonIcon className="text-yellow-400" icon={starHalfSharp}></IonIcon>
                                    <span className='ml-1'>{rates.rate}.5/5</span>
                                    <span className='ml-4'>({rates.rater} đánh giá)</span>
                                </div>
                                <div className='flex gap-6'>
                                    <button className='bg-yellow-700 p-2 rounded-xl'>Đọc sách</button>
                                    <button className='border p-2 border-black rounded-2xl'>Lưu trữ</button>
                                    <button className='bg-[#F7F5F0] px-6 border rounded-2xl border-yellow-700'>Đề cử</button>
                                </div>
                            </div>

                            <div>
                                <div>{data.author}</div>
                                <span>{data.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-8 gap-8 text-xl font-semibold">
                        <div className={activeMenu === 'giới thiệu' ? 'text-yellow-700 border-b-4 border- py-2 border-yellow-700' : 'py-2'} onClick={() => handleMenuClick('giới thiệu')}>Giới thiệu</div>
                        <div className={activeMenu === 'đánh giá' ? ' text-yellow-700 border-b-4 py-2 border-yellow-700' : 'py-2'} onClick={() => handleMenuClick('đánh giá')}>Đánh giá <span className='border px-2 bg-gray-500 rounded-xl'>{rates.rate}</span></div>
                        <div className={activeMenu === 'bình luận' ? 'text-yellow-700 border-b-4 py-2 border-yellow-700' : 'py-2'} onClick={() => handleMenuClick('bình luận')}>Bình luận <span className='border px-2 bg-gray-500 rounded-xl'>{rates.comments}</span></div>
                    </div>
                    {activeMenu === 'giới thiệu' && (
                        <div>
                            {data.description}
                        </div>
                    )}

                    {activeMenu === 'đánh giá' && (
                        <div className='mt-4 grid grid-cols-3 '>

                            <div className='grid grid-cols-1 col-span-2 rounded-md bg-gray-200 mr-2 px-4 py-1 '>
                                <div className='grid grid-cols-5 mt-4  gap-5'>
                                    <div className='w-44 grid grid-cols-1 col-span-1'>Tính hữu ích</div>
                                    <div className='grid grid-cols-1 col-span-3'>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5"
                                            value={usefulness}
                                            onChange={(e) => setUsefulness(parseFloat(e.target.value))}
                                            step="0.5"
                                            className='w-full'
                                        />
                                    </div>
                                    <div className='grid grid-cols-1'>{usefulness}</div>
                                </div>
                                <div className='grid grid-cols-5 mt-4 gap-5'>
                                    <div className='w-44 grid grid-cols-1 col-span-1'>Nội dung sách</div>
                                    <div className='grid grid-cols-1 col-span-3'>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5"
                                            value={content}
                                            onChange={(e) => setContent(parseFloat(e.target.value))}
                                            step="0.5"
                                            className=''
                                        />

                                    </div>
                                    <div className='grid grid-cols-1'>{content}</div>

                                </div>
                                <div className='grid grid-cols-5 mt-4 gap-5'>
                                    <div className='w-44 grid grid-cols-1 col-span-1'>Độ dễ hiểu</div>
                                    <div className='grid grid-cols-1 col-span-3'>
                                        <input
                                            type="range"
                                            min="0"
                                            max="5"
                                            value={understandability}
                                            onChange={(e) => setUnderstandability(parseFloat(e.target.value))}
                                            step="0.5"
                                            className='w-full'
                                        />
                                    </div>
                                    <div className='grid grid-cols-1'>{understandability}</div>
                                </div>
                            </div>
                            <div className='grid grid-cols-1'>

                            </div>
                            <div className='mt-4'>
                                <textarea name="rate" placeholder='Nhập đánh giá của bạn' cols="70" rows="10"></textarea>
                            </div>
                            <div className='mt-4'>
                               <button></button>
                            </div>
                        </div>
                    )}

                    {activeMenu === 'bình luận' && (
                        <div>
                            <span>
                                {rates.comments}
                            </span>
                            <br />
                            <textarea placeholder='Nhap binh luan' name="comment" cols="30" rows="10"></textarea>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BookDetails;