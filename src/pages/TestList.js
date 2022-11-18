import Appbar from '../components/home/Appbar.js'
import { useEffect, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper, Container, Button, IconButton, FormControl, MenuItem, InputLabel, Select, Grid, Stack, Divider} from '@mui/material';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ALLTESTLIST, ALLTESTSCOUNT, TESTLIST_CATEGORY } from '../queries/queries';
import TestTable from '../components/test/TestTable.js';
import CategoryTable from '../components/test/CategoryTable.js';

function TestList() {
    
    const [page, setPage] = useState(1);
    const [testList, setTestList] = useState([]);
    const [categoryList, setCategoryList] = useState([])
    const [cnt, setCnt] = useState(0);
    const [order, setOrder] = useState('DATE_DESC');
    const [categoryId, setCategoryId] = useState(0);
    const [open, setOpen] = useState(true);
    
    const {loading, error, data} = useQuery(ALLTESTLIST, {
        variables: {page: page, order: order}}
    );
    const {data:countData, loading:countLoading, error:countError} = useQuery(ALLTESTSCOUNT);

    const [getAllTest] = useLazyQuery(ALLTESTLIST);
    const [getByCategory] = useLazyQuery(TESTLIST_CATEGORY);
    
    useEffect(()=>{
        if(data !== undefined && data.allTests !== undefined){
            setTestList(data.allTests)
        }
    },[data])

    useEffect(() => {
        if(countData !== undefined && countData.allTestsCount !== undefined){
            setCnt(Math.ceil(countData.allTestsCount/10))
        }   
    }, [countData])

    useEffect(() => {
      if(!open){
        setTestList(testList.slice(page * 10 - 10, page * 10))
      }
    }, [page])


    const handleAllTest = async () => {
        const response = await getAllTest({variables: {page: 1, order: order}});
        setTestList(response.data.allTests)
        setCnt(Math.ceil(countData.allTestsCount/10))
        setOpen(true)
        setCategoryId(0)
        console.log(response)
        
        // setCnt(Math.ceil(response.data.mySolvingTests.length / 10))
    }

    const handleSortChange = (event) => {
        setOrder(event.target.value);
    };

    const handleCategoryChange = async (e) => {
        setOpen(false)
        setCategoryId(e.target.value);
        const response = await getByCategory({variables:{
            id: e.target.value
        }})
        setTestList(response.data.testsByCategory)
        setCnt(Math.ceil(response.data.testsByCategory.length / 10))
        setPage(1)
        console.log(response)
    };

    const renderOrder = () => {
        if(open == true) {
            return <FormControl variant='standard' label="정렬순서"  sx={{width: '120px'}}>
                        <Select value={order} onChange={handleSortChange} sx={{float: 'left'}} >
                            <MenuItem value={'DATE_DESC'}>최근순</MenuItem>
                            <MenuItem value={'DATE'}>오래된순</MenuItem>
                            <MenuItem value={'LIKE_DESC'}>좋아요순</MenuItem>
                            <MenuItem value={'SOLVING_COUNT_DESC'}>제출수순</MenuItem>
                        </Select>
                    </FormControl>
        }
    }

    return(
        <> 
            <Appbar />
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{mb: 2}}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={3}>
                        <Button size='small' variant='standard' color="inherit" onClick={handleAllTest}>전체</Button>
                        <FormControl variant='standard' sx={{width: '120px'}}>
                            <Select value={categoryId} onChange={handleCategoryChange} >
                                <MenuItem value={0}>카테고리</MenuItem>
                                <MenuItem value={1}>ENGLISH</MenuItem>
                                <MenuItem value={2}>KOREAN</MenuItem>
                                <MenuItem value={3}>SCIENCE</MenuItem>
                                <MenuItem value={4}>MATH</MenuItem>
                                <MenuItem value={5}>TOEIC</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    {renderOrder()}
                </Stack>
                {open ? <TestTable testList={testList} page={cnt} setPage={setPage} open={open}/>
                    :   <CategoryTable testList={testList} page={cnt} setPage={setPage} open={open}/>}
            </ Container>
        </>
    )
}

export default TestList