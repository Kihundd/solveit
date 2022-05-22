import Logo from './Logo';
import { Routes, Route, Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';

function ProfileHeader() {
    return(
      <div>
        <Grid container>
          <Grid item xs><Logo /></Grid>
          <Grid item xs={4} ></Grid>
          <Grid item xs={3}>
            프로필설정
          </Grid> 
          {/* {/* <Grid item xs={1}><Link href="/MyCoupon" underline="none" color="inherit">쿠폰 관리</Link></Grid>
          <Grid item xs={1}><button>로그아웃</button></Grid> */}
        </Grid>
        
        
      </div>
    )
}

export default ProfileHeader