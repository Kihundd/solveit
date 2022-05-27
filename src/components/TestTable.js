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


function createData(문제번호, 문제집이름, 출제자, 제출수) {
  return { 문제번호, 문제집이름, 출제자, 제출수 };
}

export default function TestTable() {

  // const [testList, setTestList] = useState({
  //   testId:"",
  //   testName:"",
  //   ownerId:"",
  //   tryCnt:0
  // });
  // const testListNum = [1, 2, 3, 4, 5, 6, 7, 8];
  

  // const testList = num.map((test, i)=>{
  //   test.testNum,
  //   test.testName,
  //   test.ownerName,
  //   test.tryCnt
  // });
  // const {data, loading, error} = useQuery(TESTLIST, {
  //   variables:{ID: }
  // });
  
  const rows = [
    createData('1', '연습문제', 'yu', '20')
  ];



  return (
    <TableContainer component={Paper}>
      <Table 
        // sx={{ minWidth: 650 }} 
        aria-label="simple table">
        <TableHead>
          <TableRow sx={{border:'2px solid #c4c4c4'}}>
            <TableCell align="center">문제번호</TableCell>
            <TableCell align="center">문제집이름</TableCell>
            <TableCell align="center">출제자</TableCell>
            <TableCell align="center">제출 수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.문제번호}
              sx={{border:'2px solid #c4c4c4'}}
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