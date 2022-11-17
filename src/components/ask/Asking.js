import { Stack, IconButton, Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material"
import { ASKING } from "../../queries/queries"
import { useState, } from "react"
import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MyEditor from "../editor/MyEditor"
import { useRef } from "react"

function Asking(props){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [questionIds, setQuestionIds] = useState(null);
    const [addAsking, {data, loading, error}] = useMutation(ASKING);
    const [open, setOpen] = useState(false);
    const editorRef = useRef();
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    console.log(props)

    useEffect(() => {
        if (props.qid !== undefined){
          setQuestionIds(props.qid)
        }
    }, [props])

    const submitAsk = async () => {
        // const questionIds = questionList.map(q => q.questionId);
        const input = {
            title,
            content: editorRef.current?.getInstance().getHTML(),
            questionId: questionIds
        };
        const response = await addAsking({variables: {input}});
        console.log(response);
        setOpen(false)
    }

    const handleChange = () => {
        console.log(editorRef.current?.getInstance().getHTML())
    }

    return(
        <>
            <Stack direction="row" sx={{ float: 'right', marginTop: '4px', marginRight: '4px', display: 'inline-block'}}>
                <Button startIcon={<QuestionAnswerIcon />} variant="contained" size="small" color="primary" onClick={handleClickOpen}>질문 하기</Button>
            </Stack>

            <Dialog open={open} onClose={handleClose} maxWidth="mg">
                <DialogTitle textAlign='left'>{questionIds}번 문제 질문</DialogTitle>
                <DialogContent sx={{pb: '5px'}}>
                    <TextField fullWidth margin='dense' label="제목" />
                    <MyEditor editorRef={editorRef} onChange={handleChange} />
                    {/* <TextField fullWidth={true} minRows={4} maxRows={8} multiline={true} margin='dense' label="기타" /> */}
                </DialogContent>
                <DialogActions sx={{pr: '24px'}}>
                    <Button variant="contained" color="primary" onClick={submitAsk}>확인</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </>
                
                // <Box maxWidth="xl" sx={{border:'1px solid #c4c4c4', borderRadius: '5px', marginBottom: 2}}>
                //     <Grid container>
                //         <Grid item sx={{marginLeft: '20px'}}><h4>질문하기</h4></Grid>
                //     </Grid>
                //     <Grid container>
                //         <Grid item xs={12}>
                //             <TextField 
                //                 fullWidth={true}
                //                 value={title}
                //                 label="제목"
                //                 onChange={e => {
                //                     setTitle(e.target.value)
                //                     console.log(title)
                //                 }}
                //             />
                //         </Grid>
                //     </Grid>
                //     <Grid container sx={{marginTop: '10px'}}>
                //         <Grid item xs={12}>
                //             <TextField 
                //                 rows="5"
                //                 multiline
                //                 fullWidth={true}
                //                 value={content}
                //                 label="질문 내용 입력"
                //                 onChange={e => {
                //                     setContent(e.target.value)
                //                     console.log(content)
                //                 }}
                //             />
                //         </Grid>
                //         <Grid item xs={12} sx={{marginTop: '10px'}}>
                //             <Button variant="contained" underline="none" color="primary" sx={{float: 'right', marginLeft: '10px', marginBottom: 1}} onClick={submitAsk}>확인</Button>
                //             <Button variant="contained" underline="none" color="primary" sx={{float: 'right'}}>닫기</Button>
                //         </Grid>
                //     </Grid>
                // </Box>

    )
}

export default Asking