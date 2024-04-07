export default class ErrorMessage {
    constructor() {
        this.error = {
            mssv: "Mã số sinh viên không hợp lệ",
            mssvRequired: "Mã số sinh viên không được để trống",
            birthdayRequire: "Ngày sinh không được để trống",
            birthday: "Tuổi phải lớn hơn 18",
            cppassword: "Xác nhận mật khẩu phải trùng với mật khẩu",
            cppasswordRequired: "Mật khẩu không được để trống",
            phone: "Số điện thoại phải gồm 10 số và bắt đầu bằng 09, 03, 07, 08, 05",
            phoneRequired: "Số điện thoại không được để trống",
            email: "Email không hợp lệ",
            emailRequired: "Email không được để trống",
            password: "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số, một ký tự đặc biệt và từ 8-32 ký tự",
            passwordRequired: "Mật khẩu không được để trống",

            firsName: "Họ đệm phải ít nhất 2 chữ trở lên",
            lastName: "Tên phải ít nhất 2 chữ trở lên",
            firstRequired: "Họ đệm không được để trống",
            lastRequired: "Tên không được để trống",
            

            address: "Địa chỉ không hợp lệ",
            number: "Số không hợp lệ",
            date: "Ngày không hợp lệ",
            time: "Thời gian không hợp lệ",
            url: "Url không hợp lệ",
            image: "Ảnh không hợp lệ"
        }
    }
}