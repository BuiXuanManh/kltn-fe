import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import React, { useContext, useState } from 'react';
import PageService from '../../../service/PageService';
import { AppContext } from '../../../../context/AppContext';
import useAddComputedRateBook from '../../../../hook/useAddComputedRateBook';
const Review = ({ handleClose, pageId, setRate, rate, id }) => {
    const { token, setComputedBook } = useContext(AppContext);
    const { mutate: mutateRate } = useAddComputedRateBook();
    const handleAddComRate = (id) => {
        mutateRate(id, {
            onSuccess: (newBook) => {
                setComputedBook(newBook);
            }
        });
    };
    const handleSendRate = () => {
        addRate.mutate(rate);
    }
    let pageService = new PageService();
    const addRate = useMutation({
        mutationFn: (rate) => pageService.addRatePage(token, pageId, rate).then((res) => {
            if (res.data) {
                handleAddComRate(id);
                setRate(res.data.rate);
                setTimeout(() => {
                    message.success("Gửi thành công", 2)
                }, 0);
                handleClose();
                return res.data;
            }
        }).catch((error) => {
            setTimeout(() => {
                message.error("Gửi thất bại", 2);
            }, 0);
            console.error(error);
        })
    })
    return (
        <>
            <div aria-modal aria-hidden tabIndex={-1} role="dialog" className='fixed mx-[35%] h-[47%] top-0 mt-[7%] z-50 bg-white flex'>
                <div className=' w-full flex whitespace-normal break-words rounded-lg py-1.5 px-3 font-sans text-sm font-normal  focus:outline-none'>
                    <div className='ml-4 w-full h-full'>
                        <div onClick={() => handleClose()}
                            className='justify-end items-end flex text-gray-400 text-xl cursor-pointer'>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                        <div className='w-full justify-between'>
                            <h1 className='text-xl font-medium text-start'>Đánh giá</h1>
                            <div className='text-base cursor-pointer mt-5 font-normal mx-10'>
                                Bạn đánh giá nội dung của trang này được mấy điểm? Kéo nút tròn để cho điểm, điểm tối đa là 5 điểm.
                            </div>
                        </div>
                        <div className='w-full justify-center'>
                            <div className='w-full justify-center items-center flex'>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={rate}
                                    onChange={(e) => setRate(parseFloat(e.target.value))}
                                    step="0.5"
                                    className='w-80 mt-10'
                                />
                            </div>
                            <div className='mt-5 w-full flex justify-center'>{rate ? rate : 0}/5 điểm</div>
                            <div className='mt-10 mx-10 '>
                                <button onClick={() => handleSendRate()} className='text-white bg-blue-600 rounded-full w-full h-10'>Gửi đánh giá</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></>
    );
};

export default Review;
