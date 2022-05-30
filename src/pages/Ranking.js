import Header from "../components/home/Header"
import { TableContainer,TableHead,TableCell,TableRow,Table,TableBody,Link,Paper } from "@mui/material"
import { useState } from "react";
import { Grid } from "@mui/material";
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
        name: 'test2',
        ownerId: 'test2@test.com',
        correct: 500,
        tryCnt: 1000,
    }
]
function Ranking() {

    const [userData, setUserData] = useState([1, 2, 3]);
    const [rank, setRank] = useState([userRank])


    return(
        <>
            <Header />
            <Grid container maxWidth="xl">
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
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
                            {userData.map((a, index) => (
                                <TableRow key={index}
                                sx={{border:'2px solid #c4c4c4'}}
                                >
                                <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{userData.ranking}</Link></TableCell>
                                <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{index.name}</Link></TableCell>
                                <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{index.ownerId}</Link></TableCell>
                                <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{index.correct}</Link></TableCell>
                                <TableCell align="center"><Link href='/TestInfo/0' underline="none" color="inherit">{index.tryCnt}</Link></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            
        </>
    )
}
export default Ranking