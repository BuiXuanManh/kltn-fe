import React, { useState } from 'react';
import Select from "react-select"
import AddPage from './AddPage';
import RunChat from '../../../../google';
import { message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import GenreService from '../../service/GenreService';
const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectGenres, setSelectGenres] = useState([]);
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "",
            // border: "none",
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
    let genresService = new GenreService();
    const geres = useQuery({
        queryKey: "genres",
        queryFn: () => genresService.getGenres().then((res) => {
            if (res?.data) {
                console.log(res.data);
                setGenres(res.data);
                return res.data;
            }
        }), enabled: genres.length === 0
    })
    function mapGenresToOptions(genresData) {
        return genresData.map(genre => ({
            value: genre.id, // Giả sử 'id' đại diện cho giá trị ID của thể loại
            label: genre.name // Giả sử 'name' đại diện cho tên thể loại
        }));
    }
    function mapOptionToGenre(genresData) {
        return genresData.map(genre => ({
            id: genre.value, // Giả sử 'id' đại diện cho giá trị ID của thể loại
            name: genre.label // Giả sử 'name' đại diện cho tên thể loại
        }));
    }
    const optionsGenres = mapGenresToOptions(genres);
    const [showPage, setShowPage] = useState(false);
    const [book, setBook] = useState({});//[title,author,genres,shortDescription,longDescription
    const handleShowPage = () => {
        if (title.trim() === "" || !title) return message.error("Vui lòng nhập tiêu đề sách", 2)
        if (author.trim() === "" || !author) return message.error("Vui lòng nhập tên tác giả", 2)
        if (selectGenres.length === 0) return message.error("Vui lòng chọn thể loại", 2)
        if (shortDescription.trim() === "" || !shortDescription) return message.error("Vui lòng nhập tóm tắt mô tả", 2)
        if (longDescription.trim() === "" || !longDescription) return message.error("Vui lòng nhập mô tả", 2)
        setBook({ title, author, genres: mapOptionToGenre(selectGenres), shortDescription, longDescription })
        setShowPage(!showPage);
    }
    const [loading, setLoading] = useState(false)
    const handleGenerate = async () => {
        if (title !== "" && title) {
            setLoading(true);
            const regex = /#|\*/;
            const result1 = await RunChat("tác giả của cuốn sách " + title);
            setAuthor(result1.replace(regex, ""))
            const result2 = await RunChat("viết đoạn mô tả ngắn về cuốn sách " + title);
            setShortDescription(result2.replace(regex, ""))
            const result3 = await RunChat("viết đoạn mô tả dài về cuốn sách " + title);
            setLongDescription(result3.replace(regex, ""))
            setLoading(false);
        } else message.error("Vui lòng nhập tiêu đề sách", 2)
    }
    // const handleSendAi = async (text) => {
    //     await RunChat(text);
    // }
    return (
        <div className=' md:mr-10 -ml-20'>
            {!showPage ?
                <>
                    <div className=' pt-5s mt-5 rounded-lg pt-5 w-full dark:!bg-navy-800 dark:text-white'>
                        <div className='justify-between items-center flex'>
                            <div className='h-14 flex items-center '>
                                <h2 className='text-2xl ml-4 pb-2 font-semibold border-b-4  !border-brand-600 dark:!border-brand-400'>Thông tin sách</h2>
                            </div>
                            <div className='flex p-2  items-center justify-center'>
                                {loading && <div role="status" className='mr-2'>
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>}
                                <button className='hover:bg-brand-500 bg-brand-300 mr-4 px-10 rounded-full h-10' disabled={loading} onClick={() => handleGenerate()}>
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
                            <div className='grid grid-cols-4 mt-5 items-center'>
                                <div className='col-span-1'>
                                    <div className='ml-6'>
                                        Thể loại
                                    </div>
                                </div>
                                <div className='col-span-3 flex '>
                                    <Select
                                        onChange={val => {
                                            setSelectGenres(val);
                                        }}
                                        isMulti
                                        className={`flex focus:outline-none flex-grow mr-4 px-4 items-center justify-start cursor-pointer dark:border-brand-600 dark:bg-navy-700`}
                                        theme={customTheme}
                                        styles={customStyles}
                                        options={optionsGenres}
                                        placeholder="Chọn thể loại"
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-4 mt-5 '>
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
                    </div>
                </> : <>
                    <AddPage book={book} setShowPage={setShowPage} />
                </>}

        </div>
    );
};

export default AddBook;