import Appbar from "../components/home/Appbar.js";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, Grid, Button } from '@mui/material'
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from 'react';
import { TEST_RESULT, GET_FULL_QUESTION } from "../queries/queries";
import { useNavigate, useParams } from "react-router-dom";
import QuestionResultView from "../components/testResult/QuestionResultView";
import Asking from '../components/Asking';
import ReviewNote from '../components/ReviewNote';

function MyTestResult(){
    const [idx, setIdx] = useState(0);
    const {testId} = useParams();
    const {data, loading, error} = useQuery(TEST_RESULT, {
        variables: {testId: Number(testId)}
    });
    const [answerSheet, setAnswerSheet] = useState([]);
    const [questionInfos, setQuestionInfos] = useState([]);
    const [getQuestion] = useLazyQuery(GET_FULL_QUESTION);

    const fetchQuestions = async (answerSheet) => {
        const newQuestionInfos = [];
        for(const s in answerSheet) {
            const response = await getQuestion({variables: {id: answerSheet[s].qid}});
            newQuestionInfos.push(response.data.question);
        }
        console.log(newQuestionInfos);
        setQuestionInfos(newQuestionInfos);
    }

    useEffect(() => {
        if(data !== undefined) {
            console.log(data)
            const newAnswerSheet = data.testAnswers.map(answers => { return {
                qid: answers.questionId,
                answer: answers.myAnswer,
                actualAnswer: answers.correctAnswer,
                correct: answers.is_correct
            }
            });
            setAnswerSheet(newAnswerSheet);
            async function temp() {
                fetchQuestions(newAnswerSheet);
            }
            temp();
        }
    }, [data])


    const handleNext = () => {
        if(idx !== answerSheet.length -1) {
            setIdx(idx + 1);
        }
    }

    return(
        <>
            <Appbar />
            <Container maxWidth="xl" >
                <Grid container spacing={2} sx={{paddingTop: 0}}>
                    <Grid item xs={3} sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                        <QuestionNum answerSheet={answerSheet} setIdx={setIdx}/>
                        <Button variant="contained" >이전</Button>
                        <Button variant="contained" sx={{marginLeft:'5px'}} onClick={handleNext}>다음</Button>
                    </Grid>
                    <Grid item xs={9} >
                        <TestName />
                        <QuestionResultView question={questionInfos[idx]} answers={answerSheet[idx]}/>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}
export default MyTestResult