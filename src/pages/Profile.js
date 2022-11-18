import ProfileAppBar from '../components/profile/PorfileAppbar'
import ProfileInfo from '../components/profile/ProfileInfo'
import TestStaus from '../components/profile/TestStatus'
import AnswerRate from '../components/profile/AnswerRate'
import { Container, Grid, Box, Stack } from '@mui/material'
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
    console.log(userData)

    if(userLoading) return <p>Loading...</p>;
    if(userError) return <p>Error!</p>; 

    return(
        <div>
            <ProfileAppBar />
            <Container maxWidth="md">   
                <ProfileInfo userData={userData}/>
                <Stack direction="row" justifyContent="space-between" spacing={2} sx={{mt: 2}}>
                    <Box sx={{padding:'20px', border: '1px solid #c4c4c4', borderRadius: '4px', width: '350px'}}>
                        <h3 style={{textAlign:'left'}}>채점 현황</h3>
                        <TestStaus solvingData={[userData.profile.solveCount, userData.profile.correctCount]} />
                    </Box>
                    <Box sx={{padding:'20px', border: '1px solid #c4c4c4', borderRadius: '4px', marginTop: '20px', float: 'right', width: '400px'}}>
                        <h3 style={{textAlign:'left'}}>정답률</h3>
                        <AnswerRate solvingData={[userData.profile.solveCount, userData.profile.correctCount]}  />
                    </Box>
                </Stack>
         
                {/* <Box sx={{ borderRadius: '4px', border: '1px solid #c4c4c4', marginTop:'20px', marginBottom: 10, padding: '30px'}}></Box> */}
                <div style={{height: '100px'}}>
                </div>
            </Container>
        </div>
    )
}

export default Profile