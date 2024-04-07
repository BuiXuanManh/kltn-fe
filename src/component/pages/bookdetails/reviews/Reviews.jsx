import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonIcon } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';
import { useState } from 'react';
import { faReply, faThumbsUp, faFlag, faStar, faStarHalfAlt, faGlasses } from '@fortawesome/free-solid-svg-icons';
import { faClock, faStar as star } from '@fortawesome/free-regular-svg-icons';

const Reviews = () => {
    const [usefulness, setUsefulness] = useState(0); // Giá trị tiện ích
    const [content, setContent] = useState(0); // Giá trị nội dung sách
    const [understandability, setUnderstandability] = useState(0);

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
                        <div className='mt-4'>
                            <div className='w-full relative '>
                                <textarea name="review" placeholder='Nhập đánh giá của bạn ...' className='w-full h-16 rounded-xl bg-white focus:outline-none focus:ring focus:ring-indigo-500 px-4 py-2'></textarea>
                                <button type="submit" className="absolute right-4 top-3 focus:outline-none">
                                    <IonIcon icon={sendSharp} className="p-2 text-center ml-1 rounded-full text-gray-600 h-7 w-7 cursor-pointer hover:bg-blue-600 hover:text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 w-full flex justify-end border-x-0 border-t-0 border p-2'>
                        <select className='h-9 px-2 border border-solid'>
                            <option value="Newest">Mới nhất</option>
                            <option value="Like">Lượt thích</option>
                            <option value="Oldest">Cũ nhất</option>
                        </select>
                    </div>

                </div>
                <div className='grid grid-cols-1 rounded-md bg-gray-200 ml-3 px-3 py-1 mt-5'>
                    <div>
                        <div className='flex justify-between text-xl font-semibold mt-5'>
                            <div>Đã có 24 đánh gíá</div>
                            <div className='text-yellow-500 text-lg'>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStarHalfAlt} />
                                <FontAwesomeIcon icon={star} />
                                <FontAwesomeIcon icon={star} />
                                <span className='text-black ml-2 text-xl'>3.2</span>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Tính hữu ích</div>
                                <div className='text-yellow-500 text-lg'>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfAlt} />
                                    <FontAwesomeIcon icon={star} />
                                    <FontAwesomeIcon icon={star} />
                                    <span className='text-black ml-2 text-xl'>3.2</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Nội dung sách</div>
                                <div className='text-yellow-500 text-lg'>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfAlt} />
                                    <FontAwesomeIcon icon={star} />
                                    <FontAwesomeIcon icon={star} />
                                    <span className='text-black ml-2 text-xl'>3.2</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <div className='flex justify-between'>
                                <div>Độ dễ hiểu</div>
                                <div className='text-yellow-500 text-lg'>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfAlt} />
                                    <FontAwesomeIcon icon={star} />
                                    <FontAwesomeIcon icon={star} />
                                    <span className='text-black ml-2 text-xl'>3.2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full border-b-1 border border-gray-200 border-x-0 border-t-0 mt-5'>
                <div className='flex gap-4 w-full'>
                    <div className='w-20'>
                        <img src="avatar.jpg" alt="" className='w-20 h-16 rounded-full' />
                    </div>
                    <div className='w-full'>
                        <div className='rounded-xl pb-4 pr-5 w-full'>
                            <div className='font-semibold'>Nguyen Van A</div>
                            <div className='text-sm flex text-gray-500 gap-10 mt-2'>
                                <div className='text-yellow-500'>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStarHalfAlt} />
                                    <FontAwesomeIcon icon={star} />
                                    <FontAwesomeIcon icon={star} />
                                    <span className='text-black ml-2'>3.2</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faGlasses} />
                                    <span className='ml-2'>Đã đọc: 1 Trang</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span className='ml-2'>14 gio truoc</span>
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
    );
};

export default Reviews;