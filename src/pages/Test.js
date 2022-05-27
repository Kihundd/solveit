import Header from "../components/Header";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, Grid } from '@mui/material'




function Test(){

    return(
        <>
            <Header  />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <QuestionNum />
                    </Grid>
                    <Grid item xs={9}>
                        <TestName />
                        <QuestionView />
                    </Grid>
                    
                </Grid>
            </Container>

        </>
    )
}
export default Test






    
