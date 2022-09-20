import Appbar from '../components/home/Appbar.js'
import { Grid, Box, Container, Button, Link } from '@mui/material'
import TestTable from '../components/TestTable'
import PageButton from '../components/PageButton'

function TestList() {

    return(
        <> 
            <Appbar />
            
            <Container maxWidth="md">
                <h5 style={{textAlign: 'left', marginLeft: '20px'}}>전체</h5>
                {/* <Box sx={{border: '2px solid #c4c4c4', height: '60vh'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <h4>문제집목록</h4>
                            </Grid>
                            <Grid item xs={5}></Grid>
                            <Grid item xs={6}>
                                <p>전체</p>
                            </Grid>
                        </Grid>
                </Box> */}
                <TestTable />
                <PageButton />
            </ Container>
        </>
    )
}

export default TestList