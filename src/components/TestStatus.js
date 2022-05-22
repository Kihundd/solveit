import ProfileHeader from './ProfileHeader'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function createData(name, data) {
    return { name, data };
}
const rows = [
    createData('푼 문제 수', 0),
    createData('맞은 문제 수', 0),
    createData('틀린 문제 수', 0),
    createData('부적절한 글', 0),
    createData('공유한 문제집 수', 0),
];

function TestStatus() {
    return(
        <div>
            <TableContainer component={Paper}>
                    <h5>채점현황</h5>
                    <Table sx={{ maxWidth: 400 }} size="small" aria-label="a dense table">
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.data}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )
}

export default TestStatus