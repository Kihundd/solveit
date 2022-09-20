import Appbar from "../components/home/Appbar.js";

import { Container, Grid, Box, TextField, Button, ToggleButton } from '@mui/material'
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { TAKE_TEST } from "../queries/queries";
import { useParams } from "react-router-dom";

function AskingView(){

    const [questionids, setQuestionids] = useState([])
    const params = useParams();
    // const {data, loading, error} = useQuery(GETASKING, {
    //     variables:{id: params.testId}
    // });
    const [questionView, setQuestionView] = useState(false)
    const [answerView, setAnswerView] = useState(false)
    const handleQuestionView = (event)=>{
        setQuestionView(!questionView)

    }
    const handleAnswerView = (event)=>{
        setAnswerView(!answerView)
    }
    
    
    return(
        <>
            <Appbar />
            <Container maxWidth="md">
                <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                    <h4 style={{textAlign: 'left', marginLeft: '10px'}}>{params.askingId}번 질문</h4>
                    <TextField fullWidth={true} value="제목" />
                    <TextField fullWidth={true} minRows={5} maxRows={10} multiline={true} margin='dense' value="질문내용" />
                    <ToggleButton size="small" value="questionView" selected onClick={handleQuestionView} >문제보기</ToggleButton>
                    <ToggleButton size="small" value="answerView" selected onClick={handleAnswerView} >정답보기</ToggleButton>
                </Box>
            </Container>
        </>
    )
};
export default AskingView;