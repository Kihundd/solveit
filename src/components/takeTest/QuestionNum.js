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
            
            return <Button onClick={() => handleOnClick()} key={row.qid} >
                <span style={{color: textColor}}>{`${index + 1} \t ${row.answer} `}</span>
            </Button>
        });
    };
    
    return(
        <Box sx={{border: '2px solid #c4c4c4', height: '80vh', widthh: '30%'}}>
            <Grid container>
                <Grid item xs={1}>
                    {renderAnswer()}
                </Grid>
                <Grid item xs={12}>
                    {
                        submit && 
                        <Button size="medium" variant="contained" onClick={() => submit()}>제출</Button>
                    }
                </Grid>
            </Grid>
            
        </Box> 
    )
}
export default QuestionNum