import { faArrowsUpDown, faCheck, faCirclePlay, faFont, faMinus, faPalette, faPlus, faTextHeight, faVolumeHigh, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Setting = ({ handleShowSetting }) => {
    return (
        <div className='fixed h-3/5 w-1/3 z-50 ml-4 top-1 mt-40 right-48 flex whitespace-normal break-words rounded-lg py-1.5 px-3 font-sans text-sm font-normal bg-white focus:outline-none'>
            <div className='ml-4 w-full h-full'>
                <div onClick={() => handleShowSetting()} className='justify-end items-end flex text-gray-400 text-xl cursor-pointer'>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <h1 className='text-xl font-medium'>Cài đặt</h1>
                <div className='grid grid-cols-10 mt-5 text-base'>
                    <div className='grid-cols-1 col-span-4 ml-4 flex'>
                        <div className='text-gray-500'>
                            <FontAwesomeIcon icon={faPalette} />
                        </div>
                        <div className='ml-2'>
                            Màu nền
                        </div>
                    </div>
                    <div className='grid-cols-1 col-span-6 gap-5 flex flex-wrap'>
                        <div className='h-10 w-10 bg-[#F5E4E4] rounded-full text-[#BB9035] flex justify-center text-center items-center'>
                            <div className='h-5 w-5'>
                                <FontAwesomeIcon icon={faCheck} className='w-5 h-5 rounded-full' />
                            </div>
                        </div>
                        <div className='h-10 w-10 bg-[#F5EBCD] rounded-full'></div>
                        <div className='h-10 w-10 bg-[#E2EEE2] rounded-full'></div>
                        <div className='h-10 w-10 bg-[#E1E8E8] rounded-full'></div>
                        <div className='h-10 w-10 bg-[#EAE4D3] rounded-full'></div>
                        <div className='h-10 w-10 bg-[#E5E3DF] rounded-full'></div>
                        <div className='h-10 w-10 bg-[#222222] rounded-full'></div>
                    </div>
                </div>
                <div className='grid grid-cols-10 mt-5 text-base'>
                    <div className='grid-cols-1 col-span-4 ml-4 flex'>
                        <div className='text-gray-500'>
                            <FontAwesomeIcon icon={faFont} />
                        </div>
                        <div className='ml-2'>
                            Font chữ
                        </div>
                    </div>
                    <div className='grid-cols-1 col-span-6 gap-5 flex flex-wrap'>
                        <div className='w-full h-10 border border-solid p-2'>
                            <select name="check" className='w-full' value="Arial">
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Verdana">Verdana</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-10 mt-5 text-base'>
                    <div className='grid-cols-1 col-span-4 ml-4 flex'>
                        <div className='text-gray-500'>
                            <FontAwesomeIcon icon={faTextHeight} />
                        </div>
                        <div className='ml-2'>
                            Cỡ chữ
                        </div>
                    </div>
                    <div className='grid-cols-1 col-span-6 gap-5 flex justify-between'>
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center'>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div className='w-auto h-10 text-center flex justify-center items-center font-semibold'>
                            26px
                        </div>
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center'>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-10 mt-5 text-base'>
                    <div className='grid-cols-1 col-span-4 ml-4 flex'>
                        <div className='text-gray-500'>
                            <FontAwesomeIcon icon={faArrowsUpDown} />
                        </div>
                        <div className='ml-2'>
                            Dãn dòng
                        </div>
                    </div>
                    <div className='grid-cols-1 col-span-6 gap-5 flex justify-between'>
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center'>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div className='w-auto h-10 text-center flex justify-center items-center font-semibold'>
                            26px
                        </div>
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center'>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-10 mt-5 text-base'>
                    <div className='grid-cols-1 col-span-4 ml-4 flex'>
                        <div className='text-gray-500'>
                            <FontAwesomeIcon icon={faVolumeHigh} />
                        </div>
                        <div className='ml-2'>
                            Nghe sách
                        </div>
                    </div>
                    <div className='grid-cols-1 col-span-6 gap-5 flex justify-between'>
                        <button className=' rounded-full border flex justify-center items-center'>
                            <FontAwesomeIcon icon={faCirclePlay} className='w-14 h-14' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;