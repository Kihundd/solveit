import Appbar from "../components/home/Appbar";
import QuestionNum from '../components/takeTest/QuestionNum';
import QuestionView from "../components/takeTest/QuestionView";
import TestName from "../components/takeTest/TestName";
import { Container, Grid } from '@mui/material'
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { TAKE_TEST, JUDGE_ANSWERS, SUBMIT_QUESTION, SUBMIT_CODING_TEST_ANSWER } from "../queries/queries";
import { useNavigate, useParams } from "react-router-dom";
import Asking from "../components/ask/Asking";
import { CODING_TEST } from "../components/test/QuestionInfo";

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
    const [submitCodingTestAnswer] = useMutation(SUBMIT_CODING_TEST_ANSWER);
    const [judgeAnswers] = useMutation(JUDGE_ANSWERS);

    const navigate = useNavigate();

    useEffect(() => {
        if(data !== undefined) {
            console.log(data);
            setQuestionIds(data.test.questionIds);
            const newSheet = data.test.questionIds.map(id => {
                return {
                    qid: id.questionId,
                    answer: ''
                }});
            setAnswerSheet(newSheet);
        }
    }, [data]);

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

        console.log(answer);

        setAnswerSheet([...answerSheet]);

        if(answer[0].type === CODING_TEST) {
            const response = await submitCodingTestAnswer({variables: {input : {
                testId: Number(testId),
                questionId: Number(qid),
                sourceCode: answer[0].sourceCode,
                language: answer[0].language
            }}});

            console.log(response);
        }
        else {
            const response = await submitAnswer({variables: {
                testId: Number(testId),
                questionId: Number(qid),
                answers: answer.join(',')
            }});

            console.log(response);
        }
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
        console.log(testId)
        console.log(response.data.judgeAnswers.success)
        if(response.data.judgeAnswers.success == true) {
            
            alert('수고하셨습니다');
            navigate(`/`);
        }
    };

    return(
        <>
            <Appbar  />
            <Container maxWidth="xl" className='bodyContainer' sx={{padding: 0}}>
                <Grid container spacing={2} >
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                        <TestName />
                    </Grid>
                    <Grid item xs={1}></Grid>


                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                            <QuestionNum answerSheet={answerSheet} setIdx={handleMovingIdx} submit={handleTestSubmit}/>
                        </Box>
                        
                    </Grid>
                    <Grid item xs={8} >
                        
                        <QuestionView 
                            row={answerSheet[idx]} 
                            testId={testId}
                            answerChange={() => setAnswerSheet([...answerSheet])} 
                            submit={handleOnSubmit}/>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}
export default Test






    
