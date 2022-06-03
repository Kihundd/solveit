import Header from '../components/home/Header'
import { Grid, Box, Container, Button, Link } from '@mui/material'
import MyTestTable from '../components/MyTestTable'
import PageButton from '../components/PageButton'

function MyTestList(){
    return(
        <>
            <Header></Header>
            <Container maxWidth="xl" className='bodyContainer'>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Box sx={{border: '2px solid #c4c4c4', height: '60vh'}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={7}>
                                            <h4>내가 푼 문제집</h4>
                                        </Grid>
                                    </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box sx={{border: '2px solid #c4c4c4', height: '60vh'}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={3} sx={{marginLeft:'20px'}}>
                                                <h4>내가푼 문제집</h4>
                                            </Grid>
                                        </Grid>
                                        <MyTestTable />
                                        {/* <PageButton /> */}
                                    </Grid>
                                    
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </ Container>
            </>
    )
}
export default MyTestList