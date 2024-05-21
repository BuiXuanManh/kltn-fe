import { faArrowsUpDown, faCheck, faCirclePlay, faFont, faMinus, faPalette, faPlus, faTextHeight, faVolumeHigh, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import Select from "react-select"
import { AppContext } from '../../../../context/AppContext';
import { useMutation } from '@tanstack/react-query';
import SettingService from '../../../service/SettingService';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Setting = ({ handleClose, handleVoice, setting, setSetting, showAudio, setShowAudio, audio }) => {
    const option = [
        { value: "femail", label: "Giọng nữ" },
        { value: "mail", label: "Giọng nam" },
    ]
    const [m, setM] = useState(option[0]);
    const { token, profile } = useContext(AppContext);
    const navigate = useNavigate();

    const customStyles = {
        control: (baseStyles) => ({
            display: "flex",
            padding: 0,
            margin: 0,
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "white",
            width: "9rem",
            padding: 0,
            margin: 0,
        }),
        valueContainer: (baseStyles) => ({
            display: "flex",
            padding: 0,
            margin: 0,
        }),
        dropdownIndicator: base => ({
            padding: 0,
            marginRight: "1rem",
        }),
    }

    const customTheme = (theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
            text: '#EF6C00',
            primary25: '#81D4FA',
            primary: 'blue',
        },
    });

    const handleAudio = (val) => {
        setM(val);
        setShowAudio(false);
    }

    const [selectedColor, setSelectedColor] = useState("#F5E4E4");
    const colorOptions = [
        { color: "#F5E4E4" },
        { color: "#F5EBCD" },
        { color: "#E2EEE2" },
        { color: "#E1E8E8" },
        { color: "#EAE4D3" },
        { color: "#E5E3DF" },
        { color: "#222222" }
    ];

    let service = new SettingService();
    const saveSetting = useMutation({
        mutationFn: (setting) => service.updateSetting(setting, token).then((res) => {
            if (res.data) {
                setSetting(res.data);
                return res.data;
            }
        })
    });

    const [font, setFont] = useState("Arial");
    const [textSize, setTextSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);

    const handleSaveSetting = (field, value) => {
        if (token !== "" && token !== undefined) {
            const selectedIndex = colorOptions.findIndex((item) => item.color === selectedColor);
            const c = selectedIndex + 1;
            const data = {
                profile: profile,
                color: c,
                font: font,
                textSize: textSize,
                lineHeight: lineHeight,
                [field]: value
            }
            saveSetting.mutate(data);
        } else {
            swal({
                title: "Bạn có muốn đăng nhập không?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    navigate("/login")
                }
            });
        }
    }

    useEffect(() => {
        if (Object.keys(setting).length > 0) { // Kiểm tra xem setting có chứa thuộc tính nào không
            setFont(setting.font);
            setTextSize(setting.textSize);
            setLineHeight(setting.lineHeight);
            setSelectedColor(colorOptions[setting.color - 1]?.color);
        }
    }, [setting]);

    const handleChangeFont = (e) => {
        const newFont = e.target.value;
        setFont(newFont);
        handleSaveSetting('font', newFont);
    }

    const handleDecreaseTextSize = () => {
        const newSize = textSize - 1;
        setTextSize(newSize);
        handleSaveSetting('textSize', newSize);
    };

    const handleIncreaseTextSize = () => {
        const newSize = textSize + 1;
        setTextSize(newSize);
        handleSaveSetting('textSize', newSize);
    };

    const handleDecreaseLineHeight = () => {
        const newHeight = lineHeight - 0.1;
        setLineHeight(newHeight);
        handleSaveSetting('lineHeight', newHeight);
    };

    const handleIncreaseLineHeight = () => {
        const newHeight = lineHeight + 0.1;
        setLineHeight(newHeight);
        handleSaveSetting('lineHeight', newHeight);
    };

    const handleColorClick = (color) => {
        setSelectedColor(color);
        const selectedIndex = colorOptions.findIndex((item) => item.color === color);
        const c = selectedIndex + 1;
        handleSaveSetting('color', c);
    };

    return (
        <div className='fixed h-[70%] w-1/3 z-50 ml-4 top-1 mt-40 right-48 flex whitespace-normal break-words rounded-lg py-1.5 px-3 font-sans text-sm font-normal bg-white focus:outline-none'>
            <div className='ml-4 w-full h-full'>
                <div onClick={() => handleClose()} className='justify-end items-end flex text-gray-400 text-xl cursor-pointer'>
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
                        {colorOptions.map((colorOption, index) => (
                            <div
                                key={index}
                                className={`h-10 w-10 rounded-full flex justify-center items-center cursor-pointer ${selectedColor === colorOption.color ? '' : ''}`}
                                style={{ backgroundColor: colorOption.color }}
                                onClick={() => handleColorClick(colorOption.color)}
                            >
                                {selectedColor === colorOption.color && (
                                    <FontAwesomeIcon icon={faCheck} className='text-green-500' />
                                )}
                            </div>
                        ))}
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
                            <select value={font} onChange={handleChangeFont} name='check' className='w-full focus:outline-none'>
                                <option value="Arial">Arial</option>
                                <option value="Times">Times New Roman</option>
                                <option value="Courier">Courier New</option>
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
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center' onClick={handleDecreaseTextSize}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div className='w-auto h-10 text-center flex justify-center items-center font-semibold'>
                            {textSize} px
                        </div>
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center' onClick={handleIncreaseTextSize}>
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
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center' onClick={handleDecreaseLineHeight}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <div className='w-auto h-10 text-center flex justify-center items-center font-semibold'>
                            {lineHeight.toFixed(1)}
                        </div>
                        <button className='h-10 w-10 rounded-full border flex justify-center items-center' onClick={handleIncreaseLineHeight}>
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
                    <div className='grid-cols-1 col-span-6 flex '>
                        <button onClick={() => handleVoice(m.value === "femail" ? "A" : "D")} className='rounded-full border flex justify-center items-center'>
                            <FontAwesomeIcon icon={faCirclePlay} className='w-14 h-14' />
                        </button>
                        <Select
                            components={{
                                IndicatorSeparator: () => null
                            }}
                            onChange={handleAudio}
                            className={`flex flex-grow items-center justify-center cursor-pointer bg-gray-50`}
                            theme={customTheme}
                            styles={customStyles}
                            isSearchable={false}
                            options={option}
                            defaultValue={option[0]}
                        />
                    </div>
                </div>
                <div className='mt-2 justify-end items-center flex'>
                    {showAudio && <audio controls src={audio} />}
                </div>
            </div>
        </div>
    );
};

export default Setting;
