import Header from "../components/home/Header";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, getAccordionDetailsUtilityClass, Grid } from '@mui/material'
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TAKE_TEST, JUDGE_ANSWERS, SUBMIT_QUESTION } from "../queries/queries";
import { useNavigate, useParams } from "react-router-dom";
import Asking from "../components/Asking";



function Test(){

    const [idx, setIdx] = useState(0);
    const [questionIds, setQuestionIds] = useState([])
    const [answerSheet, setAnswerSheet] = useState([]);
    const { testId } = useParams();
    const {data, loading, error} = useQuery(TAKE_TEST, {
        variables:{id: testId},
        fetchPolicy: 'no-cache'
    });
    const [submitAnswer] = useMutation(SUBMIT_QUESTION);
    const [judgeAnswers] = useMutation(JUDGE_ANSWERS);

    const navigate = useNavigate();

    useEffect(() => {
        if(data !== undefined) {
            console.log("!");
            setQuestionIds(data.test.questionIds);
            const newSheet = data.test.questionIds.map(id => {
                return {
                    qid: id.questionId,
                    answer: ''
                }});
            setAnswerSheet(newSheet);
        }
    }, [data]);

    useEffect(() => {
        console.log(answerSheet);
    }, [answerSheet]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    const handleNext = () => {
        if(idx !== answerSheet.length -1) {
            setIdx(idx + 1);
        }
    }

    const handleQuestionSubmit = async (prevIdx) => {
        let curIdx;
        if(prevIdx === undefined) curIdx = idx;
        else curIdx = prevIdx;

        const {qid, answer} = answerSheet[curIdx];
        if(answer.length === 0) return;

        setAnswerSheet([...answerSheet]);
        const response = await submitAnswer({variables: {
            testId: Number(testId),
            questionId: Number(qid),
            answers: answer.join(',')
        }});
        console.log(response);
    }

    const handleOnSubmit = () => {
        handleQuestionSubmit();
        handleNext();
    }
    const handleMovingIdx = (newIdx) => {
        const prevIdx = idx;
        setIdx(newIdx);
        handleQuestionSubmit(prevIdx);
    }

    const handleTestSubmit = async () => {
        const response = await judgeAnswers({variables: {
            testId: Number(testId)
        }});

        if(response.data.judgeAnswers.success === true) {
            alert('수고하셨습니다');
            navigate(`/`);
        }
    };

    return(
        <>
            <Header  />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <QuestionNum answerSheet={answerSheet} setIdx={handleMovingIdx} submit={handleTestSubmit}/>
                    </Grid>
                    <Grid item xs={9}>
                        <TestName />
                        <QuestionView 
                            row={answerSheet[idx]} 
                            answerChange={() => setAnswerSheet([...answerSheet])} 
                            submit={handleOnSubmit}/>
                    </Grid>
                    
                    
                </Grid>
            </Container>

        </>
    )
}
export default Test






    
