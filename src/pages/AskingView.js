import Header from "../components/home/Header";

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
            <Header  />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '30vh'}}>
                            질문목록
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '70vh'}}>
                            <Grid container>
                                <Grid item xs={2}><h4>{params.askingId}번 질문</h4></Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <TextField
                                    fullWidth={true}
                                    value="제목"
                                    />
                                    <TextField
                                    fullWidth={true}
                                    minRows={5}
                                    maxRows={10}
                                    multiline={true}
                                    margin='dense'
                                    value="질문내용"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <ToggleButton
                                        size="small" value="questionView" selected
                                        onClick={handleQuestionView}
                                    >문제보기</ToggleButton>
                                </Grid>
                                <Grid item xs={2}>
                                <ToggleButton
                                        size="small" value="answerView" selected
                                        onClick={handleAnswerView}
                                    >정답보기</ToggleButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};
export default AskingView;