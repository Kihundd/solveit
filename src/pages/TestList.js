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
                        <Box sx={{border: '2px solid #c4c4c4', height: '30vh', widthh: '30%'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <h5>문제집목록</h5>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={2}>
                                        <p>전체</p>
                                    </Grid>
                                    
                                </Grid>
                                
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '50vh'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{border:'1px solid #c4c4c4'}}>문제집 목록
                                    
                                    
                                    <Button size="small" variant="contained">
                                        <Link href="/CreateTest" underline="none" color="inherit">
                                            문제집 생성
                                        </Link>
                                    </Button>
                                   
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{border: '1px solid #c4c4c4'}}>
                                        <Grid container spacing={3}>
                                            <Grid item={12}></Grid>
                                            <Grid item={1}></Grid>
                                            <Grid item={3}>
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