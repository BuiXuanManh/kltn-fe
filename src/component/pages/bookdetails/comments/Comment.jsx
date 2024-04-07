import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faThumbsUp, faFlag, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { IonIcon } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';
const Comment = () => {
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
                    <div className='w-20'>
                        <img src="avatar.jpg" alt="" className='w-20 h-16 rounded-full' />
                    </div>
                    <div className='relative ml-4 w-full'>
                        <textarea name="comment" placeholder='Nhập bình luận của bạn ...' className='w-full h-16 rounded-xl bg-gray-200 focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2'></textarea>
                        <button type="submit" className="absolute right-4 top-3 focus:outline-none">
                                    <IonIcon icon={sendSharp} className="p-2 text-center ml-1 rounded-full text-gray-600 h-7 w-7 cursor-pointer hover:bg-blue-600 hover:text-white" />
                                </button>
                    </div>
                </div>
                <div className='grid w-full border-b-1 border border-gray-200 border-x-0 border-t-0'>
                    <div className='flex gap-4 w-full'>
                        <div className='w-20'>
                            <img src="avatar.jpg" alt="" className='w-20 h-16 rounded-full' />
                        </div>
                        <div className='w-full'>
                            <div className='rounded-xl pb-4 pr-5 w-full'>
                                <div className='font-semibold'>Nguyen Van A</div>
                                <div className='text-sm flex text-gray-500 gap-10'>
                                    <div>
                                        <FontAwesomeIcon icon={faClock} />
                                        <span className='ml-2'>14 gio truoc</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faGlasses} />
                                        <span className='ml-2'>Trang 1</span>
                                    </div>
                                </div>
                                <div className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, dolorum.</div>
                                <div className='w-full flex mt-10 justify-end items-end gap-6 text-gray-600'>
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
                                        <div>Tra loi</div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div>
                                            <FontAwesomeIcon className='text-gray-400' icon={faFlag} />
                                        </div>
                                        <div>Bao xau</div>
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

export default Comment;