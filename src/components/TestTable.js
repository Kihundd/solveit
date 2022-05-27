import { useState } from 'react';
import { Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
        Link,
    } from '@mui/material';


function createData(문제번호, 문제집이름, 출제자, 제출수, 좋아요) {
  return { 문제번호, 문제집이름, 출제자, 제출수, 좋아요 };
}

export default function TestTable() {

  const [testList, setTestList] = useState('1');
  
  // const {data, loading, error} = useQuery(TESTLIST, {
  //   variables:{ID: }
  // });
  
  const rows = [
    createData('1', '연습문제', 'yu', 100),
    createData('2', 'Test', 'Test', 20),

  ];



  return (
    <TableContainer component={Paper}>
      <Table 
        // sx={{ minWidth: 650 }} 
        aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">문제번호</TableCell>
            <TableCell align="center">문제집이름</TableCell>
            <TableCell align="center">출제자</TableCell>
            <TableCell align="center">제출 수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.문제번호}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{row.문제번호}</Link></TableCell>
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{row.문제집이름}</Link></TableCell>
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{row.출제자}</Link></TableCell>
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{row.제출수}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}