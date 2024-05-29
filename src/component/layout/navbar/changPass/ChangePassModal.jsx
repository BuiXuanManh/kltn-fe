import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../context/AppContext';
import AccountService from '../../../service/AccountService';
import { toast } from 'react-toastify';

const ChangePassModal = ({ handleClose }) => {
    const { token } = useContext(AppContext);
    const handleChangePass = () => {
        muta.mutate();
    }
    let service = new AccountService();
    const [password, setPassword] = useState("")
    const muta = useMutation({
        mutationFn: () => {
            if (token !== "" && token !== undefined) {
                service.changPass({ token: token, password: password }).then(res => {
                    if (res.data) {
                        toast.success("đổi mật khẩu thành công");
                        handleClose();
                        return res.data;
                    }
                }).catch((e) => {
                    toast.error("Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số, một ký tự đặc biệt và từ 8-32 ký tự")
                    console.error(e)
                })
            }
        }
    })
    return (
        <div className="fixed z-50 bg-[#222222] bg-opacity-30 justify-center items-center w-full inset-0">
            <div className="z-50 p-4 min-w-[30rem] relative rounded pb-3 pt-1 mx-auto my-20 bg-white lg:max-w-[400px] max-w-screen-lg">
                <div className="relative bg-white rounded-lg dark:bg-gray-700">
                    <div className='mt-2'>
                        <h3 className='flex justify-center'>Đổi mật khẩu</h3>
                        <div className='flex justify-end'>
                            <FontAwesomeIcon onClick={() => handleClose()} icon={faXmark} className='cursor-pointer' />
                        </div>
                    </div>
                    <div className=" mb-5 mt-5">
                        <Input variant="standard" label="Nhập mật khẩu hiện tại" placeholder="Nhập mật khẩu hiện tại" />
                    </div>
                    <div className=" mb-5 mt-5">
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" label="Nhập mật khẩu mới" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className=" mb-5 mt-5">
                        <Input variant="standard" label="Nhập lại mật khẩu" placeholder="Nhập lại mật khẩu" />
                    </div>
                    <div className='mt-8 flex justify-center'>
                        <button onClick={() => handleChangePass()} className='bg-blue-400 text-white px-4 py-2 rounded-lg'>Đổi mật khẩu</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassModal;
