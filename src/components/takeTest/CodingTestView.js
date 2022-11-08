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
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
import { DataGrid } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import Spinner from "react-spinner-material";

const PADDING = 20;
const fontHeight = 19;

// C, python, java, C++

export default function({question, prevAnswer, changeAnswer}) {
    const {paragraph, name} = question;
    const [answer, setAnswer] = useState(prevAnswer);
    const [progress, setProgress] = useState([]);
    const ref = useRef();
    const [lineNumber, setLineNumber] = useState("1");

    
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
        else if (status === "processing") {
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
            return question.testCases.map(({input, output}, idx) => {
                const outputString = output.join(" or ");
                
                return (
                    <TableRow key={`${idx}: ${input}`}>
                        <TableCell align="center">{input}</TableCell>
                        <TableCell align="center">{outputString}</TableCell>
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
                    <Button variant="contained">
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