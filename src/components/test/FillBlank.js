import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import {useState, useEffect, useRef} from 'react';
import FillBlankQuestionView from "./FillBlankQuestionView";
import MyEditor from "../editor/MyEditor";

const START = '<span class="answer_making">[';
const END = ']</span>';

export default function({isSave, handleSave, question}) {
    const [paragraph, setParagraph] = useState("");
    const [answers, setAnswers] = useState([]);
    const [explanation, setExplation] = useState("");
    const [toggleView, setToggleView] = useState(false);
    const ref = useRef();

    const answerRegExp = /<span class="answer_making">\[([^\]]*)\]<\/span>/gm;

    const editorRef = useRef();
    useEffect(()=>{
        if(isSave === true) {
            const newParagraph = decodeHtml(paragraph);

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
        // console.log(p);
        setParagraph(p);
        //\s means "spaces" (e.g., whitespace — including newlines), and + means "one or more".
        const newAnswers = [];

        const matches = decodeHtml(p).match(answerRegExp);
        if(matches)
            matches.forEach(answer => {
                const newAnswer = decodeHtml(answer).replace(START, "").replace(END, "");
                newAnswers.push(newAnswer);
            });
        setAnswers(newAnswers);
    };

    const renderAnswers = () => {
        return answers.map((answer, i) => {
            const handleChange = e => {
                const p = decodeHtml(editorRef.current?.getInstance().getHTML());
                let match;
                
                for(let start = 0; start <= i; ++start) 
                    match = answerRegExp.exec(p);
                
                const startIdx = match.index + START.length;
                const endIdx = startIdx + answers[i].length;
                
                // const ret = replaceWithRange(startIdx, endIdx, e.target.value, p).replaceAll("<dfn>", '&lt;dfn&gt;').replaceAll("</dfn>", '&lt;/dfn&gt;');
                const ret = replaceWithRange(startIdx, endIdx, e.target.value, p);

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
                    <div ref={ref}>
                        <MyEditor paragraph={paragraph} editorRef={editorRef} onChange={handleParagraphChange} options={{fillBlank: true}}/>
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

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
function encodeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function replaceWithRange(start, end, string, target) {
    return target.substring(0, start) + string + target.substring(end);
}