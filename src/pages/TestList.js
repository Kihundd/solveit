import Appbar from '../components/home/Appbar.js'
import { useEffect, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper, Container, Button, IconButton, FormControl, MenuItem, InputLabel, Select, Grid} from '@mui/material';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ALLTESTLIST, ALLTESTSCOUNT, TESTLIST_CATEGORY } from '../queries/queries';
import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function TestList() {
    
    // const {testId} = useParams();
    const [pageList, setPageList] = useState([1,2]);
    const [pageNum, setPageNum] = useState(1);
    const [testCnt, setTestCnt] = useState(0);
    const [testList, setTestList] = useState();
    const [order, setOrder] = useState('DATE_DESC');
    const [categoryId, setCategoryId] = useState('');
    
    const {loading, error, data} = useQuery(ALLTESTLIST, {
        variables: {page: pageNum, order: order}}
    );

    const {data:countData, loading:countLoading, error:countError} = useQuery(ALLTESTSCOUNT);
    const [pageNation, {loading:testLading, error: testError, data: testData}] = useLazyQuery(ALLTESTLIST);
    

    // const [GetByCategory, {loading:categoryLoading, error:categoryError, data:categoryData}] = useLazyQuery(TESTLIST_CATEGORY);
    // // console.log(categoryId)
    // // console.log(categoryData)
    console.log(countData)
    useEffect(() => {
        if(countData !== undefined && countData.allTestsCount !== undefined){
            setTestCnt(countData.allTestsCount)
        }
    }, [countData])
    
    useEffect(()=>{
        if(data !== undefined && data.allTests !== undefined){
            setTestList(data.allTests)
        }
    },[data])
    console.log(data)

    // useEffect(()=>{
    //     if(categoryData !== undefined && categoryData.testsByCategory !== undefined){
    //         setTestList(categoryData.testsByCategory)
    //     }
    // },[categoryData])
    // console.log(testList)
    
    // const handleCategoryChange = async (event) => {
    //     setCategoryId(event.target.value);
    //     const response = await GetByCategory({variables: {id: categoryId}})
    //     console.log(response)
    // };
    // console.log(categoryId)
    
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
            
            <Container maxWidth="md">
                <Grid container >
                    <Grid item xs={2} sx={{mt:1}}>전체</Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={4} sx={{mb: 2}}>
                        <FormControl variant='standard'  sx={{width: '120px'}}>
                            <Select value={order} onChange={handleSortChange} >
                                <MenuItem value={'DATE_DESC'}>최근순</MenuItem>
                                <MenuItem value={'DATE'}>오래된순</MenuItem>
                                <MenuItem value={'LIKE_DESC'}>좋아요순</MenuItem>
                                <MenuItem value={'SOLVING_COUNT_DESC'}>제출수순</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px'}} 
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
                            <TableCell align="center"><Link to={`/TestInfo/${data.allTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.allTests[index].id}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${data.allTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.allTests[index].name}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${data.allTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.allTests[index].ownerId}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${data.allTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.allTests[index].tryCnt}</Link></TableCell>
                            <TableCell align="center"><Link to={`/TestInfo/${data.allTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.allTests[index].like}</Link></TableCell>
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