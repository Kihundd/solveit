import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { useState } from "react";


export default function({question, answers}) {
    const {paragraph, candidates, name} = question;

    const answer = answers.answer.split(',').map(s => Number(s));
    

    const renderCandidate = () => {
        return (
            <ToggleButtonGroup
                orientation="vertical" 
                value={answer}
                aria-label="test"
                fullWidth={true}>
                {
                    candidates.map(({number, content}) => {
                        return (<ToggleButton value={number} key={content} fullWidth={true} style={{color: 'black'}}>
                                                {content}
                                        </ToggleButton>);
                    })
                }
            </ToggleButtonGroup>
        )
    };

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                <TextField 
                    rows="10"
                    multiline
                    fullWidth={true} 
                    value={paragraph}
                    InputProps = {{
                        readOnly:true
                    }}
                />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
                {renderCandidate()}
            </Grid>
        </Grid>
    )

}