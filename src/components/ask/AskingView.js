import Appbar from "../home/Appbar.js";
import { Container, Grid, Box, TextField, Button, ToggleButton, Stack } from '@mui/material'
import { useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ASKINGINFO, CREATE_REPLY, GET_REPLY, DELETE_REPLY } from "../../queries/queries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Reply from "../testResult/Reply.js";
import { Viewer } from "@toast-ui/react-editor";
import MyEditor from "../editor/MyEditor.js";
import { useRef } from "react";

function AskingView({content}){

    const params = useParams();
    const editorRef = useRef();
    const {data: askingData, loading: askingLoading, error: askingError} = useQuery(ASKINGINFO, {
        variables:{askingId: parseInt(params.askingId)}
    });
    const {data: replyData, loading: replyLoading, error: replyError} = useQuery(GET_REPLY, {
        variables:{id: parseInt(params.askingId)}
    });
    const [getReply] = useLazyQuery(GET_REPLY);
    const [addReply] = useMutation(CREATE_REPLY);
    // const [deleteReply] = useMutation(DELETE_REPLY);
    
    const [title, setTitle] = useState('');
    const [cont, setContent] = useState('');
    // const [paragraph, setParagraph] = useState('');
    const [reply, setReply] = useState();
    const [repContent, setRepContent] = useState('');

    useEffect(() => {
      if(askingData !== undefined){
        setTitle(askingData.asking.title);
        // setContent(askingData.asking.content);
        // setQuestionId(askingData.asking.questionId);
      }
    }, [askingData])

    useEffect(() => {
        if(replyData !== undefined){
            setReply(replyData.repliesByAsking)
        }
    }, [replyData]) 

    const handleRepChange = () => {
        setRepContent(editorRef.current?.getInstance().getHTML())
        console.log(repContent)
    }

    const submitReply = async () => {
        const input = {
            content: repContent,
            askingId: parseInt(params.askingId)
        };
        const response = await addReply({variables: {input}});
        console.log(response);
        setRepContent('')
        const responseReply = await getReply({variables:{id: parseInt(params.askingId)}})
        setReply(responseReply.data.repliesByAsking)
        
        // setParagraph('');
        // console.log(paragraph)
    }


    return(
        <div>
            <Container maxWidth="md" sx={{border: '1px solid #c4c4c4', borderRadius: '4px'}}>
                <Box sx={{borderBottom: '1px solid #c4c4c4', padding: '20px', mb:2}}>
                    <Stack direction="row" justifyContent="space-between" justifyItems="center">
                        <h4 style={{textAlign: 'left', marginLeft: '10px'}}>{params.askingId}번 질문</h4>
                        {/* <Button href={`/Test/${questionId}`} variant="contained" color="success" size="small" value="questionView" selected onClick={handleQuestionView} sx={{mt: 2, mb:2}} >문제보기</Button> */}
                    </Stack>
                    <TextField fullWidth={true} value={title} disabled label="제목" sx={{mb:1}} />
                    <Box sx={{textAlign:'left', border: '1px solid #c4c4c4', borderRadius: '5px', paddingLeft: '10px', paddingBottom: '100px'}} >
                        {content ? <Viewer initialValue={content} /> : null}
                    </Box>
                </Box>

                <Box sx={{padding: '20px', pt:0, borderBottom: '1px solid #c4c4c4', mb: 2}}>
                    <h4 style={{textAlign: 'left', marginLeft: '10px'}}>답변</h4>
                    {reply ? reply.map((a, index) => (
                        <Box key={index} sx={{textAlign:'left', border: '1px solid #c4c4c4', borderRadius: '5px', paddingLeft: '10px', paddingBottom: '100px', mb: 1}} >
                            <Viewer initialValue={a.content} />
                        </Box>
                    )): null}
                </Box>
                <Box sx={{padding: '20px', pt:0 , textAlign: 'left'}}>
                    <h4 style={{textAlign: 'left', marginLeft: '10px'}}>답변 작성</h4>
                    <MyEditor editorRef={editorRef} paragraph={cont} onChange={handleRepChange} />
                    <Stack direction="row" justifyItems="center" justifyContent="flex-end" sx={{mt: 1}}>
                        <Button variant="contained" underline="none" color="primary"  onClick={submitReply}>저장</Button>
                    </Stack>
                </Box>
            </Container>
        </div>
    )
};
export default AskingView;