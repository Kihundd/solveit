import { Button, Grid, Box } from "@mui/material"
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_QUESTION, SUBMIT_QUESTION } from "../../queries/queries";
import { MULTIPLE_CHOICE, SHORT_ANSWER, FILL_BLANK, CODING_TEST } from "../test/QuestionInfo";
import MultipleChoice from "../test/MultipleChoice";
import MultipleChoiceView from "./MultipleChoiceView";
import ShortAnswerView from "./ShortAnswerView";
import FillBlankView from './FillBlankView'
import CodingTestView from "./CodingTestView";

function QuestionView({row, answerChange, submit}) {
    const [answer, setAnswer] = useState();
    const [question, setQuestion] = useState(undefined);
    const [questionView, setQuestionView] = useState(<></>);
    const [getQuestion, {data, loading, error}] = useLazyQuery(GET_QUESTION);

    useEffect(() => {
        //TODO: 여기서 문제를 가져오면 패킷을 너무 많이 보냄.
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
            else if(type === CODING_TEST)
                setQuestionView(<CodingTestView question={question} prevAnswer={row.answer} changeAnswer={setAnswer} />)
        }
    }, [question]);


    return(
        <>
            {/* <h4>문제내용</h4> */}
            {questionView}
            <Button variant="contained" onClick={handleGoNext} sx={{marginTop:'10px', marginLeft: '10px', float: 'right'}}>다음</Button>
            <Button variant="contained" sx={{marginTop:'10px', float: 'right'}}>이전</Button>
        </>
    )
}
export default QuestionView