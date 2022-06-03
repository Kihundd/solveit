import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { useState } from "react";


export default function({question, changeAnswer, prevAnswer}) {
    const {paragraph, name} = question;
    const [answer, setAnswer] = useState(prevAnswer);

    const handleChange = (e) => {
        setAnswer(e.target.value);
        changeAnswer([e.target.value]);
    }

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
                    value={answer}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    )

}