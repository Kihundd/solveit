import Header from "../components/home/Header"
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
            <Header />
            <Container maxWidth="xl" className='bodyContainer'>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '60vh'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <ul>전체</ul>
                                    </Grid>
                                </Grid>
                       
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box sx={{border: '2px solid #c4c4c4', height: '60vh'}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box sx={{border: '1px solid #c4c4c4'}}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={3}>
                                                <h4>질문목록</h4>
                                            </Grid>
                                        </Grid>
                                        <TableContainer component={Paper}>
                                            <Table 
                                                // sx={{ minWidth: 650 }} 
                                                aria-label="simple table">
                                                <TableHead>
                                                <TableRow sx={{border:'2px solid #c4c4c4'}}>
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
                                                    sx={{border:'2px solid #c4c4c4'}}
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
                                        </TableContainer>
                                        <PageButton />
                                    </Box>
                                </Grid>      
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </ Container>
        </>
    )
}
export default Forum
