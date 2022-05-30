import { useQuery } from "@apollo/client";
import { Box, Grid, Button } from "@mui/material"
import { useState } from "react";

function QuestionNum() {

    
    return(
        <Box sx={{border: '2px solid #c4c4c4', height: '80vh', widthh: '30%'}}>
            <Grid container>
                <Grid item xs={1}>
                    <p>{1}</p>
                </Grid>
                <Grid item xs={12}>
                    <Button size="medium" variant="contained">제출</Button>
                </Grid>
            </Grid>
            
        </Box> 
    )
}
export default QuestionNum