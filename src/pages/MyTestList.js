import Appbar from '../components/home/Appbar.js';
import { Grid, Box, Container, Button, Link } from '@mui/material'
import MyTestTable from '../components/mytest/MyTestTable'
import PageButton from '../components/PageButton'

function MyTestList(){
    return(
        <>
            <Appbar />
            <Container maxWidth="md" className='bodyContainer'>
                <h5 style={{textAlign: 'left', marginLeft: '20px'}}>내가푼 문제집</h5>
                <MyTestTable />
                <PageButton />
            </ Container>
        </>
    )
}
export default MyTestList