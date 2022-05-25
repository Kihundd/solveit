import Logo from './Logo';
import { Routes, Route, Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import ProfileList from './ProfileList';

function ProfileHeader() {
    return(
      <div className='PHeader'>
        <Grid container>
          <Grid item xs={4}>
            <Link to="/">
              <Logo></Logo>
            </Link>
              
          </Grid>
          <Grid item xs={3} ></Grid>
          <Grid item xs={5}>
            <ProfileList />
          </Grid> 
          {/* {/* <Grid item xs={1}><Link href="/MyCoupon" underline="none" color="inherit">쿠폰 관리</Link></Grid>
          <Grid item xs={1}><button>로그아웃</button></Grid> */}
        </Grid>
        
        
      </div>
    )
}

export default ProfileHeader