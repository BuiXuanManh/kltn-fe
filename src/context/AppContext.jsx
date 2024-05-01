import React, { createContext, useState } from 'react';
export const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [mssv, setMssvContext] = useState("");
    const [profile, setProfile] = useState({});
    const [books, setBooks] = useState({});
    const [interactions, setInteractions] = useState([]);
    const [computedBook, setComputedBook] = useState({});
    const [computedPage, setComputedPage] = useState({});
    return (
        <AppContext.Provider value={{ token, setToken, mssv, setMssvContext, profile, setProfile, books, setBooks, interactions, setInteractions, computedBook, setComputedBook, computedPage, setComputedPage }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;