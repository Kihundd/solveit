import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileInfo from '../components/profile/ProfileInfo'
import TestStaus from '../components/profile/TestStatus'
import AnswerRate from '../components/profile/AnswerRate'
import SutdyChart from '../components/profile/StudyChart'
import { Container, Grid, Box } from '@mui/material';

function Profile() {
    return(
        <div>
            <ProfileHeader />
            <Container maxWidth="lg">   
                <ProfileInfo></ProfileInfo>
                <Box sx={{border:'1px solid #c4c4c4', marginTop:'20px'}}>
                    <Grid container spacing={1} sx={{marginTop:'20px'}}>
                        <Grid item xs={5}>
                            <TestStaus />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                            <AnswerRate />
                        </Grid>
                    </Grid>
                </Box>
                {/* <div style={{borderTop: "2px solid #c4c4c4"}}>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}>
                            <SutdyChart />
                        </Grid>
                    </Grid>
                    
                </div> */}
            </Container>
        </div>
    )
}

export default Profile