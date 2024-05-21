import React, { createContext, useEffect, useState } from 'react';
export const AppContext = createContext();
import Cookies from 'js-cookie';
const AppProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [mssv, setMssvContext] = useState("");
    const [profile, setProfile] = useState({});
    const [books, setBooks] = useState({});
    const [interactions, setInteractions] = useState([]);
    const [computedBook, setComputedBook] = useState({});
    const [computedPage, setComputedPage] = useState({});
    useEffect(() => {
        const loginData = () => {
            const t = Cookies.get("token");
            const p = Cookies.get("profile");
            const u = Cookies.get("mssv");
            if (t && p && u) {
                setToken(t);
                setProfile(JSON.parse(p));
                setMssvContext(u);
            }
        }
        loginData();
    }, [token, Cookies.get("token")]);
    return (
        <AppContext.Provider value={{ token, setToken, mssv, setMssvContext, profile, setProfile, books, setBooks, interactions, setInteractions, computedBook, setComputedBook, computedPage, setComputedPage }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;