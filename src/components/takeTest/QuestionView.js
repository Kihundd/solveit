import { Button, Grid, Box, TextField, Typography, Rating } from "@mui/material"
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION, SUBMIT_QUESTION } from "../../queries/queries";
import { MULTIPLE_CHOICE, SHORT_ANSWER, FILL_BLANK, CODING_TEST } from "../test/QuestionInfo";
import MultipleChoice from "../test/MultipleChoice";
import MultipleChoiceView from "./MultipleChoiceView";
import ShortAnswerView from "./ShortAnswerView";
import FillBlankView from './FillBlankView'
import CodingTestView from "./CodingTestView";

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';

function QuestionView({row, answerChange, testId, submit}) {
    const [answer, setAnswer] = useState();
    const [question, setQuestion] = useState(undefined);
    const [questionView, setQuestionView] = useState(<></>);
    const [questionName, setQuestionName] = useState('');
    const [difficultyNum, setDifficultyNum] = useState(null);
    const [getQuestion, {data, loading, error}] = useLazyQuery(GET_QUESTION);
    console.log(data)
    useEffect(() => {
        //TODO: 여기서 문제를 가져오면 패킷을 너무 많이 보냄.
        async function setUp() {
            if(row !== undefined) {
                setAnswer(row.answer);
                const response = await getQuestion({variables: {id: row.qid}});
                setQuestion({...response.data.question, id: row.qid});
                setQuestionName(response.data.question.name)
                setDifficultyNum(Number(response.data.question.difficulty.name))
            }
        }
        setUp();
    }, [row])
    console.log(difficultyNum)

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
            else if(type === CODING_TEST)
                setQuestionView(<CodingTestView question={question} testId={testId} prevAnswer={row.answer} changeAnswer={setAnswer} />)
        }
    }, [question]);

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


    return(
        <>
            {/* <h4>문제내용</h4> */}
            <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px', marginBottom: '10px', textAlign: 'left'}}>
                <span>
                    {renderDifficulty()}
                    <Typography sx={{padding: '7px', pl:0, display: 'inline-block'}}>{questionName}</Typography>
                </span>
                
            </Box>
            {questionView}
            <Button variant="contained" onClick={handleGoNext} sx={{marginTop:'10px', marginLeft: '10px', float: 'right'}}>다음</Button>
            <Button variant="contained" sx={{marginTop:'10px', float: 'right'}}>이전</Button>
        </>
    )
}
export default QuestionView