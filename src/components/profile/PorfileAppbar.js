import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useState, useEffect } from 'react';
import jsCookies from 'js-cookies';
import { useQuery } from '@apollo/client';
import { NICKNAME } from '../../queries/queries';
import Logo from '../home/Logo.js';
import Login from '../../pages/isLogin'
import { useNavigate } from 'react-router-dom';




const ProfileAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(0);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = () => {
    setAnchorElUser(null);
    setName(null);
    setIsLogin(false);
    jsCookies.removeItem('token');
    window.location.replace("/");
  }

  const {loading, error, data} = useQuery(NICKNAME, {
    variables: {ID: null}
  });

  useEffect(() => {
    if(Login()){
      if(data !== undefined && data.profile.nickname !== undefined) {
        setIsLogin(true);
        setName(data.profile.nickname);
        setRole(data.profile.role)
      }
    }
  }, [data]);
  
  
  return (

      <AppBar position="static" color='inherit' sx={{boxShadow: 'none', marginBottom: 5, borderBottom: '1px solid #c4c4c4'}}>
        <Container maxWidth="lg" >
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                <Logo/>
            </Typography>
            
            {/* 작은화면 */}
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                <Logo />
            </Typography>
            <Box >
                <Link href="/" underline="none" color="inherit" onClick={handleLogout} sx={{float: 'right', marginLeft: 7, my: 2, fontSize: 14}}>로그아웃</Link>
                <Link href="/MyCoupon" underline="none" color="inherit" sx={{float: 'right', marginLeft: 5, my: 2, fontSize: 14}}>쿠폰 관리</Link>
                <Link href="/Profile" underline="none" color="inherit" sx={{float: 'right', marginLeft: 5, my: 2, fontSize: 14}}>프로필 설정</Link>
            </Box>
            </Toolbar>
        </Container>
      </AppBar>
  );
};
export default ProfileAppBar;
