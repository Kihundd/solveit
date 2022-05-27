import Logo from '../home/Logo';
import ProfileList from './ProfileList';
import {Link, Container, Grid} from "@mui/material";

function ProfileHeader() {
    return(
      <Container maxWidth="xl" sx={{borderBottom:'2px solid #c4c4c4'}}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Link href="/">
                <Logo></Logo>
              </Link>
            </Grid>
            <Grid item xs={9}>
              <ProfileList />
            </Grid>
          </Grid>
        </Container>
    )
}
export default ProfileHeader