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
import Login, { removeToken } from '../route/isLogin'
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
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
    setIsLogin(false);console.log('logout')
    jsCookies.removeItem('token');
    window.location.replace("/");
  }

  const {loading, error, data} = useQuery(NICKNAME, {
    variables: {ID: null}
  });

  useEffect(() => {
    if(Login()){
      if(data !== undefined && data.profile === null) {
        removeToken();
        navigate('/login');
      }
      if(data !== undefined && data.profile.nickname !== undefined) {
        setIsLogin(true);
        setRole(data.profile.role)
      }
    }
  }, [data]);

  return (
      <AppBar position="static" color='inherit' sx={{boxShadow: 'none', mb:5, mt:1, borderBottom: '1px solid #c4c4c4'}}>
        <Container maxWidth="lg" >
            <Toolbar disableGutters>
              {role ? 
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/Admin"
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
            :<Typography
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
            }

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
                {role?
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
                    <Link href="/Admin" underline="none" color="inherit">경험치 설정</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/Report" underline="none" color="inherit">신고처리</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/Coupon" underline="none" color="inherit">쿠폰관리</Link>
                  </MenuItem>
                </Menu>

                :<Menu
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/Shop" underline="none" color="inherit">상점</Link>
                  </MenuItem>
                  

                </Menu>
            }   
            </Box>
            
            {/* 작은화면 */}
            {role ?
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/Admin"
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
            
            :<Typography
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
            }
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
              {role ?
              <>
              <Link href="/Admin" underline="none" color="inherit" sx={{marginLeft: 7, my: 2, fontSize: 14}}>경험치 설정</Link>
              <Link href="/Report" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>신고처리</Link>
              <Link href="/Coupon" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>쿠폰관리</Link>
              </>
              :<>
              <Link href="/TestList" underline="none" color="inherit" sx={{marginLeft: 7, my: 2, fontSize: 14}}>문제목록</Link>
              <Link href="/CreateTest" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>문제생성</Link>
              <Link href="/MyTestList" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>문제관리</Link>
              <Link href="/Forum" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>게시판</Link>
              <Link href="/Ranking" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>랭킹</Link>
              <Link href="/Shop" underline="none" color="inherit" sx={{marginLeft: 5, my: 2, fontSize: 14}}>상점</Link>
              </> }
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
                      {role ? null
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