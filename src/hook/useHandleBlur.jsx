import { useState } from 'react';
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
    });
    let errorService = new ErrorMessage();
    let regexService = new RegexService();
    var currentDate = new Date();

    // Trừ đi 18 năm
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);
    var minimumBirthDate = year + '-' + month + '-' + day;
    const handleBlur = ({ field, mssv, password, cppassword, phone }) => {
        const newErrors = { ...errors };

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
                newErrors.firstName = errorService.error.lastName;
            } else {
                newErrors.lastName = "*";
            }
        }

        if (field === 'birthday') {
            if (!birthday) {
                newErrors.birthday = errorService.error.birthdayRequired;
            } else if (!birthday < minimumBirthDate) {
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
        setErrors({ ...newErrors });
    };

    return { handleBlur, errors };
};

export default useHandleBlur;
