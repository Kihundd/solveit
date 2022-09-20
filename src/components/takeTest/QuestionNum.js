import { useQuery } from "@apollo/client";
import { Box, Grid, Button } from "@mui/material"
import { useState } from "react";

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
            
            return <Button onClick={() => handleOnClick()} key={row.qid} style={{display: 'block', textAlign: 'left'}} >
                <span style={{color: textColor}}>{`${index + 1} \t ${row.answer} `}</span>
            </Button>
        });
    };
    
    return(
        <>
            {renderAnswer()}
            {
                submit && 
                <Button size="medium" fullWidth={true} sx={{}} variant="contained" onClick={() => submit()}>제출</Button>
            }
        </>
        
    )
}
export default QuestionNum