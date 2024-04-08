import { useEffect, useState } from 'react';
import ErrorMessage from '../component/service/ErrorMessage';
import RegexService from '../component/service/RegexService';
var e = {
    mssv: "*",
    password: '*',
    cppassword: '*',
    phone: '*',
    email: '*',
    firstName: '*',
    lastName: '*',
    birthday: '*',
    image: "*",
    gender: "*"
};
const useHandleBlur = () => {
    const [errors, setErrors] = useState({
        mssv: "*",
        phone: '*',
        password: '*',
        cppassword: '*',
        email: '*',
        firstName: '*',
        lastName: '*',
        birthday: '*',
        image: "*",
        gender: "*"
    });
    let errorService = new ErrorMessage();
    let regexService = new RegexService();
    useEffect(() => {

    },[errors])
    const ngayHienTai = new Date();

    const handleBlur = ({ field, mssv, password, cppassword, phone, email, firstName, lastName, birthday, image, gender }) => {
        const newErrors = { ...e };

        if (field === 'mssv') {
            if (!mssv) {
                newErrors.mssv = errorService.error.mssvRequired;
            } else if (!regexService.regex.mssv.test(mssv)) {
                newErrors.mssv = errorService.error.mssv;
            } else {
                newErrors.mssv = "*";
            }
        }

        if (field === 'password') {
            if (!password) {
                newErrors.password = errorService.error.passwordRequired;
            } else if (!regexService.regex.password.test(password)) {
                newErrors.password = errorService.error.password;
            } else {
                newErrors.password = "*";
            }
        }

        if (field === 'phone') {
            if (!phone) {
                newErrors.phone = errorService.error.phoneRequired;
            } else if (!regexService.regex.phone.test(phone)) {
                newErrors.phone = errorService.error.phone;
            } else {
                newErrors.phone = "*";
            }
        }

        if (field === 'email') {
            if (!email) {
                newErrors.email = errorService.error.emailRequired;
            } else if (!regexService.regex.email.test(email)) {
                newErrors.email = errorService.error.email;
            } else {
                newErrors.email = "*";
            }
        }

        if (field === 'firstName') {
            if (!firstName) {
                newErrors.firstName = errorService.error.firstNameRequired;
            } else if (!regexService.regex.name.test(firstName)) {
                newErrors.firstName = errorService.error.firstName;
            }
            else {
                newErrors.firstName = "*";
            }
        }

        if (field === 'lastName') {
            if (!lastName) {
                newErrors.lastName = errorService.error.lastNameRequired;
            } else if (!regexService.regex.name.test(lastName)) {
                newErrors.lastName = errorService.error.lastName;
            } else {
                newErrors.lastName = "*";
            }
        }
        if (field === 'birthday') {
            const ngaySinh = new Date(birthday);
            const age = ngayHienTai.getFullYear() - ngaySinh.getFullYear();
            if (!birthday) {
                newErrors.birthday = errorService.error.birthdayRequired;
            } else if (age < 18) {
                newErrors.birthday = errorService.error.birthday;
            } else {
                newErrors.birthday = "*";
            }
        }

        if (field === 'image') {
            if (!image) {
                newErrors.image = errorService.error.imageRequired;
            } else {
                newErrors.image = "*";
            }
        }
        if (field === 'cppassword') {
            if (!cppassword) {
                newErrors.cppassword = errorService.error.cppasswordRequired;
            } else if (cppassword !== password) {
                newErrors.cppassword = errorService.error.cppassword;
            } else {
                newErrors.cppassword = "*";
            }
        }
        if (field === 'gender') {
            if (!gender) {
                newErrors.gender = errorService.error.genderRequired;
            } else {
                newErrors.gender = "*";
            }
        }
        e = { ...newErrors };
        setErrors({ ...newErrors });
    };

    return { handleBlur, errors };
};

export default useHandleBlur;
