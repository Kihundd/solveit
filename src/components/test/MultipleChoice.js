import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, useEffect } from 'react'
import _ from 'lodash';
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import { toUnitless } from "@mui/material/styles/cssUtils";

export default function ({isSave, handleSave}) {
    const [num, setAnswerNum] = useState('1');
    const [candNum, setCandNum] = useState(4);
    const [cands, setCands] = useState(["","","",""]);
    const [paragraph, setParagraph] = useState("");
    const [explanation, setExplation] = useState("");

    const handleExChange = e => {
        setExplation(e.target.value);
    }
  
    const handleSelect = (e, newSelect) => {
      setAnswerNum(newSelect);
    };

    useEffect(()=>{
        if(isSave === true) {
            handleSave({
                paragraph,
                candidates: cands,
                answers: [num],
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
            <Grid item xs={12}>
                <TextField 
                    rows="10"
                    multiline
                    fullWidth={true}
                    value={paragraph}
                    onChange={e => setParagraph(e.target.value)}
                    label="문제 내용 입력"
                 />
            </Grid>
            <Grid item xs={12}>
                {
                // answerListNum.map((answerNum, index) => (
                //     <AnswerListInput answerListNum={answerListNum} key={index} 
                //     i={index+1}
                // />))
                }
            </Grid>
            
            <Grid item xs={1}>
                <TextField
                    id="outlined-number"
                    label="보기 수"
                    type="number"
                    defaultValue={4}
                    onChange={handleCandNum}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={11}>
                <ToggleButtonGroup 
                    value={num}
                    exclusive
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