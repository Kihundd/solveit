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
        <Container maxWidth="xl">
            <Grid container spacing={3} sx={{marginTop:'40px;'}}>
                    <Grid item xs={6}>
                        <Link href="/TestList" underline="none" color="inherit"></Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link href="/Profile" underline="none" color="inherit">프로필설정</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link href="/MyCoupon" underline="none" color="inherit">쿠폰관리</Link>
                    </Grid>
                    <Grid item xs={2}>
                        <Link href="/" underline="none" color="inherit" onClick={handleLogout}>로그아웃</Link>
                    </Grid>
                </Grid>
        </Container>
    )
}
export default ProfileList