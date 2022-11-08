import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";
import 'prismjs/components/prism-clike';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import Editor from "react-simple-code-editor";

import python_language from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import java_language from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import c_language from "react-syntax-highlighter/dist/cjs/languages/prism/c";
import cpp_language from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import Spinner from "react-spinner-material";
import { CODING_TEST_RESULT, GRADE_TEST_CASE, SUBMIT_CODING_TEST_ANSWER } from "../../queries/queries";
import { useMutation } from "@apollo/client";

const PADDING = 20;
const fontHeight = 19;

// C, python, java, C++

export default function({question, prevAnswer, testId, changeAnswer}) {
    const {paragraph, name} = question;
    const [answer, setAnswer] = useState(prevAnswer);
    const [progress, setProgress] = useState([]);
    const ref = useRef();
    const [lineNumber, setLineNumber] = useState("1");

    const [submitCodingTestAnswer] = useMutation(SUBMIT_CODING_TEST_ANSWER);
    const [gradeTestCase] = useMutation(GRADE_TEST_CASE);
    const [getCodingTestResult, {data, loading, error}] = useLazyQuery(CODING_TEST_RESULT);
    
    const [languageObject, setLanguageObject] = useState({languages: {python:{}}, name: "python"});

    useEffect(() => {
        Prism.register = (_) => {};
        python_language(Prism);
        java_language(Prism);
        c_language(Prism);
        cpp_language(Prism);
        setLanguageObject({...languageObject, languages: Prism.languages});

        setProgress(question.testCases.map(() => "nothing"));
    }, []);

    const getHeight = () => {
        return ref.current.clientHeight - 2 * PADDING;
    }
    const getLineNumber = () => {
        return Math.round(getHeight() / fontHeight);
    }
    const setNewLineNumber = () => {
        setTimeout(() => {
            let newLineNumber = "";
            for(let i = 1; i <= getLineNumber(); ++i)
                newLineNumber += `${String(i)}\n`;
            setLineNumber(newLineNumber);
        }, 10);
    }

    const handleChange = (answer) => {
        setAnswer(answer);
        changeAnswer([answer]);

        setNewLineNumber();
    }

    const renderProgress = (status) => {
        if(status === "nothing") {
            return <></>;
        }
        else if (status === "waiting") {
            return <Spinner visible={true} radius={30} />
        }
        else if (status === "correct") {
            return <CheckIcon />
        }
        else if (status === "wrong") {
            return <CloseIcon />
        }
        else {
            return <></>;
        }
     }

    const renderTestCases = () => {
        if(question === undefined || question === null)
            return <></>;

        const render = () => {
            return question.testCases.map(({input, outputs}, idx) => {
                const outputsString = outputs.join(" or ");
                
                return (
                    <TableRow key={`${idx}: ${input}`}>
                        <TableCell align="center">{input}</TableCell>
                        <TableCell align="center">{outputsString}</TableCell>
                        <TableCell align="center" className="loading-center">{renderProgress(progress[idx])}</TableCell>
                    </TableRow>
                )
            });
        }

        return (
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width='30%'>입력</TableCell>
                                <TableCell align="center" width='50%'>출력</TableCell>
                                <TableCell align="center" width='20%'>결과</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                render()
                            }
                        </TableBody>
                    </Table>

                </TableContainer>
            </Grid>
        )
    }


    const handleLanguageChange = (languageName) => {
        setLanguageObject({...languageObject, name: languageName});
    }

    const handleTestCaseTest = async () => {
        const response = await submitCodingTestAnswer({variables: {input: {
            testId: Number(testId),
            questionId: Number(question.id),
            sourceCode: answer,
            language: languageObject.name.toUpperCase()
        }}});
        
        question.testCases.forEach((ignored, idx) => {
            gradeTestCase({variables: {
                testId: Number(testId),
                questionId: Number(question.id),
                testCaseIdx: idx
            }});
        });
        
        waitingResult();
    };

    const waitingResult = async () => {
        setProgress(progress.map(p => "waiting"));
        
        let intervalId;

        intervalId = setInterval(async () => {
            let stop = true;

            for(const[idx, p] of progress.entries()) {
                if(p === "waiting") {
                    stop = false;
                    const response = await getCodingTestResult({variables: {
                        testId: Number(testId),
                        questionId: Number(question.id),
                        testCaseIdx: idx
                    }})
                    if(response.data.getCodingTestResult.result === "SUCCESS") {

                    }
                    if(response.data.getCodingTestResult.result === "FAIL") {

                    }
                }
            }

        }, 500)
    };

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                <TextField 
                    rows="10"
                    multiline
                    fullWidth={true} 
                    value={paragraph}
                    InputProps = {{
                        readOnly:true
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant="contained" onClick={_ => handleTestCaseTest()}>
                        테스트
                    </Button>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    <FormControl>
                        <InputLabel id="lan-select-label">언어</InputLabel>
                        <Select
                            id="lan-simple-select"
                            value={languageObject.name}
                            label="lan"
                            onChange={e => handleLanguageChange(e.target.value)}
                        >
                            <MenuItem value={"java"}>JAVA</MenuItem>
                            <MenuItem value={"c"}>C</MenuItem>
                            <MenuItem value={"cpp"}>C++</MenuItem>
                            <MenuItem value={"python"}>Python</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <div ref={ref} className={'code-editor-container'}>
                <Editor
                    value={answer}
                    onValueChange={handleChange}
                    onChange={_ => setNewLineNumber()}
                    highlight={answer => Prism.highlight(answer, languageObject.languages[languageObject.name], languageObject.name)}
                    className={"code-editor"}
                    padding={PADDING}
                    sytle={{
                        fontSize: 12
                    }}
                >
                </Editor>
                <div className="code-editor-line-number">{lineNumber}</div>
                </div>
            </Grid>
            {
                renderTestCases()
            }
        </Grid>
    )

}