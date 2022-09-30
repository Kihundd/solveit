import Appbar from "../components/home/Appbar.js";
import { Container, Grid, Box, TextField, Button, ToggleButton } from '@mui/material'
import { useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { ASKINGINFO, CREATE_REPLY, GET_REPLY, DELETE_REPLY } from "../queries/queries";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Reply from "../components/Reply.js";

function AskingView(){

    const params = useParams();
    const {data: askingData, loading: askingLoading, error: askingError} = useQuery(ASKINGINFO, {
        variables:{askingId: parseInt(params.askingId)}
    });
    const {data: replyData, loading: replyLoading, error: replyError} = useQuery(GET_REPLY, {
        variables:{id: parseInt(params.askingId)}
    });
    const [getReply, {data: newReplyData, loading: newReplyLoading, error: newReplyError}] = useLazyQuery(GET_REPLY, {
        variables:{id: parseInt(params.askingId)}
    });
    const [addReply, {data, loading, error}] = useMutation(CREATE_REPLY);
    const [deleteReply, {data: deleteData, loading: deleteLoading, error: deleteError}] = useMutation(DELETE_REPLY);


    const [questionView, setQuestionView] = useState(false)
    const [answerView, setAnswerView] = useState(false)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [questionId, setQuestionId] = useState('');
    const [explanation, setExplanation] = useState('');
    const [reply, setReply] = useState();

    useEffect(() => {
      if(askingData !== undefined){
        setTitle(askingData.asking.title);
        setContent(askingData.asking.content);
        setQuestionId(askingData.asking.questionId);
      }
    }, [askingData])

    useEffect(() => {
        if(replyData !== undefined){
            setReply(replyData.repliesByAsking)
        }
    }, [replyData]) 

    const handleQuestionView = (event)=>{
        setQuestionView(!questionView)
    }
    const handleAnswerView = (event)=>{
        setAnswerView(!answerView)
    }
    const submitReply = async () => {
        const input = {
            content: explanation,
            askingId: parseInt(params.askingId)
        };
        const response = await addReply({variables: {input}});
        console.log(response);
        const responseReply = await getReply({variables:{id: parseInt(params.askingId)}})
        setReply([...responseReply.data.repliesByAsking, input])
        setExplanation('');
    }
    const deleteHandler = async (id) => {
        const response = await deleteReply({variables: {id: id}})
    }

    return(
        <>
            <Appbar />
            <Container maxWidth="md">
                <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                    <h4 style={{textAlign: 'left', marginLeft: '10px'}}>{params.askingId}번 질문</h4>
                    <TextField fullWidth={true} value={title} label="제목" />
                    <TextField fullWidth={true} minRows={5} maxRows={10} multiline={true} margin='dense' value={content} label="질문내용" />
                    <ToggleButton size="small" value="questionView" selected onClick={handleQuestionView} >문제보기</ToggleButton>
                    <ToggleButton size="small" value="answerView" selected onClick={handleAnswerView} >정답보기</ToggleButton>
                </Box>
                
                {reply ? reply.map((a, index) => (
                    <>
                        <TextField rows="5"
                        multiline
                        fullWidth={true}
                        value={a.content}
                        key={index}
                        >
                        </TextField>
                    </>
                    
                )): null}

                <TextField 
                    rows="5"
                    multiline
                    fullWidth={true}
                    value={explanation}
                    label="답변 내용 입력"
                    onChange={e => {
                        setExplanation(e.target.value)
                        console.log(explanation)
                    }}
                />
                <Button variant="contained" underline="none" color="primary" sx={{float: 'right', marginLeft: '10px'}} onClick={submitReply}>확인</Button>
                
            </Container>
        </>
    )
};
export default AskingView;