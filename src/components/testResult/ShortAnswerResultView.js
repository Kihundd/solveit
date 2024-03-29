import { Button, Grid, TextField, Box } from "@mui/material";
import { useState } from "react";
import { Viewer } from "@toast-ui/react-editor";


export default function({question, answers}) {
    const {paragraph, name} = question;

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
                    rows="5"
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