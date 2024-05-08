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
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import IconGlobal from '../../../icon/IconGlobal';
import PageService from '../../service/PageService';
import { AppContext } from '../../../context/AppContext';
import ComputedService from '../../service/ComputedService';
import useAddComputedBook from '../../../hook/useAddComputedBook ';
import RateHandle from '../../../rateHandle/RateHandle';
import useAddComputedRateBook from '../../../hook/useAddComputedRateBook';
import useAddComputedCommentBook from '../../../hook/useAddComputedCommentBook';
import useAddComputedPageBook from '../../../hook/useAddComputedPageBook';
import useAddComputedInteractionBook from '../../../hook/useAddComputedInteractionBook';
import { set } from 'date-fns';
const BookDetails = () => {
    const [activeMenu, setActiveMenu] = useState('introduction');
    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
    };
    const [interaction, setInteraction] = useState();
    const { token, computedBook, setComputedBook } = useContext(AppContext);
    const { mutate } = useAddComputedBook();
    const { mutate: addInteraction } = useAddComputedInteractionBook();
    const { mutate: addPage } = useAddComputedPageBook();
    const handleAddBook = (id) => {
        mutate(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const handleAddInteractionbookBook = (id) => {
        addInteraction(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const [follow, setFollow] = useState(false);
    const [nominate, setNominate] = useState(false);
    const [book, setBook] = useState();
    const { id } = useParams();
    let service = new BookService()
    const getInteractions = useQuery({
        queryKey: ['interaction', id],
        queryFn: () => service.findInteraction(token, id).then((res) => {
            if (res.data && res.data != null) {
                setInteraction(res.data);
                setPageNumber(res.data?.readCount);
                setNominate(res.data?.nominated);
                setFollow(res.data?.followed);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }),
        enabled: token != "" && id !== "" && id !== undefined && id !== ""
    });
    const [isBook, setIsBook] = useState(false);
    const navigate = useNavigate();
    const handleReadBook = () => {
        navigate(`/details/read/${id}/1`);
    }
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
        if (id !== "" && id !== undefined && id !== "") {
            handleAddBook(id);
        }
    }, [])
    const handleReadContinue = () => {
        navigate(`/details/read/${id}/${pageNumber}`);
    }
    let computedService = new ComputedService();
    const getComputedBook = useQuery({
        queryKey: ['computedBook', id],
        queryFn: () => computedService.getComputedBook(id).then((res) => {
            if (res.data) {
                setComputedBook(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }), enabled: computedBook === undefined && computedBook?.length === 0
    })

    const nominateMutate = useMutation({
        mutationFn: (type) => {
            console.log(type);
            if (type === 'nominate') {
                return service.nominate(token, id).then((res) => {
                    if (res.data) {
                        handleAddInteractionbookBook(id);
                        setInteraction(res.data)
                        setNominate(true);
                        return res.data;
                    }
                }).catch((err) => {
                    console.error(err);
                });
            } else if (type === 'nominateCancel') {
                return service.nominateCancel(token, id).then((res) => {
                    if (res.data) {
                        handleAddInteractionbookBook(id);
                        setInteraction(res.data)
                        setNominate(false);
                        return res.data;
                    }
                }).catch((err) => {
                    console.error(err);
                });
            } else if (type === 'follow') {
                return service.follow(token, id).then((res) => {
                    if (res.data) {
                        handleAddInteractionbookBook(id);
                        setInteraction(res.data)
                        setFollow(true)
                        return res.data;
                    }
                }).catch((err) => {
                    console.error(err);
                });
            } else if (type === 'followCancel') {
                return service.followCancel(token, id).then((res) => {
                    if (res.data) {
                        handleAddInteractionbookBook(id);
                        setInteraction(res.data)
                        setFollow(false)
                        return res.data;
                    }
                }).catch((err) => {
                    console.error(err);
                });
            }
        }
    })
    const handleFollow = (type) => {
        nominateMutate.mutate(type);
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
                                    <span className='font-extrabold ml-1'> {pageCount ? pageCount : 0}</span>
                                    <br />
                                    <span>Trang</span>
                                </div>
                                <div className='mx-5 '>
                                    <span className='font-extrabold '>{computedBook?.readCount ? computedBook?.readCount : 0} </span>
                                    <br />
                                    <span className=''>Lượt đọc</span>
                                </div>
                                <div className='mx-5 '>
                                    <span className='font-extrabold'>{computedBook?.save ? computedBook?.save : 0}</span>
                                    <br />
                                    <span>Lưu trữ</span>
                                </div>

                            </div>
                            <div className='flex items-center my-2'>
                                <div className='text-yellow-500'>
                                    <RateHandle rate={computedBook?.totalRate ? computedBook?.totalRate : 5} />
                                </div>
                                <span className='ml-4'>({computedBook?.reviewCount ? computedBook?.reviewCount : 0} đánh giá)</span>
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

                                {follow ?
                                    <button onClick={() => handleFollow("followCancel")} className='border p-2 pr-4 border-navy-600 dark:border-white rounded-2xl flex items-center'>
                                        <IonIcon className='w-5 h-5 text-red-600' icon={bookmarkOutline} />
                                        <p className='ml-2'>Hủy lưu trữ</p>
                                    </button> :
                                    <button onClick={() => handleFollow("follow")} className='border p-2 pr-4 border-navy-600 dark:border-white rounded-2xl flex items-center'>
                                        <IonIcon className='w-5 h-5' icon={bookmarkOutline} />
                                        <p className='ml-2'>Lưu trữ</p>
                                    </button>
                                }
                                {nominate ?
                                    <button onClick={() => handleFollow("nominateCancel")} className='bg-[#F7F5F0] px-6 border flex items-center rounded-2xl border-tblue'>
                                        <IonIcon className='w-5 h-5 text-red-600' icon={roseOutline} />
                                        <p className='ml-2'>Xoá đề cử</p>
                                    </button> :
                                    <button onClick={() => handleFollow("nominate")} className='bg-[#F7F5F0] px-6 border flex items-center rounded-2xl border-tblue'>
                                        <IonIcon className='w-5 h-5' icon={roseOutline} />
                                        <p className='ml-2'>Đề cử</p>
                                    </button>
                                }
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
                    <div className={activeMenu === 'listPage' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('listPage')}>Danh sách trang <span className='border px-2 text-gray-700 bg-gray-200 rounded-xl'>{pageCount ? pageCount : 0}</span></div>
                    <div className={activeMenu === 'review' ? ' text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('review')}>Đánh giá <span className='border px-2 text-gray-700 bg-gray-200 rounded-xl'>{computedBook?.reviewCount ? computedBook?.reviewCount : 0}</span></div>
                    <div className={activeMenu === 'comment' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('comment')}>Bình luận <span className='border px-2 text-gray-700 bg-gray-200 rounded-xl'>{computedBook?.commentCount ? computedBook?.commentCount : 0}</span></div>
                </div>
                <div className='mb-10 min-h-96'>
                    {activeMenu === 'introduction' && (
                        <div className='mt-5' style={{ whiteSpace: 'pre-line' }}>
                            {book?.longDescription}
                        </div>
                    )}
                    {activeMenu === 'review' && (
                        <Reviews pageNumber={pageNumber} id={id} />
                    )}
                    {activeMenu === 'comment' && (
                        <Comment pageNumber={pageNumber} id={id} />
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