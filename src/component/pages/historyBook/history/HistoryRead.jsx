import { faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import IconGlobal from '../../../../icon/IconGlobal';
import { AppContext } from '../../../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import formatTimeDifference, { formatDate } from '../../../service/DateService';
import { useMutation } from '@tanstack/react-query';
import BookService from '../../../service/BookService';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

const HistoryRead = () => {
    let icon = new IconGlobal();
    const { token, interactions, setInteractions } = useContext(AppContext);
    let service = new BookService();
    const deleteInteraction = useMutation({
        mutationFn: (id) => service.deleteInteraction(token, id).then((res) => {
            if (res.data) {
                console.log(res.data);
                setInteractions(interactions.filter((item) => item.id !== id));
                toast.success("Xoá thành công");
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
        <div className='p-10'>
            {interactions?.map((item, index) => <>
                <div key={index} className='flex justify-between gap-5 py-3 hover:bg-gray-100 cursor-pointer'>
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
                                        <div className='mt-1'>Cập nhập:  {item?.book?.updateDate ? formatTimeDifference(item?.book?.updateDate) : <></>}</div>
                                        <div className='mt-1 items-start text-start text-orange-500 text-sm cursor-pointer font-medium'>Đọc tiếp</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div onClick={() => handleDelete(item?.id)} className='flex items-center mr-5 hover:text-red-500'>
                        <FontAwesomeIcon className='' icon={faTrash} />
                    </div>
                </div>
            </>
            )}
        </div>

    );
};

export default HistoryRead;