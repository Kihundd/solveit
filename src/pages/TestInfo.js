import Header from "../components/home/Header"
import { Container, Grid, Box, Button, Rating, Stack } from "@mui/material"
import { useQuery, useMutation } from "@apollo/client"
import { TEST_INFO } from "../queries/queries"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { LIKE_TEST, UNLIKE_TEST, DIFFICULTY, TAKE_TEST } from "../queries/queries"
import { UpdateSharp } from "@mui/icons-material"

function TestInfo() {
    const [liked, setLiked] = useState(false)
    const params = useParams();
    const [difficultyNum, setDifficultyNum] = useState(0);
    const [dificlutyView, setDifficultyView] = useState(false)
    const {data, loading, error} = useQuery(TEST_INFO, {
        variables:{id: params.testId}
    });
    const {data: TestData, loading:TestLoading, error:TestError} = useQuery(TAKE_TEST,{
        variables: {id: params.testId}
    })
    const [like, {data:likeData, loading:likeLoading, error:likeError}] = useMutation(LIKE_TEST,{
        variables: {id: params.testId}
    })
    const [unLike, {data:unLikeData, loading:unLikeLoading, error:unLikeError}] = useMutation(UNLIKE_TEST,{
        variables: {id: params.testId}
    })
    const [selectDifficulty,{data:difficultyData, loading:difficultyLoading, error:difficultyError}] = useMutation(DIFFICULTY,{
        variables: {questionId: 33, difficulty:difficultyNum}
    })

    const handleClick = async ()=>{
        if(liked == false){
            const response = like({variables:{id: params.testId}})

            console.log(likeData)
            setLiked(true)
        }
        else if(liked == true){
            const response = unLike({variables:{id: params.testId}})
            setLiked(false)
        } 
    }
    
    const handleDifficulty = async ()=> {
        const response = selectDifficulty({variables:{questionId:34, difficulty:difficultyNum}})

    }
    console.log(difficultyData)
    const handleDifficultyView = e => {
        setDifficultyView(!dificlutyView)

    }
    // console.log(dificlutyView)
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;
    
    
    return (
        <>
            <Header />
            
            <Container maxWidth="md">
                <Box sx={{border: '2px solid #c4c4c4', height: '42vh'}}>
                    <Box sx={{border: '2px solid #c4c4c4', height: '10vh'}}>
                        <Grid container>
                            <Grid item xs={4}><h4>{/*data.id*/}{/*data.name*/}테스트 번호. 문제 이름</h4></Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={2}><h5>{/*data.ownerId*/}출제자</h5></Grid>
                            <Grid item xs={2}><h5>{/*data.tryCnt*/}제출 수</h5></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>{data.test.id}.{data.test.name}</Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={2}>{data.test.ownerId}</Grid>
                            <Grid item xs={2}>{data.test.tryCnt}</Grid>
                        </Grid>
                    </Box>
                    <Box sx={{border: '2px solid #c4c4c4', height: '30vh', marginTop: '1vh'}}>
                        <Grid container>
                            <Grid item xs={3}><h4>문제설명</h4></Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {data.test.content}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Grid container sx={{marginTop: '1vh'}}>
                <Grid item xs={6}>
                        {
                        (dificlutyView == true) &&
                            <Box sx={{border: '2px solid #c4c4c4', height: '5vh'}}>
                                <Stack spacing={1}>
                                    <Rating 
                                    name="half-rating" 
                                    value={difficultyNum} 
                                    onChange={(e)=>{
                                        setDifficultyNum(Number(e.target.value))
                                        console.log(difficultyNum)
                                    }}

                                    />
                                </Stack>
                                <Button variant="contained" underline="none" color="primary" onClick={handleDifficulty}>

                                확인</Button>
                            </Box>
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" underline="none" color="primary" onClick={handleDifficultyView}>>
                            난이도측정
                        </Button>
                    </Grid>

                    
                    <Grid item xs={2}>
                        <Button variant="contained" underline="none" color="primary" onClick={handleClick}>
                            좋아요
                        </Button>
                        </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained">
                            <Link to={`/Test/${params.testId}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                                Test응시
                            </Link>
                        </Button>
                        
                    </Grid>
                </Grid>
            </Container>
            
        </>
    )
}

export default TestInfo