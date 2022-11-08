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
import Logo from './Logo.js';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#whilte',
      },
    },
  });


const settings = ['프로필', '로그아웃'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(0);

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
  // console.log(isLogin)
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
    if(data !== undefined && data.profile.nickname !== undefined) {
      setIsLogin(true);
      setName(data.profile.nickname);
      setRole(data.profile.role)
    }
  }, [data]);
  // console.log(data)

  
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
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                <Logo/>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/TestList" underline="none" color="inherit">문제목록</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/CreateTest" underline="none" color="inherit">문제생성</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/MyTestList" underline="none" color="inherit">문제관리</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/Forum" underline="none" color="inherit">게시판</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/Ranking" underline="none" color="inherit">랭킹</Link>
                  </MenuItem>

                </Menu>
            </Box>
            {/* 작은화면 */}
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
              <Link href="/TestList" underline="none" color="inherit" sx={{marginLeft: 7, my: 2, fontSize: 14}}>문제목록</Link>
              <Link href="/CreateTest" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>문제생성</Link>
              <Link href="/MyTestList" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>문제관리</Link>
              <Link href="/Forum" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>게시판</Link>
              <Link href="/Ranking" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>랭킹</Link>
            </Box>
              {
                isLogin ? 
                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <PersonOutlineIcon fontSize='large' />
                    </IconButton>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                      {role ? <MenuItem onClick={handleCloseUserMenu}>
                                <Link href="/Admin" underline="none" color="inherit">신고처리</Link>
                              </MenuItem>
                            : <MenuItem onClick={handleCloseUserMenu}>
                                <Link href="/Profile" underline="none" color="inherit">프로필</Link>
                              </MenuItem>
                      }
                      <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                    </Menu>
                </Box> : 
                <>
                    <Link href="/Login" underline="none" color="inherit" sx={{fontSize: 13}}>로그인</Link>
                    <Link href="/SignUp" underline="none" color="inherit" sx={{marginLeft: '15px', fontSize: 13}}>회원가입</Link>
                </>
              }
            </Toolbar>
        </Container>
      </AppBar>
  );
};
export default ResponsiveAppBar;