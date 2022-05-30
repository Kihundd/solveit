import Header from '../components/home/Header'
import { Container, Box, Grid, TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { useState } from 'react'
import QuestionInfo from '../components/test/QuestionInfo';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TEST } from '../queries/queries';
import { CATEGORIES } from "../queries/test_queries";
import { render } from '@testing-library/react';

function CreateTest() {
    const [QuestionNum, setQuestionNum] = useState(1);
    const [QuestionList, setQuestionList] = useState([]);
    const [viewCreateTest, setViewCreateTest] = useState(true)
    // const [viewCreateQestion, setViewCreateQestion] = useState(false)
    
    const [name, setName] = useState('테스트 이름');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(true);
    const [questionIds, setQuestionIds] = useState([QuestionNum]);
    const [isSave, setIsSave] = useState(false);
    console.log(QuestionList)
    const {loading, error, data} = useQuery(CATEGORIES);
    const [createTest, {Testloading, TestError, TestData}] = useMutation(CREATE_TEST);
    
    const addQuestion = () => {
        setQuestionNum(QuestionNum+1)
        setQuestionList([...QuestionList, QuestionNum])
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
    const questionList = QuestionList.map((num,i)=>{
        <QuestionInfo questionNum={i}/>         
    })

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
                            <Grid container>
                                <Grid item xs={3}>
                                    {QuestionList.map((Num, index) => {
                                        return <Box sx={{marginTop:'10px'}}  key={index}>
                                                    <Button color='inherit' onClick={()=>{
                                                        setViewCreateTest(false)
                                                        {<QuestionInfo />}
                                                    }}>
                                                        {QuestionList[index]}
                                                    </Button>
                                                </Box>
                                        })}
                                </Grid>
                            </Grid>
                            <Button type='submit' variant="contained" onClick={handleOnSave}>테스트 생성</Button>
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
                                >공개
                                </Button>
                            </Grid>
                        </Box>
                    : <QuestionInfo />}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default CreateTest