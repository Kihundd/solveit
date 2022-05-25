import Header from '../components/Header'
import { Container, Box, Grid, TextField, Button, Input, IconButton } from '@mui/material'
import { useState } from 'react'
import { PhotoCamera } from '@mui/icons-material';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import AnswerInput from '../components/AnswerInput';
import TextareaAutosize from '@mui/base/TextareaAutosize';

function CreateTest() {
    
    const [QuestionNum, setQuestionNum] = useState('1.');
    
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
                        <Box sx={{border: '2px solid #c4c4c4', height: '80vh'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{border:'1px solid red'}}>새로운 문제 생성</Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{border: '1px solid green'}}>
                                        <h6>문제정보</h6>
                                    {/* </Box>
                                    <Box> */}
                                        <span>주관식</span>
                                        <span>문제분야</span>
                                        <span>태그추가</span>
                                        
                                        <label htmlFor="icon-button-file">
                                            {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
                                            <IconButton color="primary" aria-label="upload audio" component="span">
                                                <AudiotrackOutlinedIcon />
                                            </IconButton>
                                        </label>
                                        <label htmlFor="icon-button-file">
                                            {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera />
                                            </IconButton>
                                        </label>
                                        <button onClick={()=>{

                                        }}>난이도</button>
                                    </Box>
                                </Grid>      
                                <Grid item xs={12}>
                                    <TextField sx={{}}
                                    fullWidth={true}
                                    label="문제 내용 입력"
                                     />
                                </Grid>

                                
                                <Grid item xs={12}>
                                    <TextField fullWidth={true} label="정답 입력 " />
                                    {/* <TextareaAutosize
                                        maxRows={4}
                                        aria-label="maximum height"
                                        placeholder="Maximum 4 rows"
                                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna aliqua."
                                        style={{ width: 500 }}
                                    /> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth={true} label="해설 입력 " />
                                </Grid>
                                {/* <AnswerInput /> */}
                                <Grid item xs={8}></Grid>
                                <Grid item xs={2}>
                                    <Button variant="text">취소</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained">저장</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                
                
            </Container>
            <Container maxwidth="xs">
                
            </Container>
        </>
    )
}

export default CreateTest