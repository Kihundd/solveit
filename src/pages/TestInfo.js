import Header from "../components/home/Header"
import { Container, Grid, Box, Button } from "@mui/material"
import { useQuery } from "@apollo/client"
import { TEST_INFO } from "../queries/queries"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"

function TestInfo() {
    const [liked, setLiked] = useState(false)
    const params = useParams();
    const {data, loading, error} = useQuery(TEST_INFO, {
        variables:{id: params.testId}
    });

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    const handleLiked = ()=>{
        setLiked(!liked)
        console.log(liked)
    }
    
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
                    <Grid item xs={6}></Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" underline="none" color="primary">
                            난이도측정
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" underline="none" color="primary" onClick={handleLiked}>
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