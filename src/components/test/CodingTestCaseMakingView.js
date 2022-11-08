import { Grid, IconButton, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from "react";


/***
 * aCase ->
 * {
 *     input, 
 *     outputs [
 *         
 *     ]
 * }
 */

export default function({aCase, setCase, idx}) {
    useEffect(() => {
        renderAnswers();
    }, [aCase]);


    const setoutputs = (outputs, i) => {
        aCase.outputs[i] = outputs;
        setCase({...aCase})
    };

    const renderAnswers = () => {
        return aCase.outputs.map((outputs, i) => {
            return <TextField 
                    key={`outputs ${i}`}
                    label={`case #${idx}. 정답 ${i}`}
                    value={outputs}
                    onChange={e => setoutputs(e.target.value, i)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
        })
    }

    const handleAddAnswer = () => {
        setCase({...aCase, outputs: [...aCase.outputs, '']});
    };
    const handleRemoveAnswer = () => {
        aCase.outputs.pop();
        setCase({...aCase, outputs: aCase.outputs});
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