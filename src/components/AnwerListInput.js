import {Container, Grid, Box, IconButton, } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material';
function AnswerListInput(props) {
    

    return(
        <>
            <Grid container sx={{border: '2px solid #c4c4c4'}}>
                <Grid item xs={2} sx={{}}>
                    <p>{props.i}</p>
                </Grid>
                <Grid item xs={8}>보기</Grid>
                <Grid item xs={2}>
                    <label htmlFor="icon-button-file">
                    {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Grid>
            </Grid>
        </>
    )
}

export default AnswerListInput