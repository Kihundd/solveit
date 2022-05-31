import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Rating, Select, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PhotoCamera } from '@mui/icons-material';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react'
import MultipleChoice from "./MultipleChoice";
import { CATEGORIES, CREATE_QUESTION } from "../../queries/test_queries";
import { useQuery, useMutation } from "@apollo/client";
import ShortAnswer from "./ShortAnswer";
import FillBlank from "./FillBlank";

export const MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
export const FILL_BLANK = "FILL_BLANK";
export const SHORT_ANSWER = "SHORT_ANSWER";
export const CODING_TEST = "CODING_TEST";

export default function ({ saveQuestion, question }) {
    const [type, setType] = useState(question[1].type);
    const [category, setCategory] = useState(question[1].questionCategory);
    const [name, setName] = useState(question[1].name);
    const [difficulty, setDifficulty] = useState(question[1].questionDifficulty);

    useEffect(() => {
        console.log(question[1].type);
        setType(question[1].type);
        setCategory(question[1].questionCategory);
        setName(question[1].name);
        setDifficulty(question[1].questionDifficulty / 2);
    }, [question]);

    const [isSave, setIsSave] = useState(false);
    const {loading, error, data} = useQuery(CATEGORIES);
    const [createQuestion, {loadingQuestion, errorQuetion, dataQuestion}] = useMutation(CREATE_QUESTION)
    const renderBody = () => {
        if(type === MULTIPLE_CHOICE) {
            return <MultipleChoice 
                    isSave={isSave}
                    handleSave={info => handleSave(info)}
                    question={question[1]}
                />;
        }
        else if(type === SHORT_ANSWER) {
            return  <ShortAnswer
                    isSave={isSave}    
                    handleSave={info => handleSave(info)}
                    question={question[1]}
                />;
        } else if(type === FILL_BLANK) {
            return <FillBlank
                    isSave={isSave}
                    handleSave={info => handleSave(info)}
                    question={question[1]}
                />;
        }
        return <></>
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
  
    const handleOnSave = () => {
        setIsSave(true);
    }

    const handleSave = async info => {
        setIsSave(false);
        console.log(difficulty);
        const input = {
            ...info,
            name,
            type,
            questionCategory: Number(category),
            questionDifficulty: difficulty * 2,
            
        };
        console.log(input);

        const response = await createQuestion({variables: {input}});
        input['questionId'] = response.data.createQuestion.questionId;

        saveQuestion(question[0], input);
    }
      

    const renderCategories = () => {
        if(data === undefined)
            return <MenuItem value='EMPTY' key='loading' disabled={true}>Loading...</MenuItem>
        return data.categories.map(category => 
            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>);
    };

    return (
        <Box sx={{border: '2px solid #c4c4c4', height: '100vh'}}>
        <Grid container spacing={2}>
            {/* <Grid item xs={12}>
                <Box sx={{border:'1px solid #c4c4c4'}}>{questionNum}</Box>
            </Grid> */}
            <Grid item xs={12}>
                <TextField 
                    fullWidth={true}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    label="문제 제목 입력(선택)"
                 />
            </Grid>
            <Grid item xs={12}>
                <Box xs={{border: '1px solid #c4c4c4'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="question-type">문제 유형</InputLabel>
                            <Select
                            labelId="question-type"
                            id="question-type-select"
                            value={type}
                            label="문제 유형"
                            onChange={handleTypeChange}
                            >

                            <MenuItem value={MULTIPLE_CHOICE}>객관식</MenuItem>
                            <MenuItem value={FILL_BLANK}>빈 칸 채우기</MenuItem>
                            <MenuItem value={SHORT_ANSWER}>단답형</MenuItem>
                            <MenuItem value={CODING_TEST}>코딩 테스트</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="question-category">카테고리</InputLabel>
                            <Select
                            labelId="question-category"
                            id="question-category-select"
                            value={category}
                            label="카테고리"
                            onChange={handleCategoryChange}
                            >
                                {renderCategories()}
                            </Select>
                        </FormControl>
                        </Grid>
                        
                        <Grid item xs={3} textAlign="left">
                            <Stack 
                                direction="column"
                                alignItems="center"
                                justifyContent="center">
                                <div> 난이도 </div>
                                <Rating 
                                    name="half-rating" 
                                    value={difficulty}
                                    onChange={e=> setDifficulty(Number(e.target.value))} 
                                    precision={0.5} />
                            </Stack>
                        </Grid>

                        <Grid item xs={9} />
                        <Grid item xs={3}>
                            <label htmlFor="icon-button-file">
                                {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
                                <IconButton color="primary" aria-label="upload audio" component="span">
                                    <AudiotrackOutlinedIcon />
                                </IconButton>
                            </label>
                            <label htmlFor="icon-button-file">
                                {/* <Input accept="image/*" id="icon-button-file" type="file" /> */}
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Grid>
                    </Grid>
                </Box>
                {renderBody()}
                <Grid container >
                    <Grid item xs={8}></Grid>
                    <Grid item xs={2}>
                        <Button variant="text">취소</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={handleOnSave}>저장</Button>
                    </Grid>
                </Grid>
                
            </Grid>      
        </Grid>
    </Box>
    )
}