import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { STATISTICS } from '../../queries/queries';

function TestStatus(props) {

    const [ tryCount, setTryCout ] = useState('');
    const [ correct, setCorrect ] = useState('');
    const [ icorrect, setIcorrect] = useState('');

    // console.log(props.solvingData)
    const createData = ((name, value) => {
        return { name, value };
    })


    useEffect(()=> {
        setTryCout(props.solvingData[0])
        setCorrect(props.solvingData[1])
        setIcorrect(props.solvingData[0]-props.solvingData[1])
    },[props])

    const rows = [
        createData('푼 문제수', tryCount),
        createData('맞은 문제 수', correct),
        createData('틀린 문제 수', icorrect),
        // createData('부적절한 글', 0),
        // createData('공유한 문제집 수', 0),
    ];

    return(
        <>
            <TableContainer sx={{border:'2px solid #c4c4c4'}} >
                    {/* <h4>채점현황</h4> */}
                    <Table  size="large" aria-label="a dense table">
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </>
    )
}

export default TestStatus