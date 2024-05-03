import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonIcon } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { faReply, faThumbsUp, faFlag, faStar, faStarHalfAlt, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faClock, faStar as star } from '@fortawesome/free-regular-svg-icons';
import { Avatar } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import BookService from '../../../service/BookService';
import { message } from 'antd';
import { AppContext } from '../../../../context/AppContext';
import CommentService from '../../../service/CommentService';
import RateHandle from '../../../../rateHandle/RateHandle';
import formatTimeDifference from '../../../service/DateService';
import useAddComputedRateBook from '../../../../hook/useAddComputedRateBook';

const Reviews = ({ pageNumber, id }) => {
    const { token, computedBook, setComputedBook, profile } = useContext(AppContext);
    const { mutate: addRate } = useAddComputedRateBook();
    const handleAddComRate = (id) => {
        addRate(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook)
            }
        });
    };
    let service = new BookService();
    let commentService = new CommentService();
    const [usefulness, setUsefulness] = useState(1); // Giá trị tiện ích
    const [contentBook, setContentBook] = useState(1); // Giá trị nội dung sách
    const [understandability, setUnderstandability] = useState(1);
    const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false);
    const [isRate, setIsRate] = useState(false);
    const getRateBook = useQuery({
        queryKey: ['rateBook', id],
        queryFn: () => service.findRateBookByProfileIdAndBookId(token, id).then((res) => {
            if (res.data) {
                setContentBook(res.data.contentBook);
                setUsefulness(res.data.helpful);
                setUnderstandability(res.data.understand);
                setContent(res.data.content);
                setRateData(res.data)
                setIsRate(true);
                isDisable();
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }), enabled: token !== "" && token !== undefined && id !== undefined && id !== "" && !isRate

    })
    const [rateData, setRateData] = useState();
    const [rates, setRates] = useState([]);
    const addRateBook = useMutation({
        mutationFn: (rate) => commentService.addRateBook(token, id, rate).then((res) => {
            if (res.data) {
                handleAddComRate(id);
                const existingIndex = rates?.findIndex((i) => i.profile.id === profile?.id);
                if (existingIndex === -1) {
                    setRates([res.data, ...rates]);
                } else {
                    const updatedRates = [...rates];
                    updatedRates[existingIndex] = res.data;
                    setRates(updatedRates);
                }
                // query.refresh()
                setTimeout(() => {
                    message.success("Đánh giá thành công", 2)
                }, 0);
                return res.data;
            }
        }).catch((err) => {
            setTimeout(() => {
                message.error("Đánh giá thất bại", 2)
            }, 0);
            console.error(err);
        })
    });
    const isDisable = () => {
        if (rateData) {
            if (rateData.contentBook === contentBook && rateData.helpful === usefulness && rateData.understand === understandability && rateData.content === content) {
                setDisable(true);
            }
            else setDisable(false);
        }
    }
    const handleAddRate = () => {
        if (content.trim() === "") {
            setTimeout(() => {
                message.error("Hãy nhập nội dung đánh gíá", 2)
            }, 0);
        } else if (pageNumber <= 0 || !pageNumber) {
            message.error("Vui lòng đọc truyện trước khi đánh giá", 2);
        }
        else if (disable)
            setTimeout(() => {
                message.error("Bạn đã đánh giá rồi hãy sửa đánh đánh để cập nhập", 2)
            }, 0);
        else {
            addRateBook.mutate({ contentBook: contentBook, helpful: usefulness, understand: understandability, content: content });
        }
    }
    useEffect(() => {
        isDisable();
    }, [usefulness, contentBook, understandability, content, rateData, rates])
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleAddRate();
        }
    }
    const [test, setTest] = useState(false);
    const getRates = useQuery({
        queryKey: ['getRates', id],
        queryFn: () => commentService.getCommentByBookId(id, "rate").then((res) => {
            if (res.data) {
                setRates(res.data);
                setTest(true);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }), enabled: rates.length === 0 && !test
    })
    console.log(rates)
    return (
        <div>
            <div className='mt-4 grid grid-cols-3 '>
                <div className='grid grid-cols-1 col-span-2 '>
                    <div className='rounded-md bg-gray-200 mr-2 px-4 py-1 mt-5'>
                        <div className='grid grid-cols-5 mt-4  gap-5'>
                            <div className='w-44 grid grid-cols-1 col-span-1'>Tính hữu ích</div>
                            <div className='grid grid-cols-1 col-span-3'>
                                <input
                                    type="range"
                                    min="1"
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
                                    min="1"
                                    max="5"
                                    value={contentBook}
                                    onChange={(e) => setContentBook(parseFloat(e.target.value))}
                                    step="0.5"
                                    className=''
                                />

                            </div>
                            <div className='grid grid-cols-1'>{contentBook}</div>

                        </div>
                        <div className='grid grid-cols-5 mt-4 gap-5'>
                            <div className='w-44 grid grid-cols-1 col-span-1'>Độ dễ hiểu</div>
                            <div className='grid grid-cols-1 col-span-3'>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={understandability}
                                    onChange={(e) => setUnderstandability(parseFloat(e.target.value))}
                                    step="0.5"
                                    className='w-full'
                                />
                            </div>
                            <div className='grid grid-cols-1'>{understandability}</div>
                        </div>
                        <div className='mt-4'>
                            <div className='w-full relative '>
                                <input onKeyPress={e => handleKeyPress(e)} value={content} onChange={e => setContent(e.target.value)} name="review" placeholder='Nhập đánh giá của bạn ...' className='w-full h-16 rounded-xl bg-white focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2' />
                                <button disabled={disable} className={`absolute right-4 top-3 focus:outline-none rounded-full ${disable ? "" : "hover:bg-blue-600"} hover:text-white`}>
                                    <IonIcon icon={sendSharp} className="p-2 text-center ml-1  text-gray-600 h-7 w-7 " />
                                </button>
                            </div>
                        </div>
                    </div>
                    {rates?.length > 0 && <><div className='mt-10 w-full flex justify-end border-x-0 border-t-0 border p-2'>
                        <select className='h-9 px-2 border border-solid'>
                            <option value="Newest">Mới nhất</option>
                            <option value="Like">Lượt thích</option>
                            <option value="Oldest">Cũ nhất</option>
                        </select>
                    </div>
                        <div className='grid border-b-1 border border-gray-200 border-x-0 border-t-0'>
                            <div className='w-full'>
                                {rates?.map((i, index) => (
                                    <div key={index} className='flex'>
                                        <div>
                                            <Avatar src="" sx={{ width: 60, height: 60 }} />
                                        </div>
                                        <div className='ml-4 w-full'>

                                            <div key={index} className='w-full rounded-xl pb-4 pr-5'>
                                                <div className='font-semibold'>{i?.profile?.firstName} {i?.profile?.lastName}</div>
                                                <div className='text-sm flex text-gray-500 gap-10'>
                                                    <div className='text-yellow-500'>
                                                        <RateHandle rate={i.rate} />
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faGlasses} />
                                                        <span className='ml-2'>Trang {i?.pageBook?.pageNo} </span>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faClock} />
                                                        <span className='ml-2'>{i?.createAt ? formatTimeDifference(i?.createAt) + "" : <></>}</span>
                                                    </div>
                                                </div>
                                                <div className='mt-2'>{i?.content}</div>
                                                <div className='flex mt-10 justify-end gap-6 text-gray-600'>
                                                    <div className='flex gap-2'>
                                                        <div>
                                                            <FontAwesomeIcon className='text-gray-400' icon={faThumbsUp} />
                                                        </div>
                                                        <div>0</div>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <div>
                                                            <FontAwesomeIcon className='text-gray-400' icon={faReply} />
                                                        </div>
                                                        <div>Trả lời</div>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <div>
                                                            <FontAwesomeIcon className='text-gray-400' icon={faFlag} />
                                                        </div>
                                                        <div>Báo xấu</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>))}
                            </div >
                        </div></>}
                </div>
                <div className='grid grid-cols-1 rounded-md bg-gray-200 ml-3 px-3 py-1 mt-5'>
                    <div>
                        <div className='flex justify-between text-xl font-semibold mt-5'>
                            <div>Đã có {rates?.length} đánh gíá</div>
                            <div className='text-yellow-500 text-lg'>
                                <div className='text-yellow-500'>
                                    <RateHandle rate={computedBook?.totalRate ? computedBook?.totalRate : 5} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Tính hữu ích</div>
                                <div className='text-yellow-500 text-lg'>
                                    <div className='text-yellow-500'>
                                        <RateHandle rate={computedBook?.helpful ? computedBook?.helpful : 5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Nội dung sách</div>
                                <div className='text-yellow-500 text-lg'>
                                    <div className='text-yellow-500'>
                                        <RateHandle rate={computedBook?.contentBook ? computedBook?.contentBook : 5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Độ dễ hiểu</div>
                                <div className='text-yellow-500 text-lg'>
                                    <div className='text-yellow-500'>
                                        <RateHandle rate={computedBook?.understand ? computedBook?.understand : 5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Nội dung tổng hợp</div>
                                <div className='text-yellow-500 text-lg'>
                                    <div className='text-yellow-500'>
                                        <RateHandle rate={computedBook?.contentPage ? computedBook?.contentPage : 5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reviews;