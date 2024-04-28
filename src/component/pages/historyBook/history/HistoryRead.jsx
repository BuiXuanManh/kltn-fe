import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import IconGlobal from '../../../../icon/IconGlobal';
import { AppContext } from '../../../../context/AppContext';
import { Link } from 'react-router-dom';

const HistoryRead = () => {
    let icon = new IconGlobal();
    const { token, interactions } = useContext(AppContext);
    // console.log(profile)
    return (
        <div className='p-10'>
            {interactions?.map((item, index) => <>
                <Link key={index} to={`/details/read/${item?.book?.id}/${item?.readCount}`}>
                    <div key={index} className='flex gap-5 py-3 hover:bg-gray-100 w-full cursor-pointer'>
                        <div className='flex justify-between w-full'>
                            <div className='flex gap-5'>
                                <img src={item?.book?.image} className='min-w-24 w-24 h-32' alt="" />
                                <div className='ml-2'>
                                    <div className='font-semibold text-lg'>{item?.book?.title}</div>
                                    <div className='flex items-center mt-2'>
                                        <img src={icon?.icon?.author} className='w-5 h-5 mt-1' alt="" />
                                        <div className='ml-2 flex'>
                                            {item?.book.authors?.map((i, index) => <span key={index}>{i?.name}
                                                {(index !== item?.book?.authors?.length - 1) ? <span className='mr-2'>, </span>
                                                    : <span> </span>}
                                            </span>)}
                                        </div>
                                    </div>
                                    <div className="mt-1 flex text-gray-500 text-sm">
                                        <div>Đã đọc:</div>
                                        <div className="ml-2">{item?.readCount}</div>
                                        <div>/ {item?.book?.pageCount}</div>
                                    </div>
                                    <div className='mt-1'>Ngày cập nhập: {item.uploadDate}</div>
                                    <div className='mt-1 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Đọc tiếp</div>
                                </div>

                            </div>
                            <div className='flex items-center mr-5 hover:text-red-500'>
                                <FontAwesomeIcon className='' icon={faTrash} />
                            </div>
                        </div>

                    </div>
                </Link>
            </>
            )}
        </div>

    );
};

export default HistoryRead;