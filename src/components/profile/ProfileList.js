import {Link, Container, Grid} from "@mui/material";
import { useState } from "react";
import jsCookies from 'js-cookies';

function ProfileList() {

    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const handleLogout = () => {
        setName(null);
        setIsLogin(false);
        jsCookies.removeItem('token');
    }
    return (
        <>      
            <Link href="/" underline="none" color="inherit" onClick={handleLogout} sx={{float: 'right', margin: 2}}>로그아웃</Link>                  
            <Link href="/MyCoupon" underline="none" color="inherit" sx={{float: 'right', margin: 2}}>쿠폰관리</Link>
            <Link href="/Profile" underline="none" color="inherit" sx={{float: 'right', margin: 2}}>프로필설정</Link>
        </>
    )
}
export default ProfileList