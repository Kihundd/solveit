import { Box, Grid, TextField, Button } from "@mui/material"
import { ASKING } from "../../queries/queries"
import { useState, } from "react"
import { useMutation } from "@apollo/client"
import ReviewNote from "../testResult/ReviewNote"
import { useEffect } from "react"

function Asking(props){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [questionIds, setQuestionIds] = useState(props.qid)
    // const [input, setInput] = useState({title:'',content:'',questionId:33})

    useEffect(() => {
        if (props.qid !== undefined){
          setQuestionIds(props.qid)
        }
      }, [props.pid])
    

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

                
                <Box maxWidth="xl" sx={{border:'1px solid #c4c4c4', borderRadius: '5px', marginBottom: 2}}>
                    <Grid container>
                        <Grid item sx={{marginLeft: '20px'}}><h4>질문하기</h4></Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth={true}
                                value={title}
                                label="제목"
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
                        <Grid item xs={12} sx={{marginTop: '10px'}}>
                            <Button variant="contained" underline="none" color="primary" sx={{float: 'right', marginLeft: '10px', marginBottom: 1}} onClick={submitAsk}>확인</Button>
                            <Button variant="contained" underline="none" color="primary" sx={{float: 'right'}}>닫기</Button>
                        </Grid>
                    </Grid>
                </Box>

    )
}

export default Asking