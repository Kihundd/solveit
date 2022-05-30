import { Box, Grid, Button } from "@mui/material"
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
        <Box sx={{border: '2px solid #c4c4c4', height: '5vh'}}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <h4>{data.test.name}</h4>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                    <Button variant='contained' size='small' color='inherit'>태그추가</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' size='small' color='inherit'>좋아요</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' size='small' color='inherit'>신고하기</Button>
                </Grid>
            </Grid>
        </Box>
        
    )
}
export default TestName