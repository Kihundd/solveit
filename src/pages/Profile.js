import ProfileHeader from '../components/ProfileHeader'
import ProfileInfo from '../components/ProfileInfo'
import TestStaus from '../components/TestStatus'
import AnswerRate from '../components/AnswerRate'
import SutdyChart from '../components/StudyChart'
import Grid from '@mui/material/Grid';

function Profile() {
    return(
        <div>
            <ProfileHeader />
            <div style={{width:"80%", margin:"0 auto", border: "2px solid #c4c4c4"}}>
                <div>
                    <h6>프로필 정보</h6>
                    <ProfileInfo></ProfileInfo>
                </div>
                <div style={{borderTop: "2px solid #c4c4c4"}}>
                    <Grid container >
                        <Grid item xs={2}></Grid>
                        <Grid item xs={3}>
                            <TestStaus />
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}>
                            <AnswerRate />
                        </Grid>
                    </Grid>
                </div>
                <div style={{borderTop: "2px solid #c4c4c4"}}>
                    <Grid container>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}>
                            {/* <SutdyChart /> */}
                        </Grid>
                    </Grid>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile