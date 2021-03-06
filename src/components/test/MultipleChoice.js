import { Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { useState, useEffect } from 'react'
import _ from 'lodash';
import CheckIcon from '@mui/icons-material/Check';


export default function ({isSave, handleSave, question}) {
    const [num, setAnswerNum] = useState(['1']);
    const [candNum, setCandNum] = useState(2);
    const [cands, setCands] = useState(['', '']);
    const [paragraph, setParagraph] = useState('');
    const [explanation, setExplation] = useState('');
    const [exclusive, setExclusive] = useState(false);

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
                paragraph,
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
                        label="?????? ?????? "
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
                    label="?????? ?????? ??????"
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
            
            <Grid item xs={3}>
                <Grid container direction="row">
                    <Grid item xs={3}>
                    <TextField
                        id="outlined-number"
                        label="?????? ???"
                        type="number"
                        defaultValue={4}
                        onChange={handleCandNum}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <span>?????? ??????</span>
                    <ToggleButton
                        value="check"
                        label="?????? ??????"
                        selected={!exclusive}
                        onChange={() => {handleExclusiveChange();}}>
                            <CheckIcon />
                    </ToggleButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={9}>
                <span>??????: </span>
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
                    label="?????? ?????? "
                    value={explanation}
                    onChange={handleExChange} />
            </Grid>            
        </Grid>
    )
}