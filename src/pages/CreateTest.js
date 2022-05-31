import Header from '../components/home/Header'
import { Container, Box, Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import QuestionInfo, { MULTIPLE_CHOICE } from '../components/test/QuestionInfo';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TEST } from '../queries/queries';
import { CATEGORIES } from "../queries/test_queries";
import { render } from '@testing-library/react';

function CreateTest() {
    const [questionNum, setQuestionNum] = useState(1);
    const [questionList, setQuestionList] = useState([]);
    const [questionIdx, setQuestionIdx] = useState();
    const [viewCreateTest, setViewCreateTest] = useState(true)
    // const [viewCreateQestion, setViewCreateQestion] = useState(false)
    
    const [name, setName] = useState('테스트 이름');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(true);
    const [isSave, setIsSave] = useState(false);
    console.log(questionList)
    const {loading, error, data} = useQuery(CATEGORIES);
    const [createTest, {Testloading, TestError, TestData}] = useMutation(CREATE_TEST);
    
    const addQuestion = () => {
        setQuestionList([...questionList, {
            type: MULTIPLE_CHOICE,
            name: '',
            questionCategory: '',
            questionDifficulty: 5
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
            private: open,
            categoryId: Number(category),
            questionIds: questionIds
 
        };
        const response = await createTest({variables: {input}});
        console.log(response);
    }

    const handleQuestionNumClick = idx => {
        if(viewCreateTest) setViewCreateTest(false);
        console.log(idx);
        setQuestionIdx(idx);
    }

    const handleSaveQuestion = (idx, question) => {
        questionList[idx] = question;

        setQuestionList([...questionList]);
    }

    return (
        <>
            <Header  />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '80vh'}}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button color='inherit' onClick={()=>{
                                        setViewCreateTest(true)
                                    }}>
                                        {name}
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button size="small" variant="contained" onClick={addQuestion} >문제 추가</Button>
                                </Grid>
                            </Grid>
                            {questionList.map((q, index) => {
                                return <Grid container spacing={1} sx={{marginTop:'10px'}}>
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
                            <Grid container>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8}>
                                    <Button type='submit' fullWidth variant="contained" onClick={handleOnSave} sx={{marginTop:'10px'}}>테스트 생성</Button>
                                </Grid>
                            </Grid>
                            
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        { viewCreateTest ?
                        <Box sx={{border: '2px solid #c4c4c4', height: '40vh'}}>
                            <TextField
                                fullWidth={true}
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                label="테스트 이름 입력"
                            />
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
                            <FormControl fullWidth>
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
                            <Grid item xs={1}>
                                <Button variant='contained'
                                    onClick={()=>{
                                        setOpen(!open)
                                        console.log(open)
                                    }}
                                >
                                    {open? "공개": "비공개"}
                                </Button>
                            </Grid>
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