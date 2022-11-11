import { useEffect, useState } from "react";
import { Button, Grid, Box, TextField, Stack } from "@mui/material";
import MultipleChoiceResultView from "./MultipleChoiceResultView";
import { MULTIPLE_CHOICE, SHORT_ANSWER, FILL_BLANK } from "../test/QuestionInfo";
import ShortAnswerResultView from "./ShortAnswerResultView";
import FillBlankResultView from "./FillBlankResultView";
import Asking from "../ask/Asking";
import ReviewNote from "./ReviewNote";

export default function QuestionResultView({question, answers}) {
    const [questionView, setQuestionView] = useState(<></>);
    const [view, setView] = useState(<></>);
    const [qid, setQid] = useState();

    useEffect(() => {
        setView(<></>);
    }, [question])

    useEffect(() => {
        if(question !== undefined) {
            const type = question.type;
            if(type === MULTIPLE_CHOICE) 
                setQuestionView(<MultipleChoiceResultView question={question} answers={answers}/>)
            else if(type === SHORT_ANSWER)
                setQuestionView(<ShortAnswerResultView question={question} answers={answers}/>)
            else if(type === FILL_BLANK)
                setQuestionView(<FillBlankResultView question={question} answers={answers}/>)
        }
    }, [question]);

    // useEffect(() => {
    //     if(question !== undefined) {
    //         setQid(question.id)
    //         console.log(qid)
    //     }

    // }, [question]);

    useEffect(() => {
        if(question !== undefined) {
            setQid(question.id)
        }

    }, [question])
    

    

    const handleAnswerView = () => {
        setView(
            <TextField 
                rows="2"
                multiline
                fullWidth={true}
                value={`답: ${answers.actualAnswer}
해설: ${question.explanation}`}
                label="정답"
            />
            // {answers.actualAnswer}{question.explanation}
        )
    };
    const handleAskingView = () => {
        setView(
            <Asking qid={qid} />
        )
    };
    const handleReviewNoteView = () => {
        setView(
            <ReviewNote qid={qid} />
        )
    };



    return (

        <Grid container>
            {questionView}
            <Stack direction="row" spacing={1} sx={{paddingTop: 1, paddingBottom: 2}}>
                <Button variant="contained" color="info" onClick={handleAnswerView}>정답 보기</Button>
                <Button variant="contained" color="info" onClick={handleReviewNoteView}>오답 노트</Button>
                <Button variant="contained" color="info" onClick={handleAskingView}>질문 하기</Button>
            </Stack>
            <Grid item xs={12}>
                {view}
            </Grid>
            
        </Grid>
        

    )
}