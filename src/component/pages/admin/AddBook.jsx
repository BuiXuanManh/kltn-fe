import React, { useState } from 'react';
import Select from "react-select"
import AddPage from './AddPage';
const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genres, setGenres] = useState([]);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "",
            border: "none",
            width: "100%",
            position: "absolute",  // Added for positioning
            // top: 0,
            left: 0,
            right: 0,
            // bottom: 0
        }),
        menu: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
            focus: "none",
            backgroundColor: "blue",
            // border: "solid 1px red",
            position: "absolute",  // Added for positioning
            top: 14,
            left: 0,
            right: 0,
            // bottom: 0
        }),
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: "#0d9488",
            borderRadius: 10,
            padding: 2,
        }),
    }
    const customTheme = (theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
            text: 'red',
            primary25: 'gray',
            primary: 'blue',
        },
    })
    const optionsGenres = [
        { value: "newUpdate", label: "Mới cập nhật" },
        { value: "newCreate", label: "Mới đăng" },
    ]
    const [showPage, setShowPage] = useState(false);
    const handleShowPage = () => {
        setShowPage(!showPage);
    }
    return (
        <div className=' md:mr-10 -ml-20'>
            {!showPage ?
                <>
                    <div className=' pt-5s mt-5 rounded-lg justify-between items-center flex w-full dark:!bg-navy-800 dark:text-white'>
                        <div className='h-14 flex items-center '>
                            <h2 className='text-2xl ml-4 pb-2 font-semibold border-b-4  !border-brand-600 dark:!border-brand-400'>Thông tin sách</h2>
                        </div>
                        <div className='flex p-2 cursor-pointer hover:bg-brand-500 bg-brand-300 mr-4 px-10 rounded-full h-10 items-center justify-center'>
                            <button >
                                Tạo
                            </button>
                        </div>
                    </div>
                    <div className=' pb-1 mb-4 pt-5s mt-5 rounded-lg dark:!bg-navy-800 dark:text-white'>
                        <div className='grid grid-cols-4 mt-4 items-center'>
                            <div className='col-span-1'>
                                <div className='ml-6'>
                                    Tiêu đề
                                </div>
                            </div>
                            <div className='col-span-3 flex mt-4'>
                                <input className='w-full mr-4 h-14 px-4 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder='Nhập tiêu đề sách'
                                    type="text" />
                            </div>
                        </div>
                        <div className='grid grid-cols-4 mt-4 items-center'>
                            <div className='col-span-1'>
                                <div className='ml-6'>
                                    Tên tác giả
                                </div>
                            </div>
                            <div className='col-span-3 flex '>
                                <input className='w-full mr-4 h-14 px-4 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                    value={author} onChange={(e) => setAuthor(e.target.value)}
                                    placeholder='Nhập tên tác giả'
                                    type="text" />
                            </div>
                        </div>
                        <div className='grid grid-cols-4 mt-4 items-center'>
                            <div className='col-span-1'>
                                <div className='ml-6'>
                                    Thể loại
                                </div>
                            </div>
                            <div className='col-span-3 flex '>
                                <Select
                                    onChange={val => {
                                        setGenres(val);
                                    }}
                                    isMulti
                                    className={`flex focus:outline-none flex-grow mr-4 px-4 items-center justify-start cursor-pointer dark:border-brand-600 dark:bg-navy-700`}
                                    theme={customTheme}
                                    styles={customStyles}
                                    options={optionsGenres}
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-4 mt-4 '>
                            <div className='col-span-1'>
                                <div className='ml-6'>
                                    Tóm tắt mô tả
                                </div>
                            </div>
                            <div className='col-span-3 flex '>
                                <textarea className='w-full mr-4 h-40 p-4 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                    value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
                                    placeholder='Nhập tóm tắt phần mô tả'
                                    type="text" />
                            </div>
                        </div>
                        <div className='grid grid-cols-4 mt-4 '>
                            <div className='col-span-1'>
                                <div className='ml-6'>
                                    Mô tả
                                </div>
                            </div>
                            <div className='col-span-3 flex '>
                                <textarea className='w-full mr-4 h-40 p-4 border-2 rounded-lg dark:border-brand-600 dark:bg-navy-700'
                                    value={longDescription} onChange={(e) => setLongDescription(e.target.value)}
                                    placeholder='Nhập mô tả'
                                    type="text" />
                            </div>
                        </div>
                        <div className='justify-end flex w-full h-10 my-5 '>
                            <button onClick={() => handleShowPage()} className='bg-yellow-600 text-white rounded-lg mr-5 px-4'>
                                Tiếp theo
                            </button>
                        </div>
                    </div>
                </> : <>
                    <AddPage />
                </>}

        </div>
    );
};

export default AddBook;