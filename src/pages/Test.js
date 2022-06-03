import Header from "../components/home/Header";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, getAccordionDetailsUtilityClass, Grid } from '@mui/material'
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { TAKE_TEST } from "../queries/queries";
import { useParams } from "react-router-dom";
import Asking from "../components/Asking";


function Test(){

    const [idx, setIdx] = useState(0);
    const [questionIds, setQuestionIds] = useState([])
    const [answerSheet, setAnswerSheet] = useState([]);
    const params = useParams();
    const {data, loading, error} = useQuery(TAKE_TEST, {
        variables:{id: params.testId}
    });

    useEffect(() => {
        if(data !== undefined) {
            setQuestionIds(data.test.questionIds);
            const newSheet = data.test.questionIds.map(id => {
                return {
                    qid: id.questionId,
                    answer: ''
                }});
            console.log(data);
            setAnswerSheet(newSheet);
        }
    }, [data]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return(
        <>
            <Header  />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <QuestionNum answerSheet={answerSheet} setIdx={setIdx} />
                    </Grid>
                    <Grid item xs={9}>
                        <TestName />
                        <QuestionView row={answerSheet[idx]} />
                        <Asking />
                    </Grid>
                    
                    
                </Grid>
            </Container>

        </>
    )
}
export default Test






    
