import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const isReadPage = location.pathname.startsWith('/details/read/');
    return (
        <>{
            < div className={`${isReadPage ? `hidden ` : ' '} flex mt-10 bg-tblue items-center w-full justify-center h-20 text-white`}>
                <h3>Trung tam thu vien - Truong dai hoc Cong Nghiep TP.HCM </h3>
            </div >
        }</>
    );
};

export default Footer;