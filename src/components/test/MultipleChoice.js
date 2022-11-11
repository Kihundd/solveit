import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { useState, useEffect, useRef } from 'react'
import _ from 'lodash';
import CheckIcon from '@mui/icons-material/Check';
import MyEditor from "../editor/MyEditor";

export default function ({isSave, handleSave, question}) {
    const [num, setAnswerNum] = useState(['1']);
    const [candNum, setCandNum] = useState(2);
    const [cands, setCands] = useState(['', '']);
    const [paragraph, setParagraph] = useState('');
    const [explanation, setExplation] = useState('');
    const [exclusive, setExclusive] = useState(false);

    const editorRef = useRef();

    useEffect(() => {
        setAnswerNum(question.answers !== undefined? question.answers: ['1']);
        setCandNum(question.candidates !== undefined? question.candidates.length: 2);
        setCands(question.candidates !== undefined? question.candidates: ['', '']);
        setParagraph(question.paragraph !== undefined? question.paragraph: '');
        setExplation(question.explanation !== undefined? question.explanation: '');
        setExclusive(question.candidates !== undefined && question.candidates.length >= 2? false: true);

    }, [question]);

    const handleExChange = e => {
        setExplation(e.target.value);
    }
  
    const handleSelect = (e, newSelect) => {
        console.log(newSelect);
        setAnswerNum([...newSelect]);
    };

    const handleExclusiveChange = () => {
        if(exclusive === true) {
            setAnswerNum([]);
            setExclusive(false);
        } else {
            setAnswerNum('');
            setExclusive(true);
        }
    }

    useEffect(()=>{
        if(isSave === true) {
            handleSave({
                paragraph: editorRef.current?.getInstance().getHTML(),
                candidates: cands,
                answers: num,
                explanation
            });
        }
    }, [isSave]);

    const handleCandNum = e => {
        const n = Number(e.target.value)

        setCandNum(n);
        while(cands.length > n) cands.pop();
        while(cands.length < n) cands.push("");
        setCands(cands);
    }

    const renderAnswer = () => {
        return [...Array(candNum).keys()].map(i => {
            return <ToggleButton value={`${i+1}`} key={`answer ${i}`}>{i + 1}</ToggleButton>
        })
    };

    const renderCandidate = () => {
        return [...Array(candNum).keys()].map(i => {
            const handleChange = e => {
                cands[i] = e.target.value;
                setCands([...cands]);
            }
            return (
                <Grid item xs={12} key={`candidate-${i}`}>
                    <TextField 
                        id={`candidate-text-${i}`}
                        fullWidth={true} 
                        label="보기 입력 "
                        onChange={handleChange}
                        value={cands[i]} />
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
            <Grid item xs={2} >
                <TextField
                    id="outlined-number"
                    label="보기 수"
                    type="number"
                    defaultValue={2}
                    onChange={handleCandNum}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
                <span>중복 </span>
                <ToggleButton
                    value="check"
                    label="복수 정답"
                    selected={!exclusive}
                    onChange={() => {handleExclusiveChange();}}>
                        <CheckIcon />
                </ToggleButton>
            </Grid>
            <Grid item xs={3}>
                <span>정답: </span>
                <ToggleButtonGroup 
                    value={num}
                    exclusive={exclusive}
                    onChange={handleSelect}
                    aria-label="anwerNum"
                >
                    {renderAnswer()}
                </ToggleButtonGroup>
            </Grid>
            {renderCandidate()}
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