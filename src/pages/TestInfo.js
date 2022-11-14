import Appbar from "../components/home/Appbar.js";
import { Container, Grid, Box, Button, Rating, Stack, Dialog, DialogActions, DialogTitle, DialogContent, Table, TableHead, TableBody, TableCell, TableRow  } from "@mui/material"
import { useQuery, useMutation } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { LIKE_TEST, UNLIKE_TEST, DIFFICULTY, TAKE_TEST, TEST_INFO, GET_TAG, GETLIKE, USER_INFO } from "../queries/queries"
import { UpdateSharp } from "@mui/icons-material"
import CreateTag from "../components/tag/CreateTag.js";
import CreateReport from "../components/report/CreateReport";
import Like from "../components/like/Like";

function TestInfo() {
    const [liked, setLiked] = useState(false);
    const params = useParams();
    const [tag, setTag] = useState();
    const [userId, setUserId] = useState('');
    
    const {data, loading, error} = useQuery(TEST_INFO, {
        variables:{id: params.testId}
    });
    // console.log(data)
    const {data: TestData, loading:TestLoading, error:TestError} = useQuery(TAKE_TEST,{
        variables: {id: params.testId}
    })
    // const [like, {data:likeData, loading:likeLoading, error:likeError}] = useMutation(LIKE_TEST,{
    //     variables: {id: params.testId}
    // })
    // const [unLike, {data:unLikeData, loading:unLikeLoading, error:unLikeError}] = useMutation(UNLIKE_TEST,{
    //     variables: {id: params.testId}
    // })
    const {data: TagData, loading: TagLoading, error: TagError} = useQuery(GET_TAG, {
        variables: {testId: params.testId}
    })
    const {data: userData, loading: userLoading, error: userError} = useQuery((USER_INFO), {
        variables:{ID: null}
    });
    // console.log(TagData)
    // const {data: getLikeData, loading: getLikeLoading, error: getLikeError} = useQuery(GETLIKE,{
    //     variables: {testId: params.testId, userId: userId}
    // })
    // console.log(getLikeData)

    // useEffect(() => {
    //     if(TagData !== undefined) {
    //         setTag(TagData)
    //         console.log(tag)
    //     }
    // }, [TagData])

    useEffect(() => {
        if(userData !== undefined && userData.profile.ownerId !== undefined) {
          setUserId(userData.profile.ownerId);
        }
    },[userData]);

    // useEffect(() => {
    //     if(getLikeData !== undefined && getLikeData.Like !== undefined) {
    //       setLiked(getLikeData.Like);
    //     }
    // },[getLikeData]);

    // const handleClick = async ()=>{
    //     if(liked == false){
    //         const response = like({variables:{id: params.testId}})
    //         console.log(likeData)
    //         setLiked(true)
    //     }
    //     else if(liked == true){
    //         const response = unLike({variables:{id: params.testId}})
    //         console.log(unLikeData)
    //         setLiked(false)
    //     } 
    // }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;
    
    return (
        <>
            <Appbar />
            <Container maxWidth="md">
                <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign: 'center'}}>테스트번호</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>문제집이름</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>출제자</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>난이도</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>제출 수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{textAlign: 'center'}}>{data.test.id}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{data.test.name}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{data.test.ownerId}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>난이도</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{data.test.tryCnt}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px', marginTop: 2}}>
                    <p style={{textAlign: 'left', marginLeft: '50px'}}>문제설명</p>
                    <p style={{padding: '50px'}}>{data.test.content}</p>
                </Box>
                <Button variant="contained" sx={{float: 'right', marginLeft: 2, marginTop: '10px'}} size='small'>
                    <Link to={`/Test/${params.testId}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                        Test응시
                    </Link>
                </Button>
                {/* <Like userId={userId} /> */}
                {/* <CreateTag /> */}
                {/* <Difficulty /> */}
            </Container>
        </>
    )
}

export default TestInfo

