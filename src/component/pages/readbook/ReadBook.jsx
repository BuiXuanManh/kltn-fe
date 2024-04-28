
import { IonIcon } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import {
    heartOutline, documentTextOutline, bookmarkOutline, arrowBack, arrowForward,
    alertCircleOutline, menuSharp, settingsOutline, chatbubblesOutline
} from 'ionicons/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare, faBookmark, faStar, faThumbsUp, faReply, faFlag, faCheck, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { arrowDownCircleOutline, arrowUpCircleOutline } from 'ionicons/icons';
import Setting from './setting/Setting';
import ListPage from './listpage/ListPage';
import { Avatar } from '@mui/material';
import IconGlobal from '../../../icon/IconGlobal';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import { AppContext } from '../../../context/AppContext';
import AccountService from '../../service/AccountService';
import AudioService from '../../service/AudioService';
import PageService from '../../service/PageService';
import CommentService from '../../service/CommentService';
const ReadBook = () => {
    const { token, profile, interactions, setInteractions } = useContext(AppContext);
    const [show, setShow] = useState("");
    const handleShow = (filter) => {
        filter === show ? setShow("") : filter === "setting" ? setShow("setting") : filter === "listpage" ? setShow("listpage") : filter === "emotion" ? setShow("emotion") : setShow("save");
    }
    let icon = new IconGlobal();
    let service = new BookService();
    let pageService = new PageService();
    const { id, pageNo } = useParams();
    const [pageNoo, setPageNo] = useState(pageNo);
    const [page, setPage] = useState({});
    const [isPage, setIsPage] = useState(false);
    const getPage = useQuery({
        queryKey: ['page', id, pageNoo],
        queryFn: () => pageService.getPageByBookIdAndPageNo(id, pageNoo).then((res) => {
            if (res?.data) {
                // console.log(res?.data);
                setPage(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err.message);
        }),
        enabled: id !== undefined && pageNoo !== undefined
    });
    useEffect(() => {
        if (pageNo) {
            setPageNo(pageNo);
        }
    }, [pageNo, id])
    const processedContent = page?.content?.split('.').map((sentence, index) => (
        <React.Fragment key={index}>
            {sentence.trim()}
            {index !== page?.content?.split('.').length - 1 && '.'}<br /><br />
        </React.Fragment>
    ));
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handlePrePage = (e) => {
        e.preventDefault();
        if (pageNoo > 1) {
            const no = Number(pageNoo) - 1;
            navigate(`/details/read/${id}/${Number(no)}`);
        }
    }
    const handleNextPage = (e) => {
        e.preventDefault();
        if (pageNoo < page?.book?.pageCount) {
            const no = Number(pageNoo) + 1;
            navigate(`/details/read/${id}/${Number(no)}`);
        }
    }
    const updateBookInteraction = useQuery({
        queryKey: ["interaction", profile?.id, page?.book?.id],
        queryFn: () => service.updateBookInteraction(token, page?.book?.id, page?.id, pageNoo).then((res) => {
            if (res?.data) {
                setIsPage(true);
                setInteractions(res.data);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        }),
        enabled: token !== undefined && token != "" && profile?.id !== undefined && page?.book?.id !== undefined && id != undefined && !isPage,
    });
    let audioService = new AudioService();
    const pageLoad = {
        "audioConfig": {
            "audioEncoding": "MP3",
            "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
            ],
            "pitch": 0,
            "speakingRate": 1
        },
        "input": {
            "text": page?.content
        },
        "voice": {
            "languageCode": "vi-VN",
            "name": "vi-VN-Neural2-A"
        }
    }
    const [audio, setAudio] = useState(null);
    const audioMuta = useMutation({
        mutationKey: ['audio', page?.id],
        mutationFn: (pageLoad) => audioService.getAudio(pageLoad).then((res) => {
            if (res?.data) {
                console.log(res.data);
                setAudio(`data:audio/mp3;base64,${res.data.audioContent}`);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        }),
    })
    const handleVoice = () => [
        audioMuta.mutate(pageLoad),
        setShowAudio(true)
    ]
    const [showAudio, setShowAudio] = useState(false);
    const [interactionPage, setInteractionPage] = useState();
    useEffect(() => {
        updateBookInteraction.refetch();
    }, [pageNoo, audio]);
    const [isHover, setIsHover] = useState(null);
    const handleMouseLeave = () => setIsHover(null);
    const handleClose = () => setShow("");
    const handleBack = () => navigate(`/details/${id}`);
    const getInteraction = useQuery({
        queryKey: ["interactionPage", profile?.id, page?.id],
        queryFn: () => pageService.getInteractionPage(token, page?.id).then((res) => {
            if (res?.data) {
                console.log(res.data);
                setIsPage(true);
                setInteractionPage(res.data);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        }).enabled = page?.id !== "" && profile?.id !== undefined && !isPage
    })
    const [comments, setComments] = useState([]);
    let commentService = new CommentService();
    const getComment = useQuery({
        queryKey: ["comments", page?.id],
        queryFn: () => commentService.getCommentByPageId(page?.id).then((res) => {
            if (res?.data) {
                console.log(res.data);
                setComments(res.data);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        }).enabled = page?.id !== undefined && !isPage && comments.length === 0
    })
    console.log(comments);
    const addEmo = useMutation({
        mutationFn: (type) => pageService.addEmotion(token, page?.id, type).then((res) => {
            if (res.data) {
                console.log(res.data);
                setInteractionPage(res.data);
                handleClose();
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    const mark = useMutation({
        mutationFn: (type) => pageService.mark(token, page?.id, type).then((res) => {
            if (res.data) {
                console.log(res.data);
                setInteractionPage(res.data);
                handleClose();
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    const handleEmotion = (type) => {
        addEmo.mutate(type);
    }
    const handleMark = (type) => {
        mark.mutate(type);
    }
    return (
        <div className='relative py-10 w-full h-full bg-gray-100'>
            <IonIcon className='animate-bounce w-10 h-10 fixed right-4 bottom-96 cursor-pointer' icon={arrowUpCircleOutline}></IonIcon>
            <IonIcon className='animate-bounce w-10 h-10 fixed right-4 top-96 cursor-pointer' icon={arrowDownCircleOutline}></IonIcon>
            <div className='w-full'>
                <div className='mx-48 border bg-[#EAE4D3] border-white rounded-xl items-center justify-center text-center'>
                    <div className='mt-5 flex mx-20 justify-between'>
                        <div className=''>
                            <button disabled={Number(pageNoo) === 1} onClick={(e) => handlePrePage(e)} className={`rounded-3xl px-8 h-10  ${Number(pageNo) === 1 ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"} justify-center items-center1`}><div className='text-center justify-center'><IonIcon className='' icon={arrowBack}></IonIcon><span className='ml-3 mb-3'>Trang trước</span></div></button>
                        </div>
                        <div className=''>
                            <button disabled={Number(pageNoo) === page?.book?.pageCount} onClick={(e) => handleNextPage(e)} className={`rounded-3xl px-8 h-10 ${Number(pageNo) === page?.book?.pageCount ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"} justify-center items-center`}><div className='justify-center text-center'><span className='mr-3 mb-3'>Trang sau</span> <IonIcon className='' icon={arrowForward}></IonIcon></div></button>
                        </div>
                    </div>
                    <div className='mt-5 '>
                        <h1 className='text-3xl font-semibold uppercase'>{page?.book?.title}</h1>
                    </div>
                    <div className='justify-center mt-5 gap-4 flex'>
                        <span className='text-sm flex'>
                            <div className='flex justify-center items-center'>
                                <IonIcon icon={documentTextOutline}></IonIcon>
                                <span className='ml-1'> Trang {pageNo}</span>
                            </div>
                        </span>
                        <span className='text-sm flex'>
                            <div className='flex justify-center items-center'>
                                <img src={icon?.icon?.author} className='w-5 h-5' alt="" />
                                {page?.book?.authors?.map((i, index) =>
                                    <div className='flex ml-2' key={index}>
                                        <p className=''>{i?.name}</p>
                                        {(index !== page?.book?.authors?.length - 1) ? <span className="mr-2">, </span>
                                            : <span> </span>}
                                    </div>)}
                            </div>
                        </span>
                        <span className='text-sm flex'>
                            <div className='flex justify-center items-center'>
                                <IonIcon icon={heartOutline}></IonIcon>
                            </div>
                            <span className='ml-1'>  30 cảm xúc</span>
                        </span>
                        <span className='text-sm flex'>
                            <div className='flex justify-center items-center'>
                                <IonIcon icon={bookmarkOutline}></IonIcon>
                                <span className='ml-1'>  15 đánh dấu</span>
                            </div>
                        </span>
                    </div>
                    <div className='mt-10 mx-16 text-2xl  text-start justify-start items-star'>
                        {page?.name && <span className='mt-1 text-3xl font-semibold'>Trang {pageNo}: {page?.name}</span>}
                        <br /><br />
                        <span className='' style={{ lineHeight: "1" }} >
                            {processedContent}
                        </span>
                    </div>
                    <div className='mt-4 py-10 mx-16'>
                        <div className='flex gap-10 justify-center items-center text-center'>
                            <div className='w-20 h-30'>
                                <FontAwesomeIcon icon={faStar} />
                                <br />
                                <span>Đánh giá</span>
                            </div>
                            {/* <div className='w-20 h-30'>
                                <FontAwesomeIcon icon={faShareFromSquare} />
                                <br />
                                <span>Đề cử</span>
                            </div> */}
                            <div className='w-20 h-30 cursor-pointer' onClick={() => handleMark(!interactionPage?.mark)}>
                                <FontAwesomeIcon className={`${interactionPage?.mark ? "text-red-600" : ""}`} icon={faBookmark} />
                                <br />
                                <span>Đánh dấu</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 mx-48 border bg-[#EAE4D3] border-white h-25 rounded-md'>
                    <div className='mx-16 flex gap-10  py-10'>
                        <div className='w-[45%] h-full'>
                            <button disabled={Number(pageNoo) === 1} onClick={(e) => handlePrePage(e)} className={`w-full px-8 h-10 ${Number(pageNo) === 1 ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"} justify-center items-center`}><div className='text-center justify-center'><IonIcon className='' icon={arrowBack}></IonIcon><span className='ml-3 mb-3'>Trang trước</span></div></button>
                        </div>
                        <div className='justify-center text-center h-full items-center w-[10%]'>
                            <button className='px-8 h-10 bg-[#F0ECDF] justify-center items-center'>
                                <IonIcon className="min-w-6 h-full pb-4" icon={alertCircleOutline}></IonIcon>
                            </button>
                        </div>
                        <div className='w-[45%] h-full justify-end flex'>
                            <button disabled={Number(pageNoo) === page?.book?.pageCount} onClick={(e) => handleNextPage(e)} className={`ml-auto w-full px-8 h-10 ${Number(pageNo) === page?.book?.pageCount ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"}`}><div className='justify-center text-center'><span className='mr-3 mb-3'>Trang sau</span> <IonIcon className='' icon={arrowForward}></IonIcon></div></button>
                        </div>
                    </div>
                </div>
                <div className='mt-4 mx-48 border bg-[#EAE4D3] border-white h-25 rounded-md'>
                    <div className='mx-16 grid gap-10 py-10'>
                        <div className='grid'>
                            <div className='justify-between flex'>
                                <h3 className='text-xl font-semibold'>111 Binh luan</h3>
                                <select className='h-9 px-2'>
                                    <option value="Newest">Mới nhất</option>
                                    <option value="Like">Lượt thích</option>
                                    <option value="Olded">Cũ nhất</option>
                                </select>
                            </div>
                            <div className='flex w-full my-10 border-b-1 border border-gray-200 border-x-0 border-t-0 pb-4'>
                                <div>
                                    <Avatar src="" sx={{ width: 60, height: 60 }} />
                                </div>
                                <div className='ml-4 w-full'>
                                    <textarea name="comment" placeholder='Nhập bình luận của bạn ...' className='w-full p-4 h-16 rounded-xl'></textarea>
                                </div>
                            </div>
                            {comments?.length > 0 && <div className='grid border-b-1 border border-gray-200 border-x-0 border-t-0'>
                                <div className='flex w-full'>
                                    <div>
                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                    </div>
                                    <div className='ml-4 w-full'>
                                        {comments?.map((i, index) => (
                                            <div key={index} className='w-full rounded-xl pb-4 pr-5'>
                                                <div className='font-semibold'>{i?.profile?.firstName} {i?.profile?.lastName}</div>
                                                <div className='text-sm flex text-gray-500 gap-10'>
                                                    <div >{i?.createAt ? new Date(i?.createAt).toLocaleString() + "" : <></>}</div>
                                                    <div>Trang {pageNo} </div>
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
                                        )
                                        )}
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                {show === "setting" && <Setting handleClose={handleClose} handleVoice={handleVoice} showAudio={showAudio} audio={audio} />}
                {show === "listpage" && <ListPage handleClose={handleClose} />}
                <div className='fixed ml-4 top-4 mt-24 right-[6.5rem] rounded-xl'>
                    <div className={`rounded-xl w-20`}>
                        <div
                            onMouseEnter={() => setIsHover("pages")}
                            onMouseLeave={handleMouseLeave}
                            className={`flex relative border-white border ${show === "listpage" ? 'bg-white ' : 'bg-[#EAE4D3] '} border-solid border-b-1 justify-center text-center h-14 items-center cursor-pointer`}
                            onClick={() => handleShow("listpage")}
                        >
                            <IonIcon className='w-7 h-7' icon={menuSharp} />
                            {isHover === "pages" && (
                                <div
                                    className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-black py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                    role="tooltip" >
                                    <span
                                        className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black border-t border-r border-gray-300"></span>
                                    Danh sách trang
                                </div>
                            )}
                        </div>
                        <div
                            onMouseEnter={() => setIsHover("setting")}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleShow("setting")}
                            className={`border relative border-white ${show === "setting" ? 'bg-white ' : 'bg-[#EAE4D3] '} border-solid  border-b-1 flex items-center justify-center text-center h-14 cursor-pointer`}>
                            <IonIcon className='w-6 h-6' icon={settingsOutline} />
                            {isHover === "setting" && (
                                <div
                                    className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-black py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                    role="tooltip"  >
                                    <span
                                        className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black border-t border-r border-gray-300"></span>
                                    Cài đặt
                                </div>
                            )}
                        </div>
                        <div
                            onMouseEnter={() => setIsHover("back")}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleBack()}
                            className='border relative border-white border-solid bg-[#EAE4D3] border-b-1 justify-center items-center text-center h-14 flex cursor-pointer'>
                            <IonIcon className='w-6 h-6' icon={arrowBack} />
                            {isHover === "back" && (
                                <div
                                    className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-black py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                    role="tooltip"  >
                                    <span
                                        className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black border-t border-r border-gray-300"></span>
                                    Trở về trang thông tin sách
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='fixed bottom-10 right-[6.5rem] rounded-xl flex-row justify-center items-center gap-5 '>
                    {show === "emotion" && <div className='rounded-3xl bg-white py-2'>
                        <div onClick={() => handleEmotion("LOVE")} className='flex justify-center items-center'>
                            <img src="love.png" alt="" className='w-10 h-10 hover:w-12 hover:h-12 cursor-pointer' />
                        </div>
                        <div onClick={() => handleEmotion("LIKE")} className='flex justify-center items-center'>
                            <img src="like.png" alt="" className='w-10 h-10 hover:w-12 hover:h-12 cursor-pointer' />
                        </div>
                        <div onClick={() => handleEmotion("FUN")} className='flex justify-center items-center'>
                            <img src="fun.png" alt="" className='w-10 h-10 hover:w-12 hover:h-12 cursor-pointer' />
                        </div>
                        <div onClick={() => handleEmotion("SAD")} className='flex justify-center items-center'>
                            <img src="sad.png" alt="" className='w-10 h-10 hover:w-12 hover:h-12 cursor-pointer' />
                        </div>
                        <div onClick={() => handleEmotion("ANGRY")} className='flex justify-center items-center'>
                            <img src="angry.png" alt="" className='w-10 h-10 hover:w-12 hover:h-12 cursor-pointer' />
                        </div>
                    </div>
                    }
                    <div className='mt-2'>
                        <div className='bg-[#EAE4D3] w-20 rounded-xl'>
                            <div
                                onMouseEnter={() => setIsHover("emotion")}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleShow("emotion")}
                                className='border relative border-white border-solid  border-b-1 justify-center text-center h-14 items-center flex cursor-pointer'>
                                {
                                    interactionPage?.type ? <div>
                                        <img src={interactionPage?.type === "LIKE" ? "like.png" :
                                            interactionPage?.type === "LOVE" ? "love.png" :
                                                interactionPage?.type === "FUN" ? "fun.png" :
                                                    interactionPage?.type === "SAD" ? "sad.png" :
                                                        "angry.png"
                                        } alt="" className='w-7 h-7 cursor-pointer' />
                                    </div> :
                                        <IonIcon className='w-7 h-7' icon={heartOutline} />}
                                {isHover === "emotion" && (
                                    <div
                                        className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-black py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                        role="tooltip"  >
                                        <span
                                            className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black border-t border-r border-gray-300"></span>
                                        Cảm xúc
                                    </div>
                                )}
                            </div>
                            <div
                                onMouseEnter={() => setIsHover("save")}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleShow("save")}
                                className='border border-white border-solid  border-b-1 justify-center text-center h-14 items-center flex cursor-pointer'>
                                {show === "save" ? <FontAwesomeIcon className='w-7 h-7' icon={faCheck} /> : <IonIcon className='w-7 h-7' icon={bookmarkOutline} />}
                                {isHover === "save" && (
                                    <div
                                        className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-black py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                        role="tooltip"  >
                                        <span
                                            className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black border-t border-r border-gray-300"></span>
                                        Lưu trữ
                                    </div>
                                )}
                            </div>
                            <div
                                onMouseEnter={() => setIsHover("comment")}
                                onMouseLeave={handleMouseLeave}
                                className='border relative border-white border-solid  border-b-1 justify-center text-center h-14 items-center flex cursor-pointer'>
                                <IonIcon className='w-7 h-7' icon={chatbubblesOutline} />
                                {isHover === "comment" && (
                                    <div
                                        className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-black py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                        role="tooltip"  >
                                        <span
                                            className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-black border-t border-r border-gray-300"></span>
                                        Xem bình luận
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadBook;