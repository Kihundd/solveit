import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { useState } from "react";


export default function({question, answers}) {
    const {paragraph, name} = question;

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
                <TextField 
                    rows="10"
                    multiline
                    fullWidth={true} 
                    value={answers.answer}
                    InputProps = {{
                        readOnly:true
                    }}
                />
            </Grid>
        </Grid>
    )

}