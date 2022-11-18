import { Grid, Box, TextField, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import ReactDOMServer from "react-dom/server"
import React, { useEffect, useRef, useState } from 'react'
import parse from 'html-react-parser';
import { Viewer } from "@toast-ui/react-editor";
import { queryAllByAltText } from "@testing-library/react";

const useStyle = makeStyles(() => 
    createStyles({
        input: {
            height: '1.33em',
            width: '5em'
        }
    })
)

export default function({question, changeAnswer, prevAnswer}) {
    const classes = useStyle();
    const [answer, setAnswer] = useState([]);
    const [paragraph, setParagraph] = useState(<></>);
    const answerCount = useRef(0);

    useEffect(() => {
        setAnswer([...prevAnswer]);
        answerCount.current = 0;

        question.paragraph = question.paragraph.replace(/<p>(.*)<\/p>/gm, "<div>$1</div>");
        console.log(question.paragraph);
        const newParagraph = parse(question.paragraph, {
            replace: domNode => {
                console.log(domNode);
                if(domNode.name === "span" && domNode.attribs.class === 'answer_making') {
                    const idx = answerCount.current;

                    const handleChange = e => {
                        answer[idx] = e.target.value;
                        setAnswer([...answer]);
                        changeAnswer([...answer]);
                    }
                    answerCount.current += 1;

                    return (
                        <span className={`m-8`}>
                            <TextField 
                                
                                sx={{input: {textAlign: "center"}}}
                                InputProps={{
                                    className: classes.input
                                }}
                                value={answer[idx]}
                                variant="standard"
                                onChange={handleChange} />
                        </span>
                    )
                };
            }
        })
        setParagraph(newParagraph);
    }, []);

    return (
        <Grid item xs={12}>
            <Box sx={{textAlign:'left', border: '1px solid #c4c4c4', borderRadius: '5px', padding: '16.5px 14px'}}>
                <div>{paragraph}</div>
            </Box>
        </Grid>
    )

}