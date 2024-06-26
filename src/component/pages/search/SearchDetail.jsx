import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faFilePen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import IconGlobal from '../../../icon/IconGlobal';
import GenreService from '../../service/GenreService';
import Select from "react-select"
import ComputedService from '../../service/ComputedService';
import { IonIcon } from '@ionic/react';
import { bookmarkSharp, eyeOutline, heartOutline, heartSharp } from 'ionicons/icons';
import { LuCalendarDays } from "react-icons/lu";
import formatTimeDifference from '../../service/DateService';
import { MdOutlineAutoGraph, MdStarRate } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { PiFlowerTulipThin } from "react-icons/pi";
import { FaAcquisitionsIncorporated, FaRegCommentDots } from "react-icons/fa";
const SearchDetail = () => {
    const [data, setData] = useState([]);
    const { keyword, page, field } = useParams();
    const [filter, setFilter] = useState("new");
    let service = new BookService();
    const [findBooks, setFindBooks] = useState([]);
    const findBook = useQuery({
        queryKey: ["findBook", keyword],
        queryFn: () => service.findBook(keyword, page, 12)
            .then((res) => {
                if (res.data) {
                    setData(res.data);
                    return res.data;
                }
            })
            .catch((error) => {
                console.error(error);
            })
    });
    useEffect(() => {
        if (keyword === "" || !keyword)
            getNewbook.refetch();
        else
            findBook.refetch();
    }, [keyword])
    useEffect(() => {
        if (field === "read")
            getRead.mutate("total")
        else if (field === "rate")
            findMutate.mutate("rateCount")
        else if (field === "nomination")
            getNomination.mutate("total")
        else if (field === "save")
            findMutate.mutate("save")
        else if (field === "love")
            findMutate.mutate("love")
        else if (field === "comment")
            findMutate.mutate("comment")
        else if (field === "new")
            getNew.mutate("createdAt")
    }, [field])
    // const getDate = useQuery({
    //     queryKey: ["dataBooks"],
    //     queryFn: () => service.getBooks(1, 12, "createdAt").then((res) => {
    //         if (res.data) {
    //             console.log(res.data)
    //             setData(res.data)
    //             return res.data;
    //         }
    //     }).catch((err) => {
    //         console.error(err);
    //     })
    // })
    console.log(data)
    let icon = new IconGlobal()

    const [genres, setGenres] = useState([]);
    const [filterGenres, isFilterGenres] = useState(false);
    const [pagee, setPage] = useState(page);
    const [searchData, setSearchData] = useState(data);
    const navigate = useNavigate();
    const handlePage = (p) => {
        console.log(p)
        filterGenres ? findByGenres.mutate(p) :
            mutation.mutate(p);
        setPage(p);
        navigate(`/${p}/search/${field}/${keyword ? keyword : ""}`);
    }
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
    let computedService = new ComputedService();
    const findByGenres = useMutation({
        mutationKey: ["findBookGenres"],
        mutationFn: () => computedService.findByGenres(data.field, selectedGenres, keyword, page, 12).then((res) => {
            if (res.data) {
                console.log(res.data)
                setData(res.data);
                isFilterGenres(true);
            } else setData([]);
        }).catch((err) => {
            console.error(err);
        })
    });
    useEffect(() => {

    }, [searchData, filterGenres])
    const handleSearch = () => {
        findByGenres.mutate(1);
        setPage(1);
        navigate(`/1/search/${field}/${keyword ? keyword : ""}`);
    }
    const optionsNew = [
        { value: "  ", label: "Mới cập nhật" },
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
    const [neww, setNeww] = useState(optionsNew[1]);
    const [rate, setRate] = useState();
    const [nomination, setNomination] = useState();
    const handleChange = (field, val) => {
        setFilter(
            field === "read" ? "read" :
                "new" === field ? "new" :
                    "nomination" === field ? "nomination" :
                        "save" === field ? "save" :
                            "love" === field ? "love" :
                                "rate" === field ? "rate" :
                                    "comment" === field ? "comment" : "read"
        );
        // console.log(val)
        field === "read" ? val.value === "readDay" ? getRead.mutate("day") : val.value === "readMonth" ? getRead.mutate("month") : val.value === "readWeek" ? getRead.mutate("week") : getRead.mutate("total") :
            field === "new" ? val.value === "newCreate" ? getNew.mutate("createdAt") : getNew.mutate("updateDate") :
                field === "rate" ? val.value === "ratePoint" ? findMutate.mutate("rate") : findMutate.mutate("rateCount") :
                    field === "nomination" ? val.value === "nominationDay" ? getNomination.mutate("day") : val.value === "nominationWeek" ? getNomination.mutate("week") : val.value == "nominationMonth" ? getNomination.mutate("month") : getNomination.mutate("total") :
                        field === "save" ? findMutate.mutate("save") :
                            field === "love" ? findMutate.mutate("love") :
                                findMutate.mutate("comment");
    };
    const getNewbook = useQuery({
        queryKey: ["newBooks"],
        queryFn: () => service.getNewBooks(1, 12).then((res) => {
            if (res.data) {
                setData(res.data)
                return res.data;
            } else setData([]);
        }).catch((err) => {
            console.error(err);
        }), enabled: filter === "new" && neww === optionsNew[1]
    })
    const getNew = useMutation({
        mutationFn: (field) =>
            service.getBooks(page, 12, field).then((res) => {
                if (res.data) {
                    setData(res.data);
                    return res.data;
                } else setData([]);
            }).catch((res) => {
                console.error(res);
            })
    })
    const getRead = useMutation({
        mutationFn: (date) => computedService.read(date, page, 12).then((res) => {
            if (res.data) {
                setData(res.data);
                return res.data;
            } else setData([]);
        }).catch((res) => {
            console.error(res);
        })
    })
    const getNomination = useMutation({
        mutationFn: (date) => computedService.nonimate(date, page, 12).then((res) => {
            if (res.data) {
                setData(res.data);
                return res.data;
            } else setData([]);
        }).catch((res) => {
            console.error(res);
        })
    })
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
    const findMutate = useMutation({
        mutationFn: (type) => computedService.find(type, page, 12).then((res) => {
            if (res.data) {
                console.log(res.data);
                setData(res.data);
                return res.data;
            } else setData([]);
        }).catch((res) => {
            console.error(res);
        })
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
                        <div className='mt-3 pl-2 font-semibold text-yellow-500'>
                            Thể loại
                        </div>
                        <div className='flex-wrap flex gap-4 mt-4 p-1 w-full'>
                            {genres?.map((genre, index) => (
                                <div key={index}>
                                    <div onClick={() => handleSelected(genre)} className='p-1 px-2 rounded-md border border-yellow-500 cursor-pointer hover:text-yellow-500 hover:border-yellow-500'>{genre?.name}</div>
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
                                    handleChange("new", val);
                                }}
                                className={`flex flex-grow items-center justify-center ${filter == "new" ? "text-yellow-500" : "text-black"}  cursor-pointer bg-gray-50`}
                                theme={customTheme}
                                styles={customStyles}
                                isSearchable={false}
                                options={optionsNew}
                                defaultValue={optionsNew[1]}
                            />
                            <Select
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                onChange={val => {
                                    setRead(val);
                                    handleChange("read", val);
                                }}
                                className={`flex flex-grow items-center justify-center ${filter === "read" ? "text-yellow-500" : "text-black"}  cursor-pointer bg-gray-50`}
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
                                    handleChange("rate", val);
                                }}
                                className={`flex flex-grow items-center justify-center ${filter === "rate" ? "text-yellow-500" : "text-black"}  cursor-pointer bg-gray-50`}
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
                                    handleChange("nomination", val);
                                }}
                                className={`ml-3 flex flex-grow items-center justify-center ${filter === "nomination" ? "text-yellow-500" : "text-black"}  cursor-pointer bg-gray-50`}
                                theme={customTheme}
                                styles={customStyles}
                                isSearchable={false}
                                options={optionsNomination}
                                placeholder="Đề cử"
                            />
                            <button onClick={() => handleChange("save")} className={`flex-grow ${filter === "save" ? "text-yellow-500" : "text-black"} hover:text-blue-400`}>lưu trữ</button>
                            <button onClick={() => handleChange("love")} className={`flex-grow ml-4 ${filter === "love" ? "text-yellow-500" : "text-black"} hover:text-blue-400`}>Yêu thích</button>
                            <button onClick={() => handleChange("comment")} className={`flex-grow ml-4 ${filter === "comment" ? "text-yellow-500" : "text-black"} hover:text-blue-400`}>Bình luận</button>
                        </div>
                    </div>
                    <div className='p-4 w-full'>
                        {data?.pageBook?.content?.length > 0 ? <div className=' pb-4 grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                            {data?.pageBook?.content?.map((item) => {
                                return (
                                    <div key={item.id} className='flex text-start w-full mt-3 max-h-52 p-3 shadow-md'>
                                        <div className='w-24 h-28 ml-2 cursor-pointer'>
                                            <Link to={`/details/${item?.id}`}>
                                                <img width="5rem" height="6rem" className='min-w-24 min-h-28 object-cover' src={item.image ? item?.image : "avatarBook.jpg"} alt='img book' />
                                            </Link>
                                        </div>
                                        <div className='ml-2 w-full'>
                                            <Link to={"/details/" + item.id}>
                                                <h3 className="cursor-pointer font-semibold hover:text-blue-500">{item.title}</h3>
                                            </Link>
                                            <div className="mt-2 flex-wrap flex items-center gap-1">
                                                <span className="line-clamp-3 ml-1">{item?.shortDescription}</span>
                                            </div>
                                            <div className='flex mt-1'>
                                                {filter === "read" ? <div className='flex items-center gap-1'>
                                                    <IonIcon icon={eyeOutline} />
                                                    <p className='ml-2'>{item?.bookComputed?.read}</p>
                                                </div> : filter === "rate" ? rate.value === "ratePoint" ? <div className='flex items-center gap-1'>
                                                    <GoStarFill className='text-yellow-500' />
                                                    <p className='ml-2'>{item?.bookComputed?.rate}</p>
                                                </div> : <div className='flex items-center gap-1'>
                                                    <MdOutlineAutoGraph className='text-yellow-700' />
                                                    <p className='ml-2'>{item?.bookComputed?.rateCount}</p>
                                                </div> : filter === "nomination" ? <div className='flex items-center gap-1'>
                                                    <PiFlowerTulipThin className='text-pink-600' />
                                                    <p className='ml-2'>{item?.bookComputed?.nominated}</p>
                                                </div> : filter === "save" ? <div className='flex items-center gap-1'>
                                                    <IonIcon className='text-red-500' icon={bookmarkSharp} />
                                                    <p className='ml-2'>{item?.bookComputed?.save}</p>
                                                </div> : filter === "love" ? <div className='flex items-center gap-1'>
                                                    <IonIcon className='text-pink-400' icon={heartSharp} />
                                                    <p className='ml-2'>{item?.bookComputed?.love}</p>
                                                </div> : filter === "comment" ? <div className='flex items-center gap-1'>
                                                    <FaRegCommentDots />
                                                    <p className='ml-2'>{item?.bookComputed?.comment}</p>
                                                </div> : filter === "new" && neww.value === "newCreate" ? <div className='flex items-center gap-1'>
                                                    <LuCalendarDays />
                                                    <p className='ml-2'>{item?.createdAt ? formatTimeDifference(item?.createdAt) + "" : <></>}</p>
                                                </div> : <div className='flex items-center gap-1'>
                                                    <LuCalendarDays />
                                                    <p className='ml-2'>{item?.updateDate ? formatTimeDifference(item?.updateDate) + "" : <></>}</p>
                                                </div>
                                                }
                                            </div>
                                            <div className='flex items-center justify-between w-full mt-3'>
                                                <div className="flex max-w-28 items-center">
                                                    <img src={icon?.icon?.author} className='w-5 h-5 mt-1' alt="" />

                                                    <div className='flex truncate justify-center items-center'>
                                                        <p className='ml-1 max-w-24 truncate'>{item?.authors ? item?.authors[0]?.name : ""}</p>

                                                    </div>
                                                </div>
                                                <div className='p-1 border border-yellow-500 text-orange-600 cursor-pointer'>{item?.genres ? item?.genres[0]?.name : ""}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div> : <><h2>Không tìm thấy kết quả</h2></>}
                    </div>
                    <div className='p-4 w-full mt-5'>
                        {data?.pageNumbers > 1 &&
                            <div className='flex gap-1 justify-center items-center'>
                                <div className='cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md text-center'>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                                <div className='gap-2 flex '>
                                    {data?.pageNumbers?.map((page) => {
                                        return (
                                            <div key={page} onClick={() => handlePage(page)} className={`${pagee === page ? "bg-yellow-500 " : " "} cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md`}>{page}</div>
                                        );
                                    })}
                                </div>
                                <div className='cursor-pointer p-2 px-4 hover:bg-yellow-500 rounded-md text-center'>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                                <div className='p-1 px-2 rounded-md text-center'>
                                    <input onChange={(e) => setPage(e.target.value)} className='focus:border-yellow-500 border border-gray-400 focus:outline-none rounded-md p-2 max-w-20' type="number" min={1} max={data?.totalPages} value={pagee} />
                                </div>
                                <div className='p-1 px-2 rounded-md text-center'>
                                    <button onClick={() => handlePage(pagee)} className='bg-white border hover:bg-yellow-500 hover:text-white border-yellow-500 text-yellow-500 p-2 rounded-md'>
                                        Đến trang
                                    </button>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDetail;
