import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack, Box } from "@mui/material";
import { useState } from "react";
import { Viewer } from '@toast-ui/react-editor';

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