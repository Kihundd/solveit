import Appbar from "../components/home/Appbar.js";
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Link, Paper, Container, Box } from "@mui/material"
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {RANKINGLIST} from '../queries/queries.js';
import { useEffect } from "react";

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
    const [rank, setRank] = useState('');
    // const [orderBy] = ['LIKE', 'LIKE_DESC']
    const {data, loading, error} = useQuery(RANKINGLIST,{
        variables: {page: 1}
    })

    
    useEffect(()=>{
        if(data !== undefined && data.allTests !== undefined){
          setRank(data.allTests)
        }
    },[])

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    console.log(data)

    return(
        <> 
            <Appbar />
            <Container maxWidth="md" className='bodyContainer'>
                <h5 style={{textAlign: 'left', marginLeft: '20px'}}>전체</h5>
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px'}} 
                    aria-label="simple table">
                    <TableHead>
                        {/* <TableRow sx={{border:'2px solid #c4c4c4'}}>
                            <TableCell align="center">순위</TableCell>
                            <TableCell align="center">사용자</TableCell>
                            <TableCell align="center">소개</TableCell>
                            <TableCell align="center">0</TableCell>
                            <TableCell align="center">제출수</TableCell>
                        </TableRow> */}
                        <TableRow sx={{border:'2px solid #c4c4c4'}}>
                            <TableCell align="center">순위</TableCell>
                            <TableCell align="center">문제번호</TableCell>
                            <TableCell align="center">문제집이름</TableCell>
                            <TableCell align="center">제출수</TableCell>
                            <TableCell align="center">정답률</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rank ?
                    rank.map((x, index) => (
                        <TableRow key={index}
                        sx={{border:'2px solid #c4c4c4'}}
                        >
                        <TableCell align="center">{}</TableCell>
                        <TableCell align="center">{x.allTests[index].id}</TableCell>
                        <TableCell align="center">{x.allTests[index].name}</TableCell>
                        <TableCell align="center">{x.allTests[index].tryCnt}</TableCell>
                        <TableCell align="center"></TableCell>
                        </TableRow>
                    )) : null
                    }
                    </TableBody>
                </Table>
            </ Container>
        </>
    )
}
export default Ranking
