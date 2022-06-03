import { Box, Grid, TextField, Button } from "@mui/material"
import { ASKING } from "../queries/queries"
import { useState, } from "react"
import { useMutation } from "@apollo/client"
import ReviewNote from "./ReviewNote"

function Asking(){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [questionIds, setQuestionIds] = useState(33)
    // const [input, setInput] = useState({title:'',content:'',questionId:33})

    const [addAsking, {data, loading, error}] = useMutation(ASKING)
    const submitAsk = async () => {
        // const questionIds = questionList.map(q => q.questionId);
        const input = {
            title,
            content,
            questionId: questionIds
        };
        const response = await addAsking({variables: {input}});
        console.log(response);
    }

    return(
        <Grid container sx={{marginTop:'50px'}}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                
                <Box maxWidth="xl" sx={{border:'2px solid #c4c4c4', height:'40vh'}}>
                    <Grid container>
                        <Grid item sx={{marginLeft: '20px'}}><h4>질문하기</h4></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth={true}
                                value={title}
                                label="질문제목"
                                onChange={e => {
                                    setTitle(e.target.value)
                                    console.log(title)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{marginTop: '10px'}}>
                        <Grid item xs={12}>
                            <TextField 
                                rows="5"
                                multiline
                                fullWidth={true}
                                value={content}
                                label="질문 내용 입력"
                                onChange={e => {
                                    setContent(e.target.value)
                                    console.log(content)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{marginTop:'10px'}}>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={2}>
                            <Button fullWidth variant="contained" underline="none" color="primary">취소</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button fullWidth variant="contained" underline="none" color="primary"
                                onClick={submitAsk}
                            >
                                확인
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

            </Grid>
            <Grid item xs={3}></Grid>

            
            <Grid item xs={12}>
                <ReviewNote />
            </Grid>
        </Grid>

    )
}

export default Asking