import { faBookmark, faFilePen, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import IconGlobal from '../../../../icon/IconGlobal';
import PageService from '../../../service/PageService';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AppContext } from '../../../../context/AppContext';
import { Link } from 'react-router-dom';
import formatTimeDifference from '../../../service/DateService';
import useAddComputedInteractionBook from '../../../../hook/useAddComputedInteractionBook';
import useAddComputedPageBook from '../../../../hook/useAddComputedPageBook';
import useAddComputedPage from '../../../../hook/useAddComputedPage';
import swal from 'sweetalert';

const Bookmark = ({ dataMark, setDataMark }) => {
    let icon = new IconGlobal();
    const { token, setComputedBook, setComputedPage, profile } = useContext(AppContext);
    let service = new PageService();
    const { mutate: mutatePageBook } = useAddComputedPageBook();
    const handleAddComPageBook = (id) => {
        mutatePageBook(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const { mutate: mutatePage } = useAddComputedPage();
    const handleAddPage = (id) => {
        mutatePage(id, {
            onSuccess: (newPage) => {
                setComputedPage(newPage);
            }
        });
    };
    const queryClient = useQueryClient();
    const mark = useMutation({
        mutationFn: (page) => service.mark(token, page?.id, false).then((res) => {
            if (res.data) {
                queryClient.invalidateQueries(['interactionPage', profile?.id, page?.id]);
                handleAddPage(page?.id)
                handleAddComPageBook(page?.book?.id);
                setDataMark(dataMark.filter((item) => item?.pageBook?.id !== page?.id));
                toast.success("Hủy đánh dấu thành công");
                return res.data;
            }
        }).catch((err) => {
            console.error(err);
        })
    })
    const handleMark = (page) => {
        swal({
            title: "Bạn có chắc chắn muốn huỷ đánh dấu trang sách này không?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    mark.mutate(page);
                }
            });
    }
    return (
        <div className='p-10'>
            {dataMark?.map((i, index) =>
                <div key={index} className='flex justify-between gap-5 py-3 hover:bg-gray-100 cursor-pointer'>
                    <Link to={`/details/read/${i?.pageBook?.book?.id}/${i?.pageBook?.pageNo}`}>
                        <div className='flex gap-5 py-3 hover:bg-gray-100 cursor-pointer'>
                            <div className='flex justify-between w-full'>
                                <div className='flex gap-5'>
                                    <img src={i?.pageBook?.book?.image} className='w-24 h-32' alt="" />
                                    <div className='ml-2'>
                                        <div className='font-semibold text-lg'>{i?.pageBook?.book?.title}</div>
                                        <div className='flex items-center mt-2'>
                                            <img src={icon?.icon?.author} className='w-5 h-5 flex items-center' alt="" />
                                            <div className='ml-2 flex'>
                                                {i?.pageBook?.book?.authors?.map((item, ind) => <span key={ind}>{item?.name}
                                                    {(ind !== i?.pageBook?.book?.authors?.length - 1) ? <span className='mr-2'>, </span>
                                                        : <span> </span>}
                                                </span>)}
                                            </div>
                                        </div>
                                        <div className='mt-1'>Trang:<FontAwesomeIcon className='ml-2 text-red-500' icon={faFlag} /> {i?.pageBook?.pageNo}
                                            /{i?.pageBook?.book?.pageCount}</div>
                                        <div className='mt-1'>Cập nhập:  {i?.pageBook?.book?.updateDate ? formatTimeDifference(i?.pageBook?.book?.updateDate) : <></>}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Link>
                    <div
                        onClick={(event) => {
                            event.stopPropagation(); // Ngăn sự kiện lan truyền
                            handleMark(i?.pageBook);
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

export default Bookmark;