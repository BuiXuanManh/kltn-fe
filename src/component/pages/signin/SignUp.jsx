import React, { useContext, useEffect, useState } from 'react';
import useHandleBlur from '../../../hook/useHandleBlur';
import swal from 'sweetalert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AccountService from '../../service/AccountService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
const SignUp = () => {
    const { handleBlur, errors } = useHandleBlur();
    const [mssv, setMssv] = useState("");
    const [password, setPassword] = useState("");
    const [cppassword, setCPPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState();
    const navigate = useNavigate();
    const validForm = () => {
        handleBlur({ field: "password", password: password });
        handleBlur({ field: "mssv", mssv: mssv });
        handleBlur({ field: "cppassword", cppassword: cppassword, password: password });
        handleBlur({ field: "firstName", firstName: firstName });
        handleBlur({ field: "lastName", lastName: lastName });
        handleBlur({ field: "birthday", birthday: birthday });
        handleBlur({ field: "email", email: email });
        handleBlur({ field: "gender", gender: gender });
        return errors.mssv === "*" && errors.password === "*" && errors.cppassword === "*" && errors.firstName === "*" && errors.lastName === "*" && errors.birthday === "*" && errors.email === "*" && errors.gender === "*";
    }
    const { setToken, setMssvContext, setProfile } = useContext(AppContext);
    useEffect(() => {

    }, [errors])
    let service = new AccountService();
    const queryClient = useQueryClient();
    const [email, setEmail] = useState("");
    const mutation = useMutation({
        mutationKey: ['signUp'],
        mutationFn: () => service.register({ mssv, password, firstName, lastName, birthday, email, gender }).then(res => {
            if (res.status === 200) {
                if (res.data) {
                    console.log(res.data.profile);
                    console.log(res.data.token);
                    console.log(res.data.refreshToken);
                    setToken(res.data.token);
                    setMssvContext(res.data.profile.mssv);
                    setProfile(res.data.profile);
                    // swal({
                    //     title: "Success",
                    //     text: res.data.message,
                    //     icon: "success"
                    // });
                    navigate("/");
                }
            }
        })
        ,
        onSuccess: (data) => {
            console.log("data", data);
            // list.refetch();
        },
        onSettled: (data) => {
            console.log("done", data);
            // list.refetch();
        },
        onError: (err) => {
            console.error("err", err);
            swal({
                title: "Error",
                text: "You have pressed the button!",
                icon: "error"
            });
        }
        // cacheTime: 3600000,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validForm()) {
            if (validForm() === true) {
                mutation.mutate();
            } else {
                swal({
                    title: "Hãy nhập đúng và đủ thông tin",
                    icon: "error"
                });
            }
        }
        else {
            swal({
                title: "Hãy nhập đúng và đủ thông tin",
                icon: "error"
            });
        }
    }
    const [security, setSecurity] = useState(true);
    const handleSecurity = () => {
        setSecurity(!security);
    }
    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="text-3xl font-extrabold  text-indigo-600 dark:text-white">
                        Đăng ký
                    </h1>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
                        <form className="space-y-6">
                            <div className='grid grid-cols-2 gap-3'>
                                <div className="grid-cols-1">
                                    <label htmlFor="mssv" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Họ đệm</label>
                                    <div className="mt-1">
                                        <input placeholder='Nhập họ đệm' value={firstName} onChange={(e) => setFirstName(e.target.value)} onBlur={() => handleBlur({ field: "firstName", firstName: firstName })} type="text"
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                        />
                                        {<p style={{ color: 'red' }}>{errors.firstName}</p>}
                                    </div>
                                </div>
                                <div className="grid-cols-1">
                                    <label htmlFor="mssv" className="block text-sm font-medium text-gray-700 dark:text-white">
                                        Tên</label>
                                    <div className="mt-1">
                                        <input placeholder='Nhập tên' value={lastName} onChange={(e) => setLastName(e.target.value)} onBlur={() => handleBlur({ field: "lastName", lastName: lastName })} type="text"
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                        />
                                        {<p style={{ color: 'red' }}>{errors.lastName}</p>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2'>
                                    <label htmlFor="male" className="mr-4">Nam</label>
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value={"true"}
                                        checked={gender === "true"}
                                        onChange={(e) => { setGender(e.target.value); handleBlur({ field: "gender", gender: "true" }) }}
                                        className="mr-2"
                                    />
                                    <label className='ml-2' htmlFor="female">Nữ</label>
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value={"false"}
                                        checked={gender === "false"}
                                        onChange={(e) => { setGender(e.target.value); handleBlur({ field: "gender", gender: "false" }) }}
                                        className="mr-2"
                                    />
                                </div>
                                {<p style={{ color: 'red' }}>{errors.gender}</p>}
                            </div>


                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Email</label>
                                <div className="mt-1">
                                    <input placeholder='Nhập email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur({ field: "email", email: email })} type="text"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                    {<p style={{ color: 'red' }}>{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Ngày sinh</label>
                                <div className="mt-1">
                                    <input value={birthday} onChange={(e) => setBirthday(e.target.value)} onBlur={() => handleBlur({ field: "birthday", birthday: birthday })} type="date"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                    {<p style={{ color: 'red' }}>{errors.birthday}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="mssv" className="block text-sm font-medium text-gray-700 dark:text-white">
                                    Mã số sinh viên</label>
                                <div className="mt-1">
                                    <input placeholder='Nhập mã số sinh viên' value={mssv} onChange={(e) => setMssv(e.target.value)} onBlur={() => handleBlur({ field: "mssv", mssv: mssv })} type="text"
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                    {<p style={{ color: 'red' }}>{errors.mssv}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                                <div className="mt-1">
                                    <input placeholder='Nhập mật khẩu' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={() => handleBlur({ field: "password", password: password })} type={security ? 'password' : 'text'}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                    {<p style={{ color: 'red' }}>{errors.password}</p>}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cp-password" className="block text-sm font-medium text-gray-700 dark:text-white">Confirm Password</label>
                                <div className="mt-1">
                                    <input placeholder='Nhập xác nhận mật khẩu' value={cppassword} onChange={(e) => setCPPassword(e.target.value)} onBlur={() => handleBlur({ field: "cppassword", cppassword: cppassword, password: password })} type={security ? 'password' : 'text'}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                    {<p style={{ color: 'red' }}>{errors.cppassword}</p>}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <a className='text-blue-700 hover:text-blue-300 text-sm cursor-pointer' onClick={() => handleSecurity()} >
                                    {security ? 'Hiện mật khẩu' : 'Ẩn mật khẩu'}
                                </a>
                            </div>
                            <div>
                                <button onClick={(e) => handleSubmit(e)}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:border-transparent dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                    Đăng ký
                                </button>
                            </div>
                        </form>

                        <div className="m-auto mt-6 w-fit md:mt-8">
                            <span className="m-auto dark:text-gray-400">Đã có tài khoản?
                                <a className="font-semibold ml-1 text-indigo-600 dark:text-indigo-100" href="/login">Đăng nhập</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;