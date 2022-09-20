import Appbar from "../components/home/Appbar.js";
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Paper, Container, Box } from "@mui/material"
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageButton from "../components/PageButton";
const ask = [
    {
        askingNum: 1,
        askingName: 'test',
        ownerId: 'test@test.com',
        createDate: 999,
        viewCount: 1200,
        questionNum: 6
    },
    {
        askingNum: 2,
        askingName: 'test1',
        ownerId: 'test1@test.com',
        createDate: 500,
        viewCount: 1110,
        questionNum: 7
    },
    {
        askingNum: 3,
        askingName: 'test3',
        ownerId: 'test3@test.com',
        createDate: 450,
        viewCount: 900,
        questionNum: 5
    },
    {
        askingNum: 4,
        askingName: 'test4',
        ownerId: 'test4@test.com',
        createDate: 400,
        viewCount: 800,
        questionNum: 5
    },
    {
        askingNum: 5,
        askingName: 'test5',
        ownerId: 'test5@test.com',
        createDate: 300,
        viewCount: 800,
        questionNum: 5
    }
]

function Forum() {

    const params = useParams();
    const [askingList, setAskingList] = useState(ask)

    return(
        <> 
            <Appbar />
            <Container maxWidth="md">
                <h5 style={{textAlign: 'left', marginLeft: '20px'}}>전체</h5>
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px'}} 
                    aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{border:'1px solid #c4c4c4'}}>
                            <TableCell align="center">질문번호</TableCell>
                            <TableCell align="center">제목</TableCell>
                            <TableCell align="center">문제번호</TableCell>
                            <TableCell align="center">작성자</TableCell>
                            <TableCell align="center">작성일시</TableCell>
                            <TableCell align="center">조회수</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {askingList.map((a, index) => (
                        <TableRow key={index}
                        sx={{border:'1px solid #c4c4c4'}}
                        >
                        <TableCell align="center"><Link to={`/Ask/${a.askingNum}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.askingNum}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.askingNum}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.askingName}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.askingNum}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.ownerId}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.askingNum}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.createDate}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.askingNum}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.viewCount}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.askingNum}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.questionNum}</Link></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <PageButton />
            </ Container>
        </>
    )
}
export default Forum
