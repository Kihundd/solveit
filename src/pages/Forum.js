import Appbar from "../components/home/Appbar.js";
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Paper, Container, Stack, Divider } from "@mui/material"
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import {GET_ASKING, ALLASKING, ALL_ASKING_COUNT} from '../queries/queries.js'
import { useEffect } from "react";
import { ButtonGroup, Button, IconButton } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


function Forum() {

    const [pageList] = useState([1]);
    const [askingList, setAskingList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const {loading:countLoading, error: countError, data:countData} = useQuery(ALL_ASKING_COUNT);
    const {loading, error, data} = useQuery(ALLASKING, {
        variables: {page: pageNum}
    })

    useEffect(() => {
        if(data !== undefined){
            setAskingList(data.allAsking)
        }
    }, [data])

    useEffect(() => {
        if(countData !== undefined && countData.allAskingCount !== undefined){
            for(let i = 2; i <= Math.ceil(countData.allAskingCount/10); i++){
                pageList.push(i)
            }
        }   
    }, [countData])


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
    return(
        <> 
            <Appbar />
            
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    sx={{mb: 2}}
                >
                    <Button size='small' variant='standard' color="info">질문목록</Button>
                </Stack>
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
            </ Container>
        </>
    )
}
export default Forum
