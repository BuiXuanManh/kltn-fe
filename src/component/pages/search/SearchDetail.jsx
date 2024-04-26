import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faFilePen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import IconGlobal from '../../../icon/IconGlobal';
import GenreService from '../../service/GenreService';
import Select from "react-select"
import { width } from '@fortawesome/free-regular-svg-icons/faAddressBook';
import { Container } from '@mui/material';
const SearchDetail = ({ data }) => {
    let icon = new IconGlobal()
    const { keyword, page } = useParams();
    const [genres, setGenres] = useState([]);
    const [filterGenres, isFilterGenres] = useState(false);
    const [filter, setFilter] = useState("new");
    const [pagee, setPage] = useState(page);
    const [searchData, setSearchData] = useState(data);
    const navigate = useNavigate();
    const handlePage = (p) => {
        console.log(p)
        filterGenres ? findByGenres.mutate(p) :
            mutation.mutate(p);
        setPage(p);
        navigate(`/${p}/search/${keyword ? keyword : ""}`);
    }
    let service = new BookService();
    const mutation = useMutation({
        mutationKey: ["page", pagee],
        mutationFn: (page) => {
            setPage(page);
            return service.getBooks(page, 3).then((res) => {
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
    const handleChange = (field) => {
        setFilter(
            field === "read" ? "read" :
                "new" === field ? "new" :
                    "nomination" === field ? "nomination" :
                        "save" === field ? "save" :
                            "love" === field ? "love" :
                                "rate" === field ? "rate" :
                                    "comment" === field ? "comment" : "read"
        );
    };
    const [selectedGenres, setSelectedGenres] = useState([]);
    const handleSelected = (genre) => {
        setSelectedGenres(prevSelectedGenres => [...prevSelectedGenres, genre]);
        setGenres(prevGenres => prevGenres.filter(item => item?.id !== genre?.id));
    }
    const handleRemove = (genre) => {
        setGenres(prevGenres => [...prevGenres, genre]);
        setSelectedGenres(prevSelectedGenres => prevSelectedGenres.filter(item => item?.id !== genre?.id));
    }

    let genreService = new GenreService();
    const genresQuery = useQuery({
        queryKey: ["genres"],
        queryFn: () => genreService.getGenres().then((res) => {
            if (res.data) {
                setGenres(res.data);
                return res.data;
            }
        }).catch((err) => [
            console.error(err)
        ]), enabled: genres.length === 0
    })
    const findByGenres = useMutation({
        mutationKey: ["findBookGenres"],
        mutationFn: (page) => service.getBookByGenres(selectedGenres, page, 2).then((res) => {
            if (res.data) {
                console.log(res.data)
                setSearchData(res.data);
                isFilterGenres(true);
            }
        }).catch((err) => {
            console.error(err);
        })
    });
    useEffect(() => {

    }, [searchData, filterGenres])
    const handleSearch = () => {
        findByGenres.mutate(1);
        setPage(1);
        navigate(`/1/search/${keyword ? keyword : ""}`);
    }

    const optionsNew = [
        { value: "newUpdate", label: "Mới cập nhật" },
        { value: "newCreate", label: "Mới đăng" },
    ]
    const optionsRead = [
        { value: "readDay", label: "Lượt đọc ngày" },
        { value: "readWeek", label: "Lượt đọc tuần" },
        { value: "readMonth", label: "Lượt đọc tháng" },
        { value: "readAll", label: "Lượt đọc tổng" },
    ]
    const optionsNomination = [
        { value: "nominationDay", label: "Đề cử ngày" },
        { value: "nominationWeek", label: "Đề cử tuần" },
        { value: "nominationMonth", label: "Đề cử tháng" },
        { value: "nominationAll", label: "Đề cử tổng" },
    ]
    const optionsRate = [
        { value: "rateCount", label: "Lượt đánh giá" },
        { value: "ratePoint", label: "Điểm đánh giá" },
    ]
    const [read, setRead] = useState();
    const [neww, setNeww] = useState(optionsNew[0]);
    const [rate, setRate] = useState();
    const [nomination, setNomination] = useState();
    const customStyles = {
        control: (baseStyles, state) => ({
            display: "flex",
            justify: "center",
            padding: 0,
            // width: "9rem",
            margin: 0,
        }),
        menu: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: "white",
            width: "9rem",
            padding: 0,
            margin: 0,
        }),
        valueContainer: (baseStyles, state) => ({
            display: "flex",
            padding: 0,
            margin: 0,
        }),
        options: (baseStyles, state) => ({
            backgroundColor: state.isFocused ? "#e2e2e2" : "white",
            padding: 0,
            margin: 0,
        }),
        dropdownIndicator: base => ({
            padding: 0,
            marginRight: "1rem",
        }),
        indicatorsContainer: base => ({
            // display: "flex",
            // items: "center",
        })
    }
    const customTheme = (theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
            text: '#EF6C00',
            primary25: '#81D4FA',
            primary: 'blue',
        },
    })

    return (

        <div className='mx-44 border mt-10 bg-gray-50 rounded-xl items-center justify-center text-center'>
            <div className='grid grid-cols-11 w-full'>
                <div className='col-span-3 justify-start items-start text-left'>
                    <div className='p-4 w-full'>
                        <div className='flex justify-between border border-b-2 border-x-0 border-t-0 pb-2'>
                            <h3 className='font-semibold'>Đã chọn</h3>
                            <h3>
                                <button onClick={() => handleSearch()} className='p-1 px-2 bg-blue-600 rounded-md text-white'>Tìm kiếm</button>
                            </h3>
                        </div>
                        <div className='pl-2 flex-wrap flex gap-4 mt-4 p-1 w-full'>
                            {selectedGenres.map((genre, index) => (
                                <div key={index}>
                                    <div onClick={() => handleRemove(genre)} className='p-1 px-2 rounded-md border border-blue-500 hover:text-blue-600 hover:border-blue-600 cursor-pointer'>
                                        {genre?.name}
                                        <FontAwesomeIcon className='cursor-pointer ml-2' icon={faXmark} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-3 pl-2 font-semibold text-yellow-700'>
                            Thể loại
                        </div>
                        <div className='flex-wrap flex gap-4 mt-4 p-1 w-full'>
                            {genres?.map((genre, index) => (
                                <div key={index}>
                                    <div onClick={() => handleSelected(genre)} className='p-1 px-2 rounded-md border border-yellow-700 cursor-pointer hover:text-yellow-700 hover:border-yellow-700'>{genre?.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-span-8'>
                    <div className='p-4 w-full'>
                        <div className='flex w-full'>
                            <Select
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                onChange={val => {
                                    setNeww(val);
                                    handleChange("new");
                                }}
                                className={`flex flex-grow items-center justify-center ${filter == "new" ? "text-yellow-700" : "text-black"}  cursor-pointer bg-gray-50`}
                                theme={customTheme}
                                styles={customStyles}
                                isSearchable={false}
                                options={optionsNew}
                                defaultValue={optionsNew[0]}
                            />
                            <Select
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                onChange={val => {
                                    setRead(val);
                                    handleChange("read");
                                }}
                                className={`flex flex-grow items-center justify-center ${filter === "read" ? "text-yellow-700" : "text-black"}  cursor-pointer bg-gray-50`}
                                theme={customTheme}
                                styles={customStyles}
                                isSearchable={false}
                                options={optionsRead}
                                placeholder="Lượt đọc"
                            />
                            <Select
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                onChange={val => {
                                    setRate(val);
                                    handleChange("rate");
                                }}
                                className={`flex flex-grow items-center justify-center ${filter === "rate" ? "text-yellow-700" : "text-black"}  cursor-pointer bg-gray-50`}
                                theme={customTheme}
                                styles={customStyles}
                                isSearchable={false}
                                options={optionsRate}
                                placeholder="Đánh giá"
                            />
                            <Select
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                onChange={val => {
                                    setNomination(val);
                                    handleChange("nomination");
                                }}
                                className={`ml-3 flex flex-grow items-center justify-center ${filter === "nomination" ? "text-yellow-700" : "text-black"}  cursor-pointer bg-gray-50`}
                                theme={customTheme}
                                styles={customStyles}
                                isSearchable={false}
                                options={optionsNomination}
                                placeholder="Đề cử"
                            />
                            <button onClick={() => handleChange("save")} className={`flex-grow ${filter === "save" ? "text-yellow-600" : "text-black"} hover:text-blue-400`}>lưu trữ</button>
                            <button onClick={() => handleChange("love")} className={`flex-grow ml-4 ${filter === "love" ? "text-yellow-600" : "text-black"} hover:text-blue-400`}>Yêu thích</button>
                            <button onClick={() => handleChange("comment")} className={`flex-grow ${filter === "comment" ? "text-yellow-600" : "text-black"} hover:text-blue-400`}>Bình luận</button>
                        </div>
                    </div>
                    <div className='p-4 w-full'>
                        <div className=' pb-4 grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                            {searchData?.pageBook?.content?.map((item) => {
                                return (
                                    <div key={item.id} className='flex text-start w-full mt-3 max-h-52 p-3 shadow-md'>
                                        <div className='w-24 h-28 ml-2 cursor-pointer'>
                                            <Link to={`/details/${item?.id}`}>
                                                <img width="5rem" height="6rem" className='min-w-24 min-h-28 object-cover' src={item.image} alt='img book' />
                                            </Link>
                                        </div>
                                        <div className='ml-2 w-full'>
                                            <Link to={"/details/" + item.id}>
                                                <h3 className="cursor-pointer font-semibold hover:text-blue-500">{item.title}</h3>
                                            </Link>
                                            <div className="mt-2 flex-wrap w-60 flex items-center gap-1">
                                                <span className="line-clamp-3 ml-1">{item?.shortDescription}</span>
                                            </div>
                                            <div className='flex items-center justify-between w-full mt-3'>
                                                <div className="flex max-w-28 items-center">
                                                    <img src={icon?.icon?.author} className='w-5 h-5 mt-1' alt="" />

                                                    <div className='flex truncate justify-center items-center'>
                                                        <p className='ml-1 max-w-24 truncate'>{item?.authors[0]?.name}</p>

                                                    </div>
                                                </div>
                                                <div className='p-1 border border-tyellow text-orange-600 cursor-pointer'>{item.genres[0]?.name}</div>
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
                                        <div key={page} onClick={() => handlePage(page)} className={`${pagee === page ? "bg-yellow-500 " : " "} cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md`}>{page}</div>
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
