import { Box, Grid, Button, Typography } from "@mui/material"
import { TEST_INFO } from "../../queries/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

function TestName(){
    const params = useParams();
    const {loading, error, data} = useQuery(TEST_INFO, {
        variables: {id: params.testId}
    });
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return(
        <Box sx={{textAlign: 'left', marginLeft: '10px'}}>
            <Typography sx={{display: 'inline-block', paddingTop: '7px'}}>{data.test.name}</Typography>
            <Button variant='contained' size='small' color='inherit' sx={{float: 'right', marginLeft: 2, marginBottom: '5px'}}>질문하기</Button>
            <Button variant='contained' size='small' color='inherit' sx={{float: 'right', marginLeft: 2}}>신고하기</Button>
            <Button variant='contained' size='small' color='inherit' sx={{float: 'right', marginLeft: 2}}>태그추가</Button>
        </Box>
    )
}
export default TestName