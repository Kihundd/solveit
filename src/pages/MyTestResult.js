import Appbar from "../components/home/Appbar.js";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, Grid, Button, Box } from '@mui/material'
import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from 'react';
import { TEST_RESULT, GET_FULL_QUESTION, USER_INFO } from "../queries/queries";
import { useNavigate, useParams } from "react-router-dom";
import QuestionResultView from "../components/testResult/QuestionResultView";
import Asking from '../components/ask/CreateAsking';
import ReviewNote from '../components/testResult/ReviewNote';

function MyTestResult(){
    const [idx, setIdx] = useState(0);
    const {testId} = useParams();
    const {data, loading, error} = useQuery(TEST_RESULT, {
        variables: {testId: Number(testId)}
    });
    const [answerSheet, setAnswerSheet] = useState([]);
    const [questionInfos, setQuestionInfos] = useState([]);
    const [getQuestion] = useLazyQuery(GET_FULL_QUESTION);
    const [userTier, setUserTier] = useState(null);
    const {data:userInfo, loading:userLoading, error:userError} = useQuery(USER_INFO,{
        variables: {ID: null}
    })
    // console.log(userInfo)

    const fetchQuestions = async (answerSheet) => {
        const newQuestionInfos = [];
        for(const s in answerSheet) {
            const response = await getQuestion({variables: {id: answerSheet[s].qid}});
            newQuestionInfos.push(response.data.question);
        }
        // console.log(newQuestionInfos);
        setQuestionInfos(newQuestionInfos);
    }

    useEffect(() => {
        if(userInfo !== undefined && userInfo.profile.tier !== undefined){
            setUserTier(userInfo.profile.tier)
    }
    }, [userInfo])

    useEffect(() => {
        if(data !== undefined) {
            // console.log(data)
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
                    <Grid item xs={2}></Grid>
                    <Grid item xs={9}><TestName /></Grid>
                    <Grid item xs={1}></Grid>

                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                            <QuestionNum answerSheet={answerSheet} setIdx={setIdx}/>
                            <Button variant="contained" sx={{marginBottom: '10px'}}>이전</Button>
                            <Button variant="contained" sx={{marginLeft:'5px', marginBottom: '10px'}} onClick={handleNext}>다음</Button>
                        </Box>
                       
                    </Grid>
                    <Grid item xs={7} >
                        <QuestionResultView tier={userTier} question={questionInfos[idx]} answers={answerSheet[idx]}/>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}
export default MyTestResult