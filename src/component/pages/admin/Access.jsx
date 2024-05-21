import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// Update this with the correct path
import { AiOutlineSelect } from 'react-icons/ai';
import { formatDate } from '../../service/DateService';
import { AppContext } from '../../../context/AppContext';
import AdminService from '../../service/AdminService';
import { Avatar } from '@mui/material';

const Access = () => {
    const [showActive, setShowActive] = useState([]);
    const { token } = useContext(AppContext);
    let service = new AdminService();
    const [users, setUsers] = useState([]);

    const handleActive = (id) => {
        setShowActive((pre) => [...pre, id]);
        handleActiveUser.mutate(id);
    };

    const handleRemove = (id) => {
        setShowActive((prev) => prev.filter((item) => item !== id));
        handleInActiveUser.mutate(id);
    }

    const getUser = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            if (token) {
                return service.getUsers(token)
                    .then((res) => {
                        if (res.data) {
                            setUsers(res.data);
                            const activeUsers = res.data.filter(user => user?.user?.status === "ACTIVE").map(user => user?.user?.id);
                            setShowActive(activeUsers);
                            return res.data;
                        }
                    })
                    .catch((err) => {
                        toast.error('Bạn không có quyền admin');
                        console.error(err);
                    });
            } else {
                toast.error('Vui lòng đăng nhập');
            }
        }
    });

    const [changeUsers, setChangeUsers] = useState([]);

    const handleCheckboxChange = (userId, roleName) => {
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) => {
                if (user?.user?.id === userId) {
                    user.user.role = roleName;
                }
                return user;
            });
            return updatedUsers;
        });
    };

    useEffect(() => {
        // Find the users whose roles have changed and update changeUsers
        setChangeUsers((prevChangeUsers) => {
            const updatedChangeUsers = users.filter((user) =>
                !prevChangeUsers.some((changedUser) => changedUser?.user?.id === user?.user?.id) ||
                prevChangeUsers.some((changedUser) => changedUser?.user?.id === user?.user?.id && changedUser.user.role !== user.user.role)
            );
            return [...prevChangeUsers, ...updatedChangeUsers];
        });
    }, [users]);

    const handleActiveUser = useMutation({
        mutationFn: (id) => {
            if (token) {
                return service.avtiveUser(token, id)
                    .then((res) => {
                        if (res.data) {
                            setUsers((prevUsers) => prevUsers.map((user) =>
                                user.user.id === id ? { ...user, user: { ...user.user, status: "ACTIVE" } } : user
                            ));
                            setShowActive((prev) => [...prev, id]);
                            return res.data;
                        }
                    })
                    .catch((err) => {
                        toast.error('Bạn không có quyền admin');
                        console.error(err);
                    });
            } else {
                toast.error('Vui lòng đăng nhập');
            }
        }
    });

    const handleInActiveUser = useMutation({
        mutationFn: (id) => {
            if (token) {
                return service.inAvtiveUser(token, id)
                    .then((res) => {
                        if (res.data) {
                            setUsers((prevUsers) => prevUsers.map((user) =>
                                user.user.id === id ? { ...user, user: { ...user.user, status: "LOCKED" } } : user
                            ));
                            setShowActive((prev) => prev.filter((item) => item !== id));
                            return res.data;
                        }
                    })
                    .catch((err) => {
                        toast.error('Bạn không có quyền admin');
                        console.error(err);
                    });
            } else {
                toast.error('Vui lòng đăng nhập');
            }
        }
    });

    const saveUsers = useMutation({
        mutationFn: () => {
            if (token) {
                return service.saveUser(token, changeUsers)
                    .then((res) => {
                        if (res.data) {
                            console.log(res.data);
                            setChangeUsers([]);
                            toast.success('Lưu thành công');
                            return res.data;
                        }
                    })
                    .catch((err) => {
                        toast.error('Bạn không có quyền admin');
                        console.error(err);
                    });
            } else {
                toast.error('Vui lòng đăng nhập');
            }
        }
    });

    const handleSave = () => {
        saveUsers.mutate();
    }

    console.log("changeUsers", changeUsers);

    return (
        <div className='md:mr-10 -ml-20'>
            <div className='pt-5s mt-5 rounded-lg justify-between items-center flex w-full dark:!bg-navy-800 dark:text-white'>
                <div className='h-14 flex items-center'>
                    <h2 className='text-2xl ml-4 pb-2 font-semibold border-b-4 !border-brand-600 dark:!border-brand-400'>
                        Danh sách tài khoản
                    </h2>
                </div>
            </div>
            <div className='pt-5s mt-5 rounded-lg justify-between items-center flex w-full dark:!bg-navy-800 dark:text-white'>
                <div className="relative ml-10 mb-10 mt-5 overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-navy-800">
                        <div className='flex items-center justify-center'>
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center p-2 ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="block pt-2 p-2 ps-10 text-sm text-gray-900 border-2 focus:outline-none border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-600 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                            </div>
                        </div>
                        <div>
                            <button onClick={handleSave} className='rounded-lg bg-green-500 p-2 text-white hover:bg-green-600'>
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">STT</th>
                                <th scope="col" className="px-6 py-3">mssv</th>
                                <th scope="col" className="px-6 py-3">Tên người dùng</th>
                                <th scope="col" className="px-6 py-3">Ngày tạo</th>
                                <th scope="col" className="px-6 py-3">Ngày cập nhập</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="p-4">Admin</th>
                                <th scope="col" className="p-4">User</th>
                                <th scope="col" className="px-6 py-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 && users?.map((user, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-300 hover:text-tblack dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900">
                                    <td className="px-6 py-4">
                                        <div className='text-gray-900 whitespace-nowrap dark:text-white'>{index + 1}</div>
                                    </td>
                                    <td className="px-6 py-4">{user?.user?.mssv}</td>
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <Avatar sx={{ width: 40, height: 40 }} src={user?.image} />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{user?.firstName} {user?.lastName}</div>
                                            <div className="font-normal text-gray-500">{user?.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{user?.user?.createAt ? formatDate(user?.user?.createAt) : ''}</td>
                                    <td className="px-6 py-4">{user?.user?.updateAt ? formatDate(user?.user?.updateAt) : ""}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full ${user?.user?.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"} me-2`}></div>
                                            <div>{user?.user?.status === "ACTIVE" ? "active" : "inactive"}</div>
                                        </div>
                                    </td>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input onChange={() => handleCheckboxChange(user?.user?.id, "ADMIN")} checked={user?.user?.role === "ADMIN"} type="radio" className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input onChange={() => handleCheckboxChange(user?.user?.id, "USER")} checked={user?.user?.role === "USER"} type="radio" className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className='flex items-center justify-center'>
                                            {showActive.includes(user?.user.id) ? (
                                                <div onClick={() => handleRemove(user?.user.id)} className="font-medium ml-2 flex items-center text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                                                    <AiOutlineSelect />
                                                    <div className='ml-1'>Remove</div>
                                                </div>
                                            ) : (
                                                <div onClick={() => handleActive(user?.user.id)} className="font-medium ml-2 flex items-center text-green-600 dark:text-green-500 hover:underline cursor-pointer">
                                                    <AiOutlineSelect />
                                                    <div className='ml-1'>Active</div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Access;