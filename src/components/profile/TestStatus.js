import ProfileHeader from './ProfileHeader'
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

    const { data, loading, error } = useQuery(STATISTICS, {
        variables:{ID: props.userId}
    });
    const [ tryCount, setTryCout ] = useState('');
    const [ correct, setCorrect ] = useState('');
    const [ icorrect, setIcorrect] = useState('');

    const createData = ((name, value) => {
        return { name, value };
    })

    // useEffect(()=> {
    //     if(data.)
    // },[])
    
    const rows = [
        createData('푼 문제수', 0),
        createData('맞은 문제 수', 0),
        // createData('틀린 문제 수', icorrect),
        // createData('부적절한 글', 0),
        // createData('공유한 문제집 수', 0),
    ];

    return(
        <div>
            <TableContainer sx={{border:'2px solid #c4c4c4', marginTop:'20px', marginLeft:'50px'}} >
                    <h4>채점현황</h4>
                    <Table  size="medium" aria-label="a dense table">
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
        </div>
    )
}

export default TestStatus