import { useState } from 'react';
import { Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
    } from '@mui/material';

function createData(문제번호, 문제집이름, 출제자, 제출수, 좋아요) {
  return { 문제번호, 문제집이름, 출제자, 제출수, 좋아요 };
}

export default function TestTable() {

    // const [testNum, setTestNum] = useState("");
    // const [testName, setTestName] = useState(" ");
    // const [submitUser, setSubmitUser] = useState(" ");
    // const [submitCount, setSubmitCount] = useState(" ");
    // const [like, setLike] = useState(" ");

   const [test, setTest] = useState

    const rows = [
        createData('1', '연습문제', 'yu', 100, 35),
        createData('2', 'Test', 'Test', '20', '5'),
        createData(' ', ' ', ' ', ' ', ' ' ),
        createData(' ', ' ', ' ', ' ', ' ' )
    ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {rows.map((row) => (
            <TableRow
              key={row.번호}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.문제번호}</TableCell>
              <TableCell align="center">{row.문제집이름}</TableCell>
              <TableCell align="center">{row.출제자}</TableCell>
              <TableCell align="center">{row.제출수}</TableCell>
              <TableCell align="center">{row.좋아요}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}