import Appbar from '../components/home/Appbar.js';
import { Grid, Box, Container, Button, Link, Stack, Divider } from '@mui/material'
import MyTestTable from '../components/mytest/MyTestTable'
import { useState } from 'react';
import { useEffect } from 'react';
import { MYTEST, MY_LIKE_LIST, MY_CREATE_LIST, USER_INFO } from '../queries/queries.js';
import { useLazyQuery, useQuery } from '@apollo/client';

function MyTestList(){

    const [userId, setUserId] = useState();
    const [testList, setTestList] = useState(); 
    const [cnt, setCnt] = useState(1);
    const {loading:userLoading, error:userError, data:userData} = useQuery(USER_INFO, {
        variables: {ID: null}
    });
    const {loading, error, data} = useQuery(MYTEST)
    const [getSolvingTest] = useLazyQuery(MYTEST);
    const {data: likeData, loading: likeLoading, error: likeError} = useQuery(MY_LIKE_LIST);
    const [getLikeTest] = useLazyQuery(MY_LIKE_LIST);
    const [getCreateTest] = useLazyQuery(MY_CREATE_LIST);

    useEffect(() => {
      if(userData !== undefined){
        setUserId(userData.profile.ownerId)
      }
    }, [userData])

    useEffect(()=>{
        if(data !== undefined && data.mySolvingTests !== undefined){
            setTestList(data.mySolvingTests)
            setCnt(Math.ceil(data.mySolvingTests.length / 10))
        }
    },[data])

    const handleAllTest = async () => {
        const response = await getSolvingTest(MYTEST);
        setTestList(response.data.mySolvingTests)
        setCnt(Math.ceil(response.data.mySolvingTests.length / 10))
    }
    const handleCreateTest = async () => {
        const response = await getCreateTest({variables: {id: userId}});
        setTestList(response.data.testsByCreator)
        setCnt(Math.ceil(response.data.testsByCreator.length / 10))

    }
    const handleLikeTest = async () => {
        const response = await getLikeTest(MY_LIKE_LIST);
        setTestList(response.data.myLikeTests)
        setCnt(Math.ceil(response.data.myLikeTests.length / 10))
    }

    return(
        <>
            <Appbar />
            <Container maxWidth="lg" className='bodyContainer'>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    sx={{mb: 2}}
                >
                    <Button size='small' variant='standard' color="info" onClick={handleAllTest}>내가 푼 문제</Button>
                    <Button size='small' variant='standard' color="info" onClick={handleCreateTest}>내가 만든 문제</Button>
                    <Button size='small' variant='standard' color="info" onClick={handleLikeTest} >좋아요한 문제</Button>
                </Stack>
                <MyTestTable testList={testList} page={cnt}  />
            </ Container>
        </>
    )
}
export default MyTestList