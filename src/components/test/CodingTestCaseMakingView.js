import { Grid, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";


/***
 * aCase ->
 * {
 *     input, 
 *     output [
 *         
 *     ]
 * }
 */

export default function({aCase, setCase, idx}) {
    useEffect(() => {
        renderAnswers();
    }, [aCase]);


    const setOutput = (output, i) => {
        aCase.output[i] = output;
        setCase({...aCase})
    };

    const renderAnswers = () => {
        return aCase.output.map((output, i) => {
            return <TextField 
                    key={`output ${i}`}
                    label={`case #${idx}. 정답 ${i}`}
                    value={output}
                    onChange={e => setOutput(e.target.value, i)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
        })
    }

    const handleAddAnswer = () => {
        setCase({...aCase, output: [...aCase.output, '']});
    };
    const handleRemoveAnswer = () => {
        aCase.output.pop();
        setCase({...aCase, output: aCase.output});
    };
    const setInput = (input) => {
        setCase({...aCase, input});
    };

    return (
        <Grid container direction="row" spacing={3}>
            <Grid item>
                <TextField
                    id="outlined-number"
                    label={`case #${idx}. 입력`}
                    value={aCase.input}
                    onChange={e => setInput(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item alignItems='center' justifyContent='center' display='flex'>
                {
                    renderAnswers()
                }
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={e => handleAddAnswer()}>
                    <AddIcon />
                </IconButton> 
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={e => handleRemoveAnswer()}>
                    <RemoveIcon />
                </IconButton>                
            </Grid>
        </Grid>
    )
}