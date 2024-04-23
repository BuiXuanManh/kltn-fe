import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistoryRead from './history/HistoryRead';
import Bookmark from './flag/Bookmark';
import FollowBook from './follow/FollowBook';
import { AppContext } from '../../../context/AppContext';

const HistoryBook = ({ data }) => {
    const { mssv } = useParams();
    const [showSetting, setShowSetting] = useState(false);
    const showSettingHandle = () => {
        setShowSetting(!showSetting);
    }
    const { token, user, profile } = useContext(AppContext);
    const [activeMenu, setActiveMenu] = useState('reading');

    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
    };
    console.log(data);
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
                    <Bookmark data={data} />
                )}

                {activeMenu === 'follow' && (
                    <FollowBook data={data} />
                )}
            </div>
        </div>
    );
};

export default HistoryBook;