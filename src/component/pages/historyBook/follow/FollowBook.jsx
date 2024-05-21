import { faBookmark, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import IconGlobal from '../../../../icon/IconGlobal';
import { Link } from 'react-router-dom';
import formatTimeDifference from '../../../service/DateService';
import { AppContext } from '../../../../context/AppContext';
import BookService from '../../../service/BookService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAddComputedInteractionBook from '../../../../hook/useAddComputedInteractionBook';
import swal from 'sweetalert';

const FollowBook = ({ dataFollow, setDataFollow }) => {
    let icon = new IconGlobal();
    const { token, setComputedBook } = useContext(AppContext);
    let service = new BookService();

    const { mutate: addInteraction } = useAddComputedInteractionBook();
    const handleAddInteractionbookBook = (id) => {
        addInteraction(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const followCancel = useMutation({
        mutationFn: (id) => {
            if (id !== undefined && token !== undefined && token !== "") {
                service.followCancel(token, id).then((res) => {
                    if (res.data) {
                        handleAddInteractionbookBook(id);
                        setDataFollow(dataFollow.filter((item) => item?.book?.id !== id));
                        toast.success("Xoá thành công");
                        return res.data;
                    }
                }).catch((err) => {
                    toast.error("huỷ theo dõi không thành công");
                    console.log(err);
                })
            } else {
                toast.error("Vui lòng đăng nhập");
            }
        }
    })
    const handleFollowCancel = (id) => {
        swal({
            title: "Bạn có chắc chắn muốn huỷ theo dõi truyện này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    followCancel.mutate(id);
                }
            });
    }
    return (
        <div className='p-10'>
            {dataFollow?.map((i, index) =>
                <div key={index} className='flex justify-between gap-5 py-3 hover:bg-gray-100 cursor-pointer'>
                    <Link to={`/details/${i?.book?.id}`} className='flex justify-between w-full'>
                        <div className='flex gap-5'>
                            <img src={i?.book?.image} className='w-24 h-32' alt="" />
                            <div className='ml-2'>
                                <div className='font-semibold text-lg'>{i?.book?.title}<FontAwesomeIcon className='ml-2 text-red-500' icon={faBookmark} /></div>
                                <div className='flex items-center mt-2'>
                                    <img src={icon?.icon?.author} className='w-5 h-5 flex items-center' alt="" />
                                    <div className='ml-2 flex'>
                                        {i?.book?.authors?.map((item, ind) => (
                                            <span key={ind}>
                                                {item?.name}
                                                {(ind !== i?.book?.authors?.length - 1) ? <span className='mr-2'>, </span> : <span> </span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-1'>Tổng trang: {i?.book?.pageCount}</div>
                                <div className='mt-1'>Cập nhập: {i?.book?.updateDate ? formatTimeDifference(i?.book?.updateDate) : <></>}</div>
                            </div>
                        </div>
                    </Link>
                    <div
                        onClick={(event) => {
                            event.stopPropagation(); // Ngăn sự kiện lan truyền
                            handleFollowCancel(i?.book?.id);
                        }}
                        className='flex items-center mr-5 hover:text-red-500'
                    >
                        <FontAwesomeIcon className='' icon={faTrash} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FollowBook;