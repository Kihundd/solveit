import { Button, Grid, TextField } from "@mui/material";
import {useState, useEffect} from 'react';

export default function({isSave, handleSave}) {
    const [paragraph, setParagraph] = useState("");
    const [answer, setAnswer] = useState("");
    const [explanation, setExplation] = useState("");

    useEffect(()=>{
        console.log(isSave);
        if(isSave === true) {
            handleSave({
                paragraph,
                explanation,
                answers: answer.split(",").map(str => str.trim())
            });            
        }
    }, [isSave]);

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                <TextField 
                    rows="10"
                    multiline
                    fullWidth={true}
                    value={paragraph}
                    onChange={e => setParagraph(e.target.value)}
                    label="문제 내용 입력"
                 />
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