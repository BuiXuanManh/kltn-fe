
import { IonIcon } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import {
    heartOutline, documentTextOutline, bookmarkOutline, arrowBack, arrowForward,
    alertCircleOutline, menuSharp, settingsOutline, chatbubblesOutline,
    book
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
import AudioService from '../../service/AudioService';
import PageService from '../../service/PageService';
import CommentService from '../../service/CommentService';
import Review from './review/Review';
import { message } from 'antd';
import ComputedService from '../../service/ComputedService';
import useAddComputedPage from '../../../hook/useAddComputedPage';
import useAddComputedInteractionBook from '../../../hook/useAddComputedInteractionBook';
import useAddComputedPageBook from '../../../hook/useAddComputedPageBook';
import useAddComputedCommentBook from '../../../hook/useAddComputedCommentBook';
import useAddComputedRateBook from '../../../hook/useAddComputedRateBook';
import { toast } from 'react-toastify';
import formatTimeDifference from '../../service/DateService';
import swal from 'sweetalert';
import SettingService from '../../service/SettingService';
const ReadBook = () => {
    const { token, setInteractions, profile, setComputedBook, computedPage, setComputedPage } = useContext(AppContext);

    const { mutate: addPage } = useAddComputedInteractionBook();
    const handleAddComPage = (id) => {
        addPage(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };

    const { mutate: mutatePageBook } = useAddComputedPageBook();
    const handleAddComPageBook = (id) => {
        mutatePageBook(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const { mutate: mutateCommentBook } = useAddComputedCommentBook();
    const handleAddComComment = (id) => {
        mutateCommentBook(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const { id, pageNo } = useParams();
    const { mutate: mutatePage } = useAddComputedPage();
    const handleAddPage = (id) => {
        mutatePage(id, {
            onSuccess: (newPage) => {
                setComputedPage(newPage);
            }
        });
    };
    let computedService = new ComputedService();
    const getComputedPage = useQuery({
        queryKey: ['computedPage', id],
        queryFn: () => computedService.getComputedPage(id).then((res) => {
            if (res.data) {
                setComputedPage(res.data);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }), enabled: !!computedPage
    })
    const [show, setShow] = useState("");
    const handleShow = (filter) => {
        filter === show ? setShow("") : filter === "setting" ? setShow("setting") : filter === "listpage" ? setShow("listpage") : filter === "emotion" ? setShow("emotion") : filter === "review" ? setShow("review") : filter === "save" ? setShow("save") : setShow("");
    }
    let icon = new IconGlobal();
    let service = new BookService();
    let pageService = new PageService();
    // const [pageNo, setPageNo] = useState(pageNo);
    const [page, setPage] = useState({});
    const [isPage, setIsPage] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const getPage = useQuery({
        queryKey: ['page', id, pageNo],
        queryFn: () => {
            pageService.getPageByBookIdAndPageNo(id, pageNo).then((res) => {
                if (res?.data) {
                    setPage(res.data);
                    if (pageNo > 0 && pageNo <= res.data?.book?.pageCount)
                        setPageCount(res.data?.book?.pageCount);
                    else {
                        toast.error("Không tìm thấy trang");
                    }
                    return res.data;
                }
            }).catch((err) => {
                console.error(err.message);
            })
        }
    });
    const postInteraction = useMutation({
        mutationFn: () => {
            if (page?.id !== undefined && page?.id !== null && page?.id !== "" && page?.book?.id !== undefined && page?.book?.id !== "" && page?.book?.id !== null && page?.book?.id !== "")
                pageService.postInteraction(page?.id).then((res) => {
                    if (res?.data) {
                        handleAddPage(page?.id);
                        setIsPage(true);
                        setInteractions(res.data);
                        handleAddComPageBook(page?.book?.id);
                        return res.data;
                    }
                })
                    .catch((err) => {
                        console.error(err);
                    })
        }
    })
    useEffect(() => {
    }, [pageNo, id])
    useEffect(() => {
        if (pageNo > 0 && page?.id != undefined && page?.id !== "" && page?.id !== null)
            handleAddPage(page?.id);
    }, [pageNo])
    useEffect(() => {
        if (token === "" || token === undefined) {
            postInteraction.mutate();
        }
        updateBookInteraction.mutate()
        getPage.refetch()
    }, [])
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
        if (pageNo > 1) {
            const no = Number(pageNo) - 1;
            navigate(`/details/read/${id}/${Number(no)}`);
        }
    }
    const handleNextPage = (e) => {
        e.preventDefault();
        if (pageNo < page?.book?.pageCount) {
            const no = Number(pageNo) + 1;
            navigate(`/details/read/${id}/${Number(no)}`);
        }
    }
    const updateBookInteraction = useMutation({
        mutationFn: () => {
            if (token !== undefined && token !== "" && token !== null && page?.book?.id !== undefined && page?.id !== undefined && pageNo !== undefined) {
                service.updateBookInteraction(token, page?.book?.id, page?.id, pageNo).then((res) => {
                    if (res?.data) {
                        handleAddPage(page?.id)
                        setIsPage(true);
                        setInteractions(res.data);
                        return res.data;
                    }
                }).catch((error) => {
                    console.error(error);
                })
            }
        }
    });

    const [rate, setRate] = useState(1);
    const getRate = useQuery({
        queryKey: ["getRate", page?.id],
        queryFn: () => {
            if (token !== undefined && token !== "" && token !== null && pageNo > 0 && pageNo <= page?.book?.pageCount) {
                pageService.getRatePage(token, page?.id).then((res) => {
                    if (res.data) {
                        setRate(res.data.rate);
                        return res.data;
                    }
                }).catch((error) => {
                    console.error(error);
                })
            }
        }
    })
    let audioService = new AudioService();
    const [audio, setAudio] = useState(null);
    const audioMuta = useMutation({
        mutationKey: ['audio', page?.id],
        mutationFn: (gender) => {
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
                    "name": "vi-VN-Neural2-" + gender
                }

            }
            audioService.getAudio(pageLoad).then((res) => {
                if (res?.data) {
                    setShowAudio(true)
                    setAudio(`data:audio/mp3;base64,${res.data.audioContent}`);
                    return res.data;
                }
            }).catch((error) => {
                console.error(error);
            })
        }
    })
    const [follow, setFollow] = useState(false);
    const getInteractions = useQuery({
        queryKey: ['interaction', id],
        queryFn: () => service.findInteraction(token, id).then((res) => {
            if (res.data && res.data != null) {
                setFollow(res.data?.followed);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }),
        enabled: token != "" && id !== "" && id !== undefined && id !== "" && !!id
    });
    const { mutate: addInteraction } = useAddComputedInteractionBook();
    const handleAddInteractionbookBook = (id) => {
        addInteraction(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const followMutation = useMutation({
        mutationFn: (type) => {
            if (type === 'follow') {
                return service.follow(token, id).then((res) => {
                    if (res.data) {
                        handleAddInteractionbookBook(id);
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
        if (token !== "" && token !== null && token !== undefined && id !== "" && id !== null && id !== undefined && id !== "")
            followMutation.mutate(type);
        else swal({
            title: "Bạn có muỐn đăng nhập không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    navigate("/login")
                }
            });
    }
    const [showAudio, setShowAudio] = useState(false);
    const handleVoice = (gender) => [
        audioMuta.mutate(gender),
    ]
    const [interactionPage, setInteractionPage] = useState();
    useEffect(() => {
        if (pageNo !== undefined && pageNo > 0 && page?.id !== undefined && pageNo <= page?.book?.pageCount)
            updateBookInteraction.mutate();
    }, [pageNo, audio, page]);
    const [isHover, setIsHover] = useState(null);
    const handleMouseLeave = () => setIsHover(null);
    const handleClose = () => setShow("");
    const handleBack = () => navigate(`/details/${id}`);
    const getInteraction = useQuery({
        queryKey: ["interactionPage", profile?.id, page?.id],
        queryFn: () => {
            if (page.id !== "" && profile.id !== undefined && !isPage && token !== undefined && token !== "" && pageNo > 0 && page?.id !== undefined)
                pageService.getInteractionPage(token, page?.id).then((res) => {
                    if (res?.data) {
                        console.log(res.data);
                        setIsPage(true);
                        setInteractionPage(res.data);
                        return res.data;
                    }
                }).catch((error) => {
                    console.error(error);
                })
        }
    })
    useEffect(() => {
        if (page?.id !== undefined && page?.id !== "" && token !== undefined && token !== "" && token !== null) {
            getInteraction.refetch();
            getRate.refetch();
        }
    }, [page])
    const [pages, setPages] = useState([]);
    const getPages = useQuery({
        queryKey: ['pages', id],
        queryFn: () => {
            if (id !== "" && id !== null && id !== undefined)
                pageService.getPagesByBookId(id).then((res) => {
                    if (res.data) {
                        console.log(res.data)
                        setPages(res.data);
                        setPageCount(res.data.length);
                        return res.data;
                    }
                }).catch((err) => {
                    console.error(err);
                })
        }
    })
    useEffect(() => {

    }, [pages])
    const [setting, setSetting] = useState({})
    let settingService = new SettingService();
    const getSetting = useQuery({
        queryKey: ['getSetting', profile.id],
        queryFn: () => {
            if (token !== "" && token !== undefined) {
                settingService.getSetting(token).then((res) => {
                    if (res.data) {
                        setSetting(res.data);
                        return res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    })
    const [comments, setComments] = useState([]);
    let commentService = new CommentService();
    const getComment = useQuery({
        queryKey: ["comments", page?.id],
        queryFn: () => {
            if (page?.id !== undefined && page?.id !== "" && page?.id !== null && page?.id !== "")
                commentService.getCommentByPageId(page?.id).then((res) => {
                    if (res?.data) {
                        console.log(res.data);
                        setComments(res.data);
                        // handleShowChild();
                        return res.data;
                    }
                }).catch((error) => {
                    console.error(error);
                })
        }
    })

    const [content, setContent] = useState("");
    const [childrens, setChildrens] = useState({});
    const addComment = useMutation({
        mutationFn: (content) => {
            if (content !== "") {
                commentService.addComment(token, page?.id, content?.content, content?.id).then((res) => {
                    if (res.data) {
                        setContent("");
                        handleAddPage(page?.id)
                        handleAddComComment(page?.book?.id);
                        setComments(prevComments => [res.data, ...prevComments]);
                        getComment.refetch()
                        if (res.data.parent?.id) {
                            setChildrens(prevChildrens => {
                                const updatedChildren = [...(prevChildrens[res.data.parent.id] || []), res.data];
                                return {
                                    ...prevChildrens,
                                    [res.data.parent.id]: updatedChildren
                                };
                            });
                        }
                        return res.data;
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                toast.error("Nhập nội dung bình luận");
            }
        }
    });
    const addEmo = useMutation({
        mutationFn: (type) => pageService.addEmotion(token, page?.id, type).then((res) => {
            if (res.data) {
                handleAddPage(page?.id);
                handleAddComPageBook(page?.book?.id);
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
                handleAddPage(page?.id)
                handleAddComPageBook(page?.book?.id);
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
    const handleKey = (e, id) => {
        if (id !== undefined && id !== "" && id !== null && id !== "") {
            if (e.key === "Enter") {
                addComment.mutate({ content: e.target.value, id: id });
                handleAddComComment(page?.book?.id);
            }
        }
        else if (e.key === "Enter") {
            addComment.mutate({ content: e.target.value });
            handleAddComComment(page?.book?.id);
        }

    }
    const postHandleLike = useMutation({
        mutationFn: (id) => {
            if (token !== undefined && token !== "" && token !== null) {
                commentService.handleLike(token, id).then((res) => {
                    if (res.data) {
                        getComment.refetch()
                        const updatedComment = res.data;
                        console.log(updatedComment);
                        const updatedComments = comments.map(comment =>
                            comment.id === updatedComment.id ? updatedComment : comment
                        );
                        setChildrens(prevChildrens => {
                            const updatedChildrens = { ...prevChildrens }; // Tạo bản sao mới của childrens

                            // Tìm comment cha chứa bình luận con vừa được like
                            for (const parentId in prevChildrens) {
                                const updatedChildren = prevChildrens[parentId]?.map(child =>
                                    child.id === updatedComment.id ? updatedComment : child
                                );

                                if (updatedChildren) {
                                    updatedChildrens[parentId] = updatedChildren; // Cập nhật danh sách con nếu tìm thấy
                                    break; // Thoát vòng lặp khi đã tìm thấy
                                }
                            }

                            return updatedChildrens;
                        });
                        setComments(updatedComments);
                        getComment.refetch()
                        return updatedComment;
                    }
                }).catch((err) => {
                    console.error(err);
                })
            } else toast.error("Vui lòng đăng nhập");
        }
    })
    const handleLike = (id) => {
        postHandleLike.mutate(id);
    }
    const [showReply, setShowReply] = useState({});
    const handleShowReply = (id) => {
        handleShowChild(id)
        setShowReply(prevShowReply => ({
            ...prevShowReply,
            [id]: !prevShowReply[id]
        }));
    };
    const handleShowChild = (id) => {
        const filteredChildren = comments.filter(comment => comment?.parent?.id === id);
        setChildrens(prevChildrens => ({
            ...prevChildrens,
            [id]: filteredChildren
        }));
    };
    useEffect(() => {
    }, [comments, showReply])
    const colorOptions = [
        { color: "#F5E4E4" },
        { color: "#F5EBCD" },
        { color: "#E2EEE2" },
        { color: "#E1E8E8" },
        { color: "#EAE4D3" },
        { color: "#E5E3DF" },
        { color: "#222222" }
    ];
    useEffect(() => {
        if (Object.keys(setting).length > 0) { // Kiểm tra xem setting có chứa thuộc tính nào không
            if (setting?.color < 7) {
                document.body.style.backgroundColor = colorOptions[setting?.color - 1]?.color;
                document.body.classList.remove("dark");
            }
            else if (setting?.color === 7) {
                // document.body.classList.add("dark");
                document.body.style.backgroundColor = "#222222";
            }
            else {
                document.body.classList.remove("dark");
                document.body.style.backgroundColor = "#EAE4D3";
            }
        }
    }, [setting]);
    const fontFamilyClass = {
        'Arial': 'font-sans',
        'Times': 'font-serif',
        'Courier': 'font-mono',
        'Georgia': 'font-display',
        'Verdana': 'font-handwriting',
    }[setting?.font] || '';
    console.log(setting)
    return (
        <div className={`w-full ${setting?.color === 7 ? "dark" : ""} dark:bg-[#222222]`}>
            <div className={`relative py-10 w-full ${setting?.color === 7 ? "dark" : ""} dark:bg-[#222222] h-full  bg-gray-100`}>
                <IonIcon className='dark:bg-[#222222] dark:text-gray-500 animate-bounce w-10 h-10 fixed right-4 bottom-96 cursor-pointer' icon={arrowUpCircleOutline}></IonIcon>
                <IonIcon className='dark:bg-[#222222] dark:text-gray-500 animate-bounce w-10 h-10 fixed right-4 top-96 cursor-pointer' icon={arrowDownCircleOutline}></IonIcon>
                <div className={` w-full`}>
                    <div className={`mx-48 ${setting?.color === 7 ? "dark" : ""} dark:bg-[#222222] dark:text-gray-500  border ${setting?.color < 7 ? "bg-[" + colorOptions[setting?.color - 1]?.color + "]" : "bg-[#EAE4D3]"} border-white rounded-xl items-center justify-center text-center`}>
                        {/* header page */}
                        <div className='mt-5 flex mx-20 justify-between'>
                            <div className=''>
                                <button disabled={Number(pageNo) === 1} onClick={(e) => handlePrePage(e)} className={`dark:bg-[#222222] dark:text-gray-500 rounded-3xl px-8 h-10  ${Number(pageNo) === 1 ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"} justify-center items-center1`}><div className='text-center justify-center'><IonIcon className='' icon={arrowBack}></IonIcon><span className='ml-3 mb-3'>Trang trước</span></div></button>
                            </div>
                            <div className=''>
                                <button disabled={Number(pageNo) === page?.book?.pageCount} onClick={(e) => handleNextPage(e)} className={`dark:bg-[#222222] dark:text-gray-500 rounded-3xl px-8 h-10 ${Number(pageNo) === page?.book?.pageCount ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"} justify-center items-center`}><div className='justify-center text-center'><span className='mr-3 mb-3'>Trang sau</span> <IonIcon className='' icon={arrowForward}></IonIcon></div></button>
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
                                    <img src={icon?.icon?.author} className='dark:block text-gray-300 w-5 h-5' alt="" />
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
                                <span className='ml-1'>  {computedPage?.emotion ? computedPage?.emotion : 0} cảm xúc</span>
                            </span>
                            <span className='text-sm flex'>
                                <div className='flex justify-center items-center'>
                                    <IonIcon icon={bookmarkOutline}></IonIcon>
                                    <span className='ml-1'>  {computedPage?.mark ? computedPage?.mark : 0} đánh dấu</span>
                                </div>
                            </span>
                        </div>
                        {/* content page */}
                        <div className={`mt-10 mx-16 ${setting?.textSize ? "text-[" + setting?.textSize + "px]" : "text-2xl"}  text-start justify-start items-star`}>
                            {page?.name && <span className='mt-1 text-3xl font-semibold'>Trang {pageNo}: {page?.name}</span>}
                            <br /><br />
                            <span className={` ${fontFamilyClass} `} style={{ lineHeight: `${setting?.lineHeight ? setting?.lineHeight : "1"}` }} >
                                {processedContent}
                            </span>
                        </div>
                        <div className='mt-4 py-10 mx-16'>
                            <div className={` flex gap-10 justify-center items-center text-center`}>
                                <div onClick={() => handleShow("review")} className='w-20 h-30'>
                                    <FontAwesomeIcon className={`${rate && rate > 1 ? "text-yellow-500" : ""}`} icon={faStar} />
                                    <br />
                                    <span>Đánh giá</span>
                                </div>
                                <div className='w-20 h-30 cursor-pointer' onClick={() => handleMark(!interactionPage?.mark)}>
                                    <FontAwesomeIcon className={`${interactionPage?.mark ? "text-red-600" : ""}`} icon={faBookmark} />
                                    <br />
                                    <span>Đánh dấu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* footer page */}
                    <div className='mt-4 mx-48 border dark:bg-[#222222] dark:text-gray-500 bg-[#EAE4D3] border-white h-25 rounded-md'>
                        <div className='mx-16 flex gap-10  py-10'>
                            <div className='w-[45%] h-full'>
                                <button disabled={Number(pageNo) === 1} onClick={(e) => handlePrePage(e)} className={`w-full px-8 h-10 ${Number(pageNo) === 1 ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"} dark:bg-[#222222] dark:text-gray-500 justify-center items-center`}><div className='text-center justify-center'><IonIcon className='' icon={arrowBack}></IonIcon><span className='ml-3 mb-3'>Trang trước</span></div></button>
                            </div>
                            <div className='justify-center text-center h-full items-center w-[10%]'>
                                <button className='px-8 h-10 dark:bg-[#222222] dark:text-gray-500 bg-[#F0ECDF] justify-center items-center'>
                                    <IonIcon className="min-w-6 h-full pb-4" icon={alertCircleOutline}></IonIcon>
                                </button>
                            </div>
                            <div className='w-[45%] h-full justify-end flex'>
                                <button disabled={Number(pageNo) === page?.book?.pageCount} onClick={(e) => handleNextPage(e)} className={`ml-auto w-full px-8 h-10 dark:bg-[#222222] dark:text-gray-500 ${Number(pageNo) === page?.book?.pageCount ? "bg-gray-200 text-gray-400" : "bg-[#F0ECDF]"}`}><div className='justify-center text-center'><span className='mr-3 mb-3'>Trang sau</span> <IonIcon className='' icon={arrowForward}></IonIcon></div></button>
                            </div>
                        </div>
                    </div>
                    {/* comment */}
                    <div className='mt-4 mx-48 border dark:bg-[#222222] dark:text-gray-500 bg-[#EAE4D3] border-white h-25 rounded-md'>
                        <div className='mx-16 grid gap-10 py-10'>
                            <div className='grid'>
                                <div className='justify-between flex'>
                                    <h3 className='text-xl font-semibold'>{computedPage?.commentCount ? computedPage?.commentCount : 0} Binh luan</h3>
                                </div>
                                <div className='flex w-full my-10 border-b-2 border border-gray-50 border-x-0 border-t-0 pb-4'>
                                    <div>
                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                    </div>
                                    <div className='ml-4 w-full'>
                                        <input value={content} onKeyPress={(e) => handleKey(e)} onChange={(e) => setContent(e.target.value)} placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl dark:bg-[#222222] dark:text-gray-500 bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2' />
                                    </div>
                                </div>
                                {comments?.length > 0 && <div className='grid border-b-1 border border-gray-300 border-x-0 border-t-0'>
                                    <div className=' w-full'>
                                        {comments?.map((i, index) => (
                                            <>
                                                {!i?.parent?.id ? <div key={index} className='flex mt-5 border-b-2 border-gray-300'>
                                                    <div>
                                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                                    </div>
                                                    <div className='ml-4 w-full'>
                                                        <div key={index} className='w-full rounded-xl pb-4 pr-5'>
                                                            <div className='font-semibold'>{i?.profile?.firstName} {i?.profile?.lastName}</div>
                                                            <div className='text-sm flex text-gray-500 gap-10'>
                                                                <div >{i?.createAt ? formatTimeDifference(i?.createAt) + "" : <></>}</div>
                                                                <div>Trang {pageNo} </div>
                                                            </div>
                                                            <div className='mt-2'>{i?.content}</div>
                                                            <div className='flex justify-end gap-6 text-gray-600'>
                                                                <div onClick={() => handleLike(i?.id)} className='flex gap-2 cursor-pointer'>
                                                                    {i?.liker?.find(l => l?.id === profile?.id) ? <div className='flex items-center'>
                                                                        <img src="like.png" alt="" className='w-6 h-6 cursor-pointer' />
                                                                    </div>
                                                                        : <div className='flex items-center'>
                                                                            <FontAwesomeIcon className='text-gray-400' icon={faThumbsUp} />
                                                                        </div>}
                                                                    <div>{i?.liker ? i?.liker?.length : 0}</div>
                                                                </div>
                                                                <div onClick={() => handleShowReply(i?.id)} className='flex gap-2 cursor-pointer'>
                                                                    <div>
                                                                        <FontAwesomeIcon className='text-gray-400' icon={faReply} />
                                                                    </div>
                                                                    <div>{i?.childrenCount ? i?.childrenCount : 0} Trả lời</div>
                                                                </div>
                                                            </div>
                                                            {showReply[i?.id] && <div className='m-4'>
                                                                {i?.childrenCount > 0 && (
                                                                    <div className='grid border-b-1 border border-gray-200 border-x-0 border-t-0'>
                                                                        <div className='w-full'>
                                                                            {childrens[i?.id].map((child, key) => (
                                                                                <div key={key} className='flex mt-5 border-b-2 border-gray-50'>
                                                                                    <div>
                                                                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                                                                    </div>
                                                                                    <div className='ml-4 w-full'>
                                                                                        <div key={key} className='w-full rounded-xl pb-4 pr-5'>
                                                                                            <div className='font-semibold'>{child?.profile?.firstName} {child?.profile?.lastName}</div>
                                                                                            <div className='text-sm flex text-gray-500 gap-10'>
                                                                                                <div >{child?.createAt ? formatTimeDifference(child?.createAt) + "" : <></>}</div>
                                                                                            </div>
                                                                                            <div className='mt-2'>{child?.content}</div>
                                                                                            <div className='flex justify-end gap-6 text-gray-600'>
                                                                                                <div onClick={() => handleLike(child?.id)} className='flex gap-2 cursor-pointer'>
                                                                                                    {child?.liker?.find(l => l?.id === profile?.id) ? (
                                                                                                        <div className='flex items-center'>
                                                                                                            <img src="like.png" alt="" className='w-6 h-6 cursor-pointer' />
                                                                                                        </div>
                                                                                                    ) : (
                                                                                                        <div className='flex items-center'>
                                                                                                            <FontAwesomeIcon className='text-gray-400' icon={faThumbsUp} />
                                                                                                        </div>
                                                                                                    )}
                                                                                                    <div>{child?.liker ? child?.liker?.length : 0}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className='flex w-full my-10 border-b-2 border border-gray-50 border-x-0 border-t-0 pb-4'>
                                                                    <div>
                                                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                                                    </div>
                                                                    <div className='ml-4 w-full'>
                                                                        <input onKeyPress={(e) => handleKey(e, i?.id)} placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div> : <></>}</>))}
                                    </div >
                                </div>}
                            </div>
                        </div>
                    </div>
                    {show === "setting" && <Setting setting={setting} setSetting={setSetting} handleClose={handleClose} handleVoice={handleVoice} setShowAudio={setShowAudio} showAudio={showAudio} audio={audio} />}
                    {show === "listpage" && <ListPage pages={pages} setPages={setPages} handleClose={handleClose} />}
                    {/* side bar */}
                    <div className='fixed ml-4 top-4 mt-24 right-[6.5rem] rounded-xl'>
                        <div className={`rounded-xl w-20`}>
                            <div
                                onMouseEnter={() => setIsHover("pages")}
                                onMouseLeave={handleMouseLeave}
                                className={`flex dark:bg-[#222222] dark:text-gray-500 relative dark:border-0 border-white border ${show === "listpage" ? 'bg-white ' : 'bg-[#EAE4D3] '} border-solid border-b-1 justify-center text-center h-14 items-center cursor-pointer`}
                                onClick={() => handleShow("listpage")}
                            >
                                <IonIcon className='w-7 h-7' icon={menuSharp} />
                                {isHover === "pages" && (
                                    <div
                                        className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-tblack py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                        role="tooltip" >
                                        <span
                                            className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-tblack border-t border-r border-gray-300"></span>
                                        Danh sách trang
                                    </div>
                                )}
                            </div>
                            <div
                                onMouseEnter={() => setIsHover("setting")}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleShow("setting")}
                                className={`border dark:bg-[#222222] dark:text-gray-500 relative dark:border-0 border-white ${show === "setting" ? 'bg-white ' : 'bg-[#EAE4D3] '} border-solid  border-b-1 flex items-center justify-center text-center h-14 cursor-pointer`}>
                                <IonIcon className='w-6 h-6' icon={settingsOutline} />
                                {isHover === "setting" && (
                                    <div
                                        className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-tblack py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                        role="tooltip"  >
                                        <span
                                            className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-tblack border-t border-r border-gray-300"></span>
                                        Cài đặt
                                    </div>
                                )}
                            </div>
                            <div
                                onMouseEnter={() => setIsHover("back")}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleBack()}
                                className='border dark:bg-[#222222] dark:text-gray-500 relative dark:border-0 border-white border-solid bg-[#EAE4D3] border-b-1 justify-center items-center text-center h-14 flex cursor-pointer'>
                                <IonIcon className='w-6 h-6' icon={arrowBack} />
                                {isHover === "back" && (
                                    <div
                                        className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-tblack py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                        role="tooltip"  >
                                        <span
                                            className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-tblack border-t border-r border-gray-300"></span>
                                        Trở về trang thông tin sách
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/*side bar emotion */}
                    <div className='fixed  bottom-10 right-[6.5rem] rounded-xl flex-row justify-center items-center gap-5 '>
                        {show === "emotion" && <div className='rounded-3xl dark:bg-[#222222] dark:text-gray-500 bg-white py-2'>
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
                            <div className='bg-[#EAE4D3] dark:bg-[#222222] dark:text-gray-500 w-20 rounded-xl'>
                                <div
                                    onMouseEnter={() => setIsHover("emotion")}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleShow("emotion")}
                                    className='border relative border-gray-300 dark:border-0 border-solid  border-b-1 justify-center text-center h-14 items-center flex cursor-pointer'>
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
                                            className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-tblack py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                            role="tooltip"  >
                                            <span
                                                className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-tblack border-t border-r border-gray-300"></span>
                                            Cảm xúc
                                        </div>
                                    )}
                                </div>
                                <div
                                    onMouseEnter={() => setIsHover("save")}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleFollow(follow ? 'followCancel' : 'follow')}
                                    className='border dark:border-0 border-white border-solid  border-b-1 justify-center text-center h-14 items-center flex cursor-pointer'>
                                    {follow ? <FontAwesomeIcon className='w-7 h-7' icon={faCheck} /> : <IonIcon className='w-7 h-7' icon={bookmarkOutline} />}
                                    {isHover === "save" && (
                                        <div
                                            className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-tblack py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                            role="tooltip"  >
                                            <span
                                                className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-tblack border-t border-r border-gray-300"></span>
                                            Lưu trữ
                                        </div>
                                    )}
                                </div>
                                <div
                                    onMouseEnter={() => setIsHover("comment")}
                                    onMouseLeave={handleMouseLeave}
                                    className='border relative dark:border-0 border-white border-solid  border-b-1 justify-center text-center h-14 items-center flex cursor-pointer'>
                                    <IonIcon className='w-7 h-7' icon={chatbubblesOutline} />
                                    {isHover === "comment" && (
                                        <div
                                            className="absolute right-full top-1/2 z-20 mr-3 -translate-y-1/2  whitespace-nowrap rounded-md bg-tblack py-3 border border-gray-300 px-4 text-xs text-white font-medium transition-opacity duration-300 shadow-[12px_0px_30px_-4px_rgba(16,24,40,0.08)]"
                                            role="tooltip"  >
                                            <span
                                                className="absolute -right-1.5 top-1/2 -z-10 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-tblack border-t border-r border-gray-300"></span>
                                            Xem bình luận
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                {show === "review" && <Review id={page?.book?.id} rate={rate} setRate={setRate} pageId={page?.id} handleClose={handleClose} />}</>
        </div >
    );
};

export default ReadBook;