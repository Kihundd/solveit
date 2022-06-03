import { useEffect, useState } from "react";
import { Button, Grid, Box } from "@mui/material";
import MultipleChoiceResultView from "./MultipleChoiceResultView";
import { MULTIPLE_CHOICE, SHORT_ANSWER, FILL_BLANK } from "../test/QuestionInfo";
import ShortAnswerResultView from "./ShortAnswerResultView";
import FillBlankResultView from "./FillBlankResultView";


export default function QuestionResultView({question, answers}) {
    const [questionView, setQuestionView] = useState(<></>);
    const [view, setView] = useState(<></>);

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

    const handleAnswerView = () => {
        setView(
            <Grid container>
                <Grid item xs={12}>
                    {answers.actualAnswer}
                </Grid>
                <Grid item xs={12}>
                    {question.explanation}
                </Grid>
            </Grid>
        )
    };

    return (
    <>
        <Grid container sx={{marginTop:'10px'}}>
            <h4>문제내용</h4>
            {questionView}
            <Grid item xs={9}></Grid>
            <Grid item xs={12}>
                <Button onClick={handleAnswerView}>정답 보기</Button>
            </Grid>
            <Grid item xs={12}>
                {view}
            </Grid>
            
        </Grid>
        
    </>
    )
}