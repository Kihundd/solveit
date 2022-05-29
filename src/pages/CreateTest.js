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
    const [viewCreateQestion, setViewCreateQestion] = useState()
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(true);
    const [questionIds, setQuestionIds] = useState([1,2]);
    const {loading, error, data} = useQuery(CATEGORIES);
    const [createTest, {Testloading, TestError, TestData}] = useMutation(CREATE_TEST);
    const [isSave, setIsSave] = useState(false);

    // const selectQuestion = () => {
        
    // }

    const buttonValue = e => {
        const { num } = e.target;
        setViewCreateQestion(num)
    }
    const addQuestion = () => {
        setQuestionNum(QuestionNum+1)
        setQuestionList([...QuestionList, QuestionNum])
        setQuestionIds([...QuestionList])
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
    const handleOnSave = () => {
        setIsSave(true);
    }
    const handleSave = async info => {
        setIsSave(false);
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

    return (
        <>
            <Header  />

            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '80vh'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <h5>테스트 이름</h5>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button size="small" variant="contained" onClick={addQuestion} >문제 추가</Button>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={3}>
                                        {QuestionList.map((Num, index) => {
                                            return <Box sx={{marginTop:'10px'}}  key={index}>
                                                <Button color='inherit'>
                                                    {QuestionList[index]}
                                                </Button>
                                            </Box>
                                        })}
                                    </Grid>
                                </Grid>
                                <Button type='submit' variant="contained" onClick={handleSave}>테스트 생성</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                            <Box sx={{border: '2px solid #c4c4c4', height: '40vh'}}>
                            
                                <TextField
                                    fullWidth={true}
                                    value={name}
                                    onChange={e=>setName(e.target.value)}
                                    label="테스트 제목 입력"
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
                                        }}
                                    >공개</Button>
                                </Grid>
                                

                            </Box>
                     
                        
                        <QuestionInfo QuestionNum={QuestionNum} />
                    </Grid>
                </Grid>
                
                
            </Container>
            <Container maxwidth="xs">
                
            </Container>
        </>
    )
}

export default CreateTest