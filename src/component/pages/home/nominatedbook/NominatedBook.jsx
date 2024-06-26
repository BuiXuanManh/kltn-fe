import { Link, useNavigate } from "react-router-dom";
import IconGlobal from "../../../../icon/IconGlobal";
import { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import AccountService from "../../../service/AccountService";
import BookService from "../../../service/BookService";
import { toast } from "react-toastify";
import swal from "sweetalert";

const NominatedBook = ({ data }) => {
    let icon = new IconGlobal();
    const { token, setToken, mssv, profile, interactions, setInteractions } = useContext(AppContext);
    const [inter, isInter] = useState(false);
    let service = new BookService();
    const getInteraciton = useQuery({
        queryKey: ['getInteractionsBook', profile?.id],
        queryFn: () => service.getInteractions(token).then((res) => {
            if (res.data) {
                console.log("inter", res.data);
                setInteractions(res.data);
                isInter(true);
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        }), enabled: profile?.id !== undefined && interactions.length === 0 && !inter
    })
    const deleteInteraction = useMutation({
        mutationFn: (id) => service.deleteInteraction(token, id).then((res) => {
            if (res.data) {
                console.log(res.data);
                setInteractions(interactions.filter((item) => item.id !== id));
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    const navigate = useNavigate();
    const handleDelete = (id) => {
        if (token !== "" && token !== undefined)
            swal({
                title: "Bạn có chắc chắn muốn xoá truyện này khỏi danh sách đang đọc không?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        deleteInteraction.mutate(id);
                    }
                });
        else swal({
            title: "Bạn có muốn đăng nhập không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    navigate("/login")
                }
            });
    }
    return (
        <div>
            <div className='grid grid-cols-3 mt-10 mx-48 border border-white border-b-0 rounded-lg bg-white shadow-md'>
                <div className='px-4 grid grid-cols-1 col-span-2 w-full border border-gray-200'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Sách đề cử</h3>
                        <Link to='/1/search/nomination/' className='p-3 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</Link>
                    </div>
                </div>
                <div className='px-4 grid grid-cols-1 w-full border border-gray-200'>
                    <div className='flex justify-between'>
                        <h3 className='p-3 items-start text-start'>Đang đọc</h3>
                        <Link to={`/history/${mssv}`} className='p-3 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Xem tất cả</Link>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 mx-48 border border-white border-t-0 rounded-lg bg-white'>
                <div className=' grid grid-cols-2 col-span-2 gap-4 max-w-full justify-start'>
                    {data?.pageBook?.content?.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full min-w-0 max-h-52 p-2 border border-gray-200'>
                                <div className='w-24 h-28 ml-2 cursor-pointer'>
                                    <Link to={`/details/${item?.id}`}>
                                        <img width="5rem" height="6rem" className='w-full h-full object-cover' src={item?.image ? item?.image : "avatarBook.jpg"} alt='img book' />
                                    </Link>
                                </div>
                                <div className='ml-3 w-full'>
                                    <Link to={`/details/${item?.id}`}>
                                        <h3 className="cursor-pointer font-semibold hover:text-blue-500">{item?.title}</h3>
                                    </Link>
                                    <div className="mt-2 flex-wrap w-60 flex items-center gap-1">
                                        <span className="line-clamp-3 ml-1">{item?.shortDescription}</span>
                                    </div>
                                    <div className='flex items-center justify-between w-full mt-3'>
                                        <div className="flex max-w-28 items-center">
                                            <img src={icon?.icon?.author} className='w-5 h-5 mt-1' alt="" />
                                            <div className='flex flex-grow truncate justify-center items-center'>
                                                <p className='ml-1 max-w-24 truncate'>{item?.authors ? item?.authors[0]?.name : <></>}</p>
                                            </div>
                                        </div>
                                        <div className="max-w-48 max-h-10 flex flex-grow min-w-20 justify-end">
                                            <div className='p-1 border max-h-10 truncate  border-tyellow text-orange-600 cursor-pointer'>{item.genres ? item.genres[0]?.name : <></>}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })

                    }
                </div>
                <div className='grid grid-cols-1 gap-4 max-w-full items-start'>
                    {token === "" || profile?.firstName === "" ? data?.pageBook?.content?.map((item) => {
                        return (
                            <div key={item.id} className='flex text-start w-full mt-5 max-h-30 p-4 border border-gray-200'>
                                <div className='w-10 h-12'>
                                    <Link to={`/details/${item?.id}`}>
                                        <img className='w-full h-full cursor-pointer object-cover' src={item.image ? item?.image : "avatarBook.jpg"} width="2.5rem" height="3rem" alt='img book' />
                                    </Link>
                                </div>
                                <div className='ml-3'>
                                    <Link to={`/details/${item?.id}`}>
                                        <h3 className="cursor-pointer hover:text-blue-500">{item.title}</h3>
                                    </Link>
                                    <div>{item?.genres[0]?.name}</div>
                                </div>
                            </div>
                        );
                    }) : <div>
                        {
                            interactions?.length && interactions?.map((item) => {
                                if (item?.book?.pageCount > 0 && item?.readCount > 0) {
                                    return (
                                        <div key={item.id} className='flex text-start w-full mt-5 max-h-30 p-4 border border-gray-200'>
                                            <div className='w-10 h-12'>
                                                <img className='w-full h-full cursor-pointer object-cover' src={item?.book?.image ? item?.book?.image : "avatarBook.jpg"} width="2.5rem" height="3rem" alt='img book' />
                                            </div>
                                            <div className="flex justify-center w-full">
                                                <div className='ml-3 w-48'>
                                                    <Link to={`/details/${item?.book?.id}`}>
                                                        <h3 className="cursor-pointer font-semibold hover:text-blue-500 truncate">{item?.book?.title}</h3>
                                                    </Link>
                                                    <div className="mt-1 flex text-gray-500 text-sm">
                                                        <div>Đã đọc:</div>
                                                        <div className="ml-2">{item?.readCount}</div>
                                                        <div>/ {item?.book?.pageCount}</div>
                                                        <div onClick={() => handleDelete(item?.id)} className='flex items-center ml-2 cursor-pointer hover:text-red-500'>
                                                            <FontAwesomeIcon className='' icon={faTrash} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link to={`/details/read/${item?.book?.id}/${item?.readCount}`}>
                                                    <div className='p-1 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Đọc tiếp</div>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return <></>;
                                }
                            })
                        }
                    </div>}
                </div>
            </div>

        </div>
    );
}

export default NominatedBook;