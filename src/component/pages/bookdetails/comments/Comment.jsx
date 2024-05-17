import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faThumbsUp, faFlag, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { IonIcon } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';
import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import CommentService from '../../../service/CommentService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import useAddComputedCommentBook from '../../../../hook/useAddComputedCommentBook';
import { AppContext } from '../../../../context/AppContext';
import formatTimeDifference from '../../../service/DateService';
import { toast } from 'react-toastify';
const Comment = ({ pageNumber, id }) => {
    const { token, computedBook, setComputedBook, profile } = useContext(AppContext);
    const [comments, setComments] = useState([]);
    let commentService = new CommentService();
    const { mutate: addCom } = useAddComputedCommentBook();
    const handleAddComComment = (id) => {
        addCom(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const getComment = useQuery({
        queryKey: ["comments", id],
        queryFn: () => commentService.getCommentByBookId(id, "comment").then((res) => {
            if (res?.data) {
                setComments(res.data);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        })
    });
    const [content, setContent] = useState("");
    const [childrens, setChildrens] = useState({});
    const addComment = useMutation({
        mutationFn: (content) => {
            if (content !== "") {
                commentService.addCommentByBookId(token, id, content?.content, content?.uid).then((res) => {
                    if (res?.data) {
                        setContent("");
                        handleAddComComment(id);
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
                })
            } else {
                toast.error("Nhập nội dung bình luận");
            }
        }
    });
    const handleComment = () => {
        if (!token) {
            message.error("Vui lòng đăng nhập để bình luận", 2);
        } else if (pageNumber <= 0 || !pageNumber) {
            message.error("Vui lòng đọc truyện trước khi bình luận", 2);
        }
        else if (content.trim() === "")
            message.error("Vui lòng nhập nội dung bình luận", 2);
        else {
            addComment.mutate();
            // handleAddComComment(id);
        }
    }
    const handleKey = (e, uid) => {
        if (uid !== undefined && uid !== "" && uid !== null && uid !== "") {
            if (e.key === "Enter") {
                addComment.mutate({ content: e.target.value, uid: uid });
                handleAddComComment(id);
            }
        }
        else if (e.key === "Enter") {
            addComment.mutate({ content: e.target.value });
            handleAddComComment(id);
        }

    }
    const postHandleLike = useMutation({
        mutationFn: (id) => {
            if (token !== undefined && token !== "" && token !== null) {
                commentService.handleLike(token, id).then((res) => {
                    if (res.data) {
                        const updatedComment = res.data;
                        const updatedComments = comments.map(comment =>
                            comment.id === updatedComment.id ? updatedComment : comment
                        );
                        const updatedChildren = childrens[updatedComment.id]?.map(child =>
                            child.id === updatedComment.id ? updatedComment : child
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
    }, [comments, showReply, childrens])
    return (
        <div className='mx-16 grid gap-10 py-10'>
            <div className='grid'>
                <div className='justify-between flex'>
                    <h3 className='text-xl font-semibold'>{computedBook?.commentCount} Binh luan</h3>
                </div>
                <div className='flex w-full my-10 border-b-1 border border-gray-200 border-x-0 border-t-0 pb-4'>
                    <div>
                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                    </div>
                    <div className='relative ml-4 w-full'>
                        <input value={content} onKeyPress={(e) => handleKey(e)} onChange={(e) => setContent(e.target.value)} name="comment" placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2' />
                        <button onClick={() => handleComment()} type="submit" className="absolute right-4 top-3 focus:outline-none">
                            <IonIcon icon={sendSharp} className="p-2 text-center ml-1 rounded-full text-gray-600 h-7 w-7 cursor-pointer hover:bg-blue-600 hover:text-white" />
                        </button>
                    </div>
                </div>
                {comments?.length > 0 && <div className='grid border-b-1 border border-gray-200 border-x-0 border-t-0'>
                    <div className=' w-full'>
                        {comments?.map((i, index) => (
                            <>
                                {!i?.parent?.id ? <div key={index} className='flex mt-5 border-b-2 border-gray-50'>
                                    <div>
                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                    </div>
                                    <div className='ml-4 w-full'>
                                        <div key={index} className='w-full rounded-xl pb-4 pr-5'>
                                            <div className='font-semibold'>{i?.profile?.firstName} {i?.profile?.lastName}</div>
                                            <div className='text-sm flex text-gray-500 gap-10'>
                                                <div >{i?.createAt ? formatTimeDifference(i?.createAt) + "" : <></>}</div>
                                                {i?.pageBook?.pageNo > 0 && <div>Trang {i?.pageBook?.pageNo} </div>}
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
                                                                                <div >{i?.createAt ? formatTimeDifference(i?.createAt) + "" : <></>}</div>
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
    );
};

export default Comment;