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
import { useLazyQuery, useMutation } from "@apollo/client";
import { CODING_TEST } from "../test/QuestionInfo";

import { Viewer } from "@toast-ui/react-editor";

const PADDING = 20;
const fontHeight = 19;

// C, PYTHON, JAVA, CPP

export default function({question, prevAnswer, testId, changeAnswer}) {
    const {paragraph, name} = question;
    const [answer, setAnswer] = useState({type: CODING_TEST, sourceCode: "", language: "PYTHON"});
    const progress = useRef([]);
    const ref = useRef();
    const [lineNumber, setLineNumber] = useState("1");

    const [submitCodingTestAnswer] = useMutation(SUBMIT_CODING_TEST_ANSWER);
    const [gradeTestCase] = useMutation(GRADE_TEST_CASE);
    const [getCodingTestResult, {data, loading, error}] = useLazyQuery(CODING_TEST_RESULT);
    
    const [languageObject, setLanguageObject] = useState({python:{}});

    useEffect(() => {
        Prism.register = (_) => {};
        python_language(Prism);
        java_language(Prism);
        c_language(Prism);
        cpp_language(Prism);
        setLanguageObject(Prism.languages);

        progress.current = question.testCases.map(() => "nothing");
        if(prevAnswer !== undefined && prevAnswer !== null && prevAnswer !== ""){
            setAnswer(...prevAnswer);
        }
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

    const handleChange = (sourceCode) => {
        setAnswer({...answer, sourceCode});
        changeAnswer([{...answer, sourceCode}]);

        setNewLineNumber();
    }

    const renderProgress = (status) => {
        if(status === "nothing") {
            return <></>;
        }
        else if (status === "PENDING") {
            return <Spinner visible={true} radius={30} />
        }
        else if (status === "SUCCESS") {
            return <CheckIcon />
        }
        else if (status === "FAIL") {
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
                        <TableCell align="center" className="loading-center">{renderProgress(progress.current[idx])}</TableCell>
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
        setAnswer({...answer, language: languageName});
    }

    const handleTestCaseTest = async () => {
        const response = await submitCodingTestAnswer({variables: {input: {
            testId: Number(testId),
            questionId: Number(question.id),
            sourceCode: answer.sourceCode,
            // language: languageObject.name.toUpperCase()
            language: answer.language.toUpperCase()
        }}});
        
        question.testCases.forEach((ignored, idx) => {
            gradeTestCase({variables: {
                testId: Number(testId),
                questionId: Number(question.id),
                testCaseIdx: idx
            }});
        });

        progress.current = [...progress.current.map(p => "PENDING")];
        waitingResult();
    };

    const waitingResult = async () => {        
        let intervalId;
        intervalId = setInterval(async () => {
            let stop = true;

            const newProgress = progress.current;
            for(const[idx, p] of newProgress.entries()) {
                if(p === "PENDING") {
                    stop = false;
                    const response = await getCodingTestResult({variables: {
                        testId: Number(testId),
                        questionId: Number(question.id),
                        testCaseIdx: idx
                    }});
                    
                    const result = response.data.codingTestResult.result;

                    if(result === "SUCCESS" || result === "FAIL") {
                        newProgress[idx] = result;
                    }
                    else if(result !== "PENDING") {
                        newProgress[idx] = "ERROR!";
                    }
                }
            }
            progress.current = [...newProgress];
            if(stop) clearInterval(intervalId);
        }, 500);
    };

    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                {/* <TextField 
                    rows="10"
                    multiline
                    fullWidth={true} 
                    value={paragraph}
                    InputProps = {{
                        readOnly:true
                    }}
                /> */}
                <Box sx={{textAlign:'left', border: '1px solid #c4c4c4', borderRadius: '5px', paddingLeft: '10px', paddingBottom: '100px'}} >
                    <Viewer style={{margin: '10'}} initialValue={paragraph} />
                </Box>
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
                            value={answer.language}
                            label="lan"
                            onChange={e => handleLanguageChange(e.target.value)}
                        >
                            <MenuItem value={"JAVA"}>JAVA</MenuItem>
                            <MenuItem value={"C"}>C</MenuItem>
                            <MenuItem value={"CPP"}>C++</MenuItem>
                            <MenuItem value={"PYTHON"}>Python</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <div ref={ref} className={'code-editor-container'}>
                <Editor
                    value={answer.sourceCode}
                    onValueChange={handleChange}
                    onChange={_ => setNewLineNumber()}
                    highlight={code => Prism.highlight(code, languageObject[answer.language.toLowerCase()], answer.language.toLowerCase())}
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