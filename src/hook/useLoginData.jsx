import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useLoginData = ({ token, mssv, login, setToken, setProfile, setMssv, isLogin }) => {
    useEffect(() => {
        const loginData = () => {
            const t = Cookies.get("token");
            const p = Cookies.get("profile");
            if (t && p) {
                setToken(t);
                setProfile(JSON.parse(p));
                setMssv(JSON.parse(p).mssv);
                console.log("mssv", JSON.parse(p).mssv);
                isLogin(true);
            } else {
                isLogin(false);
            }
        }
        loginData();
    }, [token, mssv, login, Cookies.get("token")]);
}

export default useLoginData;
