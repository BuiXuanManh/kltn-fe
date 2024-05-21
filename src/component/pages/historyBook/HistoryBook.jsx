import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistoryRead from './history/HistoryRead';
import Bookmark from './flag/Bookmark';
import FollowBook from './follow/FollowBook';
import { AppContext } from '../../../context/AppContext';
import { useQuery } from '@tanstack/react-query';
import BookService from '../../service/BookService';
import useAddComputedInteractionBook from '../../../hook/useAddComputedInteractionBook';
import { toast } from 'react-toastify';
import PageService from '../../service/PageService';

const HistoryBook = ({ data }) => {
    const { mssv } = useParams();
    const [showSetting, setShowSetting] = useState(false);
    const showSettingHandle = () => {
        setShowSetting(!showSetting);
    }
    const [activeMenu, setActiveMenu] = useState('reading');

    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
    };
    const [dataMark, setDataMark] = useState([]);
    const [dataFollow, setDataFollow] = useState([]);

    const { token, setComputedBook } = useContext(AppContext);
    let service = new BookService();

    const { mutate: addInteraction } = useAddComputedInteractionBook();
    let pageService = new PageService();
    const getInteractionByMark = useQuery({
        queryKey: ['getInteractionByMark'],
        queryFn: () => {
            if (token !== "" && token !== undefined) {
                pageService.getInteractionByMark(token).then((res) => {
                    if (res.data) {
                        setDataMark(res.data);
                        return res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                toast.error("Vui lòng đăng nhập");
            }
        }
    });
    const getInteractionByFollow = useQuery({
        queryKey: ['getInteractionByFollow'],
        queryFn: () => {
            if (token !== "" && token !== undefined) {
                service.getInteractionsBySave(token).then((res) => {
                    if (res.data) {
                        console.log(res.data);
                        setDataFollow(res.data);
                        return res.data;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                toast.error("Vui lòng đăng nhập");
            }
        }
    });
    return (
        <div className='mx-96 mt-8 border border-white border-b-0 rounded-lg bg-white shadow-md'>
            <div className="flex mt-8 ml-8 gap-8 text-xl font-semibold">
                <div className={activeMenu === 'reading' ? 'text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('reading')}>Đang đọc</div>
                <div className={activeMenu === 'flag' ? ' text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('flag')}>Đánh dấu</div>
                <div className={activeMenu === 'follow' ? ' text-tblue border-b-4 py-2 border-tblue' : 'py-2 cursor-pointer'} onClick={() => handleMenuClick('follow')}>Theo dõi</div>
            </div>
            <div className='mb-10 min-h-96'>
                {activeMenu === 'reading' && (
                    <HistoryRead data={data} />
                )}

                {activeMenu === 'flag' && (
                    <Bookmark dataMark={dataMark} setDataMark={setDataMark} />
                )}

                {activeMenu === 'follow' && (
                    <FollowBook dataFollow={dataFollow} setDataFollow={setDataFollow} />
                )}
            </div>
        </div>
    );
};

export default HistoryBook;