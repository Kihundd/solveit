import Header from "../components/home/Header";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, Grid } from '@mui/material'
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { TAKE_TEST } from "../queries/queries";
import { useParams } from "react-router-dom";


function Test(){

    const [questionids, setQuestionids] = useState([])
    const params = useParams();
    const {data, loading, error} = useQuery(TAKE_TEST, {
        variables:{id: params.testId}
    });
    console.log(data)

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

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






    
