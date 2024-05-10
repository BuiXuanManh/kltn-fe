import { IonIcon } from '@ionic/react';
import { message } from 'antd';
import { addOutline, arrowBackOutline, closeOutline } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import RunChat from '../../../../google';
import BookService from '../../service/BookService';
import PageService from '../../service/PageService';
import { AppContext } from '../../../context/AppContext';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AddPage = ({ book, author, setShowPage, handleReset }) => {
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([
        { pageNo: 1, name: '', content: '' },
    ]);
    let bookService = new BookService();
    let pageService = new PageService();
    const getPages = (bookId) => {
        pageService.getPagesByBookId(bookId).then((res) => {
            if (res.data) {
                setPages(res.data);
            }
        }).catch((error) => {
            console.error(error);
        })
    }
    useEffect(() => {
        if (book?.id)
            getPages(book.id);
    }, [book])
    const [pageNames, setPageNames] = useState(pages.map(page => page.name));
    const [pageContents, setPageContents] = useState(pages.map(page => page.content));
    const { token } = useContext(AppContext);
    const addPage = () => {
        const newPageNo = pages.length > 0 ? Math.max(...pages.map(p => p.pageNo)) + 1 : 1;
        setPages([...pages, { pageNo: newPageNo, content: '' }]);
        setActive(newPageNo)
    };
    const deletePage = (pageNo) => {
        if (pages.length === 1) {
            toast.error("phải có ít nhất 1 trang")
            return
        }
        const newPages = pages.filter((page) => page.pageNo !== pageNo);
        const updatedPages = newPages.map((page, index) => ({ ...page, pageNo: index + 1 }));
        setPages(updatedPages);
    };
    const handleContentChange = (pageNo, newContent) => {
        setPages(currentPages => currentPages.map(page =>
            page.pageNo === pageNo
                ? { ...page, content: newContent }
                : page
        ));
    };
    const handleBack = () => [
        setShowPage(false)
    ]
    useEffect(() => {
        setPageNames(pages.map(page => page.name));
        setPageContents(pages.map(page => page.content));
    }, [pages])
    const handleNameChange = (pageNo, newName) => {
        setPages(currentPages => currentPages.map(page =>
            page.pageNo === pageNo
                ? { ...page, name: newName }
                : page
        ));
    };
    const [loading, setLoading] = useState(false)
    const encoder = new TextEncoder();
    const handleShowByte = (content) => {
        return encoder.encode(content).length;
    }

    const addPages = (bookId) => pageService.savePages(token, pages, bookId).then((res) => {
        if (res.data) {
            console.log(res.data);
            toast.success("Thêm sách thành công");
            handlePageReset();
            return res.data;
        }
    }).catch((error) => {
        console.error(error);
    })

    const addBook = useMutation({
        mutationFn: () => bookService.saveBook(token, book, author).then((res) => {
            if (res.data) {
                console.log(res.data);
                addPages(res.data.id);
            }
        }).catch((error) => {
            console.error(error);
        })
    })
    const handlePageReset = () => {
        handleReset();
        setPages([
            { pageNo: 1, name: '', content: '' },
        ]);
    }
    async function handleSave() {
        console.log("luu");
        for (const page of pages) {
            if (handleShowByte(page.content) > 5000) {
                toast.error("Trang " + page.pageNo + " vượt quá 5000 bytes", 2);
                return Promise.reject(); // Từ chối Promise nếu gặp lỗi
            }
        }
        const saveFunction = async () => {
            console.log("save");
            addBook.mutate();
        };
        await saveFunction();
    }
    const handleGenerate = async () => {
        if (book?.title !== "" && book?.title) {
            setLoading(true);
            const regex = /#|\*/;
            const promises = []; // Khai báo một list (mảng) rỗng
            for (const page of pages) {
                const result1 = await RunChat("viết trang " + page.pageNo + " của cuôn sách " + book?.title);
                const updatePageContent = { ...page, content: result1.replace(regex, "") };
                promises.push(updatePageContent);
            }
            await Promise.all(promises);
            setPages(promises);
            setLoading(false);
        } else message.error("Không có tiêu đề sách", 2)
    }
    return (
        <div>
            <div className=' pt-5s mt-5 pt-5 rounded-lg w-full dark:!bg-navy-800 dark:text-white'>
                <div className='justify-between items-center flex'>
                    <div className='h-14 flex items-center '>
                        <h2 className='text-2xl ml-4 pb-2 font-semibold border-b-4  !border-brand-600 dark:!border-brand-400'>
                            Danh sách trang</h2>
                    </div>
                    <div className='flex p-2  items-center justify-center'>
                        {loading && <div role="status" className='mr-2'>
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>}
                        <button className={`${!loading ? "hover:bg-brand-500" : ""}  bg-brand-300 mr-4 px-10 rounded-full h-10`} disabled={loading} onClick={() => handleGenerate()}>
                            Tạo
                        </button>
                    </div>
                </div>


                <div className='pb-10 mb-4 pt-5s mt-5 rounded-lg dark:!bg-navy-800 dark:text-white'>
                    <div className='flex h-10 items-center gap-4 ml-4'>
                        {pages.map((page) => (
                            <React.Fragment key={page.pageNo}>
                                <div className={`${active === page.pageNo ? "bg-blue-300" : ""} mt-4 rounded-md h-10 hover:bg-gray-500 p-3 flex items-center`}>
                                    <div onClick={() => setActive(page.pageNo)}>Trang {page.pageNo}</div>
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
                    <div className='mt-10 w-full h-10'>
                        {pages.map((page) => (
                            <div key={page.pageNo} className={active === page.pageNo ? 'm-4' : 'hidden'}>
                                <input placeholder='Tên trang (không bắt buộc)'
                                    className='w-full h-10 p-2 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                    value={pageNames[page.pageNo - 1]}
                                    onChange={(e) => handleNameChange(page.pageNo, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='mt-3 w-full h-[50rem]'>
                        {pages.map((page) => (
                            <div key={page.pageNo} className={active === page.pageNo ? 'm-4' : 'hidden'}>
                                <textarea
                                    placeholder='Nội dung'
                                    className='w-full h-[50rem] p-2 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                    value={pageContents[page.pageNo - 1]}
                                    onChange={(e) => handleContentChange(page.pageNo, e.target.value)}
                                />
                                <p className='mt-1 mr-2 justify-end flex'>{handleShowByte(pageContents[page.pageNo - 1])} /5000</p>
                            </div>
                        ))}
                    </div>

                    <div className=' pt-5s mt-10 py-2 mb-10 rounded-lg justify-between items-center flex w-full dark:!bg-navy-800 dark:text-white'>
                        <div className='flex p-2 cursor-pointer hover:bg-brand-500 bg-brand-400 ml-4 px-4 rounded-lg h-10 items-center justify-center'>
                            <button onClick={() => handleBack()} className='flex items-center'>
                                <IonIcon icon={arrowBackOutline} /> <p className='ml-2'>Quay lại</p>
                            </button>
                        </div>
                        <div className='flex p-2 cursor-pointer hover:bg-brand-500 bg-green-500 mr-4 px-10 rounded-full h-10 items-center justify-center'>
                            <button onClick={() => handleSave()}>
                                Lưu sách
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AddPage;