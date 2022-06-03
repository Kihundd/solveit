import { Box, Grid, TextField } from "@mui/material"

function Asking(){
    return(
        <Box sx={{border:'2px solid #c4c4c4', height:'40vh'}}>
            <Grid container>
                <Grid item sx={{marginLeft: '20px'}}><h4>질문하기</h4></Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth={true}
                        // value={}
                        label="질문제목"
                    />
                </Grid>
            </Grid>
            <Grid container sx={{marginTop: '10px'}}>
                <Grid item xs={12}>
                    <TextField 
                        rows="5"
                        multiline
                        fullWidth={true}
                        // value={}
                        label="질문 내용 입력"
                    />
                </Grid>
            </Grid>
            
        </Box>
    )
}

export default Asking