import { ApolloError, useMutation } from '@apollo/client'
import React,{ useEffect, useState } from 'react'
import { SET_TIER_POINT } from '../../queries/adminQueries'
import {Box, TextField, Typography, Stack, Grid, Button} from '@mui/material'

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';

function Point() {


    const [setTierPoint] = useMutation(SET_TIER_POINT);
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [three, setThree] = useState(0);
    const [four, setFour] = useState(0);
    const [five, setFive] = useState(0);

    const submitPoint = async() => {
        const response = await setTierPoint({variables: {input:[
            {tierId: "1", point: Number(one)},
            {tierId: "2", point: Number(two)},
            {tierId: "3", point: Number(three)},
            {tierId: "4", point: Number(four)},
            {tierId: "5", point: Number(five)},
        ]
        }})
        console.log(response)
    }

    const handleOneChange = (e) => {
        setOne(e.target.value)
    }
    const handleTwoChange = (e) => {
        setTwo(e.target.value)
    }
    const handleThreeChange = (e) => {
        setThree(e.target.value)
    }
    const handleFourChange = (e) => {
        setFour(e.target.value)
    }
    const handleFiveChange = (e) => {
        setFive(e.target.value)
    }



    return (
        <>
            <Box sx={{p:5, pb:9, pl:0, pt:2}}>
                <Stack direction="row" spacing={1} >
                    <LooksOneIcon color="disabled" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="가입시 지급" variant="standard" onChange={handleOneChange} />
                </Stack>
                <Stack direction="row" spacing={1} >
                <LooksTwoIcon color="action" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="2티어 승급시 지급" variant="standard" onChange={handleTwoChange} /><br></br>
                </Stack>
                <Stack direction="row" spacing={1} >
                    <Looks3Icon color="primary" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="3티어 승급시 지급" variant="standard" onChange={handleThreeChange} /><br></br>
                </Stack>
                <Stack direction="row" spacing={1} >
                <Looks4Icon color="success" fontSize='large' sx={{mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="4티어 승급시 지급" variant="standard" onChange={handleFourChange} /><br></br>
                </Stack>
                <Stack direction="row" spacing={1} >
                <Looks5Icon fontSize='large' sx={{ color: "pink", mt:'15px'}} />
                    <TextField fullWidth id="standard-basic" label="5티어 승급시 지급" variant="standard" onChange={handleFiveChange} /><br></br>
                </Stack>
                <Button variant='contained' sx={{float:'right', marginTop: '10px'}} onClick={submitPoint}>저장</Button>
            </Box>
        </>
    )
}

export default Point
