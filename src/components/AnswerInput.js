import {Container, Grid, TextField} from '@mui/material'

function AnswerInput() {
    <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField label="주관식 정답 입력 " />
            </Grid>
            <Grid item xs={12}>
                <TextField label="해설 " />
            </Grid>
        </Grid>
        
    </Container>
}

export default AnswerInput