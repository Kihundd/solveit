import Logo from '../home/Logo';
import ProfileList from './ProfileList';
import {Link, Container, Grid} from "@mui/material";

function ProfileHeader() {
    return(
      <Container maxWidth="lg" sx={{borderBottom:'1px solid #c4c4c4', padding: '20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Link href="/" sx={{paddingTop: '10px'}}><Logo /></Link>
            </Grid>
            <Grid item xs={9}>
              <ProfileList />
            </Grid>
          </Grid>
        </Container>
    )
}
export default ProfileHeader