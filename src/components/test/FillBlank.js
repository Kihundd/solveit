import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import {useState, useEffect, useRef} from 'react';
import FillBlankQuestionView from "./FillBlankQuestionView";

export default function({isSave, handleSave, question}) {
    const [paragraph, setParagraph] = useState("빈칸 채우기 테스트 \n__정답1__ 은 xyz이다. __정답2__ 입니다.");
    const [answers, setAnswers] = useState([]);
    const [explanation, setExplation] = useState("");
    const [toggleView, setToggleView] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        if(isSave === true) {
            handleSave({
                paragraph,
                explanation,
                answers
            });            
        }
    }, [isSave]);

    useEffect(() => {
        setParagraph(question.paragraph !== undefined? question.paragraph: '');
        setExplation(question.explanation !== undefined? question.explanation: '');
        if(question.answers !== undefined) {
            setAnswers(question.answers);
        }
    }, [question]);

    const handleParagraphChange = (e) => {
        setParagraph(e.target.value);
        const p = e.target.value;
        //\s means "spaces" (e.g., whitespace — including newlines), and + means "one or more".
        const words = p.split(/\s+/);
        const newAnswers = [];
        words.forEach(p => {
            // console.log(p);
            if(p.length >= 4 && p.startsWith('__') && p.endsWith('__')) {
                newAnswers.push(p.slice(2, p.length - 2));
            }
        });
        setAnswers(newAnswers);
    };

    const renderAnswers = () => {
        return answers.map((answer, i) => {
            const handleChange = e => {
                let ret = '';
                const lines = paragraph.split('\n');

                let cnt = 0;
                lines.forEach((line, lineIdx) => {
                    const words = line.split(' ');
                    words.forEach(word => {
                        if(word.length >= 4 && word.startsWith('__') && word.endsWith('__')) {
                            if(cnt === i) {
                                ret += `__${e.target.value}__ `;
                            } else ret += word + " ";
                            cnt += 1;
                        } else ret += word + " ";
                    })
                    if(lineIdx !== lines.length - 1)
                        ret += "\n";
                });
                setParagraph(ret);
                answers[i] = e.target.value;
                setAnswers(answers);
            };

            return (
                <Grid item xs={12} key={`answers ${i}`}>
                <TextField 
                    rows="2"
                    multiline
                    value={answer}
                    onChange={handleChange}
                    fullWidth={true}
                    label="문제 정답 입력"
                    />
                </Grid>
            )
        }
        );
    };

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12} style={{position:'relative'}}>
                <FormControlLabel 
                    control={<Switch value={toggleView} onChange={e => setToggleView(e.target.checked)} />} 
                    label="미리보기" 
                    style={{position: 'absolute', top: `-4%`, right:'0', zIndex: '9999'}}/>
                {
                    toggleView? <FillBlankQuestionView paragraph={paragraph} height={ref.current.offsetHeight}/> :
                        <TextField 
                        ref={ref}
                        rows='10'
                        multiline
                        fullWidth={true}
                        value={paragraph}
                        onChange={handleParagraphChange}
                        label="문제 내용 입력"
                    />
                }
            </Grid>
            <Grid item xs={12}>
                {renderAnswers()}
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    rows="5"
                    multiline
                    fullWidth={true}
                    value={explanation}
                    onChange={e => setExplation(e.target.value)}
                    label="문제 해설 입력"
                 />            </Grid>
            {/* <AnswerInput /> */}
            <Grid item xs={8}>
            
            </Grid>
        </Grid>
    )
}