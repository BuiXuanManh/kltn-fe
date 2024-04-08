import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useLoginData = ({ token, setToken, setProfile, setName, setMssv }) => {
    useEffect(() => {
        const loginData = () => {
            const t = Cookies.get("token");
            const p = Cookies.get("profile");
            const m = Cookies.get("mssv");
            if (t && p) {
                setToken(t);
                setProfile(JSON.parse(p));
                setName(JSON.parse(p).name ? JSON.parse(p).name : JSON.parse(p).firstName + " " + JSON.parse(p).lastName);
                setMssv(m);
            }
        }
        loginData();
    }, [token, Cookies.get("token")]);
}

export default useLoginData;
