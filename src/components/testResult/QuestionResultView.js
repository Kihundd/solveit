import { useEffect, useState } from "react";
import { Button, Grid, Box, TextField, Stack, Typography, Rating } from "@mui/material";
import MultipleChoiceResultView from "./MultipleChoiceResultView";
import { MULTIPLE_CHOICE, SHORT_ANSWER, FILL_BLANK, CODING_TEST } from "../test/QuestionInfo";
import ShortAnswerResultView from "./ShortAnswerResultView";
import FillBlankResultView from "./FillBlankResultView";
import CodingTestResultView from "./CodingTestResultView";
import Asking from "../ask/Asking";
import ReviewNote from "./ReviewNote";
import SetDifficulty from "./Difficulty";

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export default function QuestionResultView({question, answers, tier}) {
    const [questionView, setQuestionView] = useState(<></>);
    const [view, setView] = useState(<></>);
    const [qid, setQid] = useState();
    const [questionName, setQuestionName] = useState('');
    const [difficultyNum, setDifficultyNum] = useState('');

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
            else if(type === CODING_TEST)
                setQuestionView(<CodingTestResultView question={question} answers={answers}/>)
            
        }
    }, [question]);

    useEffect(() => {
        if(question !== undefined) {
            setQid(question.id)
            setDifficultyNum(Number(question.difficulty.name))
            setQuestionName(question.name)
        }

    }, [question])

    const renderDifficulty = () => {
        if(difficultyNum > 0 && difficultyNum <= 1)
            return <LooksOneIcon color="disabled" sx={{verticalAlign: 'text-top'}} />
        else if(difficultyNum > 1 && difficultyNum <= 2)
            return <LooksTwoIcon color="action" sx={{verticalAlign: 'text-top'}} />
        else if(difficultyNum > 2 && difficultyNum <= 3)
            return <Looks3Icon color="primary" sx={{verticalAlign: 'text-top'}} />
        else if(difficultyNum > 3 && difficultyNum <= 4)
            return <Looks4Icon color="success" sx={{verticalAlign: 'text-top'}} />
        else if(difficultyNum > 4 && difficultyNum <= 5)
            return <Looks5Icon sx={{ color: "pink", mt:'6px', verticalAlign: 'text-top'}} />
    }

    const renderSetDifficulty = () => {
        if(tier >= 3){
            return <SetDifficulty questionId={qid} />
        }
    }
    
    const renderAnswerView = () => {
        setView(
            <TextField 
                rows="2"
                multiline
                fullWidth={true}
                value={`답: ${answers.actualAnswer}
해설: ${question.explanation}`}
                label="정답"
                sx={{mt:2}}
            />
        )
    };

    const handleReviewNoteView = () => {
        setView(
            <ReviewNote qid={qid} />
        )
    };


    return (
        <>
            <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px', marginBottom: '10px', textAlign: 'left'}}>
                <span>
                    {renderDifficulty()}
                    <Typography sx={{p:1, pl:0, display: 'inline-block'}}>
                            {questionName}
                    </Typography>
                    <Asking qid={qid} />
                    <Stack direction="row" sx={{ float: 'right', marginTop: '4px', marginRight: '4px', display: 'inline-block'}}>
                        <Button startIcon={<SummarizeIcon />} variant="contained" size="small" color="error" onClick={handleReviewNoteView}>오답 노트</Button>
                    </Stack>
                    <Stack direction="row" sx={{ float: 'right', marginTop: '4px', marginRight: '4px', display: 'inline-block'}}>
                        <Button startIcon={<TaskAltIcon />} variant="contained" size="small" color="success" onClick={renderAnswerView}>정답 보기</Button>
                    </Stack>
                    {renderSetDifficulty()}
                </span>
            </Box>
            <Grid container>
                {questionView}
                <Grid item xs={12}>
                    {view}
                </Grid>
            </Grid>
        </>
            
        

    )
}