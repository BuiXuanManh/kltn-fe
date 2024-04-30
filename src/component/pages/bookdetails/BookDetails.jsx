/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { IonIcon } from '@ionic/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { starSharp, starHalfSharp, bookmarkOutline, roseOutline } from 'ionicons/icons';
import LinearProgress from '@mui/material/LinearProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Reviews from './reviews/Reviews';
import Comment from './comments/Comment';
import { faFilePen, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { useQueries, useQuery } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import IconGlobal from '../../../icon/IconGlobal';
import PageService from '../../service/PageService';
import { AppContext } from '../../../context/AppContext';
const BookDetails = () => {
    const [activeMenu, setActiveMenu] = useState('introduction');
    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
    };
    const { token, interactions } = useContext(AppContext);
    const [book, setBook] = useState();
    const { id } = useParams();
    const [isBook, setIsBook] = useState(false);
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
    const getBook = useQuery({
        queryKey: ['book', id],
        queryFn: () => service.getBookById(id).then((res) => {
            if (res.data) {
                setBook(res.data);
                setIsBook(true);
            }
        }).catch((err) => {
            console.error(err);
        }),
        enabled: book === undefined && !isBook,
    });
    let icon = new IconGlobal();
    let pageService = new PageService();
    const [pages, setPages] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const getPages = useQuery({
        queryKey: ['pages', id],
        queryFn: () => pageService.getPagesByBookId(id).then((res) => {
            if (res.data) {
                setPages(res.data);
                setPageCount(res.data.length);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }),
        enabled: !!pages,
    })
    const [pageNumber, setPageNumber] = useState(0);
    useEffect(() => {
        if (interactions.length > 0) {
            interactions.find((item) => {
                if (item.book.id === id) {
                    setPageNumber(item?.book?.pageCount);
                }
            })
        }
    }, [interactions])
    const handleReadContinue = () => {
        navigate(`/details/read/${id}/${pageNumber}`);
    }
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
                                    <span className=''>Lượt đọc</span>
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
                                <button onClick={() => handleReadBook()} className='bg-tblue flex items-center text-white p-2 rounded-xl'>
                                    <FontAwesomeIcon icon={faGlasses} />
                                    <p className='ml-2'>Đọc từ đầu</p>
                                </button>
                                {pageNumber > 0 && <button onClick={() => handleReadContinue()} className='bg-red-600 flex items-center text-white p-2 rounded-xl'>
                                    <FontAwesomeIcon icon={faGlasses} />
                                    <p className='ml-2'>Đọc tiêp</p>
                                </button>}
                                <button className='border p-2 pr-4 border-black rounded-2xl flex items-center'>
                                    <IonIcon className='w-5 h-5' icon={bookmarkOutline} />
                                    <p className='ml-2'>Lưu trữ</p>
                                </button>
                                <button className='bg-[#F7F5F0] px-6 border flex items-center rounded-2xl border-tblue'>
                                    <IonIcon className='w-5 h-5' icon={roseOutline} />
                                    <p className='ml-2'>Đề cử</p>
                                </button>
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
                    <div className={activeMenu === 'introduction' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('introduction')}>Giới thiệu</div>
                    <div className={activeMenu === 'listPage' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('listPage')}>Danh sách trang <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{pageCount}</span></div>
                    <div className={activeMenu === 'review' ? ' text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('review')}>Đánh giá <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{rates.rate}</span></div>
                    <div className={activeMenu === 'comment' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('comment')}>Bình luận <span className='border px-2 text-gray-600 bg-gray-300 rounded-xl'>{rates.comments}</span></div>
                </div>
                <div className='mb-10 min-h-96'>
                    {activeMenu === 'introduction' && (
                        <div className='mt-5' style={{ whiteSpace: 'pre-line' }}>
                            {book?.longDescription}
                        </div>
                    )}
                    {activeMenu === 'review' && (
                        <Reviews id={id} />
                    )}

                    {activeMenu === 'comment' && (
                        <Comment />
                    )}
                    {activeMenu === 'listPage' && (
                        <div className=''>
                            <div className='mt-3'>
                                {pages?.map((page, index) => {
                                    return (
                                        <div key={index} >
                                            <Link to={`/details/read/${id}/${page?.pageNo}`}>
                                                <div className='border flex mt-2 hover:text-blue-700 hover:bg-gray-100 p-5 rounded-lg border-gray-300 cursor-pointer'>
                                                    <div className=''>
                                                        <div className='flex'>
                                                            <h3>Trang {page.pageNo}:</h3>
                                                            <p className='ml-2'>{page.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default BookDetails;