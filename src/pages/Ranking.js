import Appbar from "../components/home/Appbar.js";
import { IconButton, Stack, Divider, Button, TableHead, TableCell, TableRow, Table, TableBody, Link, Paper, Container, Box } from "@mui/material"
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {RANKINGLIST, PROFILE_COUNT} from '../queries/queries.js';
import { useEffect } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';

function Ranking() {
    const [pageList] = useState([1]);
    const [pageNum, setPageNum] = useState(1);
    const [cnt, setCnt] = useState(0);
    const [rank, setRank] = useState([]);
    const [isAdmin, setIsAdmin]= useState(false);
    const {data, loading, error} = useQuery(RANKINGLIST,{
        variables: {page: pageNum, includeAdmin: isAdmin}
    })
    const {loading:countLoading, error:countError, data: countData} = useQuery(PROFILE_COUNT,{
        variables: {includeAdmin: isAdmin}
    })

    const renderTier = (tier) => {
        if(tier == 1)
            return <LooksOneIcon color="disabled" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 2)
            return <LooksTwoIcon color="action" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 3)
            return <Looks3Icon color="primary" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 4)
            return <Looks4Icon color="success" fontSize='large' sx={{verticalAlign: 'text-top'}} />
        else if(tier == 5)
            return <Looks5Icon fontSize='large' sx={{ color: "pink", mt:'6px', verticalAlign: 'text-top'}} />
    }

    useEffect(() => {
        if(countData !== undefined && countData.profilesCount !== undefined){
            setCnt(countData.profilesCount)
        }   
    }, [countData])
    
    useEffect(()=>{
        if(data !== undefined && data.profilesByExp !== undefined){
          setRank(data.profilesByExp)
        }
    },[data])
    useEffect(() => {
        for(let i = 2; i <= Math.ceil(cnt/10); i++){
            pageList.push(i)
        }
    }, [cnt])

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


    return(
        <> 
            <Appbar />
            <Container maxWidth="lg" className='bodyContainer'>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    sx={{mb: 2}}
                >
                    <Button size='small' variant='standard' color="info">사용자 랭킹</Button>
                </Stack>
                <Table 
                    sx={{ minWidth: 650, borderCollapse: 'inherit', border: '1px solid #c4c4c4', borderRadius: '5px'}} 
                    aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{border:'2px solid #c4c4c4'}}>
                            <TableCell align="center">순위</TableCell>
                            <TableCell align="center">티어</TableCell>
                            <TableCell align="center">닉네임</TableCell>
                            <TableCell align="center">사용자</TableCell>
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
                        <TableCell align="center">{renderTier(x.tier)}</TableCell>
                        <TableCell align="center">{x.nickname}</TableCell>
                        <TableCell align="center">{x.ownerId}</TableCell>
                        <TableCell align="center">{x.experience}</TableCell>
                        </TableRow>
                    )) : null
                    }
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
            </ Container>
        </>
    )
}
export default Ranking
