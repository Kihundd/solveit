import logo from '../Logo_Login.jpg';
import Logo from './Logo';
import Menu from './Menu';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import styled from '@emotion/styled';
import {useState} from 'react';
import { Routes, Route } from 'react-router-dom'
// import {Link, useNavigate } from 'react-router-dom'



function Header() {
    
    // let navigate =useNavigate();
    const [user, setUser] = useState({name: 'sungkihun'})

    return (
      <div>
        <Grid container spacing={0} >
          <Grid item xs={9}></Grid>
          <Grid item xs={1}>
            <Link href="/Login" underline="none" color="inherit">로그인</Link>
          </Grid>
          <Grid item xs={1}>
          <Link href="/SignUp" underline="none" color="inherit">회원가입</Link>
          </Grid>
          <Grid item xs={1}>
            <Link href="/Profile" underline="none" color="inherit">{user.name}</Link>
          </Grid>
        </Grid>

        <Grid container >
          <Grid item xs={4}>
            <Link href="/">
              <Logo></Logo>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Menu></Menu>
          </Grid>
        </Grid>
      </ div>

    )
}

export default Header