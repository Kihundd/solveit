import Appbar from '../components/home/Appbar.js';
import { Grid, Box, Container, Button, Link } from '@mui/material'
import MyTestTable from '../components/mytest/MyTestTable'
import PageButton from '../components/PageButton'

function MyTestList(){
    return(
        <>
            <Appbar />
            <Container maxWidth="lg" className='bodyContainer'>
                <Grid container>
                    <Grid item xs={2} sx={{mt:1, mb: 2}}>내가 푼 문제집</Grid>
                </Grid>
                {/* <h5 style={{textAlign: 'left', marginLeft: '20px'}}>내가푼 문제집</h5> */}
                <MyTestTable />
            </ Container>
        </>
    )
}
export default MyTestList