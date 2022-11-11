import Appbar from "../components/home/Appbar.js";
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Paper, Container, Box, FormControl, Select, MenuItem } from "@mui/material"
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import {GET_ASKING, ALLASKING} from '../queries/queries.js'
import { useEffect } from "react";
import { ButtonGroup, Button, IconButton } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


function Forum() {

    const params = useParams();
    const [askingList, setAskingList] = useState([]);
    const [pageList, setPageList] = useState([1, 2]);
    const [pageNum, setPageNum] = useState(1);
    const [order, setOrder] = useState('DATE_DESC');
    const {loading, error, data} = useQuery(ALLASKING, {
        variables: {page: pageNum}
    })
    const [getAsking, {data:otherData, loading:otherLoading, error:otherError}] = useLazyQuery(ALLASKING);
    console.log(data)
    useEffect(() => {
        if(data !== undefined){
            setAskingList(data.allAsking)
        }
    }, [data])

    const handleChange = (event) => {
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

    // console.log(askingList)
    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;
    
    return(
        <> 
            <Appbar />
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={2} sx={{mb:2}}>질문목록</Grid>
                    {/* <Grid item xs={7}></Grid>
                    <Grid item xs={3} sx={{mb: 2}}>
                        <FormControl sx={{width: '150px'}}>
                            <Select value={order} onChange={handleChange} >
                                <MenuItem value={'DATE_DESC'}>최근순</MenuItem>
                                <MenuItem value={'DATE'}>오래된순</MenuItem>
                                <MenuItem value={'LIKE_DESC'}>좋아요순</MenuItem>
                                <MenuItem value={'SOLVING_COUNT_DESC'}>제출수순</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid> */}
                </Grid>
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px', mb: 1}} 
                    aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{border:'1px solid #c4c4c4'}}>
                            <TableCell align="center">질문번호</TableCell>
                            <TableCell align="center">제목</TableCell>
                            <TableCell align="center">문제번호</TableCell>
                            <TableCell align="center">작성자</TableCell>
                            <TableCell align="center">작성일시</TableCell>
                            {/* <TableCell align="center">조회수</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {askingList.map((a, index) => {
                        const date = (new Date(Number(a.creationDate))).toLocaleDateString();
                        return (
                        <TableRow key={index}
                        sx={{border:'1px solid #c4c4c4'}}
                        >
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.id}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.title}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.questionId}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.ownerId}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{date}</Link></TableCell>
                        {/* <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.questionNum}</Link></TableCell> */}
                        </TableRow>
                    )})}
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
                

                {/* <PageButton pageList={pageList} pageNum={pageNum} /> */}
            </ Container>
        </>
    )
}
export default Forum
