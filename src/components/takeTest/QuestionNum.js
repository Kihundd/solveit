import { useQuery } from "@apollo/client";
import { Box, Grid, Button } from "@mui/material"
import { useState } from "react";
import { CODING_TEST } from "../test/QuestionInfo";

function QuestionNum({answerSheet, setIdx, submit}) {
    const renderAnswer = () => {
        if(answerSheet.length === 0 || answerSheet === undefined) return <></>;
        
        return answerSheet.map((row, index) => {
            const handleOnClick = () => {
                setIdx(index);
            };

            let textColor = '';
            if(row.correct !== undefined && row.correct === false) 
                textColor = 'red';
            
            let answer;
            if(row.answer[0] !== undefined && row.answer[0].type !== undefined && row.answer[0].type === CODING_TEST)
                answer = row.answer[0].sourceCode;
            else
                answer = row.answer;


            return (
                <Button onClick={() => handleOnClick()} key={row.qid} style={{display: 'block', textAlign: 'left'}} >
                    <span style={{color: textColor}}>{`${index + 1} \t ${answer} `}</span>
                </Button>
            )
        });
    };
    
    return(
        <>
            {renderAnswer()}
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                {
                    submit && 
                    <Button size="medium" fullWidth={true} sx={{marginBottom: '10px'}} variant="contained" onClick={() => submit()}>제출</Button>
                }
                </Grid>
            </Grid>
        </>
        
    )
}
export default QuestionNum