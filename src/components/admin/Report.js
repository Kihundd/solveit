import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React from 'react'
import Appbar from "../home/Appbar.js";
import { ALLREPORTS, DELETE_REPORT } from "../../queries/reportQueries.js";
import { useState, useEffect } from 'react';
import { Table,TableBody,TableCell,Container,TableHead,TableRow,Button,IconButton, Typography, Box, Stack,} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteReport from '../report/DeleteReport';
import DeleteTest from './DeleteTest.js';
import Point from './Point.js';

function Report() {


    const [reportList, setReportList] = useState([]);
    const {loading, error, data} = useQuery(ALLREPORTS,{
        variables: {page: 1}
    });


    console.log(reportList)

    useEffect(() => {
      if(data !== undefined && data.allReports !== undefined){
        setReportList(data.allReports)
      }
    }, [data])


    return (
        <div>
            <Appbar />
            
            <Container maxWidth="md">
                <Box
                sx={{
                    bgcolor: 'background.paper',
                    // pt: 8,
                    pb: 1,
                    
                }}>
                    <Container maxWidth="md" sx={{textAlign:'left'}}>
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
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '2px', mt:1}} 
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
                    {reportList ? reportList.map((a, index) => (
                        <TableRow key={index}>
                            <TableCell align="center" >{a.testId}</TableCell>
                            <TableCell align="center">{a.ownerId}</TableCell>
                            <TableCell align="center">{a.type}</TableCell>
                            <TableCell align="center">{a.creationDate}</TableCell>
                            <TableCell align="center">
                                <Stack direction="row" spacing={1} justifyContent="center">
                                    <DeleteTest reportInfo={a} setReportList={setReportList} />
                                    <DeleteReport reportInfo={a} setReportList={setReportList} />
                                </Stack>
                            </TableCell>
                            
                        </TableRow>
                    )) : null
                }
                    </TableBody>
                </Table>
                
            </ Container>
        </div>
    )
}

export default Report


