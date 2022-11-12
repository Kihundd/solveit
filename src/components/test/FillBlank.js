import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import {useState, useEffect, useRef} from 'react';
import FillBlankQuestionView from "./FillBlankQuestionView";
import MyEditor from "../editor/MyEditor";

const START = "&lt;dfn&gt;";
const END = "&lt;/dfn&gt;";

export default function({isSave, handleSave, question}) {
    const [paragraph, setParagraph] = useState("");
    const [answers, setAnswers] = useState([]);
    const [explanation, setExplation] = useState("");
    const [toggleView, setToggleView] = useState(false);
    const ref = useRef();

    const editorRef = useRef();
    useEffect(()=>{
        if(isSave === true) {
            const newParagraph = paragraph.replace('&lt;dfn&gt;', "<dfn>").replace("&lt;/dfn&gt;", "</dfn>");

            handleSave({
                paragraph: newParagraph,
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

    const handleParagraphChange = () => {
        const p = editorRef.current?.getInstance().getHTML();
        console.log(p);
        setParagraph(p);
        //\s means "spaces" (e.g., whitespace — including newlines), and + means "one or more".
        const words = p.split(/\s+/);
        const newAnswers = [];
        words.forEach(p => {
            if(p.length >= 14 && p.startsWith(START) && p.endsWith(END)) {
                newAnswers.push(p.slice(START.length, p.length - END.length));
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
                        if(word.length >= 14 && word.startsWith(START) && word.endsWith(END)) {
                            if(cnt === i) {
                                ret += `${START}${e.target.value}${END} `;
                            } else ret += word + " ";
                            cnt += 1;
                        } else ret += word + " ";
                    })
                    if(lineIdx !== lines.length - 1)
                        ret += "\n";
                });
                setParagraph(ret);
                editorRef.current.getInstance().setHTML(ret, false);
                answers[i] = e.target.value;
                setAnswers([...answers]);
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
            <Grid item xs={12} style={{position:'relative', textAlign: 'left'}}>
                <FormControlLabel 
                    control={<Switch value={toggleView} onChange={e => setToggleView(e.target.checked)} />} 
                    label="미리보기" 
                    style={{position: 'absolute', top: `-22%`, right:'0', zIndex: '9999'}}/>
                {
                    toggleView? <FillBlankQuestionView paragraph={paragraph} height={ref.current != null? ref.current.offsetHeight: 300}/> :
                    //     <TextField 
                    //     ref={ref}
                    //     rows='10'
                    //     multiline
                    //     fullWidth={true}
                    //     value={paragraph}
                    //     onChange={handleParagraphChange}
                    //     label="문제 내용 입력"
                    // />
                    <div ref={ref}>
                        <MyEditor paragraph={paragraph} editorRef={editorRef} onChange={handleParagraphChange}/>
                    </div>
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
                 />            
            </Grid>
            {/* <AnswerInput /> */}
            <Grid item xs={8}>
            
            </Grid>
        </Grid>
    )
}