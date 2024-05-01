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
const Comment = ({ pageNumber, id }) => {
    const { token, computedBook, setComputedBook } = useContext(AppContext);
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
    const [isPage, setIsPage] = useState(false);
    const getComment = useQuery({
        queryKey: ["comments", id],
        queryFn: () => commentService.getCommentByBookId(id, "comment").then((res) => {
            if (res?.data) {
                console.log(res.data);
                setComments(res.data);
                setIsPage(true);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        }).enabled = id !== undefined && id != "" && !isPage && comments.length === 0
    });
    const [content, setContent] = useState("");
    const addComment = useMutation({
        mutationKey: ["addComment", id],
        mutationFn: () => commentService.addCommentByBookId(token, id, content).then((res) => {
            if (res?.data) {
                handleAddComComment(id);
                console.log(res.data);
                setContent("");
                setComments([res.data, ...comments]);
                return res.data;
            }
        }).catch((error) => {
            console.error(error);
        })
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
    const handlePressKey = (e) => {
        if (e.key === "Enter") {
            handleComment();
        }
    }
    useEffect(() => {

    }, [content])
    return (
        <div className='mx-16 grid gap-10 py-10'>
            <div className='grid'>
                <div className='justify-between flex'>
                    <h3 className='text-xl font-semibold'>{computedBook?.commentCount} Binh luan</h3>
                    <select className='h-9 px-2 border border-solid'>
                        <option value="Newest">Mới nhất</option>
                        <option value="Like">Lượt thích</option>
                        <option value="Olded">Cũ nhất</option>
                    </select>
                </div>
                <div className='flex w-full my-10 border-b-1 border border-gray-200 border-x-0 border-t-0 pb-4'>
                    <div>
                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                    </div>
                    <div className='relative ml-4 w-full'>
                        <input value={content} onChange={e => setContent(e.target.value)} onKeyPress={(e) => handlePressKey(e)} name="comment" placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2' />
                        <button onClick={() => handleComment()} type="submit" className="absolute right-4 top-3 focus:outline-none">
                            <IonIcon icon={sendSharp} className="p-2 text-center ml-1 rounded-full text-gray-600 h-7 w-7 cursor-pointer hover:bg-blue-600 hover:text-white" />
                        </button>
                    </div>
                </div>
                {comments?.length > 0 && <div className='grid border-b-1 border border-gray-200 border-x-0 border-t-0'>
                    <div className='flex w-full'>
                        <div className=' w-full'>
                            {comments?.map((i, index) => (
                                <div key={index} className='flex mt-5 border-b-2 border-gray-50'>
                                    <div>
                                        <Avatar src="" sx={{ width: 60, height: 60 }} />
                                    </div>
                                    <div className='ml-4 w-full'>
                                        <div key={index} className='w-full rounded-xl pb-4 pr-5'>
                                            <div className='font-semibold'>{i?.profile?.firstName} {i?.profile?.lastName}</div>
                                            <div className='text-sm flex text-gray-500 gap-10'>
                                                <div >{i?.createAt ? new Date(i?.createAt).toLocaleString() + "" : <></>}</div>
                                                {i?.pageBook?.pageNo > 0 && <div>Trang {i?.pageBook?.pageNo} </div>}
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Comment;