import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useLoginData = ({ token, setToken, setProfile, setName, setUser }) => {
    useEffect(() => {
        const loginData = () => {
            const t = Cookies.get("token");
            const p = Cookies.get("profile");
            const u = Cookies.get("user");
            if (t && p && u) {
                setToken(t);
                setProfile(JSON.parse(p));
                setName(JSON.parse(p).name ? JSON.parse(p).name : JSON.parse(p).firstName + " " + JSON.parse(p).lastName);
                setUser(JSON.parse(u));
            }
        }
        loginData();
    }, [token, Cookies.get("token")]);
}

export default useLoginData;
