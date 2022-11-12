import { Grid, TextField } from "@mui/material";
import { useState, useEffect, useRef } from 'react'
import _ from 'lodash';
import CodingTestCaseMakingView from "./CodingTestCaseMakingView";
import MyEditor from "../editor/MyEditor";

export default function ({isSave, handleSave, question}) {
    const [cases, setCases] = useState([{input: '', outputs:['']}, {input: '', outputs:['']},{input: '', outputs:['']},{input: '', outputs:['']}]);
    const [paragraph, setParagraph] = useState('');
    const [explanation, setExplation] = useState('');
    const editorRef = useRef();

    useEffect(() => {
        console.log(question);
        setCases(question.testCases !== undefined? question.testCases: cases);
        setParagraph(question.paragraph !== undefined? question.paragraph: paragraph);
        setExplation(question.explanation !== undefined? question.explanation: explanation);

    }, [question]);

    const handleExChange = e => {
        setExplation(e.target.value);
    }

    useEffect(()=>{
        if(isSave === true) {
            handleSave({
                paragraph: editorRef.current?.getInstance().getHTML(),
                testCases: cases,
                explanation
            });
        }
    }, [isSave]);

    const handleCandNum = e => {
        const n = Number(e.target.value)

        while(cases.length > n) cases.pop();
        while(cases.length < n) cases.push({input: '', outputs:[]});
        setCases([...cases]);
    }

    const renderCases = () => {
        return cases.map((aCase, i) => {
            const handleChange = anotherCase => {
                cases[i] = anotherCase;
                setCases([...cases]);
            }

            return (
                <Grid item xs={12} key={`candidate-${i}`}>
                    <CodingTestCaseMakingView
                        idx={i}
                        aCase={aCase}
                        setCase={handleChange}
                    />
                </Grid>
            )
        })
    }


    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12} sx={{textAlign: 'left'}}>
                {/* <TextField 
                    rows="10"
                    multiline
                    fullWidth={true}
                    value={paragraph}
                    onChange={e => setParagraph(e.target.value)}
                    label="문제 내용 입력"
                 /> */}
                <MyEditor
                    paragraph={paragraph}
                    editorRef={editorRef}
                />
            </Grid>
            <Grid item xs={12}>
                {}
            </Grid>
            <Grid container rowSpacing={2}>
                <Grid item>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-number"
                            label="케이스 수"
                            type="number"
                            defaultValue={4}
                            onChange={handleCandNum}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>

                {renderCases()}
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    fullWidth={true}
                    label="해설 입력 "
                    value={explanation}
                    onChange={handleExChange} />
            </Grid>            
        </Grid>
    )
}