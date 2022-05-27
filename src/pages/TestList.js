import Header from '../components/Header'
import { Grid, Box, Container, Button, Link } from '@mui/material'
import TestTable from '../components/TestTable'
import PageButton from '../components/PageButton'

function TestList() {


    return(
        <> 
            <Header />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '40vh'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={7}>
                                        <h4>문제집목록</h4>
                                    </Grid>
                                    <Grid item xs={5}></Grid>
                                    <Grid item xs={6}>
                                        <p>전체</p>
                                    </Grid>
                                </Grid>
                       
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '50vh'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>문제집 목록</Grid>
                                <Grid item xs={6}></Grid>
                                <Grid item xs={3}>
                                    <Button size="small" variant="contained">
                                        <Link href="/CreateTest" underline="none" color="inherit">
                                            문제집 생성
                                        </Link>
                                    </Button>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box sx={{border: '1px solid #c4c4c4'}}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={3}>
                                                <h5>전체</h5>
                                            </Grid>
                                        </Grid>
                                        <TestTable />
                                        <PageButton />
                                    </Box>
                                </Grid>      
                             
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </ Container>

        </>

    )
}

export default TestList