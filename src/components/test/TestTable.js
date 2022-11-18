import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Stack, Pagination } from '@mui/material';
import { Link } from "react-router-dom"

function TestTable(props) {
    
    const [cnt, setCnt] = useState(0);
    const [page, setPage] = useState(1);
    const [testList, setTestList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(true);
    
    useEffect(() => {
        setTestList(props.testList)
        setCnt(props.page)
    }, [props])

    const handlePage = (event, value) => {
        // console.log(value)
        if (value !== NaN) {
          setPage(value);
          props.setPage(value)
        }
    }

    return(
        <>
            <Table 
                sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px', mb: 1}} 
                aria-label="simple table">
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
                    {testList ? testList.map((a, index) => (
                        <TableRow key={index}
                        >
                        <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.id}</Link></TableCell>
                        <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.name}</Link></TableCell>
                        <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.ownerId}</Link></TableCell>
                        <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.tryCnt}</Link></TableCell>
                        <TableCell align="center"><Link to={`/TestInfo/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.like}</Link></TableCell>
                        </TableRow>
                    )): null}
                </TableBody>
            </Table>
            <Stack direction="row" justifyContent="center" sx={{ pt: 2, pb: 5 }}>
                <Pagination
                count={cnt}
                defaultPage={1}
                page={page}
                sx={{ margin: '0 auto' }}
                onChange={handlePage}
                />
            </Stack>
        </>
    )
}

export default TestTable