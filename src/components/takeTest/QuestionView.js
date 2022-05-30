import { Button, Grid, Box } from "@mui/material"
import { useState } from "react";
import { useQuery } from "@apollo/client";

function QuestionView() {


    return(
        <>
            <Box sx={{ marginTop:'10px',  border: '2px solid #c4c4c4' , height: '30vh'}}>
                <h4>문제내용</h4>
            </Box>
            <Grid container sx={{marginTop:'10px'}}>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                    <Button variant="contained" sx={{margin:'10px'}}>이전</Button>
                    <Button variant="contained">다음</Button>
                </Grid>
                
            </Grid>
            
        </>
        
    )
}
export default QuestionView