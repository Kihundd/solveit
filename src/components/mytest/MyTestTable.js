import { useEffect, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button, IconButton} from '@mui/material';
import { useQuery } from '@apollo/client';
import { MYTEST } from '../../queries/queries';
import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function MyTestTable() {
  // const {testId} = useParams();
  // console.log(testId)
  // const [pages, setPages] = useState(1);
  const [pageList, setPageList] = useState([1]);
  const [pageNum, setPageNum] = useState(1);
  const [testList, setTestList] = useState();
  const {loading, error, data} = useQuery(MYTEST)
  console.log(data)
  
  useEffect(()=>{
    if(data !== undefined && data.mySolvingTests !== undefined){
      setTestList(data.mySolvingTests)
    }
  },[])
  console.log(data)

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
  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error!</p>;
  return (
    <>
      <Table 
        sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px', marginBottom: 1}} 
        aria-label="simple table">
        <TableHead>
          <TableRow sx={{border:'1px solid #c4c4c4'}}>
            <TableCell align="center">문제번호</TableCell>
            <TableCell align="center">문제집이름</TableCell>
            <TableCell align="center">출제자</TableCell>
            <TableCell align="center">제출 수</TableCell>
            <TableCell align="center">좋아요</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.mySolvingTests.map((a, index) => (
            <TableRow key={index}
              sx={{border:'1px solid #c4c4c4'}}
            >
              <TableCell align="center"><Link to={`/MyTestResult/${data.mySolvingTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.mySolvingTests[index].id}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${data.mySolvingTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.mySolvingTests[index].name}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${data.mySolvingTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.mySolvingTests[index].ownerId}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${data.mySolvingTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.mySolvingTests[index].tryCnt}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${data.mySolvingTests[index].id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{data.mySolvingTests[index].like}</Link></TableCell>
            </TableRow>
          ))}
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
    </>
  );
}