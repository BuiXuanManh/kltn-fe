import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { comment } from 'postcss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faFilePen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query';
import BookService from '../../service/BookService';

const SearchDetail = ({ data }) => {
    const { keyword } = useParams();
    const [genres, setGenres] = useState(["lịch sử", "quân sự", "bài học cuộc sống", "tiểu thuyết", "giáo trình"]);
    const [filter, setFilter] = useState({
        neww: "newUpdate",
        read: "",
        nomination: "",
        save: false,
        love: false,
        rate: "",
        comment: false
    });
    const [pagee, setPage] = useState(1);
    const [searchData, setSearchData] = useState(data);
    const handlePage = (page) => {
        mutation.mutate(page);
    }
    let service = new BookService();
    const mutation = useMutation({
        mutationKey: ["page", pagee],
        mutationFn: (page) => {
            setPage(page);
            return service.getBooks(page, 2).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setSearchData(res.data);
                    return res.data;
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    })
    const handleChangePage = (page) => {
        setPage(page);
    }
    const handleChange = (e, field) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            [field]: e.target.value,
            read: field === "read" ? e.target.value : "",
            neww: field === "neww" ? e.target.value : "",
            nomination: field === "nomination" ? e.target.value : "",
            save: field === "save" ? true : false,
            love: field === "love" ? true : false,
            rate: field === "rate" ? e.target.value : "",
            comment: field === "comment" ? true : false
        }));
    };
    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleSelected = (genre) => {
        setSelectedGenres(prevSelectedGenres => [...prevSelectedGenres, genre]);
        setGenres(prevGenres => prevGenres.filter(item => item !== genre));
    }
    const handleRemove = (genre) => {
        setGenres(prevGenres => [...prevGenres, genre]);
        setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(item => item !== genre));
    }

    // const handleFind = () => {

    // }
    // useEffect(() => {},[pagee])
    return (
        <div className='mx-48 border mt-10 bg-gray-50 rounded-xl items-center justify-center text-center'>
            <div className='grid grid-cols-11 w-full'>
                <div className='col-span-3 justify-start items-start text-left'>
                    <div className='p-4 w-full'>
                        <div className='flex justify-between border border-b-2 border-x-0 border-t-0 pb-2'>
                            <h3 className=''>Đã chọn</h3>
                            <h3>
                                <button className='p-1 px-2 bg-blue-600 rounded-md text-white'>Tìm kiếm</button>
                            </h3>
                        </div>
                        <div className='pl-2 flex-wrap flex gap-4 mt-4 p-1 w-full'>
                            {selectedGenres.map((genre, index) => (
                                <div key={index}>
                                    <div className='p-1 rounded-md border border-black'>
                                        {genre}
                                        <FontAwesomeIcon className='cursor-pointer ml-2' onClick={() => handleRemove(genre)} icon={faXmark} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-3 pl-2'>
                            Thể loại
                        </div>
                        <div className='flex-wrap flex gap-4 mt-4 p-1 w-full'>
                            {genres.map((genre, index) => (
                                <div key={index}>
                                    <div onClick={() => handleSelected(genre)} className='p-1 rounded-md border border-black cursor-pointer hover:text-yellow-500 hover:border-yellow-500'>{genre}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-span-8'>
                    <div className='p-4 w-full'>
                        <div className='flex pb-2 gap-6'>
                            <select name="new" onChange={(e) => handleChange(e, "neww")} className={`${filter.neww !== "" ? "text-yellow-600" : "text-black"} focus:outline-none cursor-pointer bg-gray-50`}>
                                <option value="newUpdate">Mới cập nhập</option>
                                <option value="newCreate">Mới đăng</option>
                            </select>
                            <select onChange={(e) => handleChange(e, "read")} name="read" className={`${filter.read !== "" ? "text-yellow-600" : "text-black"} focus:outline-none cursor-pointer bg-gray-50`}>
                                <option disabled hidden>Lượt đọc</option>
                                <option value="readDay">Lượt đọc ngày</option>
                                <option value="readWeek">Lượt đọc tuần</option>
                                <option value="readMonth">Lượt đọc tháng</option>
                                <option value="readAll">Lượt đọc tổng</option>
                            </select>
                            <select onChange={(e) => handleChange(e, "rate")} name="rate" className={`${filter.rate !== "" ? "text-yellow-600" : "text-black"} focus:outline-none cursor-pointer bg-gray-50`}>
                                <option disabled hidden>Đánh giá</option>
                                <option value="rateCount">Lượt đánh giá</option>
                                <option value="ratePoint">Điểm đánh giá</option>
                            </select>
                            <button onClick={() => setFilter(prevFilter => ({ ...prevFilter, save: true, love: false, nomination: "", read: "", neww: "", rate: "", comment: false }))} className={`${filter.save ? "text-yellow-600" : "text-black"} hover:text-blue-400`}>lưu trữ</button>
                            <button onClick={() => setFilter(prevFilter => ({ ...prevFilter, love: true, save: false, nomination: "", read: "", neww: "", rate: "", comment: false }))} className={`${filter.love ? "text-yellow-600" : "text-black"} hover:text-blue-400`}>Yêu thích</button>
                            <select onChange={(e) => handleChange(e, "nomination")} name="nomination" className={`${filter.nomination !== "" ? "text-yellow-600" : "text-black"} focus:outline-none cursor-pointer bg-gray-50`}>
                                <option disabled hidden>Đề cử</option>
                                <option value="nominationDay">Đề cử ngày</option>
                                <option value="nominationWeek">Đề cử tuần</option>
                                <option value="nominationMonth">Đề cử tháng</option>
                                <option value="nominationAll">Đề cử tổng</option>
                            </select>
                            <button onClick={() => setFilter(prevFilter => ({ ...prevFilter, save: false, love: false, nomination: "", read: "", neww: "", rate: "", comment: true }))} className={`${filter.comment ? "text-yellow-600" : "text-black"} hover:text-blue-400`}>Bình luận</button>
                        </div>
                    </div>
                    <div className='p-4 w-full'>
                        <div className='px-4 pb-4 grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                            {searchData?.pageBook?.content?.map((item) => {
                                return (
                                    <div key={item.id} className='flex text-start w-full mt-5 max-h-52 p-3 shadow-md'>
                                        <div className='w-24 h-28 ml-2 cursor-pointer'>
                                            <img className='w-full h-full object-cover' src={item.image} alt='img book' />
                                        </div>
                                        <div className='ml-2 w-full'>
                                            <h3 className="cursor-pointer">{item.title}</h3>
                                            <span>{item.shortDescription}</span>
                                            <div className='flex items-center justify-between w-full'>
                                                {item.authors?.map((author) => {
                                                    return (
                                                        <div key={author} className='p-1 flex justify-center items-center'>
                                                            <FontAwesomeIcon icon={faFilePen} className='text-gray-600' />
                                                            <p className='ml-1'>{author}</p>
                                                        </div>
                                                    );
                                                })}
                                                <div className='p-1 border border-tyellow text-orange-600 cursor-pointer'>{item.genres[0]}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='p-4 w-full mt-5'>
                        <div className='flex gap-1 justify-center items-center'>
                            <div className='cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md text-center'>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div className='gap-2 flex '>
                                {searchData?.pageNumbers?.map((page) => {
                                    return (
                                        <div key={page} onClick={() => handlePage(page)} className='cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md'>{page}</div>
                                    );
                                })}
                            </div>
                            <div className='cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md text-center'>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                            <div className='p-1 px-2 rounded-md text-center'>
                                <input onChange={(e) => setPage(e.target.value)} className='focus:border-yellow-600 border border-gray-400 focus:outline-none rounded-md p-2 max-w-20' type="number" min={1} max={data?.totalPages} value={pagee} />
                            </div>
                            <div className='p-1 px-2 rounded-md text-center'>
                                <button onClick={() => handlePage(pagee)} className='bg-white border hover:bg-yellow-600 hover:text-white border-yellow-600 text-yellow-600 p-2 rounded-md'>
                                    Đến trang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDetail;
