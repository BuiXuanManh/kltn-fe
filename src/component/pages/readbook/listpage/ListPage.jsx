import { faArrowDownShortWide, faArrowDownWideShort, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ListPage = ({ handleClose, pages, setPages }) => {
    const [search, setSearch] = useState(true);
    const toggleSearch = () => {
        setPages(prevPages => prevPages.reverse());
        setSearch(!search);
    };
    useEffect(() => {

    }, [search, pages])
    return (
        <div className='fixed w-1/3 z-50 ml-4 py-4 top-0 mt-28 right-48 flex whitespace-normal break-words rounded-lg py-1.5 px-3 font-sans text-sm font-normal bg-white focus:outline-none'>
            <div className='ml-4 w-full h-full'>
                <div onClick={() => handleClose()} className='justify-end items-end flex text-gray-400 text-xl cursor-pointer'>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className='flex w-full justify-between'>
                    <h1 className='text-xl font-medium'>Danh sách trang</h1>
                    <div onClick={() => toggleSearch()} className='text-xl mr-10 cursor-pointer'>
                        {search ? <FontAwesomeIcon icon={faArrowDownShortWide} /> :
                            <FontAwesomeIcon icon={faArrowDownWideShort} />}
                    </div>
                </div>
                <div className='mt-5'>
                    {pages?.map((page, index) => {
                        return <div key={index} className='flex justify-between gap-5 py-3 text-tblack hover:bg-gray-100 cursor-pointer' >
                            <div className='flex'>
                                <h3>Trang {page?.pageNo}:</h3>
                                <p className='ml-2'>{page?.name}</p>
                            </div>
                        </div>
                    })}
                </div>

            </div>
        </div >
    );
};

export default ListPage;