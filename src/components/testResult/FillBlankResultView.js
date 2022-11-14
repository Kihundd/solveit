import { Grid, Box, TextField, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser';

const useStyle = makeStyles(() => 
    createStyles({
        input: {
            height: '1.33em',
            width: '5em'
        }
    })
)

export default function({question, answers}) {
    const style = {
        padding: '16.5px 14px',
        textAlign: 'start'
    }
    const classes = useStyle();
    const answer = answers.answer.split(',');
    console.log("!!@#");
    console.log(answer);
    const answerCount = useRef(0);

    const [paragraph, setParagraph] = useState(<></>);

    useEffect(() => {
        const newParagraph = parse(question.paragraph, {
            replace: domNode => {
                if(domNode.name === "dfn") {
                    const idx = answerCount.current;
                    answerCount.current += 1;

                    return (
                        // <span className={`m-8`}>
                            <TextField 
                                sx={{input: {textAlign: "center"}}}
                                InputProps={{
                                    className: classes.input
                                }}
                                value={answer[idx]}
                                variant="standard" />
                        // {/* </span> */}
                    )
                };
            }
        })
        setParagraph(newParagraph);
    }, []);


    return (
        <Grid item xs={12}>
            <Box style={style} sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                {paragraph}
            </Box>
        </Grid>)

}