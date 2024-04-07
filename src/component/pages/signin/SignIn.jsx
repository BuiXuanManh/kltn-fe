/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AccountService from '../../service/AccountService';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isToken, setIsToken] = useState(false)
    const [isProfile, setIsProfile] = useState(false)
    // const [shouldAutoRefresh, setShouldAutoRefresh] = useState(true);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const service = new AccountService();

    const token = useQuery({
        queryKey: ["token"],
        queryFn: async () => {
            if (username && password) {
                const data = await service.login({ username, password });
                console.log(data)
                if (data) {
                    return data;
                }
            }

        },
        onSuccess: (data) => {
            if (data) {
                console.log(data);
                console.log(data.accessToken);
                // queryClient.setQueryData(["token"], { data });
                // setShouldAutoRefresh(false);
                queryClient.refetchQueries(["token"]);
            }
            // queryClient.invalidateQueries("token");
        }, onSettled: (data, error) => {
            if (data) {
                console.log("data:", data);
            }
            if (error) {
                console.error("error:", error);
            }
            queryClient.refetchQueries(["token"]);
            // queryClient.invalidateQueries("profile");
        }, onError: (error) => {
            console.error("Error:", error);
        }, enabled: !!isToken,
        gcTime: 600000,
        // refetchInterval: shouldAutoRefresh ? 1000 : false,
    });
    // console.log("token", token);

    const profile = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const token = queryClient.getQueryData(["token"]);
            console.log("data token", token);
            if (token) {
                // console.log("data token", token.data.accessToken);
                const service = new AccountService();
                console.log("token", token.data.accessToken);
                const data = await service.getProfile(token.data.accessToken);
                console.log("data profile", token.data.accessToken);
                Cookies.set("token", token.data.accessToken);

                if (data) {
                    // console.log("p data", data);
                    Cookies.set("profile",  JSON.stringify(data.data));
                    return data;
                }
            }

        },
        enabled: !!isProfile,
        onSuccess: (data) => {
            if (data) {
                console.log(data);
            }
        },
        onSettled: (data, error) => {
            if (data) {
                console.log("data:", data);
            }
            if (error) {
                console.error("error:", error);
            }
            // queryClient.invalidateQueries("profile");
        }, onError: (error) => {
            console.error("Error:", error);
        },
        cacheTime: 600000,
        // , refetchInterval: 1000
    });
    useEffect(() => {
        if (token?.data) {
            console.log("token", token.data);
            handleGetProfile();
            console.log("profile", profile.data);
            if (profile?.data) {
                navigate("/");
            }
        }
    }, [token.data, profile.data])
    const handleGetToken = () => {
        setIsToken(true);
    }
    const handleGetProfile = () => {
        setIsProfile(true);
    }
    const login = (e) => {
        e.preventDefault();
        handleGetToken();
        queryClient.invalidateQueries(["token"]);
        const data = queryClient.getQueryData(["token"]);
        // profile.mutate();
        // console.log("token", token);
        // console.log("profile", profile);
        // console.log(t.data);

    };
    return (
        <div className="bg-gray-50 dark:bg-gray-800">
            <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Sign in
                    </h1>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
                        <form className="space-y-6">
                            <div>
                                <label for="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email address /
                                    MSSV</label>
                                <div className="mt-1">
                                    <input id="email" type="text" data-testid="username" required="" onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                                <div className="mt-1">
                                    <input id="password" name="password" type="password" data-testid="password"
                                        autocomplete="current-password" required="" onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 disabled:cursor-wait disabled:opacity-50" />
                                    <label for="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-white">Remember me</label>
                                </div>
                                <div className="text-sm">
                                    <a className="font-medium text-indigo-400 hover:text-indigo-500" href="">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button onClick={(e) => login(e)}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:border-transparent dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </span>
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <div className="m-auto mt-6 w-fit md:mt-8">
                            <span className="m-auto dark:text-gray-400">Don't have an account?
                                <a className="ml-1 font-semibold text-indigo-600 dark:text-indigo-100" href="/register">Create Account</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignIn;