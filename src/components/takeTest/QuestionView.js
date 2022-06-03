import { Button, Grid, Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION, SUBMIT_QUESTION } from "../../queries/queries";
import { MULTIPLE_CHOICE, SHORT_ANSWER, FILL_BLANK } from "../test/QuestionInfo";
import MultipleChoice from "../test/MultipleChoice";
import MultipleChoiceView from "./MultipleChoiceView";
import ShortAnswerView from "./ShortAnswerView";
import FillBlankView from './FillBlankView'

function QuestionView({row, answerChange, submit}) {
    const [answer, setAnswer] = useState();
    const [question, setQuestion] = useState(undefined);
    const [questionView, setQuestionView] = useState(<></>);
    const [getQuestion, {data, loading, error}] = useLazyQuery(GET_QUESTION);

    useEffect(() => {
        async function setUp() {
            if(row !== undefined) {
                setAnswer(row.answer);
                const response = await getQuestion({variables: {id: row.qid}});
                setQuestion(response.data.question);
            }
        }
        setUp();
    }, [row])

    useEffect(() => {
        // 정답 업데이트
        if(row !== undefined) {
            row.answer = answer;
            answerChange();
        }
    }, [answer]);

    const handleGoNext = () => {
        // 다음 문제로 가면서 제출하기
        submit();
    };


    useEffect(() => {
        if(question !== undefined) {
            const type = question.type;
            if(type === MULTIPLE_CHOICE) 
                setQuestionView(<MultipleChoiceView question={question} prevAnswer={row.answer} changeAnswer={setAnswer}/>)
            else if(type === SHORT_ANSWER)
                setQuestionView(<ShortAnswerView question={question} prevAnswer={row.answer} changeAnswer={setAnswer}/>)
            else if(type === FILL_BLANK)
                setQuestionView(<FillBlankView question={question} prevAnswer={row.answer} changeAnswer={setAnswer}/>)
        }
    }, [question]);


    return(
        <>
            {/* <Box sx={{ marginTop:'10px',  border: '2px solid #c4c4c4' , height: '30vh'}}>
                <Grid container>
                    <h4>문제내용</h4>
                    {questionView}
                </Grid>
            </Box> */}
            <Grid container sx={{marginTop:'10px'}}>
                <h4>문제내용</h4>
                {questionView}
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                    <Button variant="contained" sx={{margin:'10px'}}>이전</Button>
                    <Button variant="contained" onClick={handleGoNext}>다음</Button>
                </Grid>
                
            </Grid>
            
        </>
        
    )
}
export default QuestionView