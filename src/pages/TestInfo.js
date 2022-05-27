import Header from "../components/Header"
import { Container, Grid, Box, Button, Link } from "@mui/material"
import { useQuery } from "@apollo/client"
import TEST_INFO from '../queries/queries'
import TestTable from "../components/TestTable"
import { useState } from "react"

function TestInfo() {

    // const {data, loading, error} = useQuery(TEST_INFO, {
    //     variables:{ID: }
    // });
    
    // const [content, setContent] = useState(false);
    
   
    return (
        <>
            <Header />
            
            <Container maxWidth="md">
                <Box sx={{border: '2px solid #c4c4c4', height: '40vh'}}>
                    <Grid container>
                        <Grid item xs={3}><h4>{/*data.name*/}문제 내용</h4></Grid>
                        <Grid item xs={9}></Grid>
                        <Grid item xs={3}><p>{/*data.content*/}문제설명</p></Grid>
                        <Grid item xs={9}></Grid>
                        <Grid item xs={9}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={12} sx={{height: '20vh'}}></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={9}></Grid>
                        <Grid item xs={3}>
                            <Button href='/Test/0' variant="contained" underline="none" color="primary">
                                Test응시
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            
        </>
    )
}

export default TestInfo