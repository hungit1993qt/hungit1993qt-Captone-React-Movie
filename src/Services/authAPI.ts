import { LoginValues } from '../Interface/loginValue';
import axiosClient from './axiosClient';
import {RegisterValue} from 'Interface/register'


const authAPI = {
    postUserLogin: ({ taiKhoan, matKhau }: LoginValues) => {
        return axiosClient.post("QuanLyNguoiDung/DangNhap", {
            taiKhoan, matKhau
        });
    },
    postRegisterUser:(registerValue:RegisterValue) =>{
        return axiosClient.post("QuanLyNguoiDung/DangKy",registerValue)
    }
}

export default authAPI;



// data  trả về có phải là loginValues đâu