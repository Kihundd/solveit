import { useMutation, useQuery } from '@apollo/client';
import React from 'react'
import Appbar from "../home/Appbar.js";
import { ALLREPORTS, DELETE_REPORT } from "../../queries/reportQueries.js";
import { useState, useEffect } from 'react';
import { Table,TableBody,TableCell,Container,TableHead,TableRow,Button,IconButton, Typography, Box,} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteReport from '../report/DeleteReport';
import DeleteTest from './DeleteTest.js';
import Point from './Point.js';

function Report() {
    
    const [pageList, setPageList] = useState([1]);
    const [pageNum, setPageNum] = useState(1);
    const [reportList, setReportList] = useState('');
    const [open, setOpen] = useState(false);

    const {loading, error, data} = useQuery(ALLREPORTS,{
        variables: {page: 1}
    })

    const [deleteReport, {loading:deleteLoading, error:deleteError, data: deleteData}] = useMutation(DELETE_REPORT);
    useEffect(() => {
      if(data !== undefined && data.allReports !== undefined){
        setReportList(data.allReports)
      }
    }, [data])

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

    const deleteTest = () => {
        setOpen(true)

    }

    const deleteHandler = async (id) => {
        const response = await deleteReport({variables: {id: id}})
        console.log(response)
    }


    return (
        <div>
            <Appbar />
            <Box
            sx={{
                bgcolor: 'background.paper',
                // pt: 8,
                pb: 1,
                
            }}>
                <Container maxWidth="md" sx={{textAlign:'left', borderBottom: '1px solid #c4c4c4'}}>
                    <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    sx={{display: 'inline-block'}}
                    >
                        신고된 문제
                    </Typography>
                </Container>
            </Box>
            <Container maxWidth="md">
                {/* <h5 style={{textAlign: 'left', marginLeft: '20px'}}>신고된 문제집</h5> */}
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '2px', mt:3}} 
                    aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">문제번호</TableCell>
                        <TableCell align="center">신고자</TableCell>
                        <TableCell align="center">신고사유</TableCell>
                        <TableCell align="center">작성일시</TableCell>
                        <TableCell align="center">삭제</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {reportList ? data.allReports.map((a, index) => (
                        <TableRow key={index}>
                            <TableCell align="center" >{data.allReports[index].testId}</TableCell>
                            <TableCell align="center">{data.allReports[index].ownerId}</TableCell>
                            <TableCell align="center">{data.allReports[index].type}</TableCell>
                            <TableCell align="center">{data.allReports[index].creationDate}</TableCell>
                            <TableCell align="center">
                                <DeleteReport reportInfo={a} />
                            </TableCell>
                            
                        </TableRow>
                    )) : null
                }
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
        </div>
    )
}

export default Report


