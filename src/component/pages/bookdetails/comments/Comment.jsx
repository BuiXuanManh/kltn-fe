import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faThumbsUp, faFlag, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { IonIcon } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import CommentService from '../../../service/CommentService';
import { useQuery } from '@tanstack/react-query';
const Comment = () => {
    const [comments, setComments] = useState([]);
    let commentService = new CommentService();
    // const getComment = useQuery({
    //     queryKey: ["comments", page?.id],
    //     queryFn: () => commentService.getCommentByPageId(page?.id).then((res) => {
    //         if (res?.data) {
    //             console.log(res.data);
    //             setComments(res.data);
    //             return res.data;
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     }).enabled = page?.id !== undefined && !isPage && comments.length === 0
    // })
    // console.log(comments);
    return (
        <div className='mx-16 grid gap-10 py-10'>
            <div className='grid'>
                <div className='justify-between flex'>
                    <h3 className='text-xl font-semibold'>111 Binh luan</h3>
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
                        <textarea name="comment" placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2'></textarea>
                        <button type="submit" className="absolute right-4 top-3 focus:outline-none">
                            <IonIcon icon={sendSharp} className="p-2 text-center ml-1 rounded-full text-gray-600 h-7 w-7 cursor-pointer hover:bg-blue-600 hover:text-white" />
                        </button>
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
                                        <div>Trang {i?.pageBook?.pageNo} </div>
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
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Comment;