import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileInfo from '../components/profile/ProfileInfo'
import TestStaus from '../components/profile/TestStatus'
import AnswerRate from '../components/profile/AnswerRate'
import SutdyChart from '../components/profile/StudyChart'
import { Container, Grid, Box } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useState, useEffect,  } from 'react'
import { USER_INFO } from '../queries/queries'
function Profile() {

    const [userId, setUserId] = useState("");
    const {data: userData, loading: userLoading, error: userError} = useQuery((USER_INFO), {
        variables:{ID: null}
    });
    useEffect(() => {
        if(userData !== undefined && userData.profile.ownerId !== undefined) {
          setUserId(userData.profile.ownerId);
        }
    },[userData]);

    if(userLoading) return <p>Loading...</p>;
    if(userError) return <p>Error!</p>; 

    return(
        <div>
            <ProfileHeader />
            <Container maxWidth="lg">   
                <ProfileInfo userId={userId} />
                {/* <Box sx={{border:'1px solid #c4c4c4', marginTop:'20px'}}>
                    <Grid container spacing={1} sx={{marginTop:'20px'}}>
                        <Grid item xs={5}>
                            <TestStaus userId={userId} />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                            <AnswerRate />
                        </Grid>
                    </Grid>
                </Box> */}
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