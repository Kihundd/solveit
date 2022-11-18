import Appbar from '../components/home/Appbar.js'
import { useEffect, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper, Container, Button, IconButton, FormControl, MenuItem, InputLabel, Select, Grid, Stack, Divider} from '@mui/material';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ALLTESTLIST, ALLTESTSCOUNT, TESTLIST_CATEGORY } from '../queries/queries';
import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function TestList() {
    
    const [pageList] = useState([1]);
    const [pageNum, setPageNum] = useState(1);
    const [testList, setTestList] = useState();
    const [order, setOrder] = useState('DATE_DESC');
    const [categoryId, setCategoryId] = useState(0);
    
    const {loading, error, data} = useQuery(ALLTESTLIST, {
        variables: {page: pageNum, order: order}}
    );
    const {data:countData, loading:countLoading, error:countError} = useQuery(ALLTESTSCOUNT);
    const [getByCategory] = useLazyQuery(TESTLIST_CATEGORY);
    
    useEffect(() => {
        if(countData !== undefined && countData.allTestsCount !== undefined){
            for(let i = 2; i <= Math.ceil(countData.allTestsCount/10); i++){
                pageList.push(i)
            }  
        }   
    }, [countData])
    
    useEffect(()=>{
        if(data !== undefined && data.allTests !== undefined){
            setTestList(data.allTests)
        }
    },[data])

    
    const handleCategoryChange = async (e) => {
        setCategoryId(e.target.value);
        const response = await getByCategory({variables:{
            id: e.target.value
        }})
        setTestList(response.data.testsByCategory)
        console.log(response)
    };
    const handleSortChange = (event) => {
        setOrder(event.target.value);
    };
    const nextPage = () => {
        if (pageNum !== pageList[pageList.length - 1]) {
            let currentPage = pageNum
            let nextPage = currentPage + 1
            setPageNum(nextPage)
        }
    }
    const previousPage = () => {
        if(pageNum !== 1){
            let currentPage = pageNum
            let previousPage = currentPage - 1
            setPageNum(previousPage)
        }
    }

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

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
                    <Button size='small' variant='standard' color="inherit">전체</Button>
                    {/* <Button size='small' variant='standard' color="inherit" onClick={handleGetByCategory}>카테고리별</Button> */}
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
                <FormControl variant='standard' label="정렬순서"  sx={{width: '120px'}}>
                    <Select value={order} onChange={handleSortChange} sx={{float: 'left'}} >
                        <MenuItem value={'DATE_DESC'}>최근순</MenuItem>
                        <MenuItem value={'DATE'}>오래된순</MenuItem>
                        <MenuItem value={'LIKE_DESC'}>좋아요순</MenuItem>
                        <MenuItem value={'SOLVING_COUNT_DESC'}>제출수순</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
                
                
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px', mb: 1}} 
                    aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">문제번호</TableCell>
                        <TableCell align="center">문제집이름</TableCell>
                        <TableCell align="center">출제자</TableCell>
                        <TableCell align="center">제출 수</TableCell>
                        <TableCell align="center">좋아요</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {testList ? testList.map((a, index) => (
                            <TableRow key={index}
                            >
                            <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.id}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.name}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.ownerId}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.tryCnt}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.like}</Link></TableCell>
                            </TableRow>
                        )): null}
                    </TableBody>
                </Table>
                <IconButton onClick={()=>{previousPage()}}>
                    <ChevronLeftIcon />
                </IconButton>
                {pageList.map((a, index) => (
                    <Button key={index} variant='inherit' onClick={()=>{
                        setPageNum(a)
                        console.log(a)
                    }}>{a}</Button>
                ))}
                <IconButton onClick={()=>{nextPage()}}>
                    <ChevronRightIcon />
                </IconButton>

            </ Container>
        </>
    )
}

export default TestList