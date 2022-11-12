import { Button, Grid, TextField } from "@mui/material";
import {useState, useEffect, useRef} from 'react';
import MyEditor from "../editor/MyEditor";

export default function({isSave, handleSave, question}) {
    const [paragraph, setParagraph] = useState("");
    const [answer, setAnswer] = useState([""]);
    const [explanation, setExplation] = useState("");
    const editorRef = useRef();

    useEffect(()=>{
        console.log(isSave);
        if(isSave === true) {
            handleSave({
                paragraph: editorRef.current?.getInstance().getHTML(),
                explanation,
                answers: answer.split(",").map(str => str.trim())
            });            
        }
    }, [isSave]);

    useEffect(() => {
        setParagraph(question.paragraph !== undefined? question.paragraph: '');
        setExplation(question.explanation !== undefined? question.explanation: '');
        if(question.answers !== undefined) {
            setAnswer(question.answers.join(","));
        }
    }, [question]);

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12} sx={{textAlign: 'left'}}>
                {/* <TextField 
                    rows="10"
                    multiline
                    fullWidth={true}
                    value={paragraph}
                    onChange={e => setParagraph(e.target.value)}
                    label="문제 내용 입력"
                 /> */}
                 <MyEditor paragraph={paragraph} editorRef={editorRef} />
            </Grid>
            <Grid item xs={12}>
            <TextField 
                    rows="2"
                    multiline
                    fullWidth={true}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    label="문제 정답 입력"
                 />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    rows="5"
                    multiline
                    fullWidth={true}
                    value={explanation}
                    onChange={e => setExplation(e.target.value)}
                    label="문제 해설 입력"
                 />            </Grid>
            {/* <AnswerInput /> */}
            <Grid item xs={8}>
            
            </Grid>
        </Grid>
    )
}