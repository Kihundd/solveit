import { Box, Grid, Button, Typography } from "@mui/material"
import { TEST_INFO } from "../../queries/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CreateReport from "../report/CreateReport";

function TestName(){
    const params = useParams();
    const {loading, error, data} = useQuery(TEST_INFO, {
        variables: {id: params.testId}
    });
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return(
        <Box sx={{textAlign: 'left', border: '1px solid #c4c4c4', borderRadius: '5px'}}>
            <Typography sx={{display: 'inline-block', padding: 1}}>  {data.test.name}</Typography>
            {/* <Button variant='contained' size='small' color='inherit' sx={{float: 'right', marginLeft: 2, marginTop: '3px', mr: 1}}>질문하기</Button> */}
            {/* <Button variant='contained' size='small' color='error' sx={{float: 'right', marginLeft: 2, marginTop: '3px', mr: 1}}>신고하기</Button> */}
            <CreateReport testId={params.testId} testName={data.test.name} />
            {/* <Button variant='contained' size='small' color='inherit' sx={{float: 'right', marginLeft: 2}}>태그추가</Button> */}
        </Box>
    )
}
export default TestName