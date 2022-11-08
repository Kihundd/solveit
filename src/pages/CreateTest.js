import Appbar from '../components/home/Appbar.js';
import { Container, Box, Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import QuestionInfo, { MULTIPLE_CHOICE } from '../components/test/QuestionInfo';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TEST } from '../queries/queries';
import { CATEGORIES } from "../queries/test_queries";
import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import EditorBox from '../components/editor/EditorBox.js';

function CreateTest() {
    const navigate = useNavigate();
    const [questionNum, setQuestionNum] = useState(1);
    const [questionList, setQuestionList] = useState([{
        type: MULTIPLE_CHOICE,
        name: '',
        questionCategory: '',
        questionDifficulty: 5
    }]);
    const [questionIdx, setQuestionIdx] = useState();
    const [viewCreateTest, setViewCreateTest] = useState(true)
    // const [viewCreateQestion, setViewCreateQestion] = useState(false)

    const [name, setName] = useState('테스트 이름');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(true);
    const [isSave, setIsSave] = useState(false);
    const {loading, error, data} = useQuery(CATEGORIES);
    const [createTest, {Testloading, TestError, TestData}] = useMutation(CREATE_TEST);
    
    const addQuestion = () => {
        setQuestionList([...questionList, {
            type: MULTIPLE_CHOICE,
            name: '',
            questionCategory: '',
            questionDifficulty: 5,
        }])
    }
    
    const renderCategories = () => {
        if(data === undefined)
            return <MenuItem value='EMPTY' key='loading' disabled={true}>Loading...</MenuItem>
        return data.categories.map(category => 
            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>);
    }
    const handleCategoryChange = (e)=>{
        setCategory(e.target.value);
    }

    const handleOnSave = async info => {
        setIsSave(true);
        const questionIds = questionList.map(q => q.questionId);
        
        const input = {
            name,
            content,
            isPrivate: open,
            categoryId: Number(category),
            questionIds: questionIds
 
        };
        const response = await createTest({variables: {input}});
        console.log(response);
        console.log(response.data.createTest.success)
        if(response.data.createTest.success == true){
            navigate(-1);
        }
    }

    const handleQuestionNumClick = idx => {
        if(viewCreateTest) setViewCreateTest(false);
        console.log(idx);
        setQuestionIdx(idx);
    }

    const handleSaveQuestion = (idx, question) => {
        questionList[idx] = question;

        console.log("12345");
        setQuestionList([...questionList]);
    }



    return (
        <>
            <Appbar />
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}>
                        <Box sx={{border: '1px solid #c4c4c4', borderRadius: '5px'}}>
                            <Button fullWidth variant='text' color='inherit' onClick={()=>{ setViewCreateTest(true)}}>
                                {name}
                            </Button>
                            {questionList.map((q, index) => {
                                return <Grid container spacing={1} sx={{marginTop:'10px'}} key={`sidebar ${index}`}>
                                        <Grid item xs={2} key={index}>
                                            <Button 
                                                color='inherit'
                                                onClick={() => handleQuestionNumClick(index)}
                                                >{`${index + 1}`}
                                            </Button>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Button 
                                                color='inherit'
                                                onClick={() => handleQuestionNumClick(index)}
                                                >{ `${questionList[index].name === undefined? '': questionList[index].name} `}
                                            </Button>
                                        </Grid>
                                        </Grid>
                                    })}
                                <Button size="small" color='inherit' sx={{borderRadius: 100}} onClick={addQuestion} >+</Button>
                            <Grid container>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8}>
                                    <Button type='submit' fullWidth variant="contained" onClick={handleOnSave} sx={{marginTop:'10px', marginBottom: '10px'}}>테스트 생성</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        { viewCreateTest ?
                        <Box>
                            <TextField
                                fullWidth={true}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                label="테스트 이름 입력"
                            />
                            <FormControl size='string' sx={{float: 'left', mt: 1, width: '85%'}}>
                                <InputLabel id="question-category">카테고리</InputLabel>
                                <Select
                                    labelId="question-category"
                                    id="question-category-select"
                                    value={category}
                                    label="카테고리"
                                    onChange={handleCategoryChange}
                                    >{renderCategories()}
                                </Select>
                            </FormControl>
                            <Button variant='contained' size='medium'
                                onClick={()=>{
                                    setOpen(!open)
                                    console.log(open)
                                }}
                                sx={{float: 'right', mt: 2, width: '10%'}}
                            >
                                {open? "공개": "비공개"}
                            </Button>
                            <TextField 
                                fullWidth={true}
                                value={content}
                                onChange={e=>setContent(e.target.value)}
                                minRows={5}
                                maxRows={10}
                                multiline={true}
                                margin='dense'
                                label="테스트 설명"
                            />
                            
                            
                            
                        </Box>
                    : <QuestionInfo 
                        question = { [questionIdx, questionList[questionIdx]] } 
                        saveQuestion={handleSaveQuestion} />}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default CreateTest