import Header from "../components/home/Header"
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Link, Paper, Container, Box } from "@mui/material"
import { useState } from "react";

const userRank = [
    {
        ranking: 1,
        name: 'test',
        ownerId: 'test@test.com',
        correct: 999,
        tryCnt: 1200,
    },
    {
        ranking: 2,
        name: 'test1',
        ownerId: 'test1@test.com',
        correct: 500,
        tryCnt: 1110,
    },
    {
        ranking: 3,
        name: 'test3',
        ownerId: 'test3@test.com',
        correct: 450,
        tryCnt: 900,
    },
    {
        ranking: 4,
        name: 'test4',
        ownerId: 'test4@test.com',
        correct: 400,
        tryCnt: 800,
    },
    {
        ranking: 5,
        name: 'test5',
        ownerId: 'test5@test.com',
        correct: 300,
        tryCnt: 800,
    }
]

function Ranking() {

    const [userData, setUserData] = useState([1, 2, 3, 4, 5]);
    const [rank, setRank] = useState(userRank)


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
                                                <h4>랭킹</h4>
                                            </Grid>
                                        </Grid>
                                        <TableContainer component={Paper}>
                                            <Table 
                                                // sx={{ minWidth: 650 }} 
                                                aria-label="simple table">
                                                <TableHead>
                                                <TableRow sx={{border:'2px solid #c4c4c4'}}>
                                                    <TableCell align="center">순위</TableCell>
                                                    <TableCell align="center">사용자</TableCell>
                                                    <TableCell align="center">소개</TableCell>
                                                    <TableCell align="center">정답</TableCell>
                                                    <TableCell align="center">제출수</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rank.map((a, index) => (
                                                    <TableRow key={index}
                                                    sx={{border:'2px solid #c4c4c4'}}
                                                    >
                                                    <TableCell align="center">{a.ranking}</TableCell>
                                                    <TableCell align="center">{a.name}</TableCell>
                                                    <TableCell align="center">{a.ownerId}</TableCell>
                                                    <TableCell align="center">{a.correct}</TableCell>
                                                    <TableCell align="center">{a.tryCnt}</TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
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
export default Ranking
