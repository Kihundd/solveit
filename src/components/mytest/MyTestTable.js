import { useEffect, useState } from 'react';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Button, IconButton} from '@mui/material';
import { useQuery } from '@apollo/client';
import { MYTEST } from '../../queries/queries';
import { Link } from "react-router-dom"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function MyTestTable(props) {

  const [pageList, setPageList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [testList, setTestList] = useState([]);

  useEffect(() => {
    if(props !== undefined && props.testList !== undefined){
      setTestList(props.testList.slice(pageNum*10-10, pageNum*10))
      setPageList(props.pageList)
    }
  }, [props, pageNum])

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
          {testList? testList.slice(0,10).map((a, index) => (
            <TableRow key={index}
              sx={{border:'1px solid #c4c4c4'}}
            >
              <TableCell align="center"><Link to={`/MyTestResult/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.id}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.name}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.ownerId}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.tryCnt}</Link></TableCell>
              <TableCell align="center"><Link to={`/MyTestResult/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.like}</Link></TableCell>
            </TableRow>
          )): null}
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