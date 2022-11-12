import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack, Box } from "@mui/material";
import { useState } from "react";
import { Viewer } from "@toast-ui/react-editor";


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
                {/* <TextField 
                    rows="10"
                    multiline
                    fullWidth={true} 
                    value={paragraph}
                    InputProps = {{
                        readOnly:true
                    }}
                /> */}
                <Box sx={{textAlign:'left', border: '1px solid #c4c4c4', borderRadius: '5px', paddingLeft: '10px', paddingBottom: '100px'}} >
                    <Viewer style={{margin: '10'}} initialValue={paragraph} />
                </Box>

            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
                {renderCandidate()}
            </Grid>
        </Grid>
    )

}