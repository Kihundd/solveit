import { Box, Grid, Button } from "@mui/material"

function TestName(){
    return(
        <Box sx={{border: '2px solid #c4c4c4', height: '5vh'}}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <h4>테스트이름</h4>
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