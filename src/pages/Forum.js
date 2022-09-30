import Appbar from "../components/home/Appbar.js";
import { Grid, TableContainer, TableHead, TableCell, TableRow, Table, TableBody, Paper, Container, Box } from "@mui/material"
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageButton from "../components/PageButton";
import { useQuery } from "@apollo/client";
import {GET_ASKING, ALLASKING} from '../queries/queries.js'
import { useEffect } from "react";


function Forum() {

    const params = useParams();
    const [askingList, setAskingList] = useState([]);
    const {loading, error, data} = useQuery(ALLASKING, {
        variables: {page: 1}
    })

    useEffect(() => {
        if(data !== undefined){
            setAskingList(data.allAsking)
        }
    }, [data])

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error!</p>;
    
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
                            {/* <TableCell align="center">조회수</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {askingList.map((a, index) => (
                        <TableRow key={index}
                        sx={{border:'1px solid #c4c4c4'}}
                        >
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.id}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.title}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.questionId}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.ownerId}</Link></TableCell>
                        <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.creationDate}</Link></TableCell>
                        {/* <TableCell align="center"><Link to={`/Ask/${a.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>{a.questionNum}</Link></TableCell> */}
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
