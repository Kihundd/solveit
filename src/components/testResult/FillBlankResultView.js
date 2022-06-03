import { Grid, Box, TextField, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from 'react'

const useStyle = makeStyles(() => 
    createStyles({
        input: {
            height: '1.33em',
            width: '5em'
        }
    })
)

export default function({question, answers}) {
    const style = {
        padding: '16.5px 14px',
        textAlign: 'start'
    }
    const classes = useStyle();

    const answer = answers.answer.split(',');

    const renderParagraph = () => {
        const lines = question.paragraph.split('\n');
        const ret = [];

        let lineCnt = 0, answerCnt = 0;
        lines.forEach(line => {
            const words = line.split(' ');
            words.forEach(word => {
                if(word.length >= 4 && word.startsWith('__') && word.endsWith('__')) {
                    const idx = answerCnt;
                    answerCnt += 1;
                    ret.push(
                        <span className={`m-8`} key={`blank ${word}`}>
                            <TextField 
                                sx={{input: {textAlign: "center"}}}
                                InputProps={{
                                    className: classes.input,
                                    readOnly:true
                                  }}
                                value={answer[idx]}
                                variant="standard" />
                        </span>
                        )
                } else ret.push(<span key={`word ${word}`}> {word}</span>);
            })
            ret.push(<br key={`newLine ${lineCnt}`} />);
            lineCnt += 1;
        });
        return ret;
    };


    return (
        <Grid item xs={12}>
            <Box style={style}>
                <div>{renderParagraph()}</div>
            </Box>
        </Grid>)

}