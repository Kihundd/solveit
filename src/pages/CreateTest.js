import Header from '../components/Header'
import { Container, Box, Grid, TextField, Button, Input, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useState } from 'react'

import QuestionInfo from '../components/test/QuestionInfo';


function CreateTest() {
    const [num, setAnswerNum] = useState('1');
  
    const handleSelect = (e, newSelect) => {
      setAnswerNum(newSelect);
    };
    const [QuestionNum, setQuestionNum] = useState('1.');
    const [answerListNum, setAnswerListNum] = useState([1, 2, 3, 4])
    return (
        <>
            <Header  />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '80vh', widthh: '30%'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <h5>테스트 이름</h5>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button size="small" variant="contained">문제 추가</Button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={1}>
                                        <p>{QuestionNum}</p>
                                    </Grid>
                                </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <QuestionInfo />
                    </Grid>
                </Grid>
                
                
            </Container>
            <Container maxwidth="xs">
                
            </Container>
        </>
    )
}

export default CreateTest