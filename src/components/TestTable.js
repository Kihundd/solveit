import { useEffect, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Link,} from '@mui/material';
import { useQuery } from '@apollo/client';
import { ALLTESTLIST, TESTLIST_CATEGORY } from '../queries/queries';


export default function TestTable() {
  const [testList, setTestList] = useState();
  const {loading, error, data} = useQuery(ALLTESTLIST);
  // const {categoryLoading, categoryError, categoryData} = useQuery(TESTLIST_CATEGORY);
  
  useEffect(()=>{
    if(data !== undefined && data.allTests !== undefined){
      setTestList(data.allTests)
    }
  },[])

  console.log(data)

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error!</p>;
  
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
          {data.allTests.map((a, index) => (
            <TableRow key={index}
              sx={{border:'2px solid #c4c4c4'}}
            >
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{data.allTests[index].id}</Link></TableCell>
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{data.allTests[index].name}</Link></TableCell>
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{data.allTests[index].ownerId}</Link></TableCell>
              <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{data.allTests[index].tryCnt}</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}