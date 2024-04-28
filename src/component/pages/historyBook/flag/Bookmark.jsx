import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import IconGlobal from '../../../../icon/IconGlobal';

const Bookmark = ({ data }) => {
    let icon = new IconGlobal();
    return (
        <div className='p-10'>
            {data?.pageBook?.content?.map((i, index) =>
                <div key={index} className='flex gap-5 py-3 hover:bg-gray-100 cursor-pointer'>
                    <div className='flex justify-between w-full'>
                        <div className='flex gap-5'>
                            <img src={i?.image} className='w-24 h-32' alt="" />
                            <div className='ml-2'>
                                <div className='font-semibold text-lg'>{i.title}</div>
                                <div className='flex items-center mt-2'>
                                    <img src={icon?.icon?.author} className='w-5 h-5 mt-1' alt="" />
                                    <div className='ml-2 flex'>
                                        {i?.authors?.map((item, index) => <span key={index}>{item?.name}
                                            {(index !== i?.authors?.length - 1) ? <span className='mr-2'>, </span>
                                                : <span> </span>}
                                        </span>)}
                                    </div>
                                </div>
                                <div className='mt-1'>Số trang: {i.pageCount}</div>
                                <div className='mt-1'>Ngày cập nhập: {i.uploadDate}</div>
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