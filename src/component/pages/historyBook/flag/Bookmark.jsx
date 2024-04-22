import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Bookmark = ({ data }) => {
    return (
        <div className='p-10'>
            {data?.map((i, index) =>
                <div key={index} className='flex gap-5 py-3 hover:bg-gray-100 cursor-pointer'>
                    <div className='flex justify-between w-full'>
                        <div className='flex'>
                            <img src={i?.image} alt="" />
                            <div className='ml-2'>
                                <div className=''>{i.title}</div>
                                <div className='flex'>
                                    <FontAwesomeIcon icon={faFilePen} className='text-gray-600' />
                                    <div className='ml-2'>
                                        {i.author}
                                    </div>
                                </div>
                                <div>Số trang: {i.pageNumber}</div>
                                <div>Ngày cập nhập: {i.updateAt}</div>
                            </div>
                        </div>
                        <div className='flex items-center mr-5 hover:text-red-500'>
                            <FontAwesomeIcon className='' icon={faTrash} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookmark;