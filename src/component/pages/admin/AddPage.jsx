import { IonIcon } from '@ionic/react';
import { addOutline, arrowBackOutline, closeOutline } from 'ionicons/icons';
import React, { useState } from 'react';

const AddPage = () => {
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([
        { pageNo: 1, content: '' },
    ]);
    const [pageContents, setPageContents] = useState(pages.map(page => page.content));
    const addPage = () => {
        const newPageNo = pages.length > 0 ? Math.max(...pages.map(p => p.pageNo)) + 1 : 1;
        setPages([...pages, { pageNo: newPageNo, content: '' }]);
    };
    const deletePage = (pageNo) => {
        const newPages = pages.filter((page) => page.pageNo !== pageNo);
        const updatedPages = newPages.map((page, index) => ({ ...page, pageNo: index + 1 }));
        setPages(updatedPages);
    };
    const handleContentChange = (pageNo, newContent) => {
        setPageContents(currentValues => currentValues.map((content, index) =>
            index === pageNo - 1 ? newContent : content
        ));
    };
    console.log(pages);
    return (
        <div>
            <div className=' pt-5s mt-5 rounded-lg justify-between items-center flex w-full dark:!bg-navy-800 dark:text-white'>
                <div className='h-14 flex items-center '>
                    <h2 className='text-2xl ml-4 pb-2 font-semibold border-b-4  !border-brand-600 dark:!border-brand-400'>
                        Danh sách trang</h2>
                </div>
                <div className='flex p-2 cursor-pointer hover:bg-brand-500 bg-brand-300 mr-4 px-10 rounded-full h-10 items-center justify-center'>
                    <button >
                        Tạo
                    </button>
                </div>
            </div>
            <div className='pb-10 mb-4 pt-5s mt-5 rounded-lg dark:!bg-navy-800 dark:text-white'>
                <div className='flex h-10 items-center gap-4 ml-4'>
                    {pages.map((page) => (
                        <React.Fragment key={page.pageNo}>
                            <div onClick={() => setActive(page.pageNo)} className={`${active === page.pageNo ? "bg-blue-300" : ""} mt-4 rounded-md h-10 hover:bg-gray-500 p-3 flex items-center`}>
                                <div>Trang {page.pageNo}</div>
                                <IonIcon
                                    className='hover:rounded-full hover:bg-gray-700 ml-2 w-5 h-5 cursor-pointer'
                                    icon={closeOutline}
                                    onClick={() => deletePage(page.pageNo)}
                                />
                            </div>
                            <div className="h-9 w-1 mt-4 rounded-lg bg-brand-500 dark:bg-brand-400" />
                        </React.Fragment>
                    ))}
                    {/* <div className="h-9 w-1 mt-4 rounded-lg bg-brand-500 dark:bg-brand-400" /> */}
                    <div onClick={() => addPage()} className={`mt-4 hover:rounded-full h-10 hover:bg-gray-400 p-3 flex items-center`}>
                        <IonIcon icon={addOutline} />
                    </div>
                </div>

                <div className='mt-3 w-full h-[50rem]'>
                    {pages.map((page) => (
                        <div key={page.pageNo} className={active === page.pageNo ? 'm-4' : 'hidden'}>
                            <textarea
                                className='w-full h-[50rem] p-2 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                value={pageContents[page.pageNo - 1]}
                                onChange={(e) => handleContentChange(page.pageNo, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className=' pt-5s mt-5 py-2 mb-10 rounded-lg justify-between items-center flex w-full dark:!bg-navy-800 dark:text-white'>
                <div className='flex p-2 cursor-pointer hover:bg-brand-500 bg-brand-400 ml-4 px-4 rounded-lg h-10 items-center justify-center'>
                    <button className='flex items-center'>
                        <IonIcon icon={arrowBackOutline} /> <p className='ml-2'>Quay lại</p>
                    </button>
                </div>
                <div className='flex p-2 cursor-pointer hover:bg-brand-500 bg-brand-300 mr-4 px-10 rounded-full h-10 items-center justify-center'>
                    <button >
                        Tạo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPage;