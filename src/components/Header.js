import Logo from './Logo';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { NICKNAME } from '../queries/queries';
import Button from '@mui/material/Button';
import { stepConnectorClasses } from '@mui/material';
import jsCookies from 'js-cookies';
import MenuList from './MenuList'

// import {Link, useNavigate } from 'react-router-dom'



function Header() {
    
    // let navigate =useNavigate();
    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      setAnchorEl(null);
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
      }
    }, [data]);

    return (
      <div>
        <Grid container spacing={0} >
          <Grid item xs={5}></Grid>
          {
            isLogin?
              <>
                <Grid item xs={1}>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {name}
                  </Button>
                  <Menu 
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  > 
                    <MenuItem onClick={handleClose}>
                      <Link href="/Profile" underline="none" color="inherit">프로필</Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                  </Menu>
                </Grid>
              </>:
              <>
                <Grid item xs={1}>
                  <Link href="/Login" underline="none" color="inherit">로그인</Link>
                </Grid>
                <Grid item xs={1}>
                  <Link href="/SignUp" underline="none" color="inherit">회원가입</Link>
                </Grid>
              </>
          }
          {/* <Grid item xs={1}>
            <Link href="/MyCoupon" underline="none" color="inherit">myCoupons</Link>
          </Grid> */}
        </Grid>

        <Grid container >
          <Grid item xs={4}>
            <Link href="/">
              <Logo></Logo>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <MenuList></MenuList>
          </Grid>
        </Grid>
      </ div>

    )
}

export default Header