import Appbar from "../components/home/Appbar.js";
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Link, Paper, Container, Box } from "@mui/material"
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {RANKINGLIST} from '../queries/queries.js';
import { useEffect } from "react";

function Ranking() {

    const [userData, setUserData] = useState([1, 2, 3, 4, 5]);
    const [rank, setRank] = useState('');
    const [isAdmin, setIsAdmin]= useState(false);
    const {data, loading, error} = useQuery(RANKINGLIST,{
        variables: {page: 1, includeAdmin: isAdmin}
    })
    console.log(data)
    
    useEffect(()=>{
        if(data !== undefined && data.profilesByExp !== undefined){
          setRank(data.profilesByExp)
        }
    },[data])
    console.log(rank)

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;

    return(
        <> 
            <Appbar />
            <Container maxWidth="md" className='bodyContainer'>
                <h5 style={{textAlign: 'left', marginLeft: '20px'}}>유저랭킹</h5>
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px'}} 
                    aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{border:'2px solid #c4c4c4'}}>
                            <TableCell align="center">순위</TableCell>
                            <TableCell align="center">닉네임</TableCell>
                            <TableCell align="center">사용자</TableCell>
                            <TableCell align="center">티어</TableCell>
                            <TableCell align="center">경험치</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rank ? 
                    rank.map((x, index) => (
                        <TableRow key={index}
                        sx={{border:'2px solid #c4c4c4'}}
                        >
                        <TableCell align="center">{index+1}</TableCell>
                        <TableCell align="center">{x.nickname}</TableCell>
                        <TableCell align="center">{x.ownerId}</TableCell>
                        <TableCell align="center">{x.tier}</TableCell>
                        <TableCell align="center">{x.experience}</TableCell>
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
